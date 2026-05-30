import { Link, useLocation } from "react-router-dom";

export default function ReservationConfirmed(){

  const location = useLocation();
  const reservation = location.state;

  return(

    <div
      className="min-h-screen flex items-center justify-center"
      style={{background:"#1A1614", color:"#E3D5CA"}}
    >

      <div
        className="p-10 rounded-xl text-center w-[520px]"
        style={{
          background:"#201C19",
          border:"1px solid #3D3530"
        }}
      >

        <h1 className="text-4xl mb-6 font-serif">
          Reservation Confirmed
        </h1>

        <p className="mb-6">
          Your table has been successfully reserved.
          A confirmation email has been sent.
        </p>

        {reservation && (

          <div
            className="text-left p-6 rounded-lg mb-6"
            style={{
              background:"#1A1614",
              border:"1px solid #3D3530"
            }}
          >

            <p><b>Reservation ID:</b> {reservation.reservationId}</p>
            {reservation.name && <p><b>Name:</b> {reservation.name}</p>}
            {reservation.email && <p><b>Email:</b> {reservation.email}</p>}
            {reservation.phone && <p><b>Phone:</b> {reservation.phone}</p>}
            <p><b>Date:</b> {reservation.date}</p>
            <p><b>Time:</b> {reservation.time}</p>
            <p><b>Guests:</b> {reservation.guests}</p>
            {reservation.dietary && (
              <p><b>Dietary notes:</b> {reservation.dietary}</p>
            )}

          </div>

        )}

        <Link
          to="/"
          className="px-6 py-3 rounded"
          style={{
            background:"#8B0000",
            color:"#E3D5CA"
          }}
        >
          Back to Home
        </Link>

      </div>

    </div>

  )

}