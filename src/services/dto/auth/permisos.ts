export class PermisosResponse {
  success: boolean;
  message: string;
  results: PermisosResults[];
  status: number;

  constructor({ success, message, results, status }: { success: boolean; message: string; results: PermisosResults[]; status: number }) {
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  }

}

export class PermisosResults {
  id: number;
  modulo: string;
  accion: string;

  constructor({ id, modulo, accion }: { id: number; modulo: string; accion: string }) {
    this.id = id;
    this.modulo = modulo;
    this.accion = accion;
  }

}