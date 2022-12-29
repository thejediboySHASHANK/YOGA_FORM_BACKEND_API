import { Payment } from "@prisma/client";
import { assert } from "console";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../app"
import APIError from "../errors/APIError";
import PrismaError from "../errors/Prisma errors/PrismaAPIError";
import nextMonth from "../utility/getMonthEnd";

export const MockCreatePayment = async (req: Request, res: Response, next: NextFunction) => {
    const PaymentData = req.body;
    const { userId } = req.body;
    const { price } = req.body;
    const expiry = nextMonth();
    try {
        await prisma.payment.create({
            data: {
                price: price,
                isActive: true,
                expiresAt: expiry,
                users: {
                    connect: {
                        id: userId,
                    }

                }
            },
        });

        res.status(200).json({
            message: "Payment record successfully created",
            paymentInfo: PaymentData
        });
    } catch (error) {
        // console.log(error);

        next(APIError.internalServerError("Something went wrong"));

    }
};

export const UpdatePayment = async (req: Request, res: Response, next: NextFunction) => {
    const PaymentID = String(req.params.id);
    const UpdatedPayment: Payment = req.body;
    // const today = new Date ();
    // const yyyy = today.getFullYear();
    // let mm = today.getMonth () + 1;
    // let dd = today.getDate ();

    // const formattedToday = dd + "/" + mm + "/" + yyyy;

    try {
        const data = await prisma.payment.update({
            where: {
                id: PaymentID,
            },
            data: UpdatedPayment,
        });

        res.status(200).json({
            message: "Payment record successfully updated",
            paymentINfo: UpdatedPayment
        });

    } catch (error) {
        next(APIError.badRequest("Payment Record Not Found and hence cannot be updated"));
    }
};

export const DeletePayment = async (req: Request, res: Response, next: NextFunction) => {
    const PaymentID = String(req.params.id);

    try {
        const deltedData = await prisma.payment.delete({
            where: {
                id: PaymentID,
            }
        });

        res.status(200).json({
            message: "Payment Sucessfully Deelted",
            DeltedInfo: deltedData,
        });
    } catch (error) {
        next(APIError.badRequest("Payment record Not Found and hence cannot be deleted"));
    }
};

export const GetPaymentData = async (req: Request, res: Response, next: NextFunction) => {
    const PaymentID = String(req.params.id);

    try {
        const getData = await prisma.payment.findUnique({
            where: {
                id: PaymentID,
            },
            include: {
                users: true,
            }
        });

        res.status(200).json({
            message: "Payment Info Successfully Found",
            Data: getData
        });
    } catch (error) {
        next(APIError.badRequest("Payment record not found and hence cannot be fetched from the server"));
    }
};

export const GetAllPaymentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.payment.findMany({
            include: {
                users: true,
            }
        });
        res.status(200).json({
            message: "All the Payment Records : ",
            data: data
        });
    } catch (error) {
        next(APIError.badRequest("Payment Record empty!"));
    }
};