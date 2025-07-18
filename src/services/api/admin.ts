import { FormAddUserType } from "@/core/types/formadduser";
import { BASE } from "../base";
import { AdminStoreResponse } from "../dto/auth/admin";
import axios from "axios";

export const adminApiService = {
  add: async (token: string | null, form: FormAddUserType) => {
    try {
      const {data, status} = await BASE.post("/admin/add", form, { headers: { Authorization: `Bearer ${token}` } });
      return new AdminStoreResponse({
        success: data.success,
        message: data.message,
        results: data.results,
        status
      });
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
          return new AdminStoreResponse({
            success: false,
            message: error?.response?.data?.message || 'Error',
            results: null,
            status: error.response.status
          })
        }
        return new AdminStoreResponse({
          success: false,
          message: "Error",
          results: null,
          status: 500
        })
    }
  },
  resetPassword: async (token: string | null, form: { password: string, password_confirmation: string, id: number }) => {
    try {
      const {data, status} = await BASE.post("/admin/reset-password", form, { headers: { Authorization: `Bearer ${token}` } });
      return {
        success: data.success as boolean,
        message: data.message as string,
        status
      }
      
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return ({
          success: false,
          message: error?.response?.data?.message as string || "Error",
          status: error.response.status
        });
      }
      return ({
        success: false,
        message: "Error",
        status: 500
      });
    }
  }
};
