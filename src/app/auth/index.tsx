import AuthMenuLayout from "@/layout/auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Clientes from "./clientes";

function AuthPages() {
  return (
    <Routes>
      <Route path="/" element={<AuthMenuLayout />}>
        <Route index element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default AuthPages;
