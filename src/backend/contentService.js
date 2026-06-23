import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { objToList } from "./helpers";

async function fetchType(course, type) {
  const snap = await get(ref(db, `subject/LearnSmart/${course}/${type}`));
  if (!snap.exists()) return [];
  return objToList(snap.val()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

export const fetchLearningMaterial = (course) => fetchType(course, "Learning Material");
export const fetchAssignments = (course) => fetchType(course, "Assignments");
export const fetchLectures = (course) => fetchType(course, "Recorded Lectures");

export async function getCourseContent(course) {
  const [material, assignments, lectures] = await Promise.all([
    fetchLearningMaterial(course),
    fetchAssignments(course),
    fetchLectures(course),
  ]);
  return { material, assignments, lectures };
}