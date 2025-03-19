/* eslint-disable @typescript-eslint/no-explicit-any */
export class VentasPorFacturaResponse {
  success: boolean;
  message: string;
  status: number;
  results: VentasPorFacturaResults | null;

  constructor({ success = false, message = "", status = 0, results = null }: Partial<VentasPorFacturaResponse>) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.results = results;
  }

  static fromJSON(json: any): VentasPorFacturaResponse {
    return new VentasPorFacturaResponse({
      success: json.success,
      message: json.message,
      status: json.status,
      results: json.results ? VentasPorFacturaResults.fromJSON(json.results[0]) : null
    });
  }
}

export class VentasPorFacturaResults {
  codigo: number;
  factura: string;
  estado: string;
  codigoClienteAdicional: string | null;
  tipoVenta: string;
  fecha: string;
  fechaRendicion: string | null;
  importe: number;
  cedula: string;
  cliente: string;
  formaPagoDescripcion: string;
  sucursal: string;
  observaciones: string;
  descuento: number;
  bruto: number;
  operacion: string;

  constructor({
    codigo = 0,
    factura = "",
    estado = "",
    codigoClienteAdicional = null,
    tipoVenta = "",
    fecha = "",
    fechaRendicion = null,
    importe = 0,
    cedula = "",
    cliente = "",
    formaPagoDescripcion = "",
    sucursal = "",
    observaciones = "",
    descuento = 0,
    bruto = 0,
    operacion = "",
  }: Partial<VentasPorFacturaResults>) {
    this.codigo = codigo;
    this.factura = factura;
    this.estado = estado;
    this.codigoClienteAdicional = codigoClienteAdicional;
    this.tipoVenta = tipoVenta;
    this.fecha = fecha;
    this.fechaRendicion = fechaRendicion;
    this.importe = importe;
    this.cedula = cedula;
    this.cliente = cliente;
    this.formaPagoDescripcion = formaPagoDescripcion;
    this.sucursal = sucursal;
    this.observaciones = observaciones;
    this.bruto = bruto
    this.descuento = descuento
    this.operacion = operacion
  }


  static fromJSON(json: any): VentasPorFacturaResults {
    return new VentasPorFacturaResults({
      codigo: json.ventCodigo,
      factura: json.ventNumero,
      estado: json.ventEstado,
      codigoClienteAdicional: json.clieCodigoAdicional,
      tipoVenta: json.ventTipo,
      fecha: json.ventFecha,
      fechaRendicion: json.ventFchRendicion,
      importe: json.ventTotNeto,
      descuento: json.ventTotDescuento,
      bruto: json.ventTotBruto,
      cedula: json.cedula,
      cliente: json.nombre,
      formaPagoDescripcion: json.frpaDescripcion,
      sucursal: json.estrDescripcion,
      observaciones: json.ventObservacion,
      operacion: json.ticoCodigo
    });
  }
}
