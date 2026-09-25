import Navbar from "../components/NavBar";
import Hero from "../components/homepage/Hero";
import About from "../components/homepage/About";
import Team from "../components/homepage/Team";
import Footer from "../components/Footer";
import ActivitiesTimeline from "../components/homepage/ActivitiesTimeline";
import Gallery from "../components/homepage/Gallery"; // Import your Gallery component here

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">


      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="scroll-mt-[80px]">
          <About />
        </section>

        {/* Activities & Events Section */}
        <section id="activities" className="scroll-mt-[80px]">
          <div id="events">
            <ActivitiesTimeline />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="scroll-mt-[80px]">
          <Gallery />
        </section>

        {/* Team Section */}
        <section id="team" className="scroll-mt-[80px]">
          <Team />
        </section>
      </main>

      {/* Footer & Contact Section */}
      <footer id="contact" className="scroll-mt-[80px]">
        <div id="join">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
