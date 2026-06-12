import { useEffect, useState, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import steak from "../assets/steak.webp";
import steak2 from "../assets/steak2.jpeg";
import chickSteak from "../assets/chick_steak.jpeg";
import lamb from "../assets/lamb.jpeg";
import lasagne from "../assets/lasagne.jpeg";
import salad from "../assets/salad.jpeg";
import sandwich from "../assets/sandwich.jpeg";
import garlicBread from "../assets/garlic_bread.jpeg";
import vegetarian from "../assets/vegetarian.jpeg";
import pic from "../assets/pic.jpeg";

/* ── Gallery data ─────────────────────────────────────────────────────────
   `tall` controls how much vertical room a tile gets in the masonry flow. */
const photos = [
  { src: steak,       title: "Charbroiled Steak",     tag: "From the Grill", tall: true },
  { src: salad,       title: "Garden Fresh Salads",   tag: "Starters" },
  { src: lasagne,     title: "House-made Lasagne",    tag: "Oven Bakes" },
  { src: lamb,        title: "Mini Lamb Chops",       tag: "From the Grill", tall: true },
  { src: garlicBread, title: "Cheesy Garlic Bread",   tag: "Starters" },
  { src: steak2,      title: "Filet Mignon",          tag: "From the Grill" },
  { src: sandwich,    title: "Toasted Steak Sandwich", tag: "Classics", tall: true },
  { src: chickSteak,  title: "Chicken Steak Sizzler", tag: "Sizzlers" },
  { src: vegetarian,  title: "Vegetable Au Gratin",   tag: "Vegetarian" },
  { src: pic,         title: "An Evening at OP's",    tag: "The Restaurant", tall: true },
];

export default function Media() {
  const [lightbox, setLightbox] = useState(null); // index | null

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i + photos.length - 1) % photos.length),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => (i + 1) % photos.length),
    []
  );

  /* Keyboard navigation + scroll lock while the lightbox is open */
  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <div className="min-h-screen bg-[#15110d] text-[#E3D5CA]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        className="pt-40 pb-16 px-6 text-center"
        style={{
          background:
            "radial-gradient(80% 120% at 50% 0%, #241c14 0%, #15110d 70%)",
        }}
      >
        <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.5em] uppercase mb-5 fade-up">
          A Feast for the Eyes
        </p>
        <h1
          className="font-[Cinzel] font-bold text-white leading-none fade-up"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            letterSpacing: "0.03em",
            animationDelay: "0.15s",
          }}
        >
          GALLERY
        </h1>
        <div
          className="flex items-center justify-center gap-5 mt-6 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="block w-12 md:w-20 h-px bg-white/30" />
          <span className="font-[Cinzel] text-white/75 text-xs tracking-[0.38em] uppercase">
            Straight from our kitchen
          </span>
          <span className="block w-12 md:w-20 h-px bg-white/30" />
        </div>
      </header>

      {/* ── Masonry grid ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-28">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <button
              key={photo.title}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block w-full mb-5 break-inside-avoid overflow-hidden rounded-xl border border-[#3D3530] bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
              style={{ background: "transparent" }}
              aria-label={`View ${photo.title}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                  photo.tall ? "h-[28rem]" : "h-72"
                }`}
              />

              {/* Hover scrim + caption */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.25) 55%, transparent 100%)",
                }}
              >
                <p className="font-[Cinzel] text-[#f0a81e] text-[0.62rem] tracking-[0.32em] uppercase mb-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.tag}
                </p>
                <p className="font-[Cinzel] text-white text-lg leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {photo.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 animate-fade"
          style={{ background: "rgba(10,7,4,0.94)", backdropFilter: "blur(8px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={photos[lightbox].title}
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-10 grid place-items-center w-11 h-11 rounded-full !bg-white/10 hover:!bg-white/20 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
          >
            <FaTimes size={16} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-8 z-10 grid place-items-center w-11 h-11 rounded-full !bg-white/10 hover:!bg-white/20 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
          >
            <FaChevronLeft size={15} />
          </button>

          {/* Image + caption */}
          <figure
            className="max-w-5xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].title}
              className="mx-auto max-h-[74vh] w-auto rounded-xl shadow-2xl object-contain animate-fade"
            />
            <figcaption className="mt-5">
              <p className="font-[Cinzel] text-[#f0a81e] text-[0.65rem] tracking-[0.35em] uppercase mb-1">
                {photos[lightbox].tag}
              </p>
              <p className="font-[Cinzel] text-white text-xl">
                {photos[lightbox].title}
              </p>
              <p className="text-[#E3D5CA]/50 text-xs mt-2 tracking-widest">
                {lightbox + 1} / {photos.length}
              </p>
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 md:right-8 z-10 grid place-items-center w-11 h-11 rounded-full !bg-white/10 hover:!bg-white/20 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
          >
            <FaChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}