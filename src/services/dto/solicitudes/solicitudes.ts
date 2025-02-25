import { format } from "@formkit/tempo";

export class SolicitudesResponse{
    success : boolean;
    message : string;
    status: number;
    results : SolicitudesResults[];

    constructor({ success = false, message = '', status = 0, results = [] } : Partial<SolicitudesResponse>) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.results = results;
    }

    static fromJSON(json: SolicitudesResponse): SolicitudesResponse {
        return new SolicitudesResponse({
            success: json.success,
            message: json.message,
            status: json.status,
            results: json.results.map((item: SolicitudesResults) =>  SolicitudesResults.fromJSON(item)),
        });
    }
}

export class SolicitudesResults{
    id : number;
    codigo : string;
    estado : string;
    estado_id : number;
    created_at : string;
    updated_at : string;
    tipo : number;
    cliente_id : number;
    name : string;
    email : string;
    uid : number;
    cedula : string;
    cliid : string;
    celular : string;
    foto_ci_frente : string;
    foto_ci_dorso : string;
    asofarma : number;
    solicitud_credito : number;
    funcionario : number;
    fecha : string;
    selfie: string;

    constructor({ selfie = '', fecha = '', id = 0, codigo = '', estado = '', estado_id = 0, created_at = '', updated_at = '', tipo = 0, cliente_id = 0, name = '', email = '', uid = 0, cedula = '', cliid = '', celular = '', foto_ci_frente = '', foto_ci_dorso = '', asofarma = 0, solicitud_credito = 0, funcionario = 0 } : Partial<SolicitudesResults>) {
        this.id = id;
        this.codigo = codigo;
        this.estado = estado;
        this.estado_id = estado_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.tipo = tipo;
        this.cliente_id = cliente_id;
        this.name = name;
        this.email = email;
        this.uid = uid;
        this.cedula = cedula;
        this.cliid = cliid;
        this.celular = celular;
        this.foto_ci_frente = foto_ci_frente;
        this.foto_ci_dorso = foto_ci_dorso;
        this.asofarma = asofarma;
        this.solicitud_credito = solicitud_credito;
        this.funcionario = funcionario;
        this.fecha = fecha;
        this.selfie = selfie;
    }

    static fromJSON(data: SolicitudesResults): SolicitudesResults {
        return new SolicitudesResults({
           ...data,
           fecha: format(data.created_at ?? new Date(), {date: 'medium', time: 'short'}, 'es-ES')
        });
    }
}


