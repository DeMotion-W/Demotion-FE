import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { worker } from "@shared/mocks/browser";
import "@index.css";
import App from "@/App";

if (import.meta.env.MODE === "development") {
  worker.start().then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
