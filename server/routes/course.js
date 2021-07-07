import express from "express";
import { uploadImage, removeImage, create } from "../controllers/course";
import { isInstructor, requireSignin } from "../middlewares";

const router = express.Router();

//image
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);
//course
router.post("/course", requireSignin, isInstructor, create);

module.exports = router;
