import { PrismaClient, Prisma } from "@prisma/client";
import prisma from "../../app"
import PrismaError from "./PrismaAPIError";

function PrismaErrorHandler (err : any, req : any, res : any, next : any) {
    if (err instanceof PrismaError) {
        res.status(err.code).json ({
            error : {
                message : err.message
            }
        })

        return;
    }
}

export default PrismaErrorHandler;