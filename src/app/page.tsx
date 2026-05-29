import { ClientSpaceBackground } from "@/components/three/ClientSpaceBackground";
import { IntroOverlay } from "@/components/sections/IntroOverlay";
import { SlideSidebar } from "@/components/layout/SlideSidebar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { AIWorkflow } from "@/components/sections/AIWorkflow";
import { Security } from "@/components/sections/Security";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

// SlideSidebar is a client component that manages:
//   • Intersection Observer to track active section
//   • Right-side dot navigation with hover labels
//   • Autoplay with circular progress ring
export default function Home() {
  return (
    <>
      {/* Full-screen intro animation — captured scroll, exits on completion */}
      <IntroOverlay />

      {/* Fixed galaxy canvas behind all content */}
      <ClientSpaceBackground />

      {/* Fixed right-side navigation sidebar */}
      <SlideSidebar />

      {/* All sections are .slide-section (height: 100dvh, scroll-snap-align: start) */}
      <Hero />
      <About />
      <Experience />
      <Skills />
      <AIWorkflow />
      <Security />
      <Projects />
      <Education />
      <Contact />

      {/* Footer sits below the last snap section, reachable by final scroll */}
      <Footer />
    </>
  );
}
