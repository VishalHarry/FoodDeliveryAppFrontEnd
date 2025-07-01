import { useEffect, useState } from "react";

function LiveDateTime() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long", // e.g., Tuesday
        year: "numeric",
        month: "long",   // e.g., July
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,    // 12-hour format with AM/PM
      };
      setDateTime(now.toLocaleString("en-US", options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-800 font-medium w-fit">
      {dateTime}
    </div>
  );
}

export default LiveDateTime;
