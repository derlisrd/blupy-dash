/* eslint-disable @typescript-eslint/no-explicit-any */
export class FichaResponse{
    success: boolean;
    message: string;
    status: number;
    results: FichaResults | null;

    constructor({ success = false, message = '', status = 0, results = null }: Partial<FichaResponse>){
        this.success = success;
        this.message = message;
        this.status = status;
        this.results = results;
    }

    static fromJSON(json: Partial<FichaResponse>): FichaResponse{
        return new FichaResponse({
            success: json.success || false,
            message: json.message || "",
            status: json.status || 0,
            results: json.results ? FichaResults.fromJSON(json.results) : null
        })
    }

}

export class FichaResults{
    cliente_id: number;
    user_id: number;
    nombre: string;
    celular: string;
    email: string;
    cedula: string;
    devices: Array<UserDevice> | null;

    constructor({ cliente_id = 0, user_id = 0, nombre = '', celular = '', email = '', cedula = '', devices = null }: Partial<FichaResults>){
        this.cliente_id = cliente_id;
        this.user_id = user_id;
        this.nombre = nombre;
        this.celular = celular;
        this.email = email;
        this.cedula = cedula;
        this.devices = devices;
    }

    static fromJSON(json: any): FichaResults{
        return new FichaResults({
            cliente_id: json.cliente_id || 0,
            user_id: json.user_id || 0,
            nombre: json.name || "",
            celular: json.celular || "",
            email: json.email || "",
            cedula: json.cedula || "",
            devices: json.devices ? json.devices.map((item: any) => UserDevice.fromJSON(item)) : null  
        })
    }
}

export class UserDevice{
    id: number;
    fechaIngreso: string;
    modelo: string;
    os: string;
    dispositivo: string;
    fechaUltimaSesion: string;
    version: string;
    deviceToken: string | null;

    constructor({ id = 0, fechaIngreso = '', dispositivo = '', modelo = '', os = '', fechaUltimaSesion = '', version = '', deviceToken = null }: Partial<UserDevice>){
        this.fechaIngreso = fechaIngreso;
        this.modelo = modelo;
        this.os = os;
        this.fechaUltimaSesion = fechaUltimaSesion;
        this.version = version;
        this.deviceToken = deviceToken;
        this.dispositivo = dispositivo;
        this.id = id;
    }

    static fromJSON(json: any): UserDevice{
        return new UserDevice({
            fechaIngreso: json.created_at || '',
            modelo: json.model || '',
            os: json.os || '',
            fechaUltimaSesion: json.updated_at || '',
            version: json.version || '',
            deviceToken : json.device_token || null,
            dispositivo: json.device || '',
            id: json.id || 0
        })
    }
}
