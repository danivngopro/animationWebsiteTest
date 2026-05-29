"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

// ─── TODO: Wire up a server action or API route for actual email sending.
// The form currently validates client-side only. Backend integration is needed
// before this sends real emails. Never commit API keys or SMTP credentials.

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Replace with a real server action or API route.
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
    // The honeypot field (data._hp) should be checked server-side too.
    console.log("Form submitted (backend TODO):", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      // message intentionally omitted from log — treat as sensitive content
    });
    await new Promise((r) => setTimeout(r, 800)); // simulated delay
    setSubmitted(true);
    reset();
  };

  return (
    <SectionWrapper id="contact" className="bg-[var(--bg-base)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Contact"
          title="Let's build something."
          subtitle="Open to senior full-stack roles, AI-native product teams, and interesting engineering challenges."
          centered
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-4">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Whether you&rsquo;re hiring for a senior role, building an AI-first
              product team, or just want to talk architecture — reach out. I
              respond within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: LinkedInIcon, label: "LinkedIn", value: "daniel-ventura-dev", href: personal.linkedin },
                { icon: MapPin, label: "Location", value: personal.location, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-indigo-dim)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--accent-indigo)" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium transition-colors hover:text-white"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="h-full min-h-[300px] flex flex-col items-center justify-center gap-4 p-8 rounded-xl border text-center"
                style={{ background: "var(--bg-card)", borderColor: "rgba(99,102,241,0.25)" }}
              >
                <CheckCircle className="w-12 h-12" style={{ color: "var(--accent-indigo)" }} />
                <h3 className="text-lg font-semibold text-slate-100">Message received!</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Backend integration is pending — this was a client-side validation demo.
                  Reach out directly at{" "}
                  <a
                    href={`mailto:${personal.email}`}
                    className="underline"
                    style={{ color: "var(--accent-indigo)" }}
                  >
                    {personal.email}
                  </a>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs underline"
                  style={{ color: "var(--text-muted)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Honeypot — hidden from real users, traps bots */}
                <input
                  {...register("_hp")}
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 pointer-events-none w-0 h-0"
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-5">
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
                    rows={5}
                    placeholder="Tell me about the role or project..."
                    className={cn(inputCls(!!errors.message), "resize-none")}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: "var(--accent-indigo)" }}
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  ⚠ Backend TODO — form validates only. Email{" "}
                  <a
                    href={`mailto:${personal.email}`}
                    className="underline hover:text-slate-300"
                    style={{ color: "var(--accent-indigo)" }}
                  >
                    directly
                  </a>{" "}
                  in the meantime.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
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
      <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
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
      : "border border-white/8 bg-white/4 text-slate-100 focus:border-indigo-500/50 focus:ring-indigo-500/20 focus:bg-white/6"
  );
}
