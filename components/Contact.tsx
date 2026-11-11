"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { CONTACT_SUBJECTS, isContactSubject } from "@/lib/contact";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FieldName = keyof FormData;

const INSTAGRAM_HREF =
  "https://www.instagram.com/slimcybertech?igsh=ZzRscWRlNWlvdjZk";
const WHATSAPP_CHANNEL_HREF =
  "https://whatsapp.com/channel/0029Vb8BAyd0G0XYpCcddb3o";
const WHATSAPP_HREF = "https://wa.me/256772581510";

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  budget: "",
  message: "",
};

const fieldLabels: Record<FieldName, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  budget: "Budget range",
  message: "Message",
};

const requiredFields: FieldName[] = ["firstName", "lastName", "email", "subject", "message"];

const budgets = [
  "Under UGX 250,000",
  "250k-550k",
  "550k-750k",
  // TODO: No 750k–1,000,000 band — team to decide whether to add it. Do not fill the gap silently.
  "1,000,000+",
  "Not sure yet",
];

const inputClass =
  "min-h-11 w-full rounded-[10px] border bg-[var(--bg)] px-4 text-base text-[var(--white)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_rgba(0,198,255,0.12)]";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Contact() {
  const searchParams = useSearchParams();
  const formId = useId();
  const submittingRef = useRef(false);

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const requested = searchParams.get("subject");
    if (requested && isContactSubject(requested)) {
      setFormData((prev) => ({ ...prev, subject: requested }));
    }
  }, [searchParams]);

  const validateField = (field: FieldName, value: string): string => {
    const trimmed = value.trim();

    if (field === "firstName" || field === "lastName") {
      if (!trimmed) return `${fieldLabels[field]} is required`;
      if (trimmed.length < 2) return `${fieldLabels[field]} must be at least 2 characters`;
      return "";
    }

    if (field === "email") {
      if (!trimmed) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email address";
      return "";
    }

    if (field === "phone") {
      if (!trimmed) return "";
      if (!/^[+]?[\d\s\-()]{7,20}$/.test(trimmed)) return "Please enter a valid phone number";
      return "";
    }

    if (field === "subject") {
      if (!trimmed) return "Please select a service";
      return "";
    }

    if (field === "message") {
      if (!trimmed) return "Message is required";
      if (trimmed.length < 20) return "Message should be at least 20 characters";
      if (trimmed.length > 500) return "Message must not exceed 500 characters";
      return "";
    }

    return "";
  };

  const validateAll = (): FormErrors => {
    const next: FormErrors = {};
    (Object.keys(formData) as FieldName[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) next[field] = error;
    });
    return next;
  };

  const updateField = (field: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const nextError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: nextError || undefined }));
    }
  };

  const handleBlur = (field: FieldName) => {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const describedBy = (field: FieldName, extra?: string) => {
    const ids = [
      errors[field] ? `${formId}-${field}-error` : null,
      extra,
    ].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || isSubmitting) return;

    setSubmitError(null);
    setIsSuccess(false);

    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = requiredFields.find((field) => nextErrors[field]);
      if (firstInvalid) {
        document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      }
      return;
    }

    if (honeypot.trim()) {
      setIsSuccess(true);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to send your message right now.");
      }

      setIsSuccess(true);
      setFormData(emptyForm);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const charCount = formData.message.length;
  const countTone =
    charCount > 500 ? "text-red-400" : charCount >= 400 ? "text-[var(--cyan)]" : "text-[var(--muted)]";

  const renderInput = (field: FieldName, type: string, autoComplete: string) => (
    <div>
      <label htmlFor={`${formId}-${field}`} className="mb-1.5 block text-sm font-medium text-[var(--white)]">
        {fieldLabels[field]}
        {requiredFields.includes(field) ? <span className="text-[var(--cyan)]"> *</span> : null}
      </label>
      <input
        id={`${formId}-${field}`}
        name={field}
        type={type}
        autoComplete={autoComplete}
        value={formData[field]}
        onChange={(event) => updateField(field, event.target.value)}
        onBlur={() => handleBlur(field)}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={describedBy(field)}
        disabled={isSubmitting}
        className={`${inputClass} ${errors[field] ? "border-[#ef4444]" : "border-[var(--border)]"}`}
      />
      {errors[field] ? (
        <p
          id={`${formId}-${field}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {errors[field]}
        </p>
      ) : null}
    </div>
  );

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-12"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
        Contact
      </p>
      <h1 className="mt-3 max-w-[18ch] text-3xl leading-tight text-[var(--white)] sm:max-w-none sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
        Write to us and we will reply within a day.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-6">
          <h2 className="font-heading text-xl text-[var(--white)]">Details</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan)]" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Email</p>
                <a
                  href="mailto:info@slimcybertech.com"
                  className="break-all text-[var(--white)] hover:text-[var(--cyan)]"
                >
                  info@slimcybertech.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan)]" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Phone</p>
                <a href="tel:+256772581510" className="text-[var(--white)] hover:text-[var(--cyan)]">
                  +256 772 581510
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan)]" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Location</p>
                <p className="text-[var(--white)]">West Nile, Uganda</p>
              </div>
            </li>
          </ul>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--gradient)] px-5 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>

          <p className="mt-4 text-sm text-[var(--muted)]">We usually reply within a day.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={WHATSAPP_CHANNEL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--white)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
            <Link
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--white)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >
              <InstagramIcon className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-6 md:p-8">
          <h2 className="font-heading text-xl text-[var(--white)]">Send a message</h2>

          <AnimatePresence>
            {isSuccess ? (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                role="status"
                className="mt-4 flex items-center gap-2 rounded-xl border border-[#1f3f2a] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--white)]"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-[#10b981]" />
                Message sent. We will reply within a day.
              </motion.p>
            ) : null}
          </AnimatePresence>

          {submitError ? (
            <p
              role="alert"
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-[var(--surface)] px-4 py-3 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </p>
          ) : null}

          <form className="relative mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {renderInput("firstName", "text", "given-name")}
              {renderInput("lastName", "text", "family-name")}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {renderInput("email", "email", "email")}
              {renderInput("phone", "tel", "tel")}
            </div>

            <div>
              <label htmlFor={`${formId}-subject`} className="mb-1.5 block text-sm font-medium text-[var(--white)]">
                Subject <span className="text-[var(--cyan)]">*</span>
              </label>
              <select
                id={`${formId}-subject`}
                name="subject"
                value={formData.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                onBlur={() => handleBlur("subject")}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={describedBy("subject")}
                disabled={isSubmitting}
                className={`${inputClass} appearance-none ${errors.subject ? "border-[#ef4444]" : "border-[var(--border)]"}`}
              >
                <option value="">Select a service…</option>
                {CONTACT_SUBJECTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject ? (
                <p id={`${formId}-subject-error`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-budget`} className="mb-1.5 block text-sm font-medium text-[var(--white)]">
                Budget range
              </label>
              <select
                id={`${formId}-budget`}
                name="budget"
                value={formData.budget}
                onChange={(event) => updateField("budget", event.target.value)}
                disabled={isSubmitting}
                className={`${inputClass} appearance-none border-[var(--border)]`}
              >
                <option value="">Select budget range…</option>
                {budgets.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium text-[var(--white)]">
                Message <span className="text-[var(--cyan)]">*</span>
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={6}
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy("message", `${formId}-message-count`)}
                disabled={isSubmitting}
                className={`${inputClass} min-h-[140px] resize-y py-3 ${errors.message ? "border-[#ef4444]" : "border-[var(--border)]"}`}
              />
              <div className="mt-1.5 flex items-start justify-between gap-3">
                {errors.message ? (
                  <p id={`${formId}-message-error`} role="alert" className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <p id={`${formId}-message-count`} className={`shrink-0 text-xs ${countTone}`}>
                  {charCount} / 500
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--gradient)] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
