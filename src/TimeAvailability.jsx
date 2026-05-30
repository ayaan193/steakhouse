import { useEffect } from "react";

export default function TimeAvailability({ slotStatus }) {

  const times = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00"
  ];

  return (
    <div className="mt-8 border rounded-xl p-6">
      <h2 className="text-xl mb-4 text-center">
        Available Time Slots
      </h2>

      {times.map((time) => {

        const status = slotStatus?.[time] || "available";

        let color = "text-green-500";
        let label = "Available";

        if (status === "limited") {
          color = "text-yellow-400";
          label = "Limited Seats";
        }

        if (status === "full") {
          color = "text-red-500";
          label = "Fully Booked";
        }

        return (
          <div
            key={time}
            className="flex justify-between border-b py-3"
          >
            <span>{time}</span>
            <span className={color}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}