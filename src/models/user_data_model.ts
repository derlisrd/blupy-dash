
export type userDataModel = {
    name: string | null
    id: string | number | null
    email: string | null
    token: string 
}

type userType = {
    name: string
    id: string | number
    email: string
    token: string
}

type respuesta = {
    user : userType,
    token: string
}

type resultstype = {
    results: respuesta
}

export const userDataModelResponse = (res : resultstype )=> {

    const json = res.results
    return {
        name: json.user.name,
        id: json.user.id,
        email: json.user.email,
        token:json.token
    }
}


