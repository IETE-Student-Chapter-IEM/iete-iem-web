import Hero from "../components/homepage/Hero";
import About from "../components/homepage/About";
import Team from "../components/homepage/Team";
import Footer from "../components/Footer";
import ActivitiesTimeline from "../components/homepage/ActivitiesTimeline";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ActivitiesTimeline />
      <Team />
      <Footer />
    </>
  );
}
