import { useState } from "react";

const steps = [
  { id: 0, label: "Personal Info", content: <div>Personal Info</div> },
  { id: 1, label: "Address", content: <div>Address</div> },
  { id: 2, label: "Summary", content: <div>Summary</div> },
  { id: 3, label: "Payment", content: <div>Payment</div> },
];

export default function StepperParent() {
  return <Stepper steps={steps} alignmentDirection="horizontal" />;
}

function Stepper({
  steps,
  alignmentDirection = "vertical",
}: {
  steps: { id: number; label: string; content: React.ReactNode }[];
  alignmentDirection?: "horizontal" | "vertical";
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={`stepper ${alignmentDirection}`}>
      {/* Steps */}
      <div className="steps-wrapper">
        {steps.map((step, index) => (
          <div className="step-container" key={step.id}>
            <div className="step">
              <div className={`index ${activeStep >= index ? "active" : ""}`}>
                {index + 1}
                {index < steps.length - 1 && <div className="line" />}
              </div>
              <div className="label">{step.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="box-info">{steps[activeStep].content}</div>

      {/* Actions */}
      <div className="btns">
        <button
          onClick={() => setActiveStep((p) => p - 1)}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setActiveStep((p) => p + 1)}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
