import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
}

export default PublicPages;
