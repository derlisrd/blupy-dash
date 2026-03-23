import { BASE } from "../base";

export const validacionesApiService = {
  validaciones: async (token: string | null) => {
    try {
      const { data } = await BASE.get(`/validaciones/ultimas`, { headers: { Authorization: `Bearer ${token}` } });
      return data;
    } catch (error) {
        throw new Error("Ha ocurrido un error al obtener las validaciones");
    }
  }
};
