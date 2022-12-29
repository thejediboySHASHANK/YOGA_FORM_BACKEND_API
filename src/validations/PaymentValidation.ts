import { Payment } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import APIError from "../errors/APIError";
import { User } from "@prisma/client";

const PaymentFormValidation = (req : Request, res : Response, next : NextFunction) => {
    const PaymentData : Payment = req.body;
    const {value} = PaymentData;

    if (value != 500) {
        next(APIError.badRequest("Payment value should be exact 500"));
        return;
    }
    next();
}

export default PaymentFormValidation;