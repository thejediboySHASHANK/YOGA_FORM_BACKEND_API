import { Router } from "express";
import * as PaymentController from "../controllers/SubscriptionController";
import PaymentFormValidation from "../validations/PaymentValidation";
import CheckUser from "../middlewares/IfUserExists";
import CheckBatch from "../middlewares/CheckBatchAndPrice";
import MakePayment from "../middlewares/MakePayment";


const router : Router = Router ();

// FOR CREATING PAYMENT INFO 
router.post ("/", [CheckUser, CheckBatch, MakePayment], PaymentController.MockCreatePayment);

// FOR DELETING PAYMENT INFO 
router.delete ("/:id", PaymentController.DeletePayment);

// FOR UPDATING PAYMENT INFO 
router.patch ("/:id", PaymentController.UpdatePayment);

// FOR GETTING A PAYMENT INFO BY ID 
router.get ("/admin/:id", PaymentController.GetPaymentData);

// FOR GETTING ALL THE PAYMENT INFO 
router.get ("/admin", PaymentController.GetAllPaymentData);

export default router;