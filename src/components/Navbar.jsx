import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Navbar(){

  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll);

  }, []);
  useEffect(() => {
  const updateHeight = () => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`
      );
    }
  };

  updateHeight();
  window.addEventListener("resize", updateHeight);
  window.addEventListener("scroll", updateHeight);

  return () => {
    window.removeEventListener("resize", updateHeight);
    window.removeEventListener("scroll", updateHeight);
  };
}, [scrolled]);

  return (

    <nav
  ref={navRef}
  className={`fixed top-0 w-full z-50 flex items-center justify-between px-10 transition-all duration-500 ease-in-out ${
    scrolled
      ? "bg-[#1A1614]/95 backdrop-blur-md shadow-lg py-3"
      : "bg-transparent py-5"
  }`}
>

      {/* LEFT (LOGO) */}

      <div className="flex items-center w-1/4">
        <Link to="/">
          <img src={logo} alt="The Only Place" className="h-12" />
        </Link>
      </div>

      {/* CENTER NAVIGATION */}

      <div className="flex justify-center gap-12 text-white text-lg w-2/4 font-cinzel tracking-wide whitespace-nowrap">

        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About Us</Link>
        <Link className="nav-link" to="/menu">Menu</Link>
        <Link className="nav-link" to="/media">Media</Link>
        <Link className="nav-link" to="/reservations">Reservations</Link>
        <Link className="nav-link" to="/contact">Contact</Link>

      </div>

      {/* RIGHT SOCIALS */}

      <div className="flex items-center gap-4 w-1/4 justify-end">

        <a href="https://facebook.com" target="_blank" className="text-white hover:text-amber-400 transition">
          <FaFacebookF size={18}/>
        </a>

        <a href="https://instagram.com" target="_blank" className="text-white hover:text-amber-400 transition">
          <FaInstagram size={18}/>
        </a>

        <a href="https://wa.me/123456789" target="_blank" className="text-white hover:text-amber-400 transition">
          <FaWhatsapp size={18}/>
        </a>

      </div>

    </nav>

  )

}