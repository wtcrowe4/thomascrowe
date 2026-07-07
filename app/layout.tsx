import type { Metadata } from "next";
import "./globals.css";

const description =
  "Full-stack developer and technical ops lead in Greenville, SC. Production LLM agents, e-commerce infrastructure, and browser-native 3D.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomascrowe.netlify.app"),
  title: "Thomas Crowe — Full-Stack Developer & LLM Engineer",
  description,
  openGraph: {
    title: "Thomas Crowe — Full-Stack Developer & LLM Engineer",
    description,
    url: "/",
    siteName: "Thomas Crowe",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Crowe — Full-Stack Developer & LLM Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  );
}
