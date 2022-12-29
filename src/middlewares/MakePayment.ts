import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { Batch, Payment } from "@prisma/client";
import APIError from "../errors/APIError";
import { prisma } from "../app";

const MakePayment = async (req: Request, res: Response, next: NextFunction) => {
    const { price } = req.body;
    if (!price) {
        next(APIError.internalServerError("Failed to set price"));
    }

    // update batch capacity
    const { batch_id } = req.body;
    const batch = await prisma.batch.findUnique({
        where: {
            id: batch_id,
        },
    });

    const { batch_capacity_current } = batch as Batch;
    await prisma.batch.update({
        where: {
            id: batch_id,
        },
        data: {
            batch_capacity_current: batch_capacity_current + 1,
        },
    });

    // update user with batch id 
    const { userId } = req.body;
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                batch_id: batch_id
            },
        });
    } catch (error) {
        next (APIError.internalServerError("User not updated with batch Id, due to some error, write console.log(error) to check this error."));
    }

    req.body['userId'] = userId;

    // res.status (200).json ({
    //     message : "It is running successfully!",
    // })

    next ();
};

export default MakePayment;