/* eslint-disable @typescript-eslint/no-explicit-any */
export class ConsultaClienteResponse{
    success: boolean;
    message: string;
    status : number;
    results: ConsultaClienteResults | null;

    constructor({success = false, status = 0, message = "", results = null}: Partial<ConsultaClienteResponse>) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.results = results ;
    }

    static fromJSON(data: any) : ConsultaClienteResponse{
        const results = data.results ? ConsultaClienteResults.fromJSON(data.results) : null
        return new ConsultaClienteResponse({success: data.success, status: data.status, message: data.message, results})
    }

}
export class ConsultaClienteResults {
    farma : ConsultaClienteResultsFarma | null;
    micredito: ConsultaClienteResultsMiCredito | null;
    registro: boolean;
    constructor({farma = null, registro = false, micredito = null}: Partial<ConsultaClienteResults>) {
        this.farma = farma;
        this.registro = registro
        this.micredito = micredito
    }

    static fromJSON(data: any) : ConsultaClienteResults{
        const farma = data.farma ? ConsultaClienteResultsFarma.fromJSON(data.farma) : null
        const micredito = data.micredito ? ConsultaClienteResultsMiCredito.fromJSON(data.micredito) : null
        return new ConsultaClienteResults({farma, micredito, registro: data.registro})
    } 
}

export class ConsultaClienteResultsFarma {
    codigo: string;
    nombre: string;
    credito: number | null;
    creditoAdicional : number | null;
    pendiente: number;
    saldoDisponible: number;
    esFuncionario: boolean;
    alianzas: ConsultaClienteResultsAlianzas[] | null;

    constructor({codigo = "", nombre = "", credito = 0, creditoAdicional = 0, pendiente = 0, saldoDisponible = 0, esFuncionario = false, alianzas = null}: Partial<ConsultaClienteResultsFarma>) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.credito = credito;
        this.creditoAdicional = creditoAdicional;
        this.pendiente = pendiente;
        this.saldoDisponible = saldoDisponible;
        this.esFuncionario = esFuncionario;
        this.alianzas = alianzas;
    }

    static fromJSON(data: any) : ConsultaClienteResultsFarma{
       return new ConsultaClienteResultsFarma({
        codigo: data.clieCodigo,
        nombre: data.persNombre,
        credito: data.clerLimiteCredito,
        creditoAdicional: data.clerLimiteCreditoAdic,
        pendiente: data.pendiente,
        saldoDisponible: data.saldoDisponible,
        esFuncionario: data.esFuncionario ==='S' ? true : false,
        alianzas: data.alianzas ? data.alianzas.map((alianza: any) => ConsultaClienteResultsAlianzas.fromJSON(alianza)) : null
       })
    }
}

export class ConsultaClienteResultsAlianzas {
    codigo: string;
    alianza: string;
    vencimiento: string | null;
    formaPago: string;

    constructor({codigo = "", alianza = "", vencimiento = "", formaPago = ""}: Partial<ConsultaClienteResultsAlianzas>) {
        this.codigo = codigo;
        this.alianza = alianza;
        this.vencimiento = vencimiento;
        this.formaPago = formaPago;
    }

    static fromJSON(data: any) : ConsultaClienteResultsAlianzas{
        return new ConsultaClienteResultsAlianzas({
            codigo: data.codigoAdicional,
            alianza: data.alianza,
            vencimiento: data.vencimiento ? data.vencimiento : null,
            formaPago: data.formaPago
        })
    }
}

export class ConsultaClienteResultsMiCredito {
    cuenta: string;
    deuda: number;
    nombre: string;
    tipoTarjeta: string;
    fechaEmision: string;
    fechaVencimiento: string;
    pagoMinimo: number;
    linea: number;
    numeroTarjeta: string;

    constructor({cuenta = "", numeroTarjeta='', deuda = 0, nombre = "", tipoTarjeta = "", fechaEmision = "", fechaVencimiento = "", pagoMinimo = 0, linea = 0}: Partial<ConsultaClienteResultsMiCredito>) {
        this.cuenta = cuenta;
        this.deuda = deuda;
        this.nombre = nombre;
        this.tipoTarjeta = tipoTarjeta;
        this.fechaEmision = fechaEmision;
        this.fechaVencimiento = fechaVencimiento;
        this.pagoMinimo = pagoMinimo;
        this.linea = linea;
        this.numeroTarjeta = numeroTarjeta;
    }
    static fromJSON(data: any) : ConsultaClienteResultsMiCredito{
        return new ConsultaClienteResultsMiCredito({
            cuenta: data.MaeCtaId,
            numeroTarjeta: data.MTNume,
            deuda: Number(data.MTSaldo),
            nombre: data.MTNomT,
            tipoTarjeta: data.MTTipo,
            fechaEmision: data.MTFEmi,
            fechaVencimiento: data.MCProxVto,
            pagoMinimo: Number(data.MCPagMin),
            linea: Number(data.MTLinea)
        })
    }
}