export class LoginResponse{
    success : boolean
    message : string;
    results : LoginResults | null;
    status : number;

    constructor({ success = false, message = '', results = null, status = 0 }: Partial<LoginResponse>) {
        this.success = success;
        this.message = message;
        this.results = results;
        this.status = status;
    }
}

export class LoginResults {
    id: number;
    name: string;
    email: string;
    token: string;
    tokenWithBearer: string;

    constructor({ id = 0, email = '', token = '', name ='' }: Partial<LoginResults>) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.token =  token;
        this.tokenWithBearer = `Bearer ${token}`;
    }
}