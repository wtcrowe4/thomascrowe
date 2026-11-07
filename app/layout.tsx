import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const description =
  "Full-stack developer and technical operations lead in Greenville, SC. Production web platforms, business-system integrations, self-hosted AI, and the infrastructure underneath.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomascrowe.netlify.app"),
  title: "Thomas Crowe — Full-Stack Developer & Technical Operations Lead",
  description,
  openGraph: {
    title: "Thomas Crowe — Full-Stack Developer & Technical Operations Lead",
    description,
    url: "/",
    siteName: "Thomas Crowe",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Crowe — Full-Stack Developer & Technical Operations Lead",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Netlify injects "\n<!-- This site is hosted on Netlify ... -->" into <head>
            on *.netlify.app production. The stray text node fails hydration (React #418),
            so drop it, and the comment, before React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=document.head;for(var n=h.firstChild;n;){var x=n.nextSibling;if((n.nodeType===3&&!n.nodeValue.trim())||(n.nodeType===8&&/Netlify/.test(n.nodeValue)))h.removeChild(n);n=x;}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap"
          rel="stylesheet"
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
