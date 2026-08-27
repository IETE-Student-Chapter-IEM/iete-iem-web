import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="bg-amber-600">Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
