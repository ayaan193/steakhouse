import React, { useState, useEffect, useRef } from "react";
import menuback from "../assets/menuback.mp4";
import salad from "../assets/salad.jpeg";
import gbread from "../assets/garlic_bread.jpeg";
import sandwich from "../assets/sandwich.jpeg";
import vegetarian from "../assets/vegetarian.jpeg";
import lasagne from "../assets/lasagne.jpeg";
import lamb from "../assets/lamb.jpeg";
import steak from "../assets/steak2.jpeg";
import csteak from "../assets/chick_steak.jpeg";
import design from "../assets/des1.avif";

// ─── Menu data ────────────────────────────────────────────────────────────────
const menu = [
  {
    category: "Salads",
    image: salad,
    items: [
      { name: "Tossed Salad", price: 170 },
      { name: "Potato Salad", price: 200 },
      { name: "Pasta Salad", price: 200 },
      { name: "Greek Salad", price: 260 },
      { name: "Mediterranean Salad", price: 180 },
      { name: "Chicken Salad", price: 280 },
      { name: "Beef Salad", price: 280 },
    ],
  },
  {
    category: "Starters",
    image: gbread,
    items: [
      { name: "Prawns with Sauce", price: 500 },
      { name: "Fish Sticks", price: 500 },
      { name: "OP's Chicken Nuggets", price: 370 },
      { name: "Barbequed Chicken Wings", price: 380 },
      { name: "Mini Lamb Chops", price: 500 },
      { name: "Spicy Steak Medallions", price: 400 },
      { name: "Chilly Beef/Chicken", price: 380 },
      { name: "Stuffed Spinach Mushrooms", price: 300 },
      { name: "Cheesy Garlic Bread", price: 200 },
      { name: "Bruschetta", price: 220 },
      { name: "French Fries", price: 150 },
      { name: "Cheesy Fries", price: 200 },
      { name: "Cheese Rolls", price: 300 },
      { name: "Onion Rings", price: 170 },
    ],
  },
  {
    category: "Sandwiches",
    image: sandwich,
    items: [
      { name: "Tomato & Cucumber", price: 150 },
      { name: "Cheese & Tomato", price: 160 },
      { name: "Grilled Cheese", price: 180 },
      { name: "Toasted Steak", price: 220 },
      { name: "Toasted Steak & Cheese", price: 240 },
      { name: "Egg Salad", price: 180 },
      { name: "Chicken Mayo", price: 230 },
      { name: "Grilled Chicken", price: 250 },
      { name: "Grilled Chicken & Cheese", price: 260 },
      { name: "Roast Beef", price: 220 },
      { name: "Hot Roast Beef with Mashed Potatoes & Gravy", price: 260 },
    ],
  },
  {
    category: "Vegetarian",
    image: vegetarian,
    items: [
      { name: "Lasagne with Vegetables", price: 370 },
      { name: "Lasagne with Spinach & Mushrooms", price: 370 },
      { name: "Spaghetti with Vegetables", price: 360 },
      { name: "Fettuccini Alfredo", price: 360 },
      { name: "Vegetable Steak", price: 360 },
      { name: "Vegetable Tetrazzini", price: 360 },
      { name: "Vegetable Au Gratin", price: 340 },
      { name: "Macaroni & Cheese Bake", price: 340 },
      { name: "Spinach & Corn Bake", price: 360 },
      { name: "Vegetable Cacciatore", price: 360 },
    ],
  },
  {
    category: "Lasagne",
    image: lasagne,
    items: [
      { name: "Meat Lasagne", price: 420 },
      { name: "Lamb Lasagne", price: 450 },
      { name: "Chicken Lasagne", price: 440 },
      { name: "Vegetable Lasagne", price: 370 },
      { name: "Spinach & Mushroom Lasagne", price: 370 },
    ],
  },
  {
    category: "Cannelloni",
    items: [
      { name: "Spinach & Mushroom Cannelloni", price: 370 },
      { name: "Chicken Cannelloni", price: 410 },
    ],
  },
  {
    category: "Lamb",
    image: lamb,
    items: [
      { name: "Lamb Steak", price: 600 },
      { name: "TLC Chops", price: 600 },
    ],
  },
  {
    category: "Fish",
    items: [
      { name: "Crumb-fried Fish", price: 570 },
      { name: "Grilled Fish", price: 570 },
      { name: "Spicy-fried Fish", price: 570 },
      { name: "King Fish Steak", price: 570 },
      { name: "London Fish & Chips", price: 600 },
      { name: "OP's Special Fish", price: 600 },
    ],
  },
  {
    category: "Sizzlers",
    items: [
      { name: "Tournedos (Regular Cut)", price: 580 },
      { name: "Sergeant Pepper Steak", price: 650 },
      { name: "Chateaubriand Supreme", price: 750 },
      { name: "Chicken Steak", price: 540 },
      { name: "BBQ Chicken", price: 530 },
      { name: "Chicken Supreme", price: 650 },
      { name: "Vege Steak", price: 460 },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Chicken Pasta", price: 400 },
      { name: "Meat Pasta", price: 390 },
      { name: "Vegetable Pasta", price: 360 },
      { name: "Mushroom Pasta", price: 360 },
      { name: "Fettuccini Alfredo", price: 360 },
      { name: "Fettuccini Mediterranean", price: 360 },
    ],
  },
  {
    category: "Steaks",
    image: steak,
    items: [
      { name: "Wiener Schnitzel & Fries", price: 460 },
      { name: "Beef Parmigiana", price: 500 },
      { name: "Boston Special", price: 590 },
      { name: "Chateaubriand Supreme", price: 650 },
      { name: "Chateaubriand Mini Supreme", price: 600 },
      { name: "Filet Mignon", price: 600 },
      { name: "Double Filet Mignon", price: 700 },
      { name: "Salisbury Steak", price: 400 },
      { name: "Philly Steak", price: 460 },
      { name: "Philly Cheese Steak", price: 480 },
      { name: "Tournedos (Regular Cut)", price: 480 },
      { name: "Vienna Steak", price: 500 },
      { name: "Liberty Steak", price: 530 },
      { name: "Sirloin Tips", price: 530 },
      { name: "Sergeant Pepper Steak", price: 550 },
      { name: "Steak Au Poivre", price: 550 },
      { name: "Bar-be-que Steak", price: 470 },
      { name: "Charbroiled Steak", price: 450 },
      { name: "Steak & Eggs", price: 480 },
    ],
  },
  {
    category: "Chicken",
    image: csteak,
    items: [
      { name: "Barbequed Chicken", price: 430 },
      { name: "Chicken a la Creme", price: 450 },
      { name: "Chicken Schnitzel", price: 410 },
      { name: "OP's Special Chicken", price: 550 },
      { name: "Chicken Supreme", price: 550 },
      { name: "Chicken Maryland", price: 400 },
      { name: "Chicken Steak", price: 440 },
      { name: "Chicken Paprika", price: 450 },
      { name: "Fiery Chicken", price: 450 },
      { name: "Chicken Sombrero", price: 440 },
      { name: "Chicken Cacciatore", price: 400 },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "All-American Beef Burger", price: 240 },
      { name: "All-American Beef Cheese Burger", price: 260 },
      { name: "Steak Burger", price: 260 },
      { name: "Steak Burger with Cheese", price: 280 },
      { name: "Chicken Burger", price: 260 },
      { name: "Chicken Burger with Cheese", price: 280 },
      { name: "Fish Burger", price: 340 },
      { name: "Lamb Burger", price: 280 },
      { name: "Lamb Cheese Burger", price: 310 },
      { name: "Frani Burger", price: 320 },
      { name: "Juicy Lucy", price: 350 },
      { name: "Sloppy Joe", price: 270 },
      { name: "Mini Whopper (Beef/Chicken/Lamb)", price: 400 },
      { name: "Whopper Burger (Beef/Chicken/Lamb)", price: 500 },
      { name: "Vege Burger", price: 210 },
      { name: "Vege Cheese Burger", price: 230 },
    ],
  },
  {
    category: "Stroganoff",
    items: [
      { name: "Beef Stroganoff", price: 380 },
      { name: "Chicken Stroganoff", price: 420 },
    ],
  },
  {
    category: "Bakes",
    items: [
      { name: "Moussaka", price: 460 },
      { name: "Steak & Kidney Pie", price: 480 },
      { name: "OP's Shepherds Pie", price: 460 },
      { name: "Chicken Tetrazzini", price: 440 },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Soft Drinks", price: 100 },
      { name: "Fresh Lime Soda", price: 100 },
      { name: "Fresh Lime Juice", price: 90 },
      { name: "Ice Tea", price: 100 },
      { name: "Cold Coffee", price: 100 },
      { name: "Lassi (Sweet/Salt/Mango)", price: 100 },
      { name: "Seasonal Juice", price: 150 },
      { name: "Milk Shakes", price: 130 },
      { name: "Special Milk Shakes", price: 150 },
      { name: "Non-Alcoholic Beer", price: 150 },
    ],
  },
];

// ─── Shared category rail used in both hero bottom bar and sticky sub-nav ─────
function CategoryRail({ active, onSelect, variant = "hero" }) {
  const isHero = variant === "hero";
  return (
    <div
      className="flex-1 min-w-0 w-full flex overflow-x-auto no-scrollbar"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
      }}
    >
      {menu.map((section) => {
        const isActive = active === section.category;
        return (
          <button
            key={section.category}
            type="button"
            onClick={() => onSelect(section.category)}
            className={`
              flex-none font-[Cinzel] uppercase whitespace-nowrap relative
              !bg-transparent !rounded-none
              transition-colors duration-200 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#f0a81e]
              ${isHero
                ? "text-[0.68rem] md:text-xs tracking-[0.14em] md:tracking-[0.16em] px-4 md:px-5 py-4"
                : "text-[0.62rem] md:text-[0.65rem] tracking-[0.14em] md:tracking-[0.16em] px-3.5 md:px-4 py-3.5"}
              ${isActive
                ? "!text-[#f0a81e]"
                : "!text-white/60 hover:!text-white"}
            `}
          >
            {isActive && (
              <span
                className={`absolute ${isHero ? "top-0" : "bottom-0"} left-4 right-4 h-0.5 bg-[#f0a81e]`}
              />
            )}
            {section.category}
          </button>
        );
      })}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Menu() {
  const [active, setActive] = useState(menu[0].category);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [blur, setBlur] = useState(0);

  const heroRef = useRef(null);
  const menuContentRef = useRef(null);

  const currentCategory = menu.find((m) => m.category === active);
  const activeIndex = menu.findIndex((m) => m.category === active);
  const nextCategory = menu[(activeIndex + 1) % menu.length];

  // ── Scroll into menu content when category is selected ──
  const scrollToMenu = () =>
    menuContentRef.current?.scrollIntoView({ behavior: "smooth" });

  const selectCategory = (category) => {
    setActive(category);
    setTimeout(scrollToMenu, 50);
  };

  // ── Show sticky sub-nav once hero leaves the viewport ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyNav(!entry.isIntersecting),
      { threshold: 0 }
    );
    const el = heroRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Blur food image while scrolling up ──
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setBlur(y < lastY ? Math.min(8, (lastY - y) / 10) : 0);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#15110d]">

      {/* ── Sticky sub-nav (slides down when hero scrolls out of view) ────── */}
      <div
        className={`
          fixed inset-x-0 z-40 transition-all duration-300
          ${showStickyNav
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"}
        `}
        style={{ top: "var(--navbar-height, 64px)" }}
        aria-hidden={!showStickyNav}
      >
        <div className="bg-[#15110d]/95 backdrop-blur-md border-b border-white/10 flex items-center max-w-full overflow-hidden">
          <span className="hidden sm:block flex-none font-[Cinzel] text-white/40 text-[0.65rem] tracking-[0.38em] uppercase px-5 py-3.5 border-r border-white/10 whitespace-nowrap select-none">
            SECTIONS
          </span>
          <CategoryRail active={active} onSelect={selectCategory} variant="sticky" />
        </div>
      </div>

      {/* ── Cinematic hero ───────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">

        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={menuback} type="video/mp4" />
        </video>

        {/* Scrim stack */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div
          className="absolute inset-x-0 top-0 h-52 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(8,6,4,0.65), transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(110% 70% at 50% 40%, transparent, rgba(0,0,0,0.38))",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background:
              "linear-gradient(0deg, rgba(8,6,4,0.88), rgba(8,6,4,0.30) 55%, transparent)",
          }}
        />

        {/* Hero text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
          style={{ transform: "translateY(-5vh)" }}
        >
          <p className="font-[Cinzel] text-[#f0a81e] text-[0.65rem] md:text-xs tracking-[0.5em] uppercase mb-6 select-none">
            SINCE 1965
          </p>

          <h1
            className="font-[Cinzel] font-bold text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 10vw, 8rem)",
              letterSpacing: "0.02em",
              textShadow: "0 4px 36px rgba(0,0,0,0.6)",
            }}
          >
            OUR MENU
          </h1>

          <div className="flex items-center gap-4 md:gap-5 mt-5">
            <span className="block w-10 md:w-20 h-px bg-white/40" />
            <span className="font-[Cinzel] text-white/85 text-[0.65rem] md:text-sm tracking-[0.3em] md:tracking-[0.38em] uppercase whitespace-nowrap">
              Taste the Passion
            </span>
            <span className="block w-10 md:w-20 h-px bg-white/40" />
          </div>

          <button
            type="button"
            onClick={() => selectCategory(menu[0].category)}
            className="
              menu-cta mt-10 font-[Cinzel] font-semibold text-sm tracking-wider
              !text-[#241400] !bg-[#f0a81e] !rounded-full px-9 md:px-10 py-3.5
              transition-all duration-200 hover:!bg-[#d28c0d] hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e] focus-visible:ring-offset-2
            "
            style={{ boxShadow: "0 8px 26px rgba(240,168,30,0.36)" }}
          >
            Begin with Salads
          </button>
        </div>

        {/* Bottom category rail — overlaid on video */}
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-center border-t border-white/12 max-w-full overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(6px)",
              background:
                "linear-gradient(to top, rgba(8,6,4,0.72), rgba(8,6,4,0.18))",
            }}
          />
          <span className="relative hidden sm:block flex-none font-[Cinzel] text-white/45 text-[0.65rem] tracking-[0.38em] uppercase px-6 py-4 border-r border-white/12 whitespace-nowrap select-none z-10">
            SECTIONS
          </span>
          <div className="relative z-10 flex-1 min-w-0">
            <CategoryRail active={active} onSelect={selectCategory} variant="hero" />
          </div>
        </div>
      </section>

      {/* ── Menu content ─────────────────────────────────────────────────── */}
      {/* Scroll sequence:                                                     */}
      {/*   LAYER 1 — Wood + title (sticky z=10): stays pinned behind          */}
      {/*   LAYER 2 — Food image (z=20, opaque bg): rises from below over L1   */}
      {/*   LAYER 3 — Menu card (z=30, -mt-[80vh]): slides over sticky image   */}
      <div
        ref={menuContentRef}
        className="relative"
        style={{ scrollMarginTop: "var(--navbar-height, 64px)" }}
      >

        {/* LAYER 1: Wood background + category title — stays pinned */}
        <div
          className="sticky top-0 h-screen z-10 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('https://static.wixstatic.com/media/nsplsh_6f5a7a6f44573631616f4d~mv2_d_5903_3935_s_4_2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-6">
            <p className="font-[Cinzel] text-[#f0a81e] text-[0.65rem] md:text-xs tracking-[0.45em] uppercase mb-4">
              {String(activeIndex + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}
            </p>
            <h1
              className="text-white font-[Cinzel] font-semibold"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              {currentCategory.category}
            </h1>
          </div>
        </div>

        {/* LAYER 2: Food image — enters from below, covers Layer 1, stays sticky */}
        <div className="relative h-[200vh] z-20 bg-[#15110d]">
          <div className="sticky top-0 h-screen flex items-center justify-center px-4">
            {currentCategory.image ? (
              <img
                src={currentCategory.image}
                alt={currentCategory.category}
                style={{
                  filter: `blur(${blur}px)`,
                  transition: "filter 0.2s ease-out",
                }}
                className="w-full md:w-[90%] max-w-6xl rounded-2xl shadow-2xl object-cover max-h-[70vh] md:max-h-[80vh]"
              />
            ) : (
              <div className="w-full md:w-[90%] max-w-6xl h-[50vh] md:h-[60vh] rounded-2xl bg-[#1e1610] border border-[#3D3530] flex items-center justify-center">
                <span className="font-[Cinzel] text-white/20 text-lg md:text-2xl uppercase tracking-[0.3em] text-center px-6">
                  {currentCategory.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* LAYER 3: Menu card — slides over the sticky food image */}
        <div className="relative z-30 -mt-[80vh] min-h-screen">
          <div
            className="relative rounded-t-3xl p-6 sm:p-10 md:p-14 shadow-[0_-20px_40px_rgba(0,0,0,1)] overflow-hidden min-h-screen w-full border-t border-[#f0a81e]/25"
            style={{
              background:
                "linear-gradient(180deg, #221a13 0%, #18120d 60%, #15110d 100%)",
            }}
          >
            {/* Texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay z-0"
              style={{
                backgroundImage: `url(${design})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Content grid */}
            <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-[260px_1fr] gap-10 md:gap-16">

              {/* Section header */}
              <div>
                <div className="md:sticky md:top-28">
                  <p className="font-[Cinzel] text-[#f0a81e] text-[0.65rem] tracking-[0.4em] uppercase mb-3">
                    Section {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white font-[Cinzel] leading-tight">
                    {currentCategory.category}
                  </h2>
                  <span className="block w-14 h-0.5 bg-[#f0a81e] mt-5" />
                </div>
              </div>

              {/* Items */}
              <div className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-7 md:gap-y-9 md:border-l md:border-[#f0a81e]/20 md:pl-10">
                {currentCategory.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-[#E3D5CA] leading-snug">
                        {item.name}
                      </h3>
                      <span
                        className="flex-1 border-b border-dotted border-[#E3D5CA]/25"
                        aria-hidden="true"
                      />
                      <p className="font-[Cinzel] text-[#f0a81e] text-sm md:text-base whitespace-nowrap">
                        ₹{item.price}
                      </p>
                    </div>
                    {item.desc && (
                      <p className="text-sm text-[#E3D5CA]/60 leading-relaxed mt-1.5">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next section CTA */}
            <div className="relative z-10 max-w-6xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="font-[Cinzel] text-white/50 text-[0.65rem] tracking-[0.32em] uppercase">
                Continue Exploring
              </p>
              <button
                type="button"
                onClick={() => selectCategory(nextCategory.category)}
                className="menu-cta font-[Cinzel] font-semibold text-sm tracking-wider !rounded-full px-8 py-3 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]"
              >
                Next: {nextCategory.category} →
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}