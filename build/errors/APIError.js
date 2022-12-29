"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
    static badRequest(message = "Bad Request") {
        return new APIError(message, 400);
    }
    static unathorized(message = "Unauthorized Access") {
        return new APIError(message, 401);
    }
    static internalServerError(message = "Something went wrong") {
        // console.log ("error");
        return new APIError(message, 500);
    }
    static PaymentRequired(message = "Payment Not Yet Done") {
        return new APIError(message, 402);
    }
    static RequestTimeout(message = "Time Exceeded") {
        return new APIError(message, 408);
    }
    static NetworkAuthentication(message = "Network Authentication Required") {
        return new APIError(message, 511);
    }
}
exports.default = APIError;
