import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Volunteer from "./Volunteer";
import Ngo from "./Ngo";
import RegisterNgoPage from "./RegisterNgoPage";
import RegisterVolunteerPage from "./RegisterVolunteerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/register-ngo" element={<RegisterNgoPage />} />
        <Route
          path="/register-volunteer"
          element={<RegisterVolunteerPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}