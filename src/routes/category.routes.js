import { Router } from "express";
import {
  createCategory,
  getAllCategories
} from "../controllers/categories.controllers.js";
  
const router = Router();

// router.post("/", createCategory);

router.route("/").post(createCategory);
router.route("/").get(getAllCategories);

export default router;
