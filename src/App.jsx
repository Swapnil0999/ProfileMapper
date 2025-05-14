import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
