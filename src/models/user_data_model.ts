
export type userDataModel = {
    name: string | null
    id: string | number | null
    email: string | null
    token: string 
}

export type userType = {
    name: string
    id: string | number
    email: string
    token: string
}

type respuesta = {
    name: string
    id: string | number
    email: string
    token: string
}



export const userDataModelResponse = (json : respuesta )=> {

    return {
        name: json.name,
        id: json.id,
        email: json.email,
        token:json.token
    }
}

export interface LoginResults{
    name: string
    id: number
    email: string
    token: string
}

export interface LoginResponse {
    success: boolean;
    message: string;
    results?: LoginResults
}
