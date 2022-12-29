"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBatch = exports.IncrementBatchCapacity = exports.UpdateBatch = exports.GetAllBatch = exports.GetBatch = exports.createBatch = void 0;
const app_1 = require("../app");
const APIError_1 = __importDefault(require("../errors/APIError"));
const createBatch = async (req, res, next) => {
    const BatchData = req.body;
    try {
        await app_1.prisma.batch.create({
            data: BatchData,
        });
        res.status(200).json({
            message: "Batch Created Successfully",
            batch: BatchData,
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.internalServerError("Something went wrong"));
    }
};
exports.createBatch = createBatch;
const GetBatch = async (req, res, next) => {
    const BatchID = Number(req.params.id);
    try {
        const batch = await app_1.prisma.batch.findUnique({
            where: {
                id: BatchID,
            },
        });
        res.status(200).json({
            message: "Batch successfully found!",
            batch: batch,
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Batch not found"));
    }
};
exports.GetBatch = GetBatch;
const GetAllBatch = async (req, res, next) => {
    try {
        const batches = await app_1.prisma.batch.findMany();
        res.status(200).json({
            message: "All the batches are : ",
            batches
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("None Batches exist"));
    }
};
exports.GetAllBatch = GetAllBatch;
const UpdateBatch = async (req, res, next) => {
    const BatchID = Number(req.params.id);
    const UpdatedBatchData = req.body;
    try {
        const batch = await app_1.prisma.batch.update({
            where: {
                id: BatchID,
            },
            data: UpdatedBatchData,
        });
        res.status(200).json({
            message: "Batch updated successfully",
            batch: batch,
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Batch not found, hence cannot be updated"));
    }
};
exports.UpdateBatch = UpdateBatch;
const IncrementBatchCapacity = async (req, res, next) => {
    const BatchID = Number(req.params.id);
    try {
        const find = await app_1.prisma.batch.findUnique({
            where: {
                id: BatchID,
            }
        });
        if ((find === null || find === void 0 ? void 0 : find.batch_capacity_current) == (find === null || find === void 0 ? void 0 : find.batch_capacity_max)) {
            next(APIError_1.default.badRequest("Batch capacity full"));
        }
        else {
            const batch = await app_1.prisma.batch.update({
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
    }
    catch (error) {
        next(APIError_1.default.badRequest("Batch not found, hence capacity cannot be incremented"));
    }
};
exports.IncrementBatchCapacity = IncrementBatchCapacity;
// export const DecrementBatchCapacity = async (req : Request, res : Response, next : NextFunction) => {
//     const BatchID = Number (req.params.id);
//     try {
//     }
// }
const DeleteBatch = async (req, res, next) => {
    const BatchID = Number(req.params.id);
    try {
        const batch = await app_1.prisma.batch.delete({
            where: {
                id: BatchID,
            }
        });
        res.status(200).json({
            message: "Batch deleted successfully",
            batch: batch
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.badRequest("User does not exist and hence cannot be deleted."));
    }
};
exports.DeleteBatch = DeleteBatch;
