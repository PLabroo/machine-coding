import { useState } from "react";

function StarRatingDisplay({ starCount }: { starCount: number }) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const handleStarClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    setRating(index + 1);
  };

  const handleHoverInside = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    setHoverRating(index + 1);
  };
  return (
    <div>
      {[...Array(starCount)].map((_, index) => (
        <span
          onMouseEnter={(e) => handleHoverInside(e, index)}
          onMouseLeave={() => setHoverRating(0)}
          className="cursor-pointer"
          style={{
            color:
              (hoverRating || rating) > index
                ? "gold"
                : "black",
          }}
          onClick={(e) => handleStarClick(e, index)}
          key={index}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default function StarRating() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center font-bold mt-2 mb-10">Star Rating</h1>
      <StarRatingDisplay starCount={10} />
    </div>
  );
}
