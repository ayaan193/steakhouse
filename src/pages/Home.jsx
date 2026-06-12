import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import steak from "../assets/steak.webp";
import food1 from "../assets/lasagne.jpeg";
import food2 from "../assets/steak2.jpeg";
import lamb from "../assets/lamb.jpeg";
import burger from "../assets/pic.jpeg";
import chickSteak from "../assets/chick_steak.jpeg";

const slides = [steak, food1, food2];

const signatures = [
  { img: steak, name: "Charbroiled Steak", tag: "From the Grill" },
  { img: lamb, name: "Mini Lamb Chops", tag: "House Favourite" },
  { img: chickSteak, name: "Chicken Steak Sizzler", tag: "Sizzlers" },
  { img: food1, name: "House-made Lasagne", tag: "Oven Bakes" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  /* Auto-advance hero slides */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#15110d] text-[#E3D5CA]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] overflow-hidden">

        {/* Slides */}
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`
              absolute w-full h-full object-cover
              transition-opacity duration-1000
              animate-[slowZoom_20s_ease-in-out_infinite]
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Scrim stack */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute top-0 w-full h-44 bg-gradient-to-b from-black/60 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background:
              "linear-gradient(0deg, rgba(8,6,4,0.85), rgba(8,6,4,0.3) 55%, transparent)",
          }}
        />

        {/* Content (re-animates each slide) */}
        <div
          key={current}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <p className="fade-up font-[Cinzel] text-[#f0a81e] text-[0.65rem] md:text-xs tracking-[0.5em] uppercase mb-5">
            Since 1965 · Museum Road, Bangalore
          </p>

          <h1
            className="fade-up font-[Cinzel] font-bold text-white leading-none mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            style={{
              fontSize: "clamp(2.6rem, 9vw, 7rem)",
              letterSpacing: "0.03em",
              animationDelay: "0.15s",
            }}
          >
            The Only Place
          </h1>

          <div
            className="fade-up flex items-center gap-4 md:gap-5 mb-9"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="block w-10 md:w-20 h-px bg-white/40" />
            <p className="font-[Cinzel] text-white/85 text-[0.62rem] md:text-sm tracking-[0.3em] md:tracking-[0.38em] uppercase whitespace-nowrap">
              Legendary Steaks · Timeless Atmosphere
            </p>
            <span className="block w-10 md:w-20 h-px bg-white/40" />
          </div>

          <div
            className="fade-up flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              to="/reservations"
              className="inline-flex items-center justify-center font-[Cinzel] font-semibold text-sm tracking-wider rounded-full px-9 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#f0a81e",
                color: "#241400",
                boxShadow: "0 8px 26px rgba(240,168,30,0.36)",
              }}
            >
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center font-[Cinzel] text-sm tracking-wider rounded-full px-9 py-3.5 border border-white/40 text-white hover:border-[#f0a81e] hover:text-[#f0a81e] transition-all duration-200"
            >
              View the Menu
            </Link>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/20 z-20">
          <div
            key={current}
            className="h-full bg-[#f0a81e] w-0 animate-[progress_4s_linear_forwards]"
          />
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300 border-none outline-none p-0
                ${index === current ? "!bg-[#f0a81e] scale-125" : "!bg-white/60"}
              `}
            />
          ))}
        </div>
      </section>

      {/* ── WELCOME ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-14 items-center">

          <div className="flex gap-4 sm:gap-6 justify-center order-2 md:order-1">
            <img
              src={food1}
              alt="House-made lasagne"
              className="w-[40%] max-w-[12rem] sm:w-48 h-52 sm:h-64 object-cover rounded-xl shadow-2xl border border-[#3D3530]"
            />
            <img
              src={food2}
              alt="Filet mignon"
              className="w-[46%] max-w-[14rem] sm:w-56 h-60 sm:h-72 object-cover rounded-xl shadow-2xl border border-[#3D3530] -mt-6 sm:-mt-10"
            />
          </div>

          <div className="order-1 md:order-2 text-center md:text-left">
            <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-4">
              Welcome To
            </p>
            <h2 className="font-[Cinzel] text-3xl md:text-4xl text-white mb-6 leading-snug">
              The Only Place
            </h2>
            <p className="leading-relaxed text-[#E3D5CA]/85 mb-5">
              Bangalore&apos;s original American steakhouse — serving steaks,
              burgers and apple pie since 1965. What began as a small stall near
              Rex Theatre is now a Museum Road institution, with three
              generations of regulars returning for the same lip-smacking food.
            </p>
            <p className="leading-relaxed text-[#E3D5CA]/85 mb-8">
              Chequered tablecloths, charbroiled cuts and an atmosphere that
              hasn&apos;t lost a beat in sixty years.
            </p>
            <Link
              to="/about"
              className="inline-block font-[Cinzel] text-xs tracking-[0.25em] uppercase text-[#f0a81e] hover:text-white transition-colors duration-200"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 border-y border-[#3D3530] bg-[#1A1614]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-4">
              From Our Kitchen
            </p>
            <h2 className="font-[Cinzel] text-3xl md:text-4xl text-white">
              Signature Dishes
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {signatures.map((dish) => (
              <Link
                key={dish.name}
                to="/menu"
                className="group relative overflow-hidden rounded-xl border border-[#3D3530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-52 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.15) 55%, transparent 100%)",
                  }}
                >
                  <p className="font-[Cinzel] text-[#f0a81e] text-[0.55rem] md:text-[0.62rem] tracking-[0.28em] uppercase mb-1">
                    {dish.tag}
                  </p>
                  <p className="font-[Cinzel] text-white text-sm md:text-base leading-snug">
                    {dish.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVE CTA BAND ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <img
          src={burger}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,9,6,0.82)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-5">
            Lunch 12 – 4:30 PM · Dinner from 7 PM
          </p>
          <h2 className="font-[Cinzel] text-3xl md:text-5xl text-white mb-8 leading-snug">
            Your Table Is Waiting
          </h2>
          <Link
            to="/reservations"
            className="inline-flex items-center justify-center font-[Cinzel] font-semibold text-sm tracking-wider rounded-full px-10 py-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#f0a81e",
              color: "#241400",
              boxShadow: "0 8px 26px rgba(240,168,30,0.36)",
            }}
          >
            Reserve Your Table
          </Link>
          <p className="mt-6 text-sm text-[#E3D5CA]/70">
            or call{" "}
            <a href="tel:+919986011112" className="text-[#f0a81e] hover:underline">
              +91 99860 11112
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}