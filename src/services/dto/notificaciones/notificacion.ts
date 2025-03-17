export class NotificacionResponse{
    success: boolean;
    message: string;
    status : number;

    constructor({success = false, message = '', status = 0}: Partial<NotificacionResponse>){
        this.success = success;
        this.message = message;
        this.status = status
    }
}