/* eslint-disable @typescript-eslint/no-explicit-any */
export class SucursalesVentasResponse {
  success: boolean;
  results: Array<SucursalesVentasResults>;
  status: number;
  message: string;

  constructor({ success, results, status, message }: SucursalesVentasResponse) {
    this.success = success;
    this.results = results;
    this.status = status;
    this.message = message;
  }

  static fromJson(json: any) {
    return new SucursalesVentasResponse({
      success: json.success,
      results: json.results.map((item: any) => SucursalesVentasResults.fromJson(item)),
      status: json.status,
      message: json.message
    });
  }
}

export class SucursalesVentasResults {
  adicional: string | null;
  cliente_id: number;
  codigo: string;
  codigo_sucursal: string;
  descripcion: string | null;
  descuento: number;
  documento: string;
  factura_numero: string;
  fecha: string;
  forma_pago: number;
  id: number;
  importe: number;
  importe_final: number;
  sucursal: string;

  constructor({
    adicional,
    cliente_id,
    codigo,
    codigo_sucursal,
    descripcion,
    descuento,
    documento,
    factura_numero,
    fecha,
    forma_pago,
    id,
    importe,
    importe_final,
    sucursal
  }: SucursalesVentasResults) {
    this.adicional = adicional;
    this.cliente_id = cliente_id;
    this.codigo = codigo;
    this.codigo_sucursal = codigo_sucursal;
    this.descripcion = descripcion;
    this.descuento = descuento;
    this.documento = documento;
    this.factura_numero = factura_numero;
    this.fecha = fecha;
    this.forma_pago = forma_pago;
    this.id = id;
    this.importe = importe;
    this.importe_final = importe_final;
    this.sucursal = sucursal;
  }

  static fromJson(json: any) {
    return new SucursalesVentasResults({
      adicional: json.adicional,
      cliente_id: json.cliente_id,
      codigo: json.codigo,
      codigo_sucursal: json.codigo_sucursal,
      descripcion: json.descripcion,
      descuento: json.descuento,
      documento: json.documento,
      factura_numero: json.factura_numero,
      fecha: json.fecha,
      forma_pago: json.forma_pago,
      id: json.id,
      importe: json.importe,
      importe_final: json.importe_final,
      sucursal: json.sucursal
    });
  }
}
