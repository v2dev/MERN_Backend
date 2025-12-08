import { Router } from "express";
import {
  getAllLists,
  getContactById,
  getContactsByCategory
} from "../controllers/list.controllers.js";
  
const router = Router();

router.route("/contacts").get(getAllLists);
router.route("/contacts/:id").get(getContactById);
router.route("/contacts/category/:id").get(getContactsByCategory);

export default router;
