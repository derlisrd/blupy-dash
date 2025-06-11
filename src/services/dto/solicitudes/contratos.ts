export class RecibirContratosResponse{
  success: boolean;
  message: string;
  status: number;
  results: RecibirContratosResults | null;

  constructor({ success, message, status, results }: { success: boolean; message: string; status: number; results: RecibirContratosResults | null }) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.results = results;
  }

  static fromJSON(json: any): RecibirContratosResponse {
    return new RecibirContratosResponse({
      success: json.success,
      message: json.message,
      status: json.status,
      results: json.results ? RecibirContratosResults.fromJSON(json.results) : null
    });
  }
}

export class RecibirContratosResults{
    codigo: number;
    estado: string;

    constructor({ codigo, estado }: { codigo: number; estado: string }) {
        this.codigo = codigo;
        this.estado = estado;
    }
  static fromJSON(json: any): RecibirContratosResults {
    return new RecibirContratosResults({
      codigo: json.micoCodigo,
      estado: json.micoEstado
    });
  }
}