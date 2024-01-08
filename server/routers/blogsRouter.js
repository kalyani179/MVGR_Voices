import express from "express";
const router = express.Router();
import createBlog from "../controllers/blogsController.js";
import verifyJWT from "../utilities/userVerification.js";

router.post("/create-blog",verifyJWT,createBlog);

export default router;