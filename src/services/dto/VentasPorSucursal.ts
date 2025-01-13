export class VentasPorSucursalResponse {
  success: boolean;
  message: string;
  results: VentasPorSucursalResults[];

  constructor({
    success,
    message,
    results
  }: Partial<VentasPorSucursalResponse>){
    this.success = success || false;
    this.message = message || "";
    this.results = results || [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(data: any): VentasPorSucursalResponse {
    return new VentasPorSucursalResponse({
      success: data.success,
      message: data.message,
      results: data.results.map((item: VentasPorSucursalResults) => new VentasPorSucursalResults(item))
    });
  }
}


export class VentasPorSucursalResults {
    id: number;
    cliente_id: number;
    codigo: string;
    documento: string;
    adicional: string;
    factura_numero: string;
    importe: number;
    descuento: number;
    importe_final: number;
    forma_codigo: number;
    forma_pago: string;
    descripcion: string | null;
    sucursal: string;
    codigo_sucursal: number;
    fecha: string;

    constructor({
        id,
        cliente_id,
        codigo,
        documento,
        adicional,
        factura_numero,
        importe,
        descuento,
        importe_final,
        forma_codigo,
        forma_pago,
        descripcion,
        sucursal,
        codigo_sucursal,
        fecha
    }: Partial<VentasPorSucursalResults>){
        this.id = id || 0;
        this.cliente_id = cliente_id || 0;
        this.codigo = codigo || "";
        this.documento = documento || "";
        this.adicional = adicional || "";
        this.factura_numero = factura_numero || "";
        this.importe = importe || 0;
        this.descuento = descuento || 0;
        this.importe_final = importe_final || 0;
        this.forma_codigo = forma_codigo || 0;
        this.forma_pago = forma_pago || "";
        this.descripcion = descripcion || "";
        this.sucursal = sucursal || "";
        this.codigo_sucursal = codigo_sucursal || 0;
        this.fecha = fecha || "";
    }
}

