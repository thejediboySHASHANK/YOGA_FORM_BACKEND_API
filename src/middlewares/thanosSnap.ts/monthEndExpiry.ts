import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";
import APIError from "../../errors/APIError";
import PrismaError from "../../errors/Prisma errors/PrismaAPIError";
import { prisma } from "../../app";
import { Payment } from "@prisma/client";
import { Batch } from "@prisma/client";

// getMonthEnd utility imported 
import nextMonth from "../../utility/getMonthEnd";

const schedule = require("node-schedule");

const MonthEndExpiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Payment = await prisma.payment.deleteMany();
        res.status(200).json({
            message: "Reset of Payment info was successful",
            deletedInfo: Payment,
        })
    } catch (error) {
        next(APIError.badRequest("There was some error in resetting the payment record of monthend"))
    }

    try {
        const users = await prisma.user.updateMany({
            data: {
                batch_id: null,
            }
        });
        res.status(200).json({
            message: "All the users are deallocated from the batches",
            UpdatedInfo: users,
        })
    } catch (error) {
        next(APIError.badRequest("There was some error in making all the batch id's as null"))
    }
    
    try {
        const batches = await prisma.batch.updateMany ({
            data : {
                batch_capacity_current : 0,
            },
        });
        res.status (200).json ({
            message : "All the batches have been updated for next Month",
            batches : batches,
        })
    } catch (error) {
        next (APIError.badRequest ("There was some error in updating the batches for next month"));
    }

}

var date = nextMonth();

schedule.scheduleJob(date, MonthEndExpiry);