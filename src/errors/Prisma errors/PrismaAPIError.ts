class PrismaError {
    message : String;
    code : String;

    constructor (message : String, code : String) {
        this.message = message;
        this.code = code;
    }

    static AuthenticationFailed (message : string = "Authentication Failed") {
        return new PrismaError (message, "P1000");
    }

    static ServerUnreachable (message : string = "Server Unreachable") {
        return new PrismaError (message, "P1001");
    }

    static ServerTimedOut (message : string = "Server was reached but timed out") {
        return new PrismaError (message, "P1002");
    }

    static DatabaseDoesNotExists (message : string = "Database Does Not Exists") {
        return new PrismaError (message, "P1003");
    }
    
    static DatabaseAlreadyExists (message : string = "Database Already Exists") {
        return new PrismaError (message, "P1009");
    }

    static ValueNotValid (message : string = "The provided value {field_value} for {model_name} field {field_name} is not valid") {
        return new PrismaError (message, "P2006");
    }

    static PaymentRecordExists (message : string = "The payment record associated with a user and a corresponding batch already exists.") {
        return new PrismaError (message, "P2014");
    }



}

export default PrismaError;