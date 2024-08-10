import React from "react";
import Hero from "./Hero/Hero";
import Collaborators from "./Collaborators/Collaborators";
import Infos from "./Infos/Infos";
import Services from "./Services/Services";
import Testimonials from "./Testimonials/Testimonials";

function Home() {
  return (
    <main id="home">
      <Hero />
      <Collaborators />
      <Infos />
      <Services />
      <Testimonials />
    </main>
  );
}

export default Home;
