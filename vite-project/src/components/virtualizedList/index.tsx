import { useState } from "react";

function VirtualizedListChild({
  list,
  height,
  width,
  itemHeight,
}: {
  list: number[];
  height: number;
  width: number;
  itemHeight: number;
}) {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);
  const visibleList = list.slice(indices[0], indices[1] + 1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + Math.floor(height / itemHeight);
    setIndices([startIndex, endIndex]);
  };
  return (
    <div
      className="virtualized-list-container"
      onScroll={handleScroll}
      style={{ height, width, background: "grey", overflow: "auto" }}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item: number, index: number) => {
          return (
            <div
              className="item"
              style={{
                height: itemHeight,
                background: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                textAlign: "center",
                color: "whitesmoke",
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VirtualizedList() {
  const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="mt-2 mb-5 font-bold ">Virtualized List</h1>
      <VirtualizedListChild
        list={LIST}
        height={400}
        width={300}
        itemHeight={35}
      />
    </div>
  );
}
