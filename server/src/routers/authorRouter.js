import { Router } from "express";
import { createAuthor, loginAuthor } from "../controllers/authorController.js";

const router = Router();

router.post('/register', createAuthor);

router.post('/login', loginAuthor);

export default router;