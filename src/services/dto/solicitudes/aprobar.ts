export class AprobarSolicitudResponse {
  success: boolean;
  message: string;
  status: number;
  constructor({ success = false, message = "", status = 0 }: Partial<AprobarSolicitudResponse>) {
    this.success = success;
    this.message = message;
    this.status = status;
  }
  static fromJSON(json: AprobarSolicitudResponse): AprobarSolicitudResponse {
    return new AprobarSolicitudResponse({
      success: json.success,
      message: json.message,
      status: json.status
    });
  }
}
