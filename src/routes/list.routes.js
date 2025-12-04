import { Router } from "express";
import {
  getAllLists,
  getContactById
} from "../controllers/list.controllers.js";
  
const router = Router();

router.route("/contacts").get(getAllLists);
router.route("/contacts/:id").get(getContactById);

export default router;
