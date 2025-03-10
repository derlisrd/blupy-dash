export class VentasAcumuladasResponse {
  success: boolean;
  message: string;
  results: VentasAcumuladasResults | null;
  status: number;

  constructor({ success = false, message = '', results = null, status = 0} : Partial<VentasAcumuladasResponse> ){
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  } 


}

export class VentasAcumuladasResults {
  total: number
    blupyDigital: number;
    blupy1Dia: number
    blupy3Cuotas: number
    blupy3CuotasAso: number
    blupy3CuotasDigital: number
    blupy4CuotasAso: number

    constructor({ total = 0, blupyDigital = 0, blupy1Dia = 0, blupy3Cuotas = 0, blupy3CuotasAso = 0, blupy3CuotasDigital = 0, blupy4CuotasAso = 0 }: Partial<VentasAcumuladasResults>) {
      this.total = total;
      this.blupyDigital = blupyDigital;
      this.blupy1Dia = blupy1Dia;
      this.blupy3Cuotas = blupy3Cuotas;
      this.blupy3CuotasAso = blupy3CuotasAso;
      this.blupy3CuotasDigital = blupy3CuotasDigital;
      this.blupy4CuotasAso = blupy4CuotasAso;
    }

}