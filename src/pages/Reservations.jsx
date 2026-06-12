import { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";

const inputClass =
  "w-full p-3.5 rounded-lg bg-[#15110d] border border-[#3D3530] text-[#E3D5CA] placeholder-[#E3D5CA]/40 focus:outline-none focus:border-[#f0a81e]/70 focus:ring-1 focus:ring-[#f0a81e]/50 transition";

const steps = ["Contact", "Verify", "Reserve"];

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

  /* ---------------- QUERY SLOT AVAILABILITY ---------------- */

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
          headers: { "Content-Type": "application/json" },
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
      setSendingOTP(false);
    }
  };

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
      <div>
        <p className="font-[Cinzel] text-[0.65rem] tracking-[0.3em] uppercase text-[#E3D5CA]/60 mb-3">
          Choose a Time
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {times.map((time) => {
            const status = slotStatus[time] || "available";
            const isSelected = form.time === time;
            const isFull = status === "full";

            return (
              <button
                key={time}
                type="button"
                disabled={isFull}
                onClick={() => setForm({ ...form, time })}
                className={`
                  relative py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200
                  border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a81e]
                  ${isFull
                    ? "!bg-[#241e1a] !text-white/25 border-transparent cursor-not-allowed line-through"
                    : isSelected
                      ? "!bg-[#f0a81e] !text-[#241400] border-[#f0a81e] shadow-[0_6px_18px_rgba(240,168,30,0.35)]"
                      : "!bg-[#15110d] !text-[#E3D5CA] border-[#3D3530] hover:border-[#f0a81e]/60"}
                `}
              >
                {time}
                {status === "limited" && !isFull && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-[#E3D5CA]/55">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f0a81e]" /> Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400" /> Limited seats
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/25" /> Fully booked
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen px-4 pb-16 flex items-start sm:items-center justify-center"
      style={{
        background:
          "radial-gradient(90% 100% at 50% 0%, #241c14 0%, #15110d 65%)",
        color: "#E3D5CA",
        paddingTop: "calc(var(--navbar-height, 64px) + 2.5rem)",
      }}
    >

      <div
        className="w-full max-w-[560px] p-6 sm:p-10 rounded-2xl shadow-2xl"
        style={{
          background: "#201C19",
          border: "1px solid #3D3530"
        }}
      >

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="font-[Cinzel] text-[#f0a81e] text-[0.62rem] tracking-[0.45em] uppercase mb-3">
            Since 1965
          </p>
          <h1 className="font-[Cinzel] text-3xl sm:text-4xl text-white">
            Reserve Your Table
          </h1>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-between mb-9 px-1">
          {steps.map((label, i) => {
            const n = i + 1;
            const isDone = step > n;
            const isCurrent = step === n;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid place-items-center w-8 h-8 rounded-full text-xs font-semibold border transition-colors
                      ${isDone || isCurrent
                        ? "bg-[#f0a81e] text-[#241400] border-[#f0a81e]"
                        : "bg-transparent text-[#E3D5CA]/40 border-[#3D3530]"}`}
                  >
                    {isDone ? "✓" : n}
                  </span>
                  <span
                    className={`font-[Cinzel] text-[0.6rem] tracking-[0.18em] uppercase whitespace-nowrap
                      ${isCurrent ? "text-[#f0a81e]" : "text-[#E3D5CA]/45"}`}
                  >
                    {label}
                  </span>
                </div>
                {n < steps.length && (
                  <span
                    className={`flex-1 h-px mx-2 sm:mx-3 -mt-5 ${
                      isDone ? "bg-[#f0a81e]/70" : "bg-[#3D3530]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* STEP 1 — CONTACT */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendOTP();
            }}
            className="flex flex-col gap-4"
          >
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              required
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              className={inputClass}
            />

            <button
              type="submit"
              disabled={sendingOTP}
              className="menu-cta mt-1 py-3.5 font-[Cinzel] font-semibold tracking-wider !rounded-full transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {sendingOTP ? "Sending…" : "Send Verification Code"}
            </button>

            <p className="text-xs text-center text-[#E3D5CA]/50 mt-1">
              We&apos;ll email you a 6-digit code to confirm your booking.
            </p>
          </form>
        )}

        {/* STEP 2 — VERIFY */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyOTP();
            }}
            className="flex flex-col gap-4"
          >
            <p className="text-sm text-center text-[#E3D5CA]/70">
              Enter the code sent to{" "}
              <span className="text-[#f0a81e] break-all">{form.email}</span>
            </p>

            <input
              ref={otpInputRef}
              value={otp}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="• • • • • •"
              className={`${inputClass} text-center text-2xl tracking-[0.5em] font-[Cinzel]`}
            />

            <button
              type="submit"
              className="menu-cta py-3.5 font-[Cinzel] font-semibold tracking-wider !rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              Verify Code
            </button>

            <button
              type="button"
              onClick={sendOTP}
              disabled={sendingOTP}
              className="!bg-transparent !p-0 text-xs text-[#E3D5CA]/55 hover:text-[#f0a81e] transition underline underline-offset-4 disabled:opacity-50"
            >
              {sendingOTP ? "Resending…" : "Resend code"}
            </button>
          </form>
        )}

        {/* STEP 3 — RESERVATION */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              value={form.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
              className={inputClass}
            />

            {form.date && renderSlotButtons()}

            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={inputClass}
            >
              {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>

            <textarea
              name="dietary"
              placeholder="Dietary preferences (optional)"
              value={form.dietary}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />

            <button
              type="submit"
              disabled={submitting}
              className="menu-cta py-4 font-[Cinzel] font-semibold tracking-wider !rounded-full transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {submitting ? "Confirming…" : "Confirm Reservation"}
            </button>
          </form>
        )}

        {message && (
          <p
            className="mt-5 text-center text-sm rounded-lg px-4 py-3"
            style={{
              background: "rgba(240,168,30,0.08)",
              border: "1px solid rgba(240,168,30,0.3)",
              color: "#f0c462",
            }}
          >
            <span>{message}</span>
          </p>
        )}

        <p className="mt-7 text-center text-xs text-[#E3D5CA]/45">
          Prefer to call?{" "}
          <a href="tel:+919986011112" className="text-[#f0a81e] hover:underline">
            +91 99860 11112
          </a>
        </p>
      </div>
    </div>
  );
}