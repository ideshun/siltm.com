import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { I18nProvider } from "@/lib/i18n";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { Intro } from "@/components/Intro";

const SITE_TITLE = "SILTM — Super Intelligence Long-Term Memory";
const SITE_DESC =
  "Long-term memory infrastructure for AI agents. Your AI remembers.";

export const metadata: Metadata = {
  metadataBase: new URL("https://siltm.com"),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: ["SILTM", "AI agent", "long-term memory", "super intelligence", "memory infrastructure"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "https://siltm.com",
    siteName: "SILTM",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SILTM — Super Intelligence Long-Term Memory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/og.png"],
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
        <I18nProvider>
          <LenisProvider>
            <Intro />
            <Cursor />
            <Nav />
            {children}
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "SILTM",
                  alternateName: "Super Intelligence Long-Term Memory",
                  url: "https://siltm.com",
                  description: SITE_DESC,
                }),
              }}
            />
          </LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
