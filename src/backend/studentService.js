import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { trueKeys } from "./helpers";

export async function getEnrolledCourses(uid) {
  const snap = await get(ref(db, `Students/${uid}/information/enrolledCourses`));
  if (!snap.exists()) return [];
  return trueKeys(snap.val());
}

export async function assertEnrolled(uid, courseId) {
  const courses = await getEnrolledCourses(uid);
  if (!courses.includes(courseId)) {
    throw new Error("You are not enrolled in this course.");
  }
}