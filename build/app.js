"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// USER ROUTES IMPORTED 
const Routes_1 = __importDefault(require("./routes/Routes"));
// ERROR HANDLER IMPORTED 
const errorHandler_1 = __importDefault(require("./errors/errorHandler"));
// BATCH ROUTES IMPORTED 
const BatchRoutes_1 = __importDefault(require("./routes/BatchRoutes"));
// PAYMENT/SUBSCRIPTION ROUTES IMPORTED 
const SubscriptionRoutes_1 = __importDefault(require("./routes/SubscriptionRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
exports.prisma = new client_1.PrismaClient();
// COMPRESSES ALL THE RESPONSES 
app.use((0, compression_1.default)());
// MAKES THE HEADERS SECURE
app.use((0, helmet_1.default)());
// EBALING ALL CORS REQUEST 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// route 
app.get("/", (req, res) => {
    res.send("API of YOGA FORM!");
});
// user route 
app.use("/user", Routes_1.default);
// batch route 
app.use("/batch", BatchRoutes_1.default);
// payment/subscription route 
app.use("/payment", SubscriptionRoutes_1.default);
// error handler 
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Yoga server is running on port ${PORT}`);
});
exports.default = app;
