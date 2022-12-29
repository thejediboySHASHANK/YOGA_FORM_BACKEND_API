import { Router } from "express";
import * as UserController from "../controllers/UserController"
import UserFormValidation from "../validations/Validation";


const router : Router = Router ();

// FOR CREATING USER 
router.post ("/", UserFormValidation, UserController.createUser);

// FOR GETTING ALL THE USERS 
router.get ("/", UserController.getAllUser);

// FOR GETTING A SPECIFIC USER 
router.get ("/:id", UserController.getUser);

// FOR UPDATING A USER 
router.patch ("/:id", UserController.UpdateUser);

// FOR DELTING A USER 
router.delete ("/:id", UserController.DeleteUser);

export default router;