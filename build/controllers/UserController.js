"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.getAllUser = exports.getUser = exports.createUser = void 0;
const app_1 = require("../app");
const APIError_1 = __importDefault(require("../errors/APIError"));
// export const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   const userData: User = req.body;
//   try {
//     await prisma.user.create({
//       data: userData,
//     });
//     res.status(200).json({
//       message: "User created successfully",
//       user: userData,
//     });
//   } catch (error) {
//     next(APIError.internalServerError("Something went wrong"));
//   }
// };
// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const userData: User = req.body;
//   await prisma.user
//       .create({
//           data: userData,
//       })
//       .then((userResponse: User) => {
//           res.status(201).json({
//               message: 'User Created Successfully',
//               user: userResponse,
//           });
//       })
//       .catch((err) => {
//           console.log('Error', err);
//           next(APIError.internalServerError('Some error occured'));
//       });
// };
const createUser = async (req, res, next) => {
    const userData = req.body;
    try {
        await app_1.prisma.user.create({
            data: userData,
        });
        res.status(201).json({
            message: "User created Successfully",
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.internalServerError("Something went Wrong"));
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    const UserId = Number(req.params.id);
    try {
        const user = await app_1.prisma.user.findUnique({
            where: {
                id: UserId,
            },
        });
        res.status(200).json({
            message: "User Found",
            user: user,
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("User Not Found"));
    }
};
exports.getUser = getUser;
const getAllUser = async (req, res, next) => {
    try {
        const users = await app_1.prisma.user.findMany();
        res.status(200).json({
            users
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.badRequest("Users not found"));
    }
};
exports.getAllUser = getAllUser;
const UpdateUser = async (req, res, next) => {
    const userId = Number(req.params.id);
    const UpdatedData = req.body;
    try {
        const user = await app_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: UpdatedData,
        });
        res.status(200).json({
            message: "User updated successfully",
            user: user,
        });
    }
    catch (error) {
        console.log(error);
        next(APIError_1.default.badRequest("User not found, hence cannot be updated"));
    }
};
exports.UpdateUser = UpdateUser;
const DeleteUser = async (req, res, next) => {
    const UserId = Number(req.params.id);
    try {
        const user = await app_1.prisma.user.delete({
            where: {
                id: UserId,
            }
        });
        res.status(200).json({
            message: "User deleted successfully",
            user: user
        });
    }
    catch (error) {
        next(APIError_1.default.badRequest("User does not exist, hence cannot be deleted...duhhh"));
    }
};
exports.DeleteUser = DeleteUser;
