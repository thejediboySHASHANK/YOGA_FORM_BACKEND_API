"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../errors/APIError"));
const PaymentFormValidation = (req, res, next) => {
    const PaymentData = req.body;
    const { value } = PaymentData;
    if (value != 500) {
        next(APIError_1.default.badRequest("Payment value should be exact 500"));
        return;
    }
    next();
};
exports.default = PaymentFormValidation;
