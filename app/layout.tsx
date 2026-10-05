import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { Intro } from "@/components/Intro";

export const metadata: Metadata = {
  metadataBase: new URL("https://siltm.com"),
  title: "SILTM — Super Intelligence Long-Term Memory",
  description:
    "Long-term memory infrastructure for AI agents. Your AI remembers. 让智能，记得住。",
  keywords: ["SILTM", "AI agent", "long-term memory", "super intelligence", "memory infrastructure"],
  openGraph: {
    title: "SILTM — Your AI remembers.",
    description: "Long-term memory infrastructure for AI agents. 让智能，记得住。",
    url: "https://siltm.com",
    siteName: "SILTM",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Intro />
          <Cursor />
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
