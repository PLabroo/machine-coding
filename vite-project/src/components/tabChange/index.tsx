import { useState } from "react";

const tabData = [
  {
    id: 1,
    name: "Tab 1",
    content: "Tab 1 Content",
  },
  {
    id: 2,
    name: "Tab 2",
    content: "Tab 2 Content",
  },
  {
    id: 3,
    name: "Tab 3",
    content: "Tab 3 Content",
  },
];

function TabChangeChild({
  tabData,
}: {
  tabData: { id: number; name: string; content: string }[];
}) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    <div>
      <div className="flex justify-between items-center">
        {tabData.map(
          (
            tab: { id: number; name: string; content: string },
            index: number,
          ) => (
            <button
              onClick={() => setCurrentTab(index)}
              key={tab.id}
              className={`cursor-pointer border p-1.5 ${
                currentTab === index ? "border-b-0" : ""
              }`}
            >
              {tab.name}
            </button>
          ),
        )}
      </div>
      <div className="h-[10rem] w-[10rem] border border-black border-t-0 flex justify-center items-center">
        {tabData[currentTab].content}
      </div>
    </div>
  );
}
export default function TabChange() {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-center font-bold mt-2 mb-10">Tab Change</h1>
        <TabChangeChild tabData={tabData} />
      </div>
    </>
  );
}
