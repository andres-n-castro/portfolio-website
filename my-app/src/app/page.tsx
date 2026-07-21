"use client"
import NavBar from "../components/Navbar"
import Home from "../components/Home"
import About from "../components/About"
import Work from "../components/Work"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Contact from "../components/Contact"

export default function Page() {
  return (
    <div className="">

      <NavBar/>

      <main>
        <section id="home" className="min-h-screen">
          <Home/>
        </section>


        <section id="about" className="min-h-screen">
          <About/>
        </section>


        <section id="career" className="min-h-screen">
          <Work/>
        </section >


        <section id="projects" className="min-h-screen">
          <Projects/>
        </section >


        <section id="skills" className="min-h-screen">
          <Skills/>
        </section >


        <section id="contact" className="min-h-screen">
          <Contact/>
        </section >

      </main>

    </div>
  );
}