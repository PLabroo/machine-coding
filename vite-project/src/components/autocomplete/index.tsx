import { useEffect, useRef, useState } from "react";

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
export default function Autocomplete() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Array<{ title: string; id: number }>>([]);
  const [status, setStatus] = useState<string>(STATUS.LOADING);

  interface Product {
    id: number;
    title: string;
  }
  const cache = useRef<Record<string, Product[]>>({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        setStatus(STATUS.LOADING);

        if (
          cache.current[query] !== undefined &&
          cache.current[query].length > 0
        ) {
          setData(cache.current[query]);
          setStatus(STATUS.SUCCESS);
          return;
        }
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          {
            signal,
          }
        );
        const data = await res.json();
        cache.current[query] = data.products;
        setData(data.products);
        setStatus(STATUS.SUCCESS);
      } catch (e) {
        if (e.name === "AbortError") return;
        setStatus(STATUS.ERROR);
      }
    };

    const timerID = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerID);
      abortController.abort();
    };
  }, [query]);
  return (
    <>
      <h1 className="text-black font-bold mt-4 mb-10 text-center">
        Autocomplete
      </h1>
      <div className="flex justify-center items-center flex-col gap-5">
        <input
          className="border p-2 rounded-[10px] w-[20%]"
          type="text"
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        {status === STATUS.LOADING && <h1>Loading...</h1>}
        {status === STATUS.ERROR && <h1>Error</h1>}
        {status === STATUS.SUCCESS && (
          <div>
            <ol>
              {data.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
