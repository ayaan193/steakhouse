import React from "react";

export default function Menu() {
  return (
    <div className="relative">

      {/* 🔥 WOOD BACKGROUND */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage:
            "url(https://static.wixstatic.com/media/nsplsh_6f5a7a6f44573631616f4d~mv2_d_5903_3935_s_4_2.jpg/v1/fill/w_750,h_1334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20Ria.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* 🔥 FIXED TEXT */}
      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="text-white text-6xl md:text-8xl font-serif">
          Poultry
        </h1>
      </div>

      {/* 🔥 SPACER (first screen) */}
      <div className="h-screen" />

      {/* 🔥 IMAGE SECTION (IMPORTANT) */}
      <div className="relative h-[200vh] z-20">

        {/* 🔥 STICKY IMAGE */}
        <div className="sticky top-20 h-[80vh] flex items-center justify-center">
          <img
            src="https://static.wixstatic.com/media/fef1a0_8b34ead55ff542419ca442ffc76a779a~mv2.png/v1/fill/w_1382,h_1080,fp_0.50_0.01,q_90,enc_avif,quality_auto/Untitled%20design%20(6).png"
            alt="food"
            className="w-[90%] max-w-6xl object-cover rounded-2xl shadow-2xl"
          />
        </div>

      </div>

      {/* 🔥 MENU SCROLLS OVER IMAGE */}
      <div className="relative z-30 -mt-[60vh] px-6 md:px-20 pb-20">

        <div className="bg-pink-200/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold mb-10">Poultry</h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <p className="text-sm text-gray-600">₹450</p>
              <h3 className="text-xl font-semibold">
                Chicken Parmesan
              </h3>
              <p className="text-gray-700 text-sm">
                Breaded chicken breast topped with tomato sauce and mozzarella.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">₹500</p>
              <h3 className="text-xl font-semibold">
                Peppercorn Chicken
              </h3>
              <p className="text-gray-700 text-sm">
                Creamy pepper sauce served with mashed potatoes.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">₹480</p>
              <h3 className="text-xl font-semibold">
                Grilled Chicken Steak
              </h3>
              <p className="text-gray-700 text-sm">
                Served with sautéed vegetables and fries.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">₹520</p>
              <h3 className="text-xl font-semibold">
                BBQ Chicken
              </h3>
              <p className="text-gray-700 text-sm">
                Smoky BBQ chicken served with mashed potatoes and salad.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
/*const menu = [
    {
      category: "Salads",
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

*/