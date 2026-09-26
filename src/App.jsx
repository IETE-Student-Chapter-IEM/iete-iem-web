import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import JoinUs from "./pages/JoinUs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* <PageBackground> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join-us" element={<JoinUs />} />
      </Routes>
      {/* </PageBackground> */}
    </BrowserRouter>
  );
}

export default App;
