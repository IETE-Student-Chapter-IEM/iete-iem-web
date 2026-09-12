import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import PageBackground from "./ui/PageBackground";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* <PageBackground> */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Future pages */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/events" element={<EventsPage />} /> */}
        {/* <Route path="/team" element={<TeamPage />} /> */}
      </Routes>
      {/* </PageBackground> */}
    </BrowserRouter>
  );
}

export default App;
