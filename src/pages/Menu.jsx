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

export default function Menu() {


  const menu = [
    {
      category: "Salads",
      image: salad,
      color: "#9aff6e",
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
      color: "#ff6767",
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
      color: "#f6b26b",
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
      color: "#e06666",
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
]

  const [active, setActive] = useState(menu[0].category);
  const currentCategory = menu.find(m => m.category === active);
  const [blur, setBlur] = useState(0);
  const menuContentRef = useRef(null);

  const scrollToMenu = () => {
    menuContentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectCategory = (category) => {
    setActive(category);
    setTimeout(scrollToMenu, 50);
  };

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      // 🔥 SCROLLING UP → APPLY BLUR
      const blurValue = Math.min(8, (lastScrollY - currentScrollY) / 10);
      setBlur(blurValue);
    } else {
      // 🔥 SCROLLING DOWN → REMOVE BLUR
      setBlur(0);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
  <div className="flex">

    {/* 🔥 GLOBAL BACKGROUND (DO NOT RE-RENDER) */}
    <div
      className="fixed inset-0 -z-20"
      style={{
        backgroundImage:
          "url(https://static.wixstatic.com/media/nsplsh_6f5a7a6f44573631616f4d~mv2_d_5903_3935_s_4_2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div className="fixed inset-0 -z-10" />

    {/* 🔥 SIDEBAR */}
      <div
        className="fixed left-0 top-0 z-40 h-screen bg-[#e6dcc7]/95 backdrop-blur-md pt-[var(--navbar-height)]"
        style={{ width: "var(--menu-sidebar-width)" }}
      >
  <div className="flex h-full flex-col justify-center overflow-y-auto px-3 pb-6 no-scrollbar">
    <div className="flex min-h-0 flex-1 flex-col justify-center pt-2">
      {menu.map((section) => (
        <div
          key={section.category}
          role="button"
          tabIndex={0}
          onClick={() => selectCategory(section.category)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectCategory(section.category);
            }
          }}
          className={`
            font-[Cinzel]
            mb-3
            w-full
            cursor-pointer
            text-left
            text-[0.75rem]
            leading-snug
            tracking-wide
            uppercase
            transition-all duration-200

            ${active === section.category
              ? "text-black font-bold"
              : "text-gray-700 font-semibold"}

            hover:text-amber-700 hover:translate-x-0.5
          `}
        >
          {section.category}
        </div>
      ))}
    </div>
  </div>
</div>

    {/* 🔥 RIGHT CONTENT */}
    <div
      className="w-full min-h-screen"
      style={{ marginLeft: "var(--menu-sidebar-width)" }}
    >

      {/* 🔥 VIDEO HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={menuback} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
          <h1
            className="text-5xl font-semibold italic tracking-wider text-white md:text-7xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            OUR MENU
          </h1>
          <p
            className="mt-4 text-lg text-white/90 md:text-xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Taste the Passion
          </p>
          <button
            type="button"
            onClick={() => selectCategory(menu[0].category)}
            className="menu-cta mt-10 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-gray-900 transition hover:bg-amber-400 md:text-base"
          >
            Begin with {menu[0].category}
          </button>
        </div>
      </section>

      {/* 🔥 WOODY MENU (existing layout) */}
      <div ref={menuContentRef} className="fade-in scroll-mt-0">

        <div className="relative">

          {/* ❌ REMOVED BACKGROUND FROM HERE */}

          {/* 🔥 TITLE ON WOOD → IMAGE SCROLLS OVER → MENU SCROLLS OVER IMAGE */}
          <div
            className={`relative ${
              currentCategory.image ? "h-[220vh]" : "h-screen"
            }`}
          >
            {/* Category title — pinned on wood behind the image */}
            <div
              className="sticky z-10 flex items-center justify-center pointer-events-none"
              style={{
                top: "var(--navbar-height)",
                height: "calc(100vh - var(--navbar-height))",
              }}
            >
              <h1 className="text-white text-6xl md:text-8xl text-center font-[Cinzel] font-semibold">
                {currentCategory.category}
              </h1>
            </div>

            {currentCategory.image && (
              <div className="relative z-20 -mt-[100vh] h-[180vh]">
                <div
                  className="sticky flex items-center justify-center px-4"
                  style={{
                    top: "calc(var(--navbar-height) + 1rem)",
                    height: "min(75vh, calc(100vh - var(--navbar-height) - 2rem))",
                  }}
                >
                  <img
                    src={currentCategory.image}
                    alt={currentCategory.category}
                    style={{
                      filter: `blur(${blur}px)`,
                      transition: "filter 0.2s ease-out",
                    }}
                    className="w-[90%] max-w-6xl rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 🔥 MENU OVER IMAGE */}
<div
  className={`relative z-30 min-h-screen ${
    currentCategory.image ? "-mt-[80vh]" : ""
  }`}
>

              <div className="relative  backdrop-blur-xl rounded-t-3xl p-12 shadow-[0_-20px_40px_rgba(0,0,0,1)] overflow-hidden min-h-screen w-full"
                style={{
  background: `linear-gradient(
    135deg,
    ${currentCategory.color || "#ff7979"},
    rgba(255,255,255,0.2)
  )`
}}>

    {/* 🔥 TEXTURE */}
    <div
      className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-0"
      style={{
        backgroundImage: `url(${design})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
   {/*CONTENT*/}
   <div className="relative z-10 w-full grid md:grid-cols-[300px_1fr] gap-16">

  {/* 🔥 LEFT SIDE (CATEGORY TITLE) */}
  <div>
    <h2 className="text-6xl font-bold text-gray-900 sticky top-24">
      {currentCategory.category}
    </h2>
  </div>

  {/* 🔥 RIGHT SIDE (MENU ITEMS) */}
  <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 border-l border-black/50 pl-10">

    {currentCategory.items.map((item, index) => (
      <div key={index} className="space-y-2">

        {/* PRICE */}
        <p className="text-sm text-gray-800 font-medium">
          ₹{item.price}
        </p>

        {/* NAME */}
        <h3 className="text-2xl font-semibold text-gray-900">
          {item.name}
        </h3>

        {/* OPTIONAL DESCRIPTION */}
        {item.desc && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.desc}
          </p>
        )}

      </div>
    ))}

  </div>

</div>

  </div>

</div>

        </div>

      </div>

    </div>

  </div>
);
}