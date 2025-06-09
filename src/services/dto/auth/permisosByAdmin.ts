export class PermisosByAdminResponse {
  success: boolean;
  message: string;
  results: PermisosByAdminResults[];
  status: number;

  constructor({ success = false, message = "", results = [], status = 0 } : Partial<PermisosByAdminResponse>){
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  }
}

export class PermisosByAdminResults {
  id: number;
  admin_id: number;
  permiso_id: number;

  constructor({ id = 0, admin_id = 0, permiso_id = 0 } : Partial<PermisosByAdminResults>){
    this.id = id;
    this.admin_id = admin_id;
    this.permiso_id = permiso_id;
  }

}