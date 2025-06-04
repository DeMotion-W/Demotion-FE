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
  position?: "top" | "center";
}

interface ToastContextValue {
  showToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (toast: Toast) => {
    setToast(toast);
    setToastVisible(true); // 등장

    // 250ms 후 사라지기 시작
    setTimeout(() => {
      setToastVisible(false); // 페이드 아웃
    }, 1000);

    // 완전히 제거
    setTimeout(() => {
      setToast(null);
    }, 1300);
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
        <div
          className={`fixed z-50 transform -translate-x-1/2
      ${
        toast.position === "center"
          ? "top-1/2 left-1/2 -translate-y-1/2"
          : "top-6 left-1/2"
      }
      transition-all duration-300 ease-in-out
    ${
      toastVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }
    `}
        >
          <div
            className={`px-6 py-3 rounded-lg shadow-md text-white transition-opacity duration-300 font-semibold
            ${
              toast.type === "success" ? "bg-[#191F28]" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
