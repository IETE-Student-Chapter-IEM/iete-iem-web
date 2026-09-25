import Navbar from "../components/NavBar";
import Hero from "../components/homepage/Hero";
import About from "../components/homepage/About";
import Team from "../components/homepage/Team";
import Footer from "../components/Footer";
import ActivitiesTimeline from "../components/homepage/ActivitiesTimeline";
import Gallery from "../components/homepage/Gallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="scroll-mt-[76px]">
          <About />
        </section>

        {/* Activities Section */}
        <section id="activities" className="scroll-mt-[76px]">
          <ActivitiesTimeline />
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="scroll-mt-[76px]">
          <Gallery />
        </section>

        {/* Team Section */}
        <section id="team" className="scroll-mt-[76px]">
          <Team />
        </section>
      </main>

      {/* Contact Section */}
      <footer id="contact" className="scroll-mt-[76px]">
        <Footer />
      </footer>
    </div>
  );
}
