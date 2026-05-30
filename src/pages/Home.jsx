import { useState, useEffect } from "react";
import steak from "../assets/steak.webp";
import food1 from "../assets/lasagne.jpeg";
import food2 from "../assets/steak2.jpeg";
import { Link } from "react-router-dom";

export default function Home() {
  const slides = [steak, food1, food2];
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1A1614] text-[#E3D5CA]">

      {/* ---------- HERO SECTION ---------- */}
      <section className="relative h-[99vh] overflow-hidden">

        {/* Images */}
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`
              absolute w-full h-full object-cover
              transition-opacity duration-1000
              animate-[slowZoom_20s_ease-in-out_infinite]
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

        {/* Top gradient */}
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Content (re-animates each slide) */}
        <div
          key={current}
          className="relative flex flex-col items-center justify-center h-full text-center px-6"
        >
          <h1 className="fade-up text-6xl md:text-8xl font-[Cinzel] mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            The Only Place
          </h1>

          <p
            className="fade-up text-lg text-gray-100 mb-8 drop-shadow-md"
            style={{ animationDelay: "0.2s" }}
          >
            Legendary Steaks. Timeless Atmosphere.
          </p>

          <Link
            to="/reservations"
            className="fade-up bg-red-700 hover:bg-red-600 px-8 py-3 rounded-lg transition"
            style={{ animationDelay: "0.4s" }}
          >
            Reserve Table
          </Link>
        </div>

       
        {/* ---------- PROGRESS BAR (TOP) ---------- */}
<div className="absolute top-0 left-0 w-full h-[4px] bg-white/20">
  <div
    key={current}
    className="h-full bg-white w-0 animate-[progress_4s_linear_forwards]"
  />
</div>

        
        {/* ---------- DOT INDICATORS ---------- */}
{/* ---------- DOT INDICATORS ---------- */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
  {slides.map((_, index) => (
    <button
  key={index}
  onClick={() => setCurrent(index)}
  className={`
    w-3 h-3 rounded-full transition-all duration-300
    border-none outline-none
    ${index === current ? "!bg-gray-400 scale-110" : "!bg-white"}
  `}
/>
  ))}
</div>

      </section>

      {/* ---------- WELCOME SECTION ---------- */}
      <section className="py-24 px-8 bg-[#F5F1ED] text-black">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="flex gap-6 justify-center">
            <img src={food1} className="w-48 h-64 object-cover rounded-lg shadow-lg" />
            <img src={food2} className="w-56 h-72 object-cover rounded-lg shadow-lg -mt-10" />
          </div>

          <div>
            <h3 className="text-lg text-red-700 mb-2">Welcome To</h3>
            <h2 className="text-4xl font-[Cinzel] mb-4">The Only Place</h2>
            <p className="text-gray-700 leading-relaxed">
              A modern steakhouse offering a refined dining experience with
              premium cuts, handcrafted dishes, and an atmosphere designed
              for unforgettable evenings. We focus on quality, sustainability,
              and delivering a truly elevated dining experience.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}