import { BASE } from "../base";

export const authApiService = {
    login: async (username: string, password: string) => {
        const res = await BASE.post('/auth/login', { username, password });
        return res;
    },
    logout: async () => {
        const res = await BASE.post('/auth/logout');
        return res;
    },
}