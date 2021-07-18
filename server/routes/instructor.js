import express from "express";
import {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
  studentCount,
  instructorBalance
} from "../controllers/instructor";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);
router.get("/instructor-courses", requireSignin, instructorCourses);

router.post("/instructor/student-count", requireSignin, studentCount);
router.get("/instructor/balance", requireSignin, instructorBalance);
module.exports = router;
