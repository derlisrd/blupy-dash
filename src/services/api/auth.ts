import { BASE } from "../base";
import { LoginResponse, LoginResults } from "../dto/auth/login";

export const authApiService = {
  login: async (email: string, password: string) => {
    try {
      const { data, status } = await BASE.post("/login", { email, password });
      return new LoginResponse({ success: data.success, message: data.message, results: data.results ? new LoginResults(data.results) : null, status: status });
    } catch (error) {
      if (error instanceof Error) {
        return new LoginResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new LoginResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  },
  check: async (token: string) => {
    try {
      const { data } = await BASE.get("/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data.success as boolean
    } catch (error) {
      throw error;
    }
  }
};
