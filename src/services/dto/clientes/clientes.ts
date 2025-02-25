export class ClientesResponse {
    success : boolean;
    message : string;
    results : ClientesResults[];
    status : number;

    constructor({ success = false, message = '', results = [], status = 0 }: Partial<ClientesResponse>) {
        this.success = success;
        this.message = message;
        this.results = results;
        this.status = status;
    }

}

export class ClientesResults {
    id: number;
    name: string;
    email: string;
    cedula: string;
    celular: string;
    foto_ci_frente: string;
    selfie: string;
    funcionario: number;
    extranjero: number;
    active: number;
    solicitud_credito: number;
    id_micredito: string;
    user_id: number;
    vendedor_id: number;
    created_at: string;

    constructor({ id = 0, name = '', email = '', cedula = '', celular = '', foto_ci_frente = '', selfie = '', funcionario = 0, extranjero = 0, active = 0, solicitud_credito = 0, id_micredito = '', user_id = 0, vendedor_id = 0, created_at = '' }: { id: number, name: string, email: string, cedula: string, celular: string, foto_ci_frente: string, selfie: string, funcionario: number, extranjero: number, active: number, solicitud_credito: number, id_micredito: string, user_id: number, vendedor_id: number, created_at: string }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cedula = cedula;
        this.celular = celular;
        this.foto_ci_frente = foto_ci_frente;
        this.selfie = selfie;
        this.funcionario = funcionario;
        this.extranjero = extranjero;
        this.active = active;
        this.solicitud_credito = solicitud_credito;
        this.id_micredito = id_micredito;
        this.user_id = user_id;
        this.vendedor_id = vendedor_id;
        this.created_at = created_at;
    }
}
