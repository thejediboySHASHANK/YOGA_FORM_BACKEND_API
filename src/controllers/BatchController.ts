import { NextFunction, Response, Request, response } from "express";
import { prisma } from "../app";
import { Batch } from "@prisma/client";
import APIError from "../errors/APIError";

export const createBatch = async (req: Request, res: Response, next: NextFunction) => {
    const BatchData: Batch = req.body;
    try {
        await prisma.batch.create({
            data: BatchData,
        });

        res.status(200).json({
            message: "Batch Created Successfully",
            batch: BatchData,

        });
    } catch (error) {
        console.log(error);
        next(APIError.internalServerError("Something went wrong"));
    }
};

export const GetBatch = async (req: Request, res: Response, next: NextFunction) => {
    const BatchID = String(req.params.id);

    try {
        const batch = await prisma.batch.findUnique({
            where: {
                id: BatchID,
            },
            include: {
                users: true,
            }
        });

        res.status(200).json({
            message: "Batch successfully found!",
            batch: batch,
        });
    } catch (error) {
        next(APIError.badRequest("Batch not found"));
    }
};

export const GetAllBatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const batches = await prisma.batch.findMany({
            include: {
                users: true,
            }
        });

        res.status(200).json({
            message: "All the batches are : ",
            batches
        });
    } catch (error) {
        next(APIError.badRequest("None Batches exist"));
    }
}

export const UpdateBatch = async (req: Request, res: Response, next: NextFunction) => {
    const BatchID = String(req.params.id);
    const UpdatedBatchData = req.body;

    try {
        const batch = await prisma.batch.update({
            where: {
                id: BatchID,
            },
            data: UpdatedBatchData,
        });

        res.status(200).json({
            message: "Batch updated successfully",
            batch: batch,
        });
    } catch (error) {
        next(APIError.badRequest("Batch not found, hence cannot be updated"));
    }

};

export const IncrementBatchCapacity = async (req: Request, res: Response, next: NextFunction) => {
    const BatchID = String(req.params.id);
    try {

        const find = await prisma.batch.findUnique({
            where: {
                id: BatchID,
            }
        })

        if (find?.batch_capacity_current == find?.batch_capacity_max) {
            next(APIError.badRequest("Batch capacity full"));
        }
        else {
            const batch = await prisma.batch.update({
                where: {
                    id: BatchID,
                },
                data: { batch_capacity_current: { increment: 1 } },
            });

            res.status(200).json({
                message: "Batch capacity incremented by 1",
                batch: batch,
            });
        }
    } catch (error) {
        next(APIError.badRequest("Batch not found, hence capacity cannot be incremented"));
    }
};


export const DeleteBatch = async (req: Request, res: Response, next: NextFunction) => {
    const BatchID = String(req.params.id);

    try {
        const batch = await prisma.batch.delete({
            where: {
                id: BatchID,
            }
        });

        res.status(200).json({
            message: "Batch deleted successfully",
            batch: batch
        })
    } catch (error) {
        console.log(error);
        next(APIError.badRequest("User does not exist and hence cannot be deleted."))
    }
};