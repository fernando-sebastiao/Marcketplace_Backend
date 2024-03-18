export class AppError{
    public readonly message: String

    public readonly statusCode: number;

    constructor(message: String, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}


export class UnauthorizedError extends Error{
    constructor(){
        super("UNAUTHORIZED")
    }
}


export class NotAManagerError extends Error{
    constructor(){
        super("Usuario não é um Manager")
    }
}

