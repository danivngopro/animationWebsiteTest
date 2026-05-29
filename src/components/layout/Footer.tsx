import { personal } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {year} {personal.name} · Built with Next.js, Motion & Three.js
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-slate-100"
            style={{ color: "var(--text-muted)" }}
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-slate-100"
            style={{ color: "var(--text-muted)" }}
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="transition-colors hover:text-slate-100"
            style={{ color: "var(--text-muted)" }}
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
