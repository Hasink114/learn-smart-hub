import { ref, get, push, set } from "firebase/database";
import { db } from "./firebase";
import { trueKeys, tsNow, objToList } from "./helpers";
import {
  requireAuth,
  assertCourseId,
  assertContentType,
  assertContentLink,
  sanitizeText,
  SecurityError,
} from "./security";

export async function getAssignedCourses(uid) {
  if (!uid) throw new SecurityError("Missing user.");
  const snap = await get(ref(db, `Faculty/${uid}/information/assignedCourses`));
  if (!snap.exists()) return [];
  return trueKeys(snap.val());
}

export async function assertAssigned(user, courseId) {
  requireAuth(user);
  assertCourseId(courseId);
  const courses = await getAssignedCourses(user.uid);
  if (!courses.includes(courseId)) {
    throw new SecurityError("You are not assigned to this course.");
  }
}

// type: "Learning Material" | "Assignments" | "Recorded Lectures"
export async function uploadContent({ user, course, type, title, description, link }) {
  requireAuth(user);
  assertCourseId(course);
  assertContentType(type);
  const safeTitle = sanitizeText(title, { max: 140, required: true, label: "Title" });
  const safeDesc = sanitizeText(description, { max: 1000, label: "Description" });
  const safeLink = assertContentLink(type, link);
  await assertAssigned(user, course);

  const path = `subject/LearnSmart/${course}/${type}`;
  const node = push(ref(db, path));
  const payload = {
    title: safeTitle,
    description: safeDesc,
    uploadedBy: user.uid,
    timestamp: tsNow(),
  };
  if (type === "Recorded Lectures") payload.youtubeLink = safeLink;
  else payload.link = safeLink;
  await set(node, payload);
  return node.key;
}

export async function getEnrolledStudentsForCourse(user, courseId) {
  // Only an assigned teacher can list students for a course.
  await assertAssigned(user, courseId);
  const snap = await get(ref(db, "Students"));
  if (!snap.exists()) return [];
  const out = [];
  const all = snap.val();
  for (const uid of Object.keys(all)) {
    const info = all[uid]?.information;
    if (!info) continue;
    if (info.learnSmartStudent !== true) continue;
    if (info.enrolledCourses && info.enrolledCourses[courseId] === true) {
      out.push({
        uid,
        name: info.Name || "",
        className: info.Class || "",
        gender: info.Gender || "",
        id: info.id || "",
      });
    }
  }
  return out;
}

export { objToList };