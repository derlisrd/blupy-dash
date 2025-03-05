/* eslint-disable @typescript-eslint/no-explicit-any */
export class ContratosConsultaResponse {
  success: boolean;
  message: string;
  status: number;
  results: ContratosConsultaResults | null;

  constructor({
    success = false,
    status = 0,
    message = "",
    results = null,
  }: Partial<ContratosConsultaResponse>) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.results = results;
  }

  static fromJSON(data: any): ContratosConsultaResponse {
    const results = data.results
      ? ContratosConsultaResults.fromJSON(data.results)
      : null;
    return new ContratosConsultaResponse({
      success: data.success,
      status: data.status,
      message: data.message,
      results,
    });
  }

}

export class ContratosConsultaResults {
  contratos: ContratosConsultaResultsContratos[] | null;
  cliente: ContratosConsultaResultsCliente | null;

  constructor({ contratos = [], cliente = null }: Partial<ContratosConsultaResults>) {
    this.contratos = contratos;
    this.cliente = cliente;
  }
  static fromJSON(data : any) : ContratosConsultaResults{
    const contratos = data.contratos ? data.contratos.map((contrato: any) => ContratosConsultaResultsContratos.fromJSON(contrato)) : []
    const cliente = data.cliente ? ContratosConsultaResultsCliente.fromJSON(data.cliente) : null
    return new ContratosConsultaResults({contratos, cliente})
  }
}

export class ContratosConsultaResultsContratos {
    codigoSucursal: number;
    sucursal: string;
    fechaIngreso: string;
    cantidadImpresiones: number;
    codigoContrato: number;
    estadoContrato: string;
    fechaEnvio: string | null;
    cedulaCliente: string;
    valorLineaCredito: number;
    usuarioImpresor: string;
    usuarioGenerador: string;
    usuarioEnvio: string | null;

    constructor({
      codigoSucursal = 0,
      sucursal = "",
      fechaIngreso = "",
      cantidadImpresiones = 0,
      codigoContrato = 0,
      estadoContrato = "",
      fechaEnvio = "",
      cedulaCliente = "",
      valorLineaCredito = 0,
      usuarioImpresor = "",
      usuarioGenerador = "",
      usuarioEnvio = "",
    }: Partial<ContratosConsultaResultsContratos>) {
      this.codigoSucursal = codigoSucursal;
      this.sucursal = sucursal;
      this.fechaIngreso = fechaIngreso;
      this.cantidadImpresiones = cantidadImpresiones;
      this.codigoContrato = codigoContrato;
      this.estadoContrato = estadoContrato;
      this.fechaEnvio = fechaEnvio;
      this.cedulaCliente = cedulaCliente;
      this.valorLineaCredito = valorLineaCredito;
      this.usuarioImpresor = usuarioImpresor;
      this.usuarioGenerador = usuarioGenerador;
      this.usuarioEnvio = usuarioEnvio;
      }

    static fromJSON(data: any): ContratosConsultaResultsContratos {
        return new ContratosConsultaResultsContratos({
          codigoSucursal: data.codigoSucursal,
          sucursal: data.estrDescripcion,
          fechaIngreso: data.fchIns,
          cantidadImpresiones: data.micoCantImpresiones,
          codigoContrato: data.micoCodigo,
          estadoContrato: data.micoEstado,
          fechaEnvio: data.micoFchEnvio,
          cedulaCliente: data.micoPersCi,
          valorLineaCredito: data.micoValorLineaCredito,
          usuarioImpresor: data.usuarioImpresor,
          usuarioGenerador: data.usuaCodigoGeneracion,
          usuarioEnvio: data.usuaCodigoEnvio,
        });
      }
}


export class ContratosConsultaResultsCliente {
    cedula: string;
    imagenCedula: string;
    id: number;
    selfie: string;
    nombre: string;
    celular: string;
    codigo: string;
    estado: string;
    estado_id: number;

    constructor({
      cedula = "",
      imagenCedula = "",
      id = 0,
      selfie = "",
      nombre = "",
      celular = "",
      codigo = "",
      estado = "",
      estado_id = 0,
    }: Partial<ContratosConsultaResultsCliente>) {
      this.cedula = cedula;
      this.imagenCedula = imagenCedula;
      this.id = id;
      this.selfie = selfie;
      this.nombre = nombre;
      this.celular = celular;
      this.codigo = codigo;
      this.estado = estado;
      this.estado_id = estado_id;
    }
    static fromJSON(data: any): ContratosConsultaResultsCliente {
        return new ContratosConsultaResultsCliente({
          cedula: data.cedula,
          imagenCedula: data.foto_ci_frente,
          id: data.id,
          selfie: data.selfie,
          nombre: data.nombre_primero + " " + data.apellido_primero,
          celular: data.celular,
          codigo: data.codigo,
          estado: data.estado,
          estado_id: data.estado_id,
        });
      }

}

