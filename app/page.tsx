import Nav from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/Ticker";
import About from "@/components/about";
import { Casebook } from "@/components/Casebook";
import Projects from "@/components/projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { GolfLab } from "@/components/GolfLab";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thomas Crowe",
  jobTitle: "Senior Software Engineer",
  url: "https://thomascrowe.netlify.app",
  address: { "@type": "PostalAddress", addressLocality: "Greenville", addressRegion: "SC", addressCountry: "US" },
  sameAs: ["https://github.com/wtcrowe4", "https://www.linkedin.com/in/wthomascrowe"],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Nav />
      <Hero />
      <Ticker />
      <Casebook />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GolfLab />
      <Contact />
      <Footer />
    </>
  );
}
