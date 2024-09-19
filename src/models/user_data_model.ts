
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

type resultstype = {
    results: respuesta
}

export const userDataModelResponse = (res : resultstype )=> {

    const json = res.results
    return {
        name: json.name,
        id: json.id,
        email: json.email,
        token:json.token
    }
}


