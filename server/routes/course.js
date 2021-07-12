import express from "express";
import formidable from "express-formidable";
import {
  uploadImage,
  removeImage,
  create,
  read,
  update,
  uploadVideo,
  removeVideo,
  addLesson,
  updateLesson,
  removeLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment
} from "../controllers/course";
import { isInstructor, requireSignin } from "../middlewares";

const router = express.Router();

router.get("/courses", courses);

//image
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);
//course
router.post("/course", requireSignin, isInstructor, create);
router.put("/course/:slug", requireSignin, update);
router.get("/course/:slug", read);
router.post(
  "/course/video-upload/:instructorId",
  requireSignin,
  formidable({ maxFileSize: 1000 * 1024 * 1024 }),
  uploadVideo
);
router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);

//publish unpublish
router.put("/course/publish/:courseId", requireSignin, publishCourse);
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

// lessons
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);
router.put("/course/lesson/:slug/:instructorId", requireSignin, updateLesson);
router.put("/course/:slug/:lessonId", requireSignin, removeLesson);

router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment);

// enrollment

router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment);

module.exports = router;
