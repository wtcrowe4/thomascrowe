import Nav from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/Ticker";
import About from "@/components/about";
import Projects from "@/components/projects";
import { GolfLab } from "@/components/GolfLab";
import { LLMWork } from "@/components/LLMWork";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <GolfLab />
      <LLMWork />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
