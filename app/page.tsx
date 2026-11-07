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

export default function Page() {
  return (
    <>
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
