"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BatchController = __importStar(require("../controllers/BatchController"));
const router = (0, express_1.Router)();
// FOR CREATING BATCH 
router.post("/", BatchController.createBatch);
// FOR ACCESSING ALL THE EBATCHES 
router.get("/", BatchController.GetAllBatch);
// FOR ACESSING A SPECIFIC BATCH 
router.get("/:id", BatchController.GetBatch);
// FOR UPDATING THE BATCH CURRENT CAPACITY BY 1
router.patch("/:id", BatchController.IncrementBatchCapacity);
// FOR UPDATING THE BATCH ACCORDING TO THE NEEDS OF ADMIN 
router.patch("/admin/:id", BatchController.UpdateBatch);
// FOR DELETING A BATCH 
router.delete("/:id", BatchController.DeleteBatch);
exports.default = router;
