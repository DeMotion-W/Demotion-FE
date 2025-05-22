"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Toast {
  type: "success" | "error";
  message: string;
}

interface ToastContextValue {
  showToast: (toast: Toast) => void;
}

const ToastContext =
  createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error(
      "useToast must be used within ToastProvider"
    );
  return context;
}

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (toast: Toast) => {
    setToast(toast);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-md text-white transition-opacity duration-300 font-semibold
            ${
              toast.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
