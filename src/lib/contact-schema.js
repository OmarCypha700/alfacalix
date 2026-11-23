import { z } from "zod";

export const enquiryTypes = [
  "General Enquiry",
  "Software Product Enquiry",
  "Custom Software Development",
  "Website Development",
  "Technical Support",
  "Partnership",
  "Other",
];

const optionalText = (max, message) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .or(z.literal(""));

/** Shared by the contact form (client) and the API route (server). */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(200, "Please keep your email under 200 characters."),
  organisation: optionalText(160, "Please keep this under 160 characters."),
  phone: z
    .string()
    .trim()
    .max(30, "Please keep the phone number under 30 characters.")
    .regex(/^[+()\d\s.-]*$/, "Please use digits, spaces and + ( ) - only.")
    .optional()
    .or(z.literal("")),
  enquiryType: z.enum(enquiryTypes, {
    error: "Please choose an enquiry type.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
});
