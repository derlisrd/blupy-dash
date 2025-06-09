import axios from "axios";
import { BASE } from "../base";
import { AdminResponse } from "../dto/auth/admin";
import { PermisosResponse } from "../dto/auth/permisos";
import { PermisosByAdminResponse } from "../dto/auth/permisosByAdmin";

export const permisosApiService = {
  usersAdministradores: async (token: string | null): Promise<AdminResponse> => {
    try {
      const { data, status } = await BASE.get("/permisos/users-administradores", { headers: { Authorization: `Bearer ${token}` } });

      return new AdminResponse({ success: true, message: data.message, results: data.results, status: status });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return new AdminResponse({ success: false, message: error.response?.data.message, results: [], status: 500 });
      }
      return new AdminResponse({ success: false, message: "Error desconocido", results: [], status: 500 });
    }
  },
  lista: async(token: string | null)=>{
    try {
      const { data, status } = await BASE.get("/permisos", { headers: { Authorization: `Bearer ${token}` } });
      return new PermisosResponse ({ success: data.success as boolean, message: data.message, results: data.results,status });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return new PermisosResponse({ success: false, message: error.response?.data.message, results: [], status: 500 });
      }
      return new PermisosResponse ({ success: false, message: "Error desconocido", results: [], status: 500 });
    }
  },
  byAdmin: async(token: string | null, id: number) =>{
    try {
      const {data, status} = await BASE.get(`/permisos/by-admin/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      return new PermisosByAdminResponse({ success: data.success as boolean, message: '', results: data.results, status: status });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return new PermisosByAdminResponse({ success: false, message: error.response?.data.message, results: [], status: 500 });
      }
      return new PermisosByAdminResponse({ success: false, message: "Error desconocido", results: [], status: 500 });
    }
  },
  asignar: async(token: string | null, id: number, permisos: number[]) =>{
    try {
      const {data, status} = await BASE.post(`/permisos/asignar`, { permisos, admin_id: id }, { headers: { Authorization: `Bearer ${token}` } });
      return { success: data.success as boolean, message: data.message, status: status };
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.response?.data.message, status: error.response?.status };
      }
      return { success: false, message: "Error desconocido", status: 500 };
    }
  },
  revocar: async(token: string | null, id: number, permisos: number[]) =>{
    try {
      const {data, status} = await BASE.post(`/permisos/revocar`, { permisos, admin_id: id }, { headers: { Authorization: `Bearer ${token}` } });
      return { success: data.success as boolean, message: data.message, status: status };
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.response?.data.message, status: error.response?.status };
      }
      return { success: false, message: "Error desconocido", status: 500 };
    }
  },
}