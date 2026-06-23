// ============================================================
// Code-level security guards for Learn Smart Academy.
// All privileged operations MUST go through these helpers so
// validation lives in one place instead of being scattered.
// ============================================================
import { COURSE_IDS } from "./courseConstants";
import { youtubeIdFromUrl } from "./helpers";

export const CONTENT_TYPES = ["Learning Material", "Assignments", "Recorded Lectures"];

const ALLOWED_DOC_HOSTS = [
  "drive.google.com",
  "docs.google.com",
  "sheets.google.com",
  "slides.google.com",
];
const ALLOWED_YT_HOSTS = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"];

export class SecurityError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "SecurityError";
  }
}

export function requireAuth(user) {
  if (!user || !user.uid) throw new SecurityError("You must be signed in.");
  return user;
}

export function requireRole(authState, expected) {
  requireAuth(authState?.user);
  if (authState.role !== expected) {
    throw new SecurityError("Your account is not allowed to perform this action.");
  }
}

export function assertCourseId(courseId) {
  if (typeof courseId !== "string" || !COURSE_IDS.includes(courseId)) {
    throw new SecurityError("Unknown course.");
  }
  return courseId;
}

export function assertContentType(type) {
  if (!CONTENT_TYPES.includes(type)) {
    throw new SecurityError("Invalid content type.");
  }
  return type;
}

export function sanitizeText(s, { max = 500, required = false, label = "Field" } = {}) {
  const value = typeof s === "string" ? s.replace(/[\u0000-\u001F\u007F]/g, "").trim() : "";
  if (required && !value) throw new SecurityError(`${label} is required.`);
  if (value.length > max) throw new SecurityError(`${label} is too long (max ${max}).`);
  return value;
}

function parseHttpsUrl(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    throw new SecurityError("Provide a valid URL.");
  }
  if (u.protocol !== "https:") throw new SecurityError("Only https links are allowed.");
  return u;
}

export function assertYouTubeUrl(raw) {
  const u = parseHttpsUrl(raw);
  const host = u.hostname.toLowerCase();
  if (!ALLOWED_YT_HOSTS.includes(host)) {
    throw new SecurityError("Only YouTube links are allowed for lectures.");
  }
  if (!youtubeIdFromUrl(raw)) throw new SecurityError("Not a valid YouTube video link.");
  return u.toString();
}

export function assertDocUrl(raw) {
  const u = parseHttpsUrl(raw);
  const host = u.hostname.toLowerCase();
  if (!ALLOWED_DOC_HOSTS.includes(host)) {
    throw new SecurityError("Only Google Drive / Docs links are allowed.");
  }
  return u.toString();
}

export function assertContentLink(type, link) {
  assertContentType(type);
  if (type === "Recorded Lectures") return assertYouTubeUrl(link);
  return assertDocUrl(link);
}