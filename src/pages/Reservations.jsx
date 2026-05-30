import { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import TimeAvailability from "../TimeAvailability";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";

export default function Reservations() {

  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    dietary: ""
  });

  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [slotStatus, setSlotStatus] = useState({});
  const [sendingOTP, setSendingOTP] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const otpInputRef = useRef(null);

  const times = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- AUTO CHECK AVAILABILITY ---------------- */

  useEffect(() => {
    if (step === 3 && form.date) {
      checkAvailability(form.date);
    }
  }, [form.date, step]);

  /* ---------------- OTP GENERATOR ---------------- */

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  /* ---------------- 1 QUERY SLOT AVAILABILITY ---------------- */

  const checkAvailability = async (date) => {
    
    const q = query(
      collection(db, "reservations"),
      where("date", "==", date)
    );

    const snapshot = await getDocs(q);

    const counts = {};

    times.forEach((t) => {
      counts[t] = 0;
    });

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (counts[data.time] !== undefined) {
        counts[data.time]++;
      }
    });

    const statusMap = {};

    times.forEach((time) => {

      const count = counts[time];

      if (count >= 10) statusMap[time] = "full";
      else if (count >= 5) statusMap[time] = "limited";
      else statusMap[time] = "available";

    });
    console.log(statusMap);
    setSlotStatus(statusMap);
  };

  /* ---------------- SEND OTP EMAIL ---------------- */

  const sendOTP = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setSendingOTP(true);
    setMessage("");

    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);

    try {

      await fetch(
        "https://us-central1-the-only-place-ea5f9.cloudfunctions.net/sendOTPEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            otp: newOTP,
            name: form.name
          })
        }
      );

      setStep(2);
      setMessage("OTP sent to your email");

    } catch (err) {
      console.error(err);
      setMessage("Failed to send OTP");
    } finally {
      setSendingOTP(false); // unlock button
    }
  }
  /* ---------------- VERIFY OTP ---------------- */

  const verifyOTP = () => {

    if (otp === generatedOTP) {
      setVerified(true);
      setStep(3);
      setMessage("Email verified");
    } else {
      setMessage("Invalid OTP");
    }

  };

  /* ---------------- RESERVATION SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      setMessage("Please verify your email first.");
      return;
    }

    if (!form.name?.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!form.date) {
      setMessage("Please select a reservation date.");
      return;
    }

    if (!form.time) {
      setMessage("Please select a time slot.");
      return;
    }

    if (!form.phone?.trim()) {
      setMessage("Please enter your phone number.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (form.date < today) {
      setMessage("Reservations for past dates are not allowed.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const phoneQuery = query(
        collection(db, "reservations"),
        where("phone", "==", form.phone.trim())
      );
      const phoneSnapshot = await getDocs(phoneQuery);

      if (!phoneSnapshot.empty) {
        setMessage("This phone number already has a reservation.");
        return;
      }

      const dateQuery = query(
        collection(db, "reservations"),
        where("date", "==", form.date)
      );
      const dateSnapshot = await getDocs(dateQuery);
      const bookingsForSlot = dateSnapshot.docs.filter(
        (doc) => doc.data().time === form.time
      ).length;

      if (bookingsForSlot >= 10) {
        setMessage("This time slot is fully booked.");
        return;
      }

      const reservationPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        reservationDate: new Date(form.date + "T12:00:00"),
        time: form.time,
        guests: Number(form.guests),
        dietary: form.dietary?.trim() || "",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "reservations"),
        reservationPayload
      );

      navigate("/reservation-confirmed", {
        state: {
          reservationId: docRef.id,
          name: reservationPayload.name,
          email: reservationPayload.email,
          phone: reservationPayload.phone,
          date: reservationPayload.date,
          time: reservationPayload.time,
          guests: reservationPayload.guests,
          dietary: reservationPayload.dietary,
        },
      });
    } catch (err) {
      console.error("Reservation error:", err);

      if (err?.code === "permission-denied") {
        setMessage(
          "Unable to save your reservation (database permissions). Please contact the restaurant."
        );
      } else if (err?.message) {
        setMessage(err.message);
      } else {
        setMessage(
          "Could not complete your reservation. Please try again or call the restaurant."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- SLOT BUTTON UI ---------------- */

  const renderSlotButtons = () => {

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">

      {times.map((time) => {

        const status = slotStatus[time] || "available";

        let bg = "!bg-green-700 hover:!bg-green-600";
if (status === "limited") bg = "!bg-yellow-600 hover:!bg-yellow-500";
if (status === "full") bg = "!bg-gray-700";
        const selected =
          form.time === time
            ? "ring-2 ring-amber-400"
            : "";

        return (
          <button
            key={time}
            type="button"
            disabled={status === "full"}
            onClick={() =>
              setForm({ ...form, time })
            }
            className={`
              py-4
              rounded-lg
              text-lg
              transition
              ${bg}
              ${selected}
            `}
          >
            {time}
          </button>
        );

      })}

    </div>
  );
};

  return (

    <div
      className="min-h-screen flex items-center justify-center pt-32"
      style={{ background: "#1A1614", color: "#E3D5CA" }}
    >

      <div
        className="p-10 rounded-xl w-[520px] shadow-xl"
        style={{
          background: "#201C19",
          border: "1px solid #3D3530"
        }}
      >

        <h1 className="text-4xl text-center mb-8 font-serif">
          Reserve Your Table
        </h1>

        

        {/* STEP INDICATOR */}

        <div className="flex justify-between mb-8 text-sm">

          <span className={step >= 1 ? "font-semibold" : ""}>
            1. Contact
          </span>

          <span className={step >= 2 ? "font-semibold" : ""}>
            2. Verify
          </span>

          <span className={step >= 3 ? "font-semibold" : ""}>
            3. Reservation
          </span>

        </div>

        {/* STEP 1 */}

        {step === 1 && (

  <form
    onSubmit={(e) => {
      e.preventDefault();
      sendOTP();
    }}
    className="flex flex-col gap-5"
  >

    <input
      name="name"
      placeholder="Full Name"
      value={form.name}
      onChange={handleChange}
      required
      className="p-3 rounded bg-[#1A1614]"
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      required
      onChange={handleChange}
      className="p-3 rounded bg-[#1A1614]"
    />

    <button
      type="submit"
      disabled={sendingOTP}
      className="py-2 border border-red-700 rounded disabled:opacity-50"
    >
      {sendingOTP ? "Sending..." : "Send OTP"}
    </button>

  </form>

)}

        {/* STEP 2 */}

        {step === 2 && (

  <form
    onSubmit={(e) => {
      e.preventDefault();
      verifyOTP();
    }}
    className="flex flex-col gap-5"
  >

    <input
  ref={otpInputRef}
  value={otp}
  maxLength={6}
  inputMode="numeric"
  onChange={(e) => setOtp(e.target.value)}
  placeholder="Enter OTP"
  className="p-3 rounded bg-[#1A1614]"
/>

    <button
      type="submit"
      className="py-2 bg-red-700 rounded"
    >
      Verify OTP
    </button>

  </form>

)}

        {/* STEP 3 */}

        {step === 3 && (

  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

    <input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  pattern="[0-9]{10}"
  value={form.phone}
  onChange={handleChange}
  required
  className="p-3 rounded bg-[#1A1614]"
/>

    <input
  type="date"
  name="date"
  value={form.date}
  min={new Date().toISOString().split("T")[0]}
  onChange={handleChange}
  required
  className="p-3 rounded bg-[#1A1614]"
/>

            {form.date && renderSlotButtons()}

            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="p-3 rounded bg-[#1A1614]"
            >

              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
              <option value="7">7 Guests</option>
              <option value="8">8 Guests</option>
              <option value="9">9 Guests</option>
              <option value="10">10 Guests</option>
              <option value="11">11 Guests</option>
              <option value="12">12 Guests</option>
              <option value="13">13 Guests</option>
              <option value="14">14 Guests</option>

            </select>

            <textarea
              name="dietary"
              placeholder="Dietary Preferences"
              value={form.dietary}
              onChange={handleChange}
              className="p-3 rounded bg-[#1A1614]"
            />

            <button
              type="submit"
              disabled={submitting}
              className="py-3 bg-red-700 rounded disabled:opacity-50"
            >
              {submitting ? "Confirming..." : "Confirm Reservation"}
            </button>

          </form>

        )}

        {message && (
          <p className="mt-4 text-center text-yellow-400">
            {message}
          </p>
        )}

      </div>

    </div>

  );

}