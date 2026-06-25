import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { trueKeys } from "./helpers";
import { requireAuth, assertCourseId, SecurityError } from "./security";

export async function getEnrolledCourses(uid) {
  if (!uid) throw new SecurityError("Missing user.");
  const snap = await get(ref(db, `Students/${uid}/information/enrolledCourses`));
  console.log("[DEBUG getEnrolledCourses] snap.val():", snap.val());
  if (!snap.exists()) return [];
  const keys = trueKeys(snap.val());
  console.log("[DEBUG getEnrolledCourses] processed keys:", keys);
  return keys;
}

export async function assertEnrolled(user, courseId) {
  requireAuth(user);
  assertCourseId(courseId);
  const courses = await getEnrolledCourses(user.uid);
  if (!courses.includes(courseId)) {
    throw new SecurityError("You are not enrolled in this course.");
  }
}