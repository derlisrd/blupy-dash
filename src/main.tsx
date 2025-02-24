import ReactDOM from "react-dom/client";
import App from "./app";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
