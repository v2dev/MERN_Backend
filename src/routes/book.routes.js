import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controllers.js";
  
const router = Router();

router.route("/").post(createBook);
router.route("/").get(getAllBooks);
router.route("/:id").get(getBookById);

export default router;
