"use client";

import { useEffect, useState } from "react";

function format(date: Date) {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first tick must run client-only to avoid a server/client time mismatch
    setTime(format(new Date()));
    const id = window.setInterval(() => setTime(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="footerClock mono" suppressHydrationWarning>
      Ames, IA {time ?? "--:--:--"}
    </p>
  );
}
