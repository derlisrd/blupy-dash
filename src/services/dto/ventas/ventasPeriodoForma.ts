import { format } from "@formkit/tempo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class VentasPeriodoForma {
    success: boolean;
    message: string;
    results: VentasPeriodoFormaResults[] | null;
    status: number;


    constructor({ success=false, message='', results = null, status =0 } : Partial<VentasPeriodoForma>) {
        this.success = success;
        this.message = message;
        this.results = results;
        this.status = status;
    }

    static fromJSON(json: any): VentasPeriodoForma {
        return new VentasPeriodoForma({
            success: json.success,
            message: json.message,
            status: json.status,
            results: json.results ?  json.results.map((item: any) => VentasPeriodoFormaResults.fromJSON(item)) : null
        })
    }
}

export class VentasPeriodoFormaResults {
    id: number;
    codigo: string;
    factura: string;
    documento: string;
    forma_codigo: number;
    importe: number;
    fecha: string;
    fechaRaw: string;
    fechaSimple: string;
    adicional: string | null;
    sucursal: string;
    operacion: string | null;

    constructor({ id= 0, codigo = '', factura = '', documento ='',forma_codigo=0,importe=0, fecha='', fechaRaw='',fechaSimple='',adicional=null, sucursal='', operacion =null  } : Partial<VentasPeriodoFormaResults>) {
        this.id = id;
        this.codigo = codigo;
        this.factura = factura;
        this.documento = documento;
        this.forma_codigo = forma_codigo;
        this.importe = importe
        this.fecha = fecha;
        this.adicional = adicional;
        this.sucursal = sucursal;
        this.operacion = operacion;
        this.fechaRaw = fechaRaw;
        this.fechaSimple = fechaSimple
    }
    static fromJSON(json: any): VentasPeriodoFormaResults {
        return new VentasPeriodoFormaResults({
            id: json.id,
            codigo: json.codigo,
            factura: json.factura_numero,
            documento: json.documento,
            forma_codigo: json.forma_codigo,
            importe: json.importe_final,
            fecha: format(json.fecha, 'DD MMM YY HH:mm'),
            fechaSimple: format(json.fecha, 'YYYY-MM-DD'),
            fechaRaw: json.fecha,
            adicional: json.adicional,
            sucursal: json.sucursal,
            operacion: json.operacion
        });
    }
}