import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WebTeamStrip } from "@/components/layout/WebTeamStrip";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/data";
import "./globals.css";

/* Editorial serif for display, neutral grotesk for everything else. */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.instituteShort}`,
    template: `%s — SAC, ${site.instituteShort}`,
  },
  description: site.description,
  keywords: [
    "SAC MNNIT",
    "Student Activity Centre",
    "MNNIT Allahabad",
    "MNNIT clubs",
    "Prayagraj",
    "college clubs",
    "Avishkar",
    "Culrav",
    "CodeSangam",
  ],
  authors: [{ name: "Student Activity Centre, MNNIT Allahabad" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: `${site.name}, ${site.instituteShort}`,
    title: `${site.name} — ${site.instituteShort}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.instituteShort}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Applies the stored theme before first paint — prevents a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <WebTeamStrip />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
