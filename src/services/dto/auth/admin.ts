export class AdminResponse {
  success: boolean = false;
  message: string = "";
  results: AdminResults[] = [];
  status: number = 0;

  constructor({ success = false, message = "", results = [], status = 0 }: Partial<AdminResponse>) {
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  }}

export class AdminResults{
    id: number = 0;
    username: string = '';
    email: string = '';
    role: string = '';
    created_at: string = '';
    updated_at: string = '';

  constructor({ id = 0, username = "", email = "", role = "", created_at = "", updated_at = "" }: Partial<AdminResults>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}