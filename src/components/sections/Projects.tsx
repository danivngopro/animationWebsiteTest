import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

// Projects section.
// Cards are marked TODO until real project details are added to lib/data.ts.
// Inspired by 21st.dev project card hover-gradient patterns.
export function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-[var(--bg-base)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Projects"
          title="What I've built."
          subtitle="Production systems, AI tooling, infrastructure. Detailed case studies coming — add specifics to lib/data.ts."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
