import { useState } from "react";

const steps = [
  {
    id: 0,
    label: "Personal Info",
    content: <div>Personal Info</div>,
  },
  {
    id: 1,
    label: "Address",
    content: <div>Address</div>,
  },
  {
    id: 2,
    label: "Summary",
    content: <div>Summary</div>,
  },
  {
    id: 3,
    label: "Payment",
    content: <div>Payment</div>,
  },
];

export default function StepperParent() {
  return <Stepper steps={steps} />;
}
function Stepper({
  steps,
}: {
  steps: { id: number; label: string; content: React.ReactNode }[];
}) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handlePrevious = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };
  return (
    <>
      {steps?.map((step, index) => (
        <div className="step-container" key={step.id}>
          <div className="step">
            <div className={`index ${activeStep >= index && "active"}`}>
              {index + 1}
              {index < steps.length - 1 && <div className="line" />}
            </div>
            <div>{step.label}</div>
            {/* <div>{step.content}</div> */}
          </div>
        </div>
      ))}

      <div className="box-info">
        {steps
          .filter((step) => step.id === activeStep)
          .map((step) => step.content)}
      </div>
      <div className="btns">
        <button onClick={handlePrevious} disabled={activeStep === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Next
        </button>
      </div>
    </>
  );
}
