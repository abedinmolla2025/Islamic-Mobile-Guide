import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Version management to handle cache issues
const APP_VERSION = "noor-v1.1.0";
const storedVersion = localStorage.getItem("app_version");

if (storedVersion !== APP_VERSION) {
  // Clear old cached data if version changed
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem("app_version", APP_VERSION);
  
  // Unregister old service workers to force fresh load
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
    });
  }
  
  // Perform a hard reload
  window.location.reload();
} else {
  localStorage.setItem("app_version", APP_VERSION);
}

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
