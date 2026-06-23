import { ref, get, push, set } from "firebase/database";
import { db } from "./firebase";
import { trueKeys, tsNow, objToList } from "./helpers";

export async function getAssignedCourses(uid) {
  const snap = await get(ref(db, `Faculty/${uid}/information/assignedCourses`));
  if (!snap.exists()) return [];
  return trueKeys(snap.val());
}

export async function assertAssigned(uid, courseId) {
  const courses = await getAssignedCourses(uid);
  if (!courses.includes(courseId)) {
    throw new Error("You are not assigned to this course.");
  }
}

// type: "Learning Material" | "Assignments" | "Recorded Lectures"
export async function uploadContent({ uid, course, type, title, description, link }) {
  await assertAssigned(uid, course);
  const path = `subject/LearnSmart/${course}/${type}`;
  const node = push(ref(db, path));
  const payload = {
    title,
    description,
    uploadedBy: uid,
    timestamp: tsNow(),
  };
  if (type === "Recorded Lectures") payload.youtubeLink = link;
  else payload.link = link;
  await set(node, payload);
  return node.key;
}

export async function getEnrolledStudentsForCourse(courseId) {
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