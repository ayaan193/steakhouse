import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

/* ── Contact channels ─────────────────────────────────────────────────── */
const cards = [
  {
    icon: FaMapMarkerAlt,
    title: "Visit Us",
    lines: [
      "No. 13, Museum Road",
      "Next to the Post Office, Shanthala Nagar",
      "Bengaluru, Karnataka 560001",
    ],
    action: {
      label: "Get Directions",
      href: "https://www.google.com/maps/search/?api=1&query=The+Only+Place,+13+Museum+Road,+Bengaluru+560001",
      external: true,
    },
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    lines: ["For reservations & takeaway"],
    links: [
      { label: "+91 99860 11112", href: "tel:+919986011112" },
      { label: "+91 98804 05908", href: "tel:+919880405908" },
    ],
  },
  {
    icon: FaEnvelope,
    title: "Write to Us",
    lines: ["For events, feedback & enquiries"],
    links: [
      {
        label: "theonlyplacerestaurant@gmail.com",
        href: "mailto:theonlyplacerestaurant@gmail.com",
      },
    ],
  },
  {
    icon: FaClock,
    title: "Opening Hours",
    lines: [
      "Lunch · 12:00 PM – 4:30 PM",
      "Dinner · From 7:00 PM",
      "Reservations recommended on weekends",
    ],
  },
];

export default function Contact() {
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
          We&apos;d Love to Hear From You
        </p>
        <h1
          className="font-[Cinzel] font-bold text-white leading-none fade-up"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            letterSpacing: "0.03em",
            animationDelay: "0.15s",
          }}
        >
          CONTACT
        </h1>
        <div
          className="flex items-center justify-center gap-5 mt-6 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="block w-12 md:w-20 h-px bg-white/30" />
          <span className="font-[Cinzel] text-white/75 text-xs tracking-[0.38em] uppercase">
            13, Museum Road · Since 1965
          </span>
          <span className="block w-12 md:w-20 h-px bg-white/30" />
        </div>
      </header>

      {/* ── Contact cards ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {cards.map(({ icon: Icon, title, lines, links, action }) => (
            <div
              key={title}
              className="group rounded-2xl border border-[#3D3530] bg-[#201C19] p-8 transition-all duration-200 hover:border-[#f0a81e]/50 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="grid place-items-center w-11 h-11 rounded-full border border-[#f0a81e]/40 text-[#f0a81e] transition-colors duration-200 group-hover:bg-[#f0a81e]/10">
                  <Icon size={16} />
                </span>
                <h2 className="font-[Cinzel] text-white text-lg tracking-[0.12em] uppercase">
                  {title}
                </h2>
              </div>

              {lines.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-[#E3D5CA]/75"
                >
                  {line}
                </p>
              ))}

              {links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-sm mt-1.5 text-[#E3D5CA] hover:text-[#f0a81e] transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e] rounded"
                >
                  {l.label}
                </a>
              ))}

              {action && (
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className="inline-block mt-4 font-[Cinzel] text-xs tracking-[0.25em] uppercase text-[#f0a81e] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e] rounded"
                >
                  {action.label} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Map ──────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden border border-[#3D3530] shadow-2xl mb-16">
          <iframe
            title="The Only Place — 13 Museum Road, Bengaluru"
            src="https://www.google.com/maps?q=The%20Only%20Place%2C%2013%20Museum%20Road%2C%20Shanthala%20Nagar%2C%20Bengaluru%20560001&output=embed"
            className="w-full h-[380px] border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ filter: "grayscale(20%) contrast(1.05)" }}
          />
        </div>

        {/* ── Socials + CTA ───────────────────────────────────────────────── */}
        <div className="text-center">
          <p className="font-[Cinzel] text-white/70 text-xs tracking-[0.35em] uppercase mb-6">
            Follow the Sizzle
          </p>

          <div className="flex items-center justify-center gap-5 mb-12">
            {[
              { icon: FaFacebookF, href: "https://www.facebook.com/TheOnlyPlaceBangalore/", label: "Facebook" },
              { icon: FaInstagram, href: "https://www.instagram.com/theonlyplace_museumroad/", label: "Instagram" },
              { icon: FaWhatsapp, href: "https://wa.me/919986011112", label: "WhatsApp" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center w-12 h-12 rounded-full border border-[#3D3530] text-[#E3D5CA]/80 hover:text-[#f0a81e] hover:border-[#f0a81e]/60 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          <Link
            to="/reservations"
            className="inline-flex items-center justify-center font-[Cinzel] font-semibold text-sm tracking-wider rounded-full px-10 py-3.5 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e] focus-visible:ring-offset-2"
            style={{
              background: "#f0a81e",
              color: "#241400",
              boxShadow: "0 8px 26px rgba(240,168,30,0.36)",
            }}
          >
            Reserve Your Table
          </Link>
        </div>
      </main>
    </div>
  );
}