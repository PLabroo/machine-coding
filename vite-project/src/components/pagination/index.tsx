import { useEffect, useState } from "react";
import PaginationControls from "./PaginationComp";

export default function Pagination() {
  const [data, setData] = useState<Array<{ download_url: string }>>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
        );
        setData(await res.json());
      } catch (e) {
        console.log("Error", e);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page, limit]);

  return (
    <div className="w-[100%] mt-4">
      <h1 className="mb-5 font-bold text-center">Pagination</h1>
      <div className="flex align-center justify-evenly flex-wrap gap-5">
        {isLoading && <h1 className="text-black">Loading...</h1>}
        {!isLoading &&
          data.map((item) => (
            <img src={item.download_url} alt="" className="pagination-img flex-1" />
          ))}
      </div>
      <PaginationControls
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
}
