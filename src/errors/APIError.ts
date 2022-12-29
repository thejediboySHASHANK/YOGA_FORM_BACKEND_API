import PrismaError from "../errors/Prisma errors/PrismaAPIError";

class APIError {
    message : string;
    code : number;

    constructor (message:string, code: number) {
        this.message = message;
        this.code = code;
    }

    static badRequest (message: string = "Bad Request") {
        return new APIError (message, 400);
    }

    static unathorized (message: string = "Unauthorized Access") {
        return new APIError (message, 401);
    }

    static internalServerError (message: string = "Something went wrong") {
        // console.log ("error");
        return new APIError (message, 500);
    }

    static PaymentRequired (message : string = "Payment Not Yet Done") {
        return new APIError (message, 402);
    }

    static RequestTimeout (message : string = "Time Exceeded") {
        return new APIError (message, 408);
    }

    static NetworkAuthentication (message : string = "Network Authentication Required") {
        return new APIError (message, 511);
    }

}

export default APIError;