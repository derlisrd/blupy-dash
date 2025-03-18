export class VentasAcumuladasMesResponse {
  success: boolean;
  message: string;
  results: VentasAcumuladasMesResults | null;
  status: number;

  constructor({ success = false, message = "", results = null, status = 0 }: Partial<VentasAcumuladasMesResponse>) {
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  }
}
export class VentasAcumuladasMesResults {
  periodo: string;
  total: number;
  blupyDigital: VentasMesResultsDescription | null;
  blupy1DiaFuncionarios: VentasMesResultsDescription | null;
  blupy1DiaAlianzas: VentasMesResultsDescription | null;
  blupy3Cuotas: VentasMesResultsDescription | null;
  blupy3CuotasAlianza: VentasMesResultsDescription | null;
  blupy3CuotasDigital: VentasMesResultsDescription | null;
  blupy4CuotasAlianza: VentasMesResultsDescription | null;

  constructor({
    periodo = "",
    total = 0,
    blupyDigital = null,
    blupy1DiaFuncionarios = null,
    blupy1DiaAlianzas = null,
    blupy3Cuotas = null,
    blupy3CuotasAlianza = null,
    blupy3CuotasDigital = null,
    blupy4CuotasAlianza = null,
  }: Partial<VentasAcumuladasMesResults>) {
    this.periodo = periodo;
    this.total = total;
    this.blupyDigital = blupyDigital;
    this.blupy1DiaFuncionarios = blupy1DiaFuncionarios;
    this.blupy1DiaAlianzas = blupy1DiaAlianzas;
    this.blupy3Cuotas = blupy3Cuotas;
    this.blupy3CuotasAlianza = blupy3CuotasAlianza;
    this.blupy3CuotasDigital = blupy3CuotasDigital;
    this.blupy4CuotasAlianza = blupy4CuotasAlianza;
  }

}

export class VentasMesResultsDescription {
  total: number;
  codigo: number;
  alianza: boolean;
  descripcion: string;

  constructor({ total = 0, codigo = 0, alianza = false, descripcion = "" }: Partial<VentasMesResultsDescription>) {
    this.total = total;
    this.codigo = codigo;
    this.alianza = alianza;
    this.descripcion = descripcion;
  }
}
