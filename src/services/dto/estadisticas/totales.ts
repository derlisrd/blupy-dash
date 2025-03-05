export class TotalesResponse {
  success: boolean;
  message: string;
  status: number;
  results: TotalesResults | null;

  constructor({ success = false, status = 0, results = null, message = "" }: Partial<TotalesResponse>) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.results = results;
  }
}
export class TotalesResults {
  registrosTotales: number;
  registrosAyer: number;
  registrosHoy: number;
  registrosSemana: number;
  registrosMes: number;
  registrosMesFuncionarios: number;
  registrosMesAso: number;
  registrosMesDigital: number;
  registroDelAnio: number;
  funcionarios: number;
  asociaciones: number;
  externos: number;
  solicitudesPendientes: number;
  porcentajeRechazo: string;
  pendientesHoy: number;
  pendientesSemana: number;
  pendientesMes: number;
  solicitudesVigentes: number;
  vigentesHoy: number;
  vigentesSemana: number;
  vigentesMes: number;
  vigentesDelAnio: number;
  solicitudesRechazadas: number;
  rechazadosHoy: number;
  rechazadosSemana: number;
  rechazadosMes: number;
  rechazadosDelAnio: number;

  constructor({
    registrosTotales = 0,
    registrosAyer = 0,
    registrosHoy = 0,
    porcentajeRechazo = "",
    registrosSemana = 0,
    registrosMes = 0,
    registrosMesFuncionarios = 0,
    registrosMesAso = 0,
    registrosMesDigital = 0,
    registroDelAnio = 0,
    funcionarios = 0,
    asociaciones = 0,
    externos = 0,
    solicitudesPendientes = 0,
    pendientesHoy = 0,
    pendientesSemana = 0,
    pendientesMes = 0,
    solicitudesVigentes = 0,
    vigentesHoy = 0,
    vigentesSemana = 0,
    vigentesMes = 0,
    vigentesDelAnio = 0,
    solicitudesRechazadas = 0,
    rechazadosHoy = 0,
    rechazadosSemana = 0,
    rechazadosMes = 0,
    rechazadosDelAnio = 0
  }: Partial<TotalesResults>) {
    this.registrosTotales = registrosTotales;
    this.registrosAyer = registrosAyer;
    this.registrosHoy = registrosHoy;
    this.registrosSemana = registrosSemana;
    this.registrosMes = registrosMes;
    this.registrosMesFuncionarios = registrosMesFuncionarios;
    this.registrosMesAso = registrosMesAso;
    this.registrosMesDigital = registrosMesDigital;
    this.registroDelAnio = registroDelAnio;
    this.funcionarios = funcionarios;
    this.asociaciones = asociaciones;
    this.externos = externos;
    this.solicitudesPendientes = solicitudesPendientes;
    this.porcentajeRechazo = porcentajeRechazo;
    this.pendientesHoy = pendientesHoy;
    this.pendientesSemana = pendientesSemana;
    this.pendientesMes = pendientesMes;
    this.solicitudesVigentes = solicitudesVigentes;
    this.vigentesDelAnio = vigentesDelAnio;
    this.solicitudesRechazadas = solicitudesRechazadas;
    this.rechazadosHoy = rechazadosHoy;
    this.rechazadosSemana = rechazadosSemana;
    this.rechazadosMes = rechazadosMes;
    this.rechazadosDelAnio = rechazadosDelAnio;
    this.vigentesHoy = vigentesHoy;
    this.vigentesSemana = vigentesSemana;
    this.vigentesMes = vigentesMes;
  }
}
