"use client";

import { useState } from "react";
import TerminalIntro from "@/components/TerminalIntro";
import ThemeScroller from "@/components/ThemeScroller";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DreamRole from "@/components/DreamRole";
import Projects from "@/components/Projects";
import Ship from "@/components/Ship";
import Stack from "@/components/Stack";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <TerminalIntro onComplete={() => setIntroDone(true)} />}

      {introDone && (
        <>
          <ThemeScroller />
          <Nav />
          <main>
            <Hero />
            <About />
            <DreamRole />
            <Projects />
            <Ship />
            <Stack />
            <Credentials />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
