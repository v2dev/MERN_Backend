import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryType,
  getDataByCategory
} from "../controllers/categories.controllers.js";
  
const router = Router();

router.route("/").post(createCategory);
router.route("/").get(getAllCategories);
router.route("/:id/type").get(getCategoryType);
router.route("/:id/data").get(getDataByCategory);

export default router;
