import APIError from "./APIError";
import {Response, Request} from 'express'


function errorHandler (err: any, req : any, res: any, next: any) {
    // if (err instanceof APIError) {
    //     err.code = Number (err.code);
    //     // typeof err.code;
    //     res.status (err.code).message ({

    //     })
    //     return;
    // }

    if (err instanceof APIError) {
        res.status(err.code).json({error:{message: err.message}});
        return;
    }

    res.status (500).json ({
        message : "Something went wrong to the server, kahan gaya usko dhundo"
    })
}

export default errorHandler;