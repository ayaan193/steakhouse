import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaUtensils } from "react-icons/fa";

import steak from "../assets/steak.webp";
import burger from "../assets/pic.jpeg";
import lamb from "../assets/lamb.jpeg";

/* ── Small hook: fade sections in as they scroll into view ──────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Story milestones ────────────────────────────────────────────────────── */
const milestones = [
  {
    year: "1965",
    title: "A Stall Near Rex Theatre",
    text: "Haroon Sait begins selling burgers and apple pie from a small stall near Rex Theatre on Brigade Road — feeding homesick Americans, Europeans and Peace Corps volunteers who found Bangalore's spicy fare a challenge.",
  },
  {
    year: "The Name",
    title: "Christened by a Customer",
    text: "A Japanese regular remarks that this is 'the only place' in town for genuine continental American food. The name sticks — along with the famous lips logo and the tagline 'lip-smacking food'.",
  },
  {
    year: "Brigade Road",
    title: "From Kiosk to Diner",
    text: "The burger kiosk grows into a proper 30-table diner, complete with red-and-white chequered tablecloths — a slice of quintessential America in the heart of Bangalore.",
  },
  {
    year: "Today",
    title: "13, Museum Road",
    text: "Now a 150-seater on Museum Road with park-bench seating, alfresco dining under Mangalorean red-tiled roofs, and three generations of Bangaloreans returning for the same steaks, burgers and apple pie.",
  },
];

const stats = [
  { value: "1965", label: "Established" },
  { value: "60+", label: "Years of Service" },
  { value: "150", label: "Seats on Museum Rd" },
  { value: "3", label: "Generations of Guests" },
];

export default function About() {
  return (
    <div className="bg-[#15110d] text-[#E3D5CA]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={steak}
          alt="Sizzling steak at The Only Place"
          className="absolute inset-0 h-full w-full object-cover animate-[heroZoom_24s_ease-in-out_infinite]"
        />

        {/* Scrim stack */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div
          className="absolute inset-x-0 top-0 h-52 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(8,6,4,0.7), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "55%",
            background:
              "linear-gradient(0deg, #15110d, rgba(21,17,13,0.45) 60%, transparent)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.5em] uppercase mb-6 fade-up">
            Since 1965
          </p>
          <h1
            className="font-[Cinzel] font-bold text-white leading-none fade-up"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              letterSpacing: "0.02em",
              textShadow: "0 4px 36px rgba(0,0,0,0.6)",
              animationDelay: "0.15s",
            }}
          >
            OUR STORY
          </h1>
          <div className="flex items-center gap-5 mt-6 fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="block w-12 md:w-20 h-px bg-white/40" />
            <span className="font-[Cinzel] text-white/85 text-xs md:text-sm tracking-[0.38em] uppercase">
              Bangalore&apos;s Original Steakhouse
            </span>
            <span className="block w-12 md:w-20 h-px bg-white/40" />
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-4">
              The Legend of Museum Road
            </p>
            <h2 className="font-[Cinzel] text-3xl md:text-4xl text-white mb-6 leading-snug">
              The Only Place That
              <br /> Earned Its Name
            </h2>
            <p className="leading-relaxed text-[#E3D5CA]/85 mb-5">
              In the early sixties, when Bangalore had nowhere to find a proper
              steak or a real American burger, Haroon Sait — together with his
              American wife Alice — started cooking for the foreign guests who
              stayed at his family&apos;s hotel. What began as a few breakfast
              plates for homesick travellers grew into the city&apos;s first and,
              quite literally, only continental American restaurant.
            </p>
            <p className="leading-relaxed text-[#E3D5CA]/85">
              Six decades on, the chequered tablecloths remain, the apple pie is
              still the reigning queen of the dessert menu, and the steaks still
              draw queues down Museum Road every evening at seven.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex gap-6 justify-center">
              <img
                src={burger}
                alt="Classic burger"
                className="w-44 md:w-52 h-64 md:h-72 object-cover rounded-xl shadow-2xl border border-[#3D3530]"
              />
              <img
                src={lamb}
                alt="Lamb chops"
                className="w-48 md:w-60 h-72 md:h-80 object-cover rounded-xl shadow-2xl border border-[#3D3530] -mt-10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────────────────── */}
      <section className="border-y border-[#3D3530] bg-[#1A1614]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className={`py-12 px-6 text-center ${
                i !== 0 ? "md:border-l border-[#3D3530]" : ""
              }`}
            >
              <p className="font-[Cinzel] text-4xl md:text-5xl text-[#f0a81e] mb-2">
                {s.value}
              </p>
              <p className="text-xs tracking-[0.25em] uppercase text-[#E3D5CA]/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-4">
              Sixty Years in the Making
            </p>
            <h2 className="font-[Cinzel] text-3xl md:text-4xl text-white">
              The Journey
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical amber hairline */}
            <span
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#f0a81e]/50 to-transparent"
              aria-hidden="true"
            />

            {milestones.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 80}
                className={`relative mb-14 pl-12 md:pl-0 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-14 md:text-right"
                    : "md:ml-auto md:pl-14"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute top-1.5 w-3 h-3 rounded-full bg-[#f0a81e] shadow-[0_0_14px_rgba(240,168,30,0.7)] left-2.5 ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-1.5"
                      : "md:-left-1.5"
                  }`}
                  aria-hidden="true"
                />
                <p className="font-[Cinzel] text-[#f0a81e] text-sm tracking-[0.3em] uppercase mb-2">
                  {m.year}
                </p>
                <h3 className="font-[Cinzel] text-xl text-white mb-3">
                  {m.title}
                </h3>
                <p className="text-[#E3D5CA]/80 leading-relaxed text-sm md:text-base">
                  {m.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Us / Map ────────────────────────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-[Cinzel] text-[#f0a81e] text-xs tracking-[0.4em] uppercase mb-4">
              Visit Us
            </p>
            <h2 className="font-[Cinzel] text-3xl md:text-4xl text-white">
              Find The Only Place
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid md:grid-cols-[340px_1fr] rounded-2xl overflow-hidden border border-[#3D3530] bg-[#201C19] shadow-2xl">
              {/* Info panel */}
              <div className="p-10 flex flex-col gap-8 justify-center">
                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-[#f0a81e] mt-1 flex-none" size={18} />
                  <div>
                    <p className="font-[Cinzel] text-white text-sm tracking-[0.2em] uppercase mb-1.5">
                      Address
                    </p>
                    <p className="text-sm leading-relaxed text-[#E3D5CA]/80">
                      No. 13, Museum Road, next to the Post Office,
                      <br />
                      Shanthala Nagar, Ashok Nagar,
                      <br />
                      Bengaluru, Karnataka 560001
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaUtensils className="text-[#f0a81e] mt-1 flex-none" size={17} />
                  <div>
                    <p className="font-[Cinzel] text-white text-sm tracking-[0.2em] uppercase mb-1.5">
                      Hours
                    </p>
                    <p className="text-sm leading-relaxed text-[#E3D5CA]/80">
                      Lunch · 12:00 PM – 4:30 PM
                      <br />
                      Dinner · From 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaPhoneAlt className="text-[#f0a81e] mt-1 flex-none" size={16} />
                  <div>
                    <p className="font-[Cinzel] text-white text-sm tracking-[0.2em] uppercase mb-1.5">
                      Reservations
                    </p>
                    <a
                      href="tel:+919986011112"
                      className="block text-sm text-[#E3D5CA]/80 hover:text-[#f0a81e] transition-colors duration-200"
                    >
                      +91 99860 11112
                    </a>
                    <a
                      href="tel:+919880405908"
                      className="block text-sm text-[#E3D5CA]/80 hover:text-[#f0a81e] transition-colors duration-200"
                    >
                      +91 98804 05908
                    </a>
                  </div>
                </div>

                <Link
                  to="/reservations"
                  className="menu-cta inline-flex items-center justify-center font-[Cinzel] font-semibold text-sm tracking-wider rounded-full px-8 py-3 mt-2 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
                  style={{
                    background: "#f0a81e",
                    color: "#241400",
                    boxShadow: "0 8px 26px rgba(240,168,30,0.3)",
                  }}
                >
                  Reserve a Table
                </Link>
              </div>

              {/* Google Map embed */}
              <div className="min-h-[380px] md:min-h-[460px]">
                <iframe
                  title="The Only Place — 13 Museum Road, Bengaluru"
                  src="https://www.google.com/maps?q=The%20Only%20Place%2C%2013%20Museum%20Road%2C%20Shanthala%20Nagar%2C%20Bengaluru%20560001&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}