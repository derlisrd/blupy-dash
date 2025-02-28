/* eslint-disable @typescript-eslint/no-explicit-any */
export class ActualizarFotoCedulaResponse {
    
    success: boolean
    message: string
    status : number
    results: ActualizarFotoCedulaResults | null
    
    
    constructor(
        {
            success,
            message,
            results,
            status
        }: Partial<ActualizarFotoCedulaResponse>
    ){
        this.success = success ?? false
        this.message = message ?? ''
        this.results = results ?? null
        this.status = status ?? 500
    }

    static fromJson(json: any): ActualizarFotoCedulaResponse {
        return new ActualizarFotoCedulaResponse({
            success: json.success ?? false,
            message: json.message ?? '',
            results: json.results ? ActualizarFotoCedulaResults.fromJson(json.results) : null,
            status: json.status ?? 500
        })
    }
}

export class ActualizarFotoCedulaResults{
    url : string;

    constructor({
        url
    }: Partial<ActualizarFotoCedulaResults>){
        this.url = url ?? ''
    }
    static fromJson(json: any): ActualizarFotoCedulaResults {
        return new ActualizarFotoCedulaResults({
            url: json.path ?? ''
        })
    }
}