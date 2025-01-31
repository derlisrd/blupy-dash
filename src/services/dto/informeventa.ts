/* eslint-disable @typescript-eslint/no-explicit-any */
export class VentaFormaPagoResults{
    forma_codigo: number;
    forma_pago: string;
    tickets: number;
    total: number;

    constructor({forma_codigo, forma_pago, tickets, total}: {forma_codigo: number, forma_pago: string, tickets: number, total: number}){
        this.forma_codigo = forma_codigo;
        this.forma_pago = forma_pago;
        this.tickets = tickets;
        this.total = total;
    }

    static fromJson(data: any){
        return new VentaFormaPagoResults({
            forma_codigo: data.forma_codigo,
            forma_pago: data.forma_pago,
            tickets: data.cantidad,
            total: Number( data.total )
        });
    }
}

export class VentaTopSucursalIngresosResults{
    sucursal: string;
    tickets: number;
    total: number;

    constructor({sucursal, tickets, total}: {sucursal: string, tickets: number, total: number}){
        this.sucursal = sucursal;
        this.tickets = tickets;
        this.total = total;
    }

    static fromJson (data : any){
        return new VentaTopSucursalIngresosResults({
            sucursal: data.sucursal,
            tickets: data.tickets,
            total: Number(data.total_facturacion)
        });
    }
    static mapFromJson(data: any[]): VentaTopSucursalIngresosResults[] {
        return data
            .map((item: any) => VentaTopSucursalIngresosResults.fromJson(item))
            .sort((a, b) => b.total - a.total); // Ordena de mayor a menor por tickets
    }
}

export class VentaTopSucursalesTicketsResults{
    sucursal: string;
    tickets: number;
    total: number;

    constructor({sucursal, tickets, total}: {sucursal: string, tickets: number, total: number}){
        this.sucursal = sucursal;
        this.tickets = tickets;
        this.total = total;
    }

    static fromJson (data : any){
        return new VentaTopSucursalesTicketsResults({
            sucursal: data.sucursal,
            tickets: data.tickets,
            total: Number(data.total)
        });
    }
    static mapFromJson(data: any[]): VentaTopSucursalesTicketsResults[] {
        return data
            .map((item: any) => VentaTopSucursalesTicketsResults.fromJson(item))
            .sort((a, b) => b.tickets - a.tickets); // Ordena de mayor a menor por tickets
    }
}

export class VentasCompararMesesResults{
    tickets1: number;
    total1: number;
    tickets2: number;
    total2: number;

    constructor({tickets1, total1, tickets2, total2}: {tickets1: number, total1: number, tickets2: number, total2: number}){
        this.tickets1 = tickets1;
        this.total1 = total1;
        this.tickets2 = tickets2;
        this.total2 = total2;
    }
}