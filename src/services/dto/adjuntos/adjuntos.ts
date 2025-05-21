export class AdjuntosResponse{
    success: boolean;
    status : number;
    message: string;
    results: AdjuntosResults[] | null;

    constructor({ success, status, message, results }: { success: boolean, status: number, message: string, results: AdjuntosResults[] | null }) { 
        this.success = success;
        this.status = status;
        this.message = message;
        this.results = results;
    }

}

export class AdjuntosResults{
    id: number;
    nombre: string;
    url: string;
    path: string;
    tipo: string;

    constructor({ id, nombre, url, path, tipo }: { id: number, nombre: string, url: string, path: string, tipo: string }) {
        this.id = id;
        this.nombre = nombre;
        this.url = url;
        this.path = path;
        this.tipo = tipo
    }

    static fromJSON(data: any): AdjuntosResults {
        return new AdjuntosResults({
            id: data.id,
            nombre: data.nombre,
            url: data.url,
            path: data.path,
            tipo: data.tipo
        });
    }

    static toArray(data: AdjuntosResults[]): AdjuntosResults[] {
        return data.map(item => AdjuntosResults.fromJSON(item));
    }

}
