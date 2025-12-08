import { Router } from "express";
import {
  createBook,
  getAllBooks
} from "../controllers/book.controllers.js";
  
const router = Router();

router.route("/").post(createBook);
router.route("/").get(getAllBooks);

export default router;
