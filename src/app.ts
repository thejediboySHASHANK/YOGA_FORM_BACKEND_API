import { PrismaClient } from "@prisma/client";
import express from "express";
import compression from "compression"
import helmet from "helmet"
import cors from 'cors'
import { Request, Response } from "express";

// USER ROUTES IMPORTED 
import UserRoutes from "./routes/Routes";
// ERROR HANDLER IMPORTED 
import errorHandler from "./errors/errorHandler";
import PrismaErrorHandler from "./errors/Prisma errors/errorHandlerPrisma";

// BATCH ROUTES IMPORTED 
import BatchRoutes from "./routes/BatchRoutes";

// PAYMENT/SUBSCRIPTION ROUTES IMPORTED 
import PaymentRoutes from "./routes/SubscriptionRoutes";

const app = express ();
const PORT = 8000;

export const prisma = new PrismaClient ()

// COMPRESSES ALL THE RESPONSES 
app.use (compression())
// MAKES THE HEADERS SECURE
app.use (helmet())
// EBALING ALL CORS REQUEST 
app.use (cors ())

app.use (express.json())

app.use (express.urlencoded ({extended : true}))

// route 
app.get ("/", (req : Request, res : Response) => {
    res.send ("API of YOGA FORM!");
});

// user route 
app.use ("/user", UserRoutes);

// batch route 
app.use ("/batch", BatchRoutes);

// payment/subscription route 
app.use ("/payment", PaymentRoutes);

// error handler 
// app.use (PrismaErrorHandler);
app.use (errorHandler);


app.listen (PORT, () => {
    console.log (`Yoga server is running on port ${PORT}`)
})

export default app;