import { Link, useLocation } from "react-router-dom";

export default function ReservationConfirmed() {

  const location = useLocation();
  const reservation = location.state;

  const rows = reservation
    ? [
        ["Reservation ID", reservation.reservationId],
        ["Name", reservation.name],
        ["Email", reservation.email],
        ["Phone", reservation.phone],
        ["Date", reservation.date],
        ["Time", reservation.time],
        ["Guests", reservation.guests],
        ["Dietary notes", reservation.dietary],
      ].filter(([, value]) => value !== undefined && value !== null && value !== "")
    : [];

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
        className="w-full max-w-[560px] p-6 sm:p-10 rounded-2xl text-center shadow-2xl"
        style={{
          background: "#201C19",
          border: "1px solid #3D3530"
        }}
      >

        {/* Check mark */}
        <span
          className="mx-auto mb-6 grid place-items-center w-16 h-16 rounded-full text-3xl"
          style={{
            background: "rgba(240,168,30,0.12)",
            border: "1px solid rgba(240,168,30,0.5)",
            color: "#f0a81e",
          }}
          aria-hidden="true"
        >
          ✓
        </span>

        <h1 className="font-[Cinzel] text-3xl sm:text-4xl text-white mb-4">
          Reservation Confirmed
        </h1>

        <p className="mb-7 text-[#E3D5CA]/80 text-sm sm:text-base">
          Your table has been successfully reserved.
          A confirmation email is on its way.
        </p>

        {rows.length > 0 && (
          <div
            className="text-left p-5 sm:p-6 rounded-xl mb-8"
            style={{
              background: "#1A1614",
              border: "1px solid #3D3530"
            }}
          >
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 py-2.5 border-b border-[#3D3530] last:border-b-0 text-sm"
              >
                <span className="font-[Cinzel] text-[0.62rem] tracking-[0.2em] uppercase text-[#E3D5CA]/55 pt-0.5 whitespace-nowrap">
                  {label}
                </span>
                <span className="text-right break-all text-[#E3D5CA]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center font-[Cinzel] font-semibold text-sm tracking-wider rounded-full px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#f0a81e",
              color: "#241400",
              boxShadow: "0 8px 26px rgba(240,168,30,0.3)",
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center font-[Cinzel] text-sm tracking-wider rounded-full px-8 py-3.5 border border-[#3D3530] text-[#E3D5CA] hover:border-[#f0a81e]/60 hover:text-[#f0a81e] transition-all duration-200"
          >
            Browse the Menu
          </Link>
        </div>

      </div>
    </div>
  );
}