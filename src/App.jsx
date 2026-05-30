import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Media from "./pages/Media.jsx";
import Reservations from "./pages/Reservations.jsx";
import Contact from "./pages/Contact.jsx";
import ReservationConfirmed from "./pages/ReservationConfirmed";
import InpersonOrder from "./pages/InpersonOrder";

export default function App(){

  return(
    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/media" element={<Media/>}/>
        <Route path="/reservations" element={<Reservations/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation-confirmed" element={<ReservationConfirmed />} />
        <Route path="/order" element={<InpersonOrder />} />

      </Routes>

    </BrowserRouter>
  )
}