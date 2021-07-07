import express from "express";
import { uploadImage } from "../controllers/course";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/course/upload-image", uploadImage);

module.exports = router;
