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
    email: string;
    token: string;
    constructor({ id = 0, email = '', token = '' }: { id: number, email: string, token: string }) {
        this.id = id;
        this.email = email;
        this.token = token;
    }
}