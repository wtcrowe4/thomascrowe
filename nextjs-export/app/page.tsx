import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { GolfLab } from "@/components/GolfLab";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <GolfLab />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
