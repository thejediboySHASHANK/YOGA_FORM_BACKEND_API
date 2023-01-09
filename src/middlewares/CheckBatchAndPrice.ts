import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { Batch, Payment } from "@prisma/client";
import APIError from "../errors/APIError";
import { prisma } from "../app";

// BODY : 
// USER ID 
// BATCH ID 
// price (picked up from batch details)

const CheckBatch = async (req: Request, res: Response, next: NextFunction) => {
    const {batch_id}  = (req.body);
    console.log('Batch Id', batch_id);

    if (!batch_id) {
        next(APIError.badRequest("Batch Id Required"))
    }

    const found = await prisma.batch.findUnique({
        where: {
            id: batch_id,
        },
    });
    
    console.log("Batch", found);
    
    // checking batch capacity 
    const {batch_capacity_max, batch_capacity_current, price} = found as Batch
    if (batch_capacity_current + 1 > batch_capacity_max) {
        next (APIError.badRequest("Batch is full"));
        return;
    }

    // Setting the price that is fetched from batch details as headers
    req.body ['price'] = price;

    next ();

}

export default CheckBatch;