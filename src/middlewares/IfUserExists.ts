import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";
import APIError from "../errors/APIError";
import PrismaError from "../errors/Prisma errors/PrismaAPIError";
import { prisma } from "../app";
import { Payment } from "@prisma/client";

const CheckUser = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = (req.body);
    console.log("UserID", userId);

    if (!userId) {
        next(APIError.badRequest("User field is empty!"));
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,                
            },
            select : {
                batch_id: true
            }
        });
        
        // res.status(200);
        console.log ("User", user)
        if (user?.batch_id != null) {
            next (APIError.badRequest ("Payment Already exists"));
            return;
        }

    } catch (error) {
        console.log (error);
        next(APIError.badRequest("There is no user with that ID"));
        return;
    }
    
    
    next();
}

export default CheckUser;
