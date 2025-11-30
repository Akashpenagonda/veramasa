import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industryId" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}