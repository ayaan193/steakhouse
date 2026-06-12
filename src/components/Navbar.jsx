import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import { FaFacebookF, FaInstagram, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/menu", label: "Menu" },
  { to: "/media", label: "Media" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { icon: FaFacebookF, href: "https://www.facebook.com/TheOnlyPlaceBangalore/", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/theonlyplace_museumroad/", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/919986011112", label: "WhatsApp" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  /* Shrink / tint navbar on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Keep --navbar-height in sync (used by Menu page sticky nav) */
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navRef.current.offsetHeight}px`
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

  /* Close drawer on route change */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-5 md:px-10 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-[#1A1614]/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        {/* LEFT — LOGO */}
        <div className="flex items-center md:w-1/4">
          <Link to="/" aria-label="The Only Place — Home">
            <img src={logo} alt="The Only Place" className="h-10 md:h-12" />
          </Link>
        </div>

        {/* CENTER — DESKTOP NAVIGATION */}
        <div className="hidden md:flex justify-center gap-8 lg:gap-12 text-white text-base lg:text-lg w-2/4 font-cinzel tracking-wide whitespace-nowrap">
          {links.map((l) => (
            <Link key={l.to} className="nav-link" to={l.to}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* RIGHT — DESKTOP SOCIALS */}
        <div className="hidden md:flex items-center gap-4 w-1/4 justify-end">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white hover:text-amber-400 transition"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* MOBILE — HAMBURGER */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden grid place-items-center w-11 h-11 rounded-full !bg-white/10 text-white hover:!bg-white/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {/* MOBILE — FULL-SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-7 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(16, 12, 9, 0.97)",
          backdropFilter: "blur(10px)",
        }}
        aria-hidden={!open}
      >
        {links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={`font-cinzel text-xl tracking-[0.2em] uppercase transition-all duration-300 ${
              location.pathname === l.to ? "text-[#f0a81e]" : "text-white"
            } ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
          >
            {l.label}
          </Link>
        ))}

        <div
          className={`flex items-center gap-6 mt-6 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid place-items-center w-11 h-11 rounded-full border border-white/20 text-white hover:text-[#f0a81e] hover:border-[#f0a81e]/60 transition"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}