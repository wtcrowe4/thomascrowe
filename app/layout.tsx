import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });

const description =
  "Senior software engineer in Greenville, SC. Production web platforms, business-system integrations, self-hosted AI and the infrastructure underneath.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomascrowe.netlify.app"),
  title: "Thomas Crowe — Senior Software Engineer",
  description,
  openGraph: {
    title: "Thomas Crowe — Senior Software Engineer",
    description,
    url: "/",
    siteName: "Thomas Crowe",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Crowe — Senior Software Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* Netlify injects "\n<!-- This site is hosted on Netlify ... -->" into <head>
            on *.netlify.app production. The stray text node fails hydration (React #418),
            so drop it, and the comment, before React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=document.head;for(var n=h.firstChild;n;){var x=n.nextSibling;if((n.nodeType===3&&!n.nodeValue.trim())||(n.nodeType===8&&/Netlify/.test(n.nodeValue)))h.removeChild(n);n=x;}})();`,
          }}
        />
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
