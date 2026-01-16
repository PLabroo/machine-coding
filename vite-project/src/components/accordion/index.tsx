import { useState } from "react";
import data from "./data.json";

function AccordionChild({
  qna,
}: {
  qna: { question: string; answer: string };
}) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="border border-black p-2 mt-1 mb-2 relative">
      <div className="cursor-pointer">
        {qna.question}
        <span onClick={() => setShow(!show)} className="absolute right-1.5">
          {show ? "-" : "+"}
        </span>
      </div>
      {show && <p className="text-gray-700">{qna.answer}</p>}
    </div>
  );
}
export default function Accordion() {
  const faqs = data.faqs;
  return (
    <>
      <h1 className="text-center font-bold mt-5 mb-10">Accordion</h1>
      <div className="w-[80%] mx-auto">
        {faqs.map(
          (faq: { question: string; answer: string }, index: number) => (
            <AccordionChild key={index} qna={faq} />
          )
        )}
      </div>
    </>
  );
}
