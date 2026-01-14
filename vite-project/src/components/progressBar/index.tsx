import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [bar, setBar] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      setBar(0);
      return;
    }

    const interval = setInterval(() => {
      setBar((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
        }
        return Math.min(prev + 5, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [show]);

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
        onClick={() => setShow(!show)}
      >
        Toggle
      </button>
    </>
  );
}
