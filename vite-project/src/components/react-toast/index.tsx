import { useCallback, useEffect, useRef, useState } from "react";

export default function ReactToast() {
  const [toasts, setToasts] = useState<
    Array<{ type: string; message: string; id: number }>
  >([]);

  const timerRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const handleCancel = useCallback((id: number) => {
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  }, []);

  const handleAdd = useCallback((type: string, message: string) => {
    const id = new Date().getTime();
    const newToast = { type, message, id };
    setToasts((prev) => [...prev, newToast]);

    timerRef.current[id] = setTimeout(() => handleCancel(id), 5000);
  }, []);

  // Cleanup if component unmounts and toasts/timers are still running
  useEffect(() => {
    return () => {
      Object.values(timerRef.current).forEach(clearTimeout);
      timerRef.current = {};
    };
  }, []);
  return (
    <>
      <div className="toast-section">
        {toasts.map(
          ({
            id,
            type,
            message,
          }: {
            id: number;
            type: string;
            message: string;
          }) => (
            <div className={`toast ${type}`}>
              {message}
              <span onClick={() => handleCancel(id)} className="cross">
                X
              </span>
            </div>
          )
        )}
      </div>

      <div className="toast-container">
        <button onClick={() => handleAdd("success", "Success Toast")}>
          Success Toast
        </button>
        <button onClick={() => handleAdd("warning", "Warning Toast")}>
          Warning Toast
        </button>
        <button onClick={() => handleAdd("error", "Error Toast")}>
          Error Toast
        </button>
        <button onClick={() => handleAdd("info", "Info Toast")}>
          Info Toast
        </button>
      </div>
    </>
  );
}
