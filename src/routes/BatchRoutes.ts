import { Router } from "express";
import * as BatchController from "../controllers/BatchController";

const router : Router = Router ();

// FOR CREATING BATCH 
router.post ("/", BatchController.createBatch);

// FOR ACCESSING ALL THE EBATCHES 
router.get ("/", BatchController.GetAllBatch);

// FOR ACESSING A SPECIFIC BATCH 
router.get ("/:id", BatchController.GetBatch);

// FOR UPDATING THE BATCH CURRENT CAPACITY BY 1
router.patch ("/:id", BatchController.IncrementBatchCapacity);

// FOR UPDATING THE BATCH ACCORDING TO THE NEEDS OF ADMIN 
router.patch ("/admin/:id", BatchController.UpdateBatch);

// FOR DELETING A BATCH 
router.delete ("/:id", BatchController.DeleteBatch);

export default router;