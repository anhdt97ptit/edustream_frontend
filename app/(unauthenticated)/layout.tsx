import RadialBackground from "@/components/ui/shared/Background/RadialBackground";
import React from "react";

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default async function HomeLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Reusable background component */}
      <RadialBackground />

      {/* Content wrapper stays above the background */}
      <div className="relative mx-auto w-full max-w-md">{children}</div>
    </main>
  );
}
