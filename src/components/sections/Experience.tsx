import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-[var(--bg-base)]">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          label="Experience"
          title="Where I've shipped."
          subtitle="From commercial product delivery to military-grade internal systems — always full-stack, always end-to-end."
        />

        <div>
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
