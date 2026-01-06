import { useEffect, useRef, useState, useCallback } from "react";

export default function Otp({ otpLength = 6 }: { otpLength?: number }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const inputRef = useRef<HTMLInputElement[]>([]);

  const updateRefs = useCallback((index: number, el: HTMLInputElement) => {
    inputRef.current[index] = el;
  }, []);

  const focusInput = useCallback((index: number) => {
    setTimeout(() => {
      inputRef.current[index]?.focus();
      inputRef.current[index]?.select();
    }, 0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;

      if (key === "Backspace") {
        const newOtpFields = [...otpFields];
        newOtpFields[index] = "";
        setOtpFields(newOtpFields);

        if (index > 0) {
          focusInput(index - 1);
        }
        e.preventDefault();
        return;
      }

      if (key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
        return;
      }

      if (key === "ArrowRight" && index < otpLength - 1) {
        e.preventDefault();
        focusInput(index + 1);
        return;
      }

      if (!/[0-9]/.test(key)) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const newOtpFields = [...otpFields];
      newOtpFields[index] = key;
      setOtpFields(newOtpFields);

      if (index < otpLength - 1) {
        focusInput(index + 1);
      }
    },
    [otpFields, otpLength, focusInput]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);
      const newOtpFields = [...otpFields];
      newOtpFields[index] = value;
      setOtpFields(newOtpFields);

      if (value && index < otpLength - 1) {
        focusInput(index + 1);
      }
    },
    [otpFields, otpLength, focusInput]
  );

  // Initialize refs and focus first input
  useEffect(() => {
    inputRef.current = new Array(otpLength).fill("");

    // Focus first input after refs are set
    setTimeout(() => {
      focusInput(0);
    }, 0);
  }, [otpLength, focusInput]);

  return (
    <div className="container">
      {otpFields.map((_, index) => (
        <input
          ref={(el) => updateRefs(index, el as HTMLInputElement)}
          className="inputbox"
          key={`otp-${index}`}
          value={otpFields[index]}
          maxLength={1}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
}
