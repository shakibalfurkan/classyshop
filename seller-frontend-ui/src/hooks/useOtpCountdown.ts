import { useEffect, useState } from "react";

export function useOtpCountdown(initialTime = 60) {
  const [timeLeft, setTimeLeft] = useState(0);

  const start = () => setTimeLeft(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return {
    timeLeft,
    start,
    isActive: timeLeft > 0,
  };
}
