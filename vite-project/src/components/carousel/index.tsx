import { useEffect, useRef, useState, useCallback } from "react";
import data from "./data.json";
import cn from "classnames";

export default function Carousel() {
  const [index, setIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % data.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  }, []);

  // Start auto-play interval
  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNext]);

  // Pause/resume on hover
  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    intervalRef.current = setInterval(handleNext, 3000);
  }, [handleNext]);

  return (
    <>
      <h1 className="mt-5 mb-5 text-center font-bold text-2xl text-gray-800">
        Carousel
      </h1>
      <div className="relative w-full max-w-4xl mx-auto h-[450px]">
        {/* Left Button - positioned relative to container */}
        <button
          onClick={handlePrevious}
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 z-20 bg-black/90 text-white p-2 rounded-2xl w-12 h-12 flex items-center justify-center text-xl font-bold shadow-2xl hover:bg-black active:bg-gray-800 transition-all duration-200 border border-white/20"
        >
          ‹
        </button>

        {/* Image - fills entire container */}
        <img
          src={data[index].download_url}
          alt={`Slide ${index + 1}`}
          className="carousel-img w-full h-full object-cover rounded-3xl shadow-2xl absolute inset-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="cursor-pointer absolute -right-10 top-1/2 -translate-y-1/2  bg-black/90 text-white p-2 rounded-2xl w-12 h-12 flex items-center justify-center text-xl font-bold shadow-2xl hover:bg-black active:bg-gray-800 transition-all duration-200 border border-white/20"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === i
                ? "bg-blue-600 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </>
  );
}
