import { useEffect, useRef, useState, useCallback } from "react";

type Time = "hour" | "minute" | "second";

export default function StopWatch() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);
  const [time, setTime] = useState<{
    hour: number;
    minute: number;
    second: number;
  }>({ hour: 0, minute: 0, second: 0 });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: Time) => {
      const inputValue = parseInt(e.target.value, 10) || 0;
      const maxValues = { hour: 99, minute: 59, second: 59 };

      setTime((prev) => {
        const newTime = { ...prev, [value]: inputValue };

        if (value === "second") {
          newTime.minute = Math.min(
            maxValues.minute,
            prev.minute + Math.floor(inputValue / 60)
          );
          newTime.second = inputValue % 60;
        } else if (value === "minute") {
          newTime.hour = Math.min(
            maxValues.hour,
            prev.hour + Math.floor(inputValue / 60)
          );
          newTime.minute = inputValue % 60;
        }

        return newTime;
      });
    },
    []
  );

  const handleStart = useCallback(() => {
    if (time.hour === 0 && time.minute === 0 && time.second === 0) {
      return;
    }
    setIsTimeRunning(true);
  }, [time.hour, time.minute, time.second]);

  const handlePause = useCallback(() => {
    setIsTimeRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsTimeRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setTime({ hour: 0, minute: 0, second: 0 });
  }, []);

  useEffect(() => {
    if (
      isTimeRunning &&
      (time.hour > 0 || time.minute > 0 || time.second > 0)
    ) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev.second > 0) {
            return { ...prev, second: prev.second - 1 };
          }

          if (prev.minute > 0) {
            return {
              ...prev,
              second: 59,
              minute: prev.minute - 1,
            };
          }

          if (prev.hour > 0) {
            return {
              ...prev,
              second: 59,
              minute: 59,
              hour: prev.hour - 1,
            };
          }

          // Time reached 00:00:00
          handlePause();
          return prev;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimeRunning, handlePause]);

  const formatTime = (unit: number) => unit.toString().padStart(2, "0");

  return (
    <>
      <h1 className="text-center font-bold mt-2 mb-10">StopWatch</h1>
      <div className="mx-auto flex justify-center items-center gap-4 mb-8">
        <input
          className="border border-black h-[40px] w-[60px] p-2 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          min="0"
          max="99"
          placeholder="HH"
          value={formatTime(time.hour)}
          onChange={(e) => handleChange(e, "hour")}
        />
        :
        <input
          className="border border-black h-[40px] w-[60px] p-2 text-center"
          type="number"
          min="0"
          max="59"
          placeholder="MM"
          value={formatTime(time.minute)}
          onChange={(e) => handleChange(e, "minute")}
        />
        :
        <input
          className="border border-black h-[40px] w-[60px] p-2 text-center"
          type="number"
          min="0"
          max="59"
          placeholder="SS"
          value={formatTime(time.second)}
          onChange={(e) => handleChange(e, "second")}
        />
      </div>

      <div className="flex justify-center items-center gap-5">
        <button
          onClick={isTimeRunning ? handlePause : handleStart}
          className="border border-black px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {isTimeRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="border border-black px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </>
  );
}
