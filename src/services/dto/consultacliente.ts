/* eslint-disable @typescript-eslint/no-explicit-any */



export class ConsultaClienteResponse{
    constructor(
        public success: boolean,
        public message: string,
        public results:  ConsultaClienteResults | null
    ){}


    static fromJSON(data : any) : ConsultaClienteResponse {
        const results = ConsultaClienteResults.fromJSON( data.results ) || null
        return new ConsultaClienteResponse(
            data.success,
            data.message,
            results
        )
    }
}

export class ConsultaClienteResults {
    constructor(
        public farma: ConsultaClienteResultsFarma | null,
        public micredito: ConsultaClienteResultsMiCredito | null
    ){}

    static fromJSON(data: any) : ConsultaClienteResults{
        const farma = data.farma ? ConsultaClienteResultsFarma.fromJSON(data.farma) : null
        const micredito = data.micredito ?  ConsultaClienteResultsMiCredito.fromJSON(data.micredito) : null

        return new ConsultaClienteResults(
            farma,
            micredito
        )
    }   
}

export class ConsultaClienteResultsFarma{
    constructor(
        public cedula : string,
        public nombre : string,
        public credito: number,
        public creditoAdicional: number | null,
        public saldoDisponible: number | null,
        public pendiente: number,
        public funcionario: string,
        public fechaVigencia: string | null,
        public alianzas: Array<ConsultaClienteResultsFarmaAlianzas> | null
    ){}
    static fromJSON(data : any) : ConsultaClienteResultsFarma{
        const alianzas = ConsultaClienteResultsFarmaAlianzas.mapper(data.alianzas || null)
        return new ConsultaClienteResultsFarma(
            data.persCi,
            data.persNombre,
            data.clerLimiteCredito,
            data.clerLimiteCreditoAdic,
            data.saldoDisponible,
            data.pendiente,
            data.esFuncionario,
            data.clerFchFinVigencia,
            alianzas
        )
    }
}

export class ConsultaClienteResultsFarmaAlianzas{
    constructor(
        public nombre : string,
        public codigoAdicional: number,
        public formaPagoCodigo: number,
        public formaPago: string
    ){}

    static fromJSON( data : any) : ConsultaClienteResultsFarmaAlianzas{
        
        return new ConsultaClienteResultsFarmaAlianzas(
            data.alianza,
            data.codigoAdicional,
            data.frpaCodigo,
            data.formaPago
        )
    }



    static mapper(data: Array<any>): ConsultaClienteResultsFarmaAlianzas[] {
        return data.map(item => ConsultaClienteResultsFarmaAlianzas.fromJSON(item));
    }

}



export class ConsultaClienteResultsMiCredito{
    constructor(
        public nombre: string,
        public producto: string,
        public cuenta: string,
        public tarjetaNumero: string,
        public linea: string,
        public pendiente: string
    ){}
    static fromJSON(data: any){
        return new ConsultaClienteResultsMiCredito(
            data.MTNomT,
            data.SolProdNom,
            data.MaeCtaId,
            data.MTNume,
            data.MTLinea,
            data.MTSaldo
        )   
    }
}