import { useCallback, useEffect, useState } from "react";

function InfiniteScrollChild({
  data,
  handlePageChange,
}: {
  data: Array<{ download_url: string; id: number }>;
  handlePageChange: () => void;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (param) => {
        if (param[0].isIntersecting) {
          observer.unobserve(lastImage as Element);
          handlePageChange();
        }
      },
      {
        threshold: 0.5,
      }
    );

    const lastImage = document.querySelector(".post:last-child");
    if (!lastImage) return;
    observer.observe(lastImage);

    return () => {
      if (lastImage) observer.unobserve(lastImage);
      observer.disconnect();
    };
  }, [data, handlePageChange]);
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      {data.map((item) => (
        <img
          key={item.id}
          src={item.download_url}
          alt="image"
          className="post object-cover w-[200px] h-[300px]"
        />
      ))}
    </div>
  );
}

export default function InfiniteScroll() {
  const [data, setData] = useState<Array<{ download_url: string; id: number }>>(
    []
  );
  const [page, setPage] = useState<number>(1);

  const handlePageChange = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`)
      .then((res) => res.json())
      .then((data) => setData((oldData) => [...oldData, ...data]));
  }, [page]);

  console.log("data", data);
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center font-bold mt-2 mb-10">Infinite Scroll</h1>

      <InfiniteScrollChild data={data} handlePageChange={handlePageChange} />
    </div>
  );
}
