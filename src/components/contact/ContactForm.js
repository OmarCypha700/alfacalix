"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { contactSchema, enquiryTypes } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const defaultValues = {
  fullName: "",
  email: "",
  organisation: "",
  phone: "",
  enquiryType: "",
  message: "",
  website: "",
};

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
      <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  );
}

function Optional() {
  return <span className="ml-1 font-normal text-subtle">(optional)</span>;
}

/**
 * Contact form. Success is shown ONLY when the server confirms delivery
 * (HTTP 2xx). Any other outcome shows an honest error.
 */
export function ContactForm({ fallbackEmail }) {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  async function onSubmit(values) {
    setStatus({ state: "idle", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        reset(defaultValues);
        setStatus({ state: "success", message: "" });
        return;
      }

      const messages = {
        not_configured:
          "Our contact form is not accepting messages yet, so your message was not sent.",
        rate_limited: "You have sent several messages in a short time. Please wait a few minutes and try again.",
        invalid: "Some details look incorrect. Please check the form and try again.",
      };
      setStatus({
        state: "error",
        message:
          messages[data.error] ||
          "Sorry, we couldn't send your message right now. Your message was not delivered. Please try again shortly.",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "We couldn't reach our server. Please check your connection and try again. Your message was not delivered.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-accent-200 bg-accent-50 p-8 md:p-10">
        <CircleCheck aria-hidden="true" className="size-8 text-accent-700" />
        <h2 className="text-h3 mt-5">Thank you, your message has been sent.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          We have received your enquiry and will get back to you using the email address you
          provided.
        </p>
        <Button variant="outline" className="mt-7" onClick={() => setStatus({ state: "idle", message: "" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const describe = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="contact-form-title"
      className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card sm:p-8 md:p-10"
    >
      <h2 id="contact-form-title" className="text-h3">
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-subtle">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">
            Full name <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={describe("fullName")}
            {...register("fullName")}
          />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="email">
            Email address <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={describe("email")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="organisation">
            Organisation
            <Optional />
          </Label>
          <Input
            id="organisation"
            autoComplete="organization"
            aria-invalid={errors.organisation ? "true" : "false"}
            aria-describedby={describe("organisation")}
            {...register("organisation")}
          />
          <FieldError id="organisation-error" message={errors.organisation?.message} />
        </div>

        <div>
          <Label htmlFor="phone">
            Phone number
            <Optional />
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={describe("phone")}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="enquiryType">
            Enquiry type <span aria-hidden="true">*</span>
          </Label>
          <Select
            id="enquiryType"
            aria-required="true"
            aria-invalid={errors.enquiryType ? "true" : "false"}
            aria-describedby={describe("enquiryType")}
            {...register("enquiryType")}
          >
            <option value="" disabled>
              Select an enquiry type
            </option>
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FieldError id="enquiryType-error" message={errors.enquiryType?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">
            Message <span aria-hidden="true">*</span>
          </Label>
          <Textarea
            id="message"
            rows={6}
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={describe("message")}
            placeholder="Tell us about your organisation and what you would like to achieve."
            {...register("message")}
          />
          <FieldError id="message-error" message={errors.message?.message} />
        </div>

        {/* Honeypot field, hidden from people and assistive technology */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
      </div>

      {status.state === "error" ? (
        <div role="alert" className="mt-8 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <div>
            <p>{status.message}</p>
            {fallbackEmail ? (
              <p className="mt-1">
                You can also email us directly at{" "}
                <a href={`mailto:${fallbackEmail}`} className="font-semibold underline underline-offset-2">
                  {fallbackEmail}
                </a>
                .
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle sm:max-w-xs">
          We use your details only to respond to your enquiry. See our{" "}
          <Link href="/privacy" className="font-medium text-navy-900 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
