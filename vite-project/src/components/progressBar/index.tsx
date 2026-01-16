import { useRef, useState, useCallback, useEffect } from "react";

export default function ProgressBar() {
  const [bar, setBar] = useState(0);
  const [show, setShow] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleProgress = useCallback(() => {
    if (show) {
      // Hide: clear + reset
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setBar(0);
    } else {
      // Show: reset + start
      setBar(0);
    }
    setShow(!show);
  }, [show]);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) return;  // Prevent duplicates

    intervalRef.current = setInterval(() => {
      setBar((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  }, []);

  // ✅ Start animation when shown
  useEffect(() => {
    if (show) {
      startAnimation();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [show, startAnimation]);  // Safe deps

  return (
    <>
      <h1 className="text-center font-bold mt-5 mb-10">ProgressBar</h1>
      {show && (
        <div className="relative border-2 border-black rounded-md mx-auto w-[300px] h-[20px] overflow-hidden bg-gray-200">
          <div
            className="absolute h-full bg-green-500 transition-all duration-300 ease-linear"
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
      <button
        className="border p-3 cursor-pointer mx-auto block mt-4"
        onClick={toggleProgress}
      >
        {show ? "Stop" : "Start"}
      </button>
    </>
  );
}
