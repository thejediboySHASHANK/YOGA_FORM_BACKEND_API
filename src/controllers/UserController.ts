import { User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { NextFunction, Response, Request, response } from "express";
import { prisma } from "../app";
import APIError from "../errors/APIError";

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

export const createUser = async (req: Request, res: Response, next: NextFunction) =>{
  const userData : User = req.body;
  const {first_name} = req.body
  const {last_name} = req.body;
  const phoneno = req.body.phoneno ? parseInt(req.body.phoneno, 10) : null;
  const {email} = req.body;
  const age = parseInt(req.body.age, 10);
  const {gender} = req.body;
  const height = req.body.height ? parseInt(req.body.height, 10) : null;
  const weight = req.body.weight ? parseFloat(req.body.weight) : null;

  try {
      await prisma.user.create({
          data: {
            first_name : first_name,
            last_name : last_name,
            phoneno : phoneno,
            email : email,
            age : age,
            gender : gender,
            height : height,
            weight : weight
          }
      });
      res.status(201).json({
          message: "User created Successfully",
      });

  } catch (error) {
      console.log (error);
      next(APIError.internalServerError("Something went Wrong"));
  }
};


export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const UserId = String(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
      include : {
        batch : true,
        payment : true,
      }
    });
    res.status(200).json({
      message: "User Found",
      user: user,
    });
  } catch (error) {
    next(APIError.badRequest("User Not Found"));
  }
};

export const getAllUser = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const users = await prisma.user.findMany ({
      include : {
        batch : true,
        payment : true,
      }, 
    })
    res.status (200).json ({
      users
    })
  } catch (error) {
    console.log (error);
    next (APIError.badRequest("Users not found"));
  }
};

export const UpdateUser = async (req : Request, res : Response, next : NextFunction) => {
  const id = String(req.params.id);
  const UpdatedData : User = req.body;
  try {
    const user = await prisma.user.update ({
      where : {
        id,
      },
      data: UpdatedData,
      include: {
        batch : true,
      },
    });
    
    res.status (200).json ({
      message: "User updated successfully",
      user : user,
    })

  } catch (error) {
    console.log (error);
    next (APIError.badRequest("User not found, hence cannot be updated"))
  }
}

export const DeleteUser = async (req : Request, res : Response, next :NextFunction) => {
  const UserId = String(req.params.id);
  try {
    const user = await prisma.user.delete ({
      where : {
        id : UserId,
      }
    });

    res.status (200).json ({
      message : "User deleted successfully",
      user : user
    });
  } catch (error) {
    next (APIError.badRequest("User does not exist, hence cannot be deleted...duhhh"))
  }
}
