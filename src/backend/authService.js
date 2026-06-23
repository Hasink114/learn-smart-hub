import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "./firebase";

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}

export function watchAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

// Returns { role: "student" | "teacher" | null, info }
export async function getUserRole(uid) {
  if (!uid) return { role: null, info: null };

  const studentSnap = await get(ref(db, `Students/${uid}/information`));
  if (studentSnap.exists()) {
    const info = studentSnap.val();
    if (info.learnSmartStudent === true) {
      return { role: "student", info };
    }
  }

  const facultySnap = await get(ref(db, `Faculty/${uid}/information`));
  if (facultySnap.exists()) {
    const info = facultySnap.val();
    if (info.learnSmartTeacher === true) {
      return { role: "teacher", info };
    }
  }

  return { role: null, info: null };
}