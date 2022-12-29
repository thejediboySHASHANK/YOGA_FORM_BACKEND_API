import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";
import APIError from "../errors/APIError";
import { prisma } from "../app";
import { Payment } from "@prisma/client";

const checksub = async (req: Request, res : Response, next : NextFunction) => {
    const {userId} = (req.body);

    const user = await prisma.user.findUnique ({
        where : {
            id : userId,
        },
    })

    

    // if (isActive == true) {
    //     next (APIError.badRequest("Subscription already exists!"));
    //     return;
    // }

    next ();
}