"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "motion/react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

// EmailJS setup — add these to .env.local:
//   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
//   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
// Template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}

const EJS_SERVICE =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_8tdq6th";
const EJS_TEMPLATE =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_66s53s7";
const EJS_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "g8dY4TxBVQ1sFIv7e";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setSendError(null);
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        { publicKey: EJS_KEY },
      );
      setSubmitted(true);
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSendError(`Failed to send (${msg}) — please email directly.`);
    }
  };

  return (
    <div
      id="contact"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-[1400px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — big CTA + contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              Contact
            </p>
            <h2
              className="font-black leading-[1.0] tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 7rem)",
                letterSpacing: "-0.04em",
              }}
            >
              <span className="text-gradient-subtle">Let&rsquo;s build</span>
              <br />
              <span className="text-gradient-indigo">something.</span>
            </h2>

            <p
              className="mt-6 text-base leading-relaxed max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to senior full-stack roles, AI-native product teams, and
              interesting engineering challenges. I respond within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: personal.email,
                  href: `mailto:${personal.email}`,
                },
                {
                  icon: LinkedInIcon,
                  label: "LinkedIn",
                  value: "daniel-v-03b663152",
                  href: personal.linkedin,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: personal.location,
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-indigo-dim)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--accent-indigo)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm font-medium transition-colors hover:text-white"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-5 p-10 rounded-2xl border text-center"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(99,102,241,0.25)",
                }}
              >
                <CheckCircle
                  className="w-12 h-12"
                  style={{ color: "var(--accent-indigo)" }}
                />
                <h3 className="text-lg font-bold text-slate-100">
                  Message received!
                </h3>
                <p
                  className="text-sm max-w-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Thanks for reaching out. I&rsquo;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs underline"
                  style={{ color: "var(--text-muted)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                {/* Honeypot */}
                <input
                  {...register("_hp")}
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 pointer-events-none w-0 h-0"
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Daniel Ventura"
                      className={inputCls(!!errors.name)}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                      className={inputCls(!!errors.email)}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject?.message}>
                  <input
                    {...register("subject")}
                    type="text"
                    placeholder="Senior Full-Stack opportunity"
                    className={inputCls(!!errors.subject)}
                  />
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell me about the role or project..."
                    className={cn(inputCls(!!errors.message), "resize-none")}
                  />
                </Field>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "var(--accent-indigo)" }}
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending…" : "Send Message"}
                </motion.button>

                {sendError && (
                  <div
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                    style={{
                      background: "rgba(248,113,113,0.08)",
                      color: "#f87171",
                      border: "1px solid rgba(248,113,113,0.2)",
                    }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {sendError}
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "#f87171" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200",
    "placeholder:text-slate-600",
    "focus:ring-1",
    hasError
      ? "border border-red-500/40 bg-red-500/5 focus:ring-red-500/30 text-red-200"
      : "border border-white/8 bg-white/4 text-slate-100 focus:border-indigo-500/50 focus:ring-indigo-500/20 focus:bg-white/6",
  );
}
