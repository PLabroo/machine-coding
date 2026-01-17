import { useState } from "react";
import data from "./data.json";

function FileExplorer1Child({
  folderData,
}: {
  folderData: {
    name: string;
    type: string;
    children?: { name: string; type: string }[];
  };
}) {
  const [showChildren, setShowChildren] = useState<boolean>(false);

  const handleClick = () => setShowChildren(!showChildren);
  return (
    <div className="border-l border-black pl-2">
        {folderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}
        <span className="ml-1 cursor-pointer" onClick={handleClick}>
          {folderData.name}
        </span>
      <div/>
      {showChildren &&
        folderData?.children?.map((child) => (
          <FileExplorer1Child folderData={child} />
        ))}
    </div>
  );
}

export default function FileExplorer1() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center font-bold mt-2 mb-10">File Explorer</h1>
      <FileExplorer1Child folderData={data} />
    </div>
  );
}
