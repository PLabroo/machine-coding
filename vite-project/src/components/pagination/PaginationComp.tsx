export default function PaginationControls({
  page,
  limit,
  setPage,
  setLimit,
}: {
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const previousThreeNos = Array.from(
    { length: 3 },
    (_, index) => page - index - 1
  )
    .filter((item) => item > 0)
    .reverse();

  const nextThreeNos = Array.from({ length: 3 }, (_, index) => page + index);

  const resultantPaginationArr = [...previousThreeNos, ...nextThreeNos];
  return (
    <>
      <div className="mt-10 flex align-center justify-evenly flex-wrap">
        {page > 1 && (
          <button className="cursor-pointer p-2" onClick={handlePrevious}>
            Previous
          </button>
        )}

        {resultantPaginationArr.map((item) => (
          <button
            className={`px-3 py-1 rounded
            bg-black text-white
            disabled:bg-white disabled:text-black
            disabled:border disabled:border-black cursor-pointer`}
            key={item}
            disabled={item === page}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded
            bg-black text-white cursor-pointer"
          disabled={page === limit}
          onClick={handleNext}
        >
          Next
        </button>
        {/* component for limit change */}
      </div>
      <div className="mt-4 flex justify-center align-center gap-2">
        <label>Limit Change</label>
        <select
          className="px-3 py-1 rounded
            bg-black text-white cursor-pointer"
          value={limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLimit(e.target.value as unknown as number)
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </>
  );
}
