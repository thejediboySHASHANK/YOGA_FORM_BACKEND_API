import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import APIError from "../errors/APIError";

const UserFormValidation = (req : Request, res : Response, next : NextFunction) => {
    const Userdata : User = req.body;

    const {age} = Userdata;
    if (age < 18 || age > 65) {
        // return APIError.badRequest();
        next (APIError.badRequest("Age of user entered is less than 18 or above 65"));
        return;
    }
    next ();
}

export default UserFormValidation;