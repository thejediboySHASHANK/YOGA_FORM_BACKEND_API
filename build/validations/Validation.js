"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("../errors/APIError"));
const UserFormValidation = (req, res, next) => {
    const Userdata = req.body;
    const { age } = Userdata;
    if (age < 18 || age > 65) {
        // return APIError.badRequest();
        next(APIError_1.default.badRequest("Age of user entered is less than 18 or above 65"));
        return;
    }
    next();
};
exports.default = UserFormValidation;
