export type FormAddUserType = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "moderator" | '';
  password_confirmation: string;
}