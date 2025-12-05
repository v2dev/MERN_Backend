import { Router } from "express";
import {
  createProduct
} from "../controllers/product.list.controllers.js";
  
const router = Router();

// router.post("/", createProduct);

router.route("/").post(createProduct);

export default router;
