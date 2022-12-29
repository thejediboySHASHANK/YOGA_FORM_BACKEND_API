"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPaymentData = exports.GetPaymentData = exports.DeletePayment = exports.UpdatePayment = exports.MockCreatePayment = void 0;
const app_1 = require("../app");
const APIError_1 = __importDefault(require("../errors/APIError"));
const MockCreatePayment = async (req, res, next) => {
    const PaymentData = req.body;
    try {
        await app_1.prisma.payment.create({
            data: PaymentData,
        });
        res.status(200).json({
            message: "Payment record successfully created",
            paymentInfo: PaymentData
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.internalServerError("Something went wrong"));
    }
};
exports.MockCreatePayment = MockCreatePayment;
const UpdatePayment = async (req, res, next) => {
    const PaymentID = Number(req.params.id);
    const UpdatedPayment = req.body;
    // const today = new Date ();
    // const yyyy = today.getFullYear();
    // let mm = today.getMonth () + 1;
    // let dd = today.getDate ();
    // const formattedToday = dd + "/" + mm + "/" + yyyy;
    try {
        const data = await app_1.prisma.payment.update({
            where: {
                id: PaymentID,
            },
            data: UpdatedPayment,
        });
        res.status(200).json({
            message: "Payment record successfully updated",
            paymentINfo: UpdatedPayment
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Payment Record Not Found and hence cannot be updated"));
    }
};
exports.UpdatePayment = UpdatePayment;
const DeletePayment = async (req, res, next) => {
    const PaymentID = Number(req.params.id);
    try {
        const deltedData = await app_1.prisma.payment.delete({
            where: {
                id: PaymentID,
            }
        });
        res.status(200).json({
            message: "Payment Sucessfully Deelted",
            DeltedInfo: deltedData,
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Payment record Not Found and hence cannot be deleted"));
    }
};
exports.DeletePayment = DeletePayment;
const GetPaymentData = async (req, res, next) => {
    const PaymentID = Number(req.params.id);
    try {
        const getData = await app_1.prisma.payment.findUnique({
            where: {
                id: PaymentID,
            }
        });
        res.status(200).json({
            message: "Payment Info Successfully Found",
            Data: getData
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Payment record not found and hence cannot be fetched from the server"));
    }
};
exports.GetPaymentData = GetPaymentData;
const GetAllPaymentData = async (req, res, next) => {
    try {
        const data = await app_1.prisma.payment.findMany();
        res.status(200).json({
            message: "All the Payment Records : ",
            data: data
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("Payment Record empty!"));
    }
};
exports.GetAllPaymentData = GetAllPaymentData;
