"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = __importDefault(require("./APIError"));
function errorHandler(err, req, res, next) {
    // if (err instanceof APIError) {
    //     err.code = Number (err.code);
    //     // typeof err.code;
    //     res.status (err.code).message ({
    //     })
    //     return;
    // }
    if (err instanceof APIError_1.default) {
        res.status(err.code).json({ error: { message: err.message } });
        return;
    }
    res.status(500).json({
        message: "Something went wrong to the server, kahan gaya usko dhundo"
    });
}
exports.default = errorHandler;
