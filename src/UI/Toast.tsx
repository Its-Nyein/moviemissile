// Toast.tsx
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [show, onClose]);

  if (!show) return null;

  let toastClass = "";
  if (type === "success") {
    toastClass = "bg-green-500 text-white";
  } else if (type === "error") {
    toastClass = "bg-red-500 text-white";
  } else if (type === "info") {
    toastClass = "bg-blue-500 text-white";
  }

  return (
    <div
      className={`fixed bottom-12 z-50 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${toastClass}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => setShow(false)}
          className="ml-4 text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
