"use client";

import dynamic from "next/dynamic";

// Thin client-component wrapper so ssr:false is valid (page.tsx is a Server Component).
const SpaceBackground = dynamic(
  () => import("./SpaceBackground").then((m) => m.SpaceBackground),
  { ssr: false }
);

export function ClientSpaceBackground() {
  return <SpaceBackground />;
}
