import { Routes, Route } from "react-router-dom";
import LoginPage from "./login";

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default PublicPages;
