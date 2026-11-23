import { contactSchema } from "@/lib/contact-schema";

/*
 * Contact form handler. Sends enquiries through the Brevo transactional email
 * API (https://developers.brevo.com/reference/sendtransacemail).
 *
 * Required server-side environment variables (never NEXT_PUBLIC_):
 *   BREVO_API_KEY       Brevo API key (v3)
 *   CONTACT_TO_EMAIL    Inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  Verified Brevo sender address
 *   CONTACT_FROM_NAME   Optional sender display name
 *
 * If configuration is missing, the route returns 503 "not_configured" and the
 * form tells the visitor their message was NOT sent.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

// Light, best-effort rate limit (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

function isRateLimited(key, now) {
  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const data = parsed.data;

  // Honeypot filled in: treat as spam and do not send.
  if (data.website) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (isRateLimited(ip, Date.now())) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || "Alfa Calix Technologies Website";

  if (!apiKey || !toEmail || !fromEmail) {
    console.warn("[contact] Email delivery is not configured: set BREVO_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Organisation", data.organisation || "Not provided"],
    ["Phone", data.phone || "Not provided"],
    ["Enquiry type", data.enquiryType],
  ];

  const htmlContent = `
    <h2 style="font-family:Arial,sans-serif;color:#0b1b33">New website enquiry</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#4a5568;vertical-align:top"><strong>${label}</strong></td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:Arial,sans-serif;color:#0b1b33;margin-top:24px">Message</h3>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  const textContent = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${data.message}`;

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: toEmail }],
        replyTo: { email: data.email, name: data.fullName },
        subject: `Website enquiry: ${data.enquiryType} from ${data.fullName}`.slice(0, 200),
        htmlContent,
        textContent,
        tags: ["website-contact"],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[contact] Brevo responded ${response.status}: ${detail.slice(0, 300)}`);
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
  } catch (error) {
    console.error("[contact] Brevo request failed:", error?.message || error);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: true });
}
