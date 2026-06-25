import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  getAssignedCourses,
  uploadContent,
  getEnrolledStudentsForCourse,
} from "../../backend/teacherService";
import { getCourseContent } from "../../backend/contentService";
import { getCourseMeta } from "../../backend/courseConstants";
import { assertCourseId } from "../../backend/security";

const UPLOAD_TABS = [
  { key: "Learning Material", label: "Learning Material", linkLabel: "Google Drive Link" },
  { key: "Assignments", label: "Assignment", linkLabel: "Google Drive Link" },
  { key: "Recorded Lectures", label: "Recorded Lecture", linkLabel: "YouTube Link" },
];

export default function TeacherCourse() {
  const { courseId: rawId } = useParams();
  const courseId = decodeURIComponent(rawId).trim().replace(/^["']|["']$/g, "");
  const { user, role } = useAuth();
  const meta = getCourseMeta(courseId);

  const [tab, setTab] = useState("Learning Material");
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [msg, setMsg] = useState({ state: "idle", text: "" });
  const [allowed, setAllowed] = useState(null);
  const [content, setContent] = useState({ material: [], assignments: [], lectures: [] });
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        if (role !== "teacher") { setAllowed(false); return; }
        assertCourseId(courseId);
        const assigned = await getAssignedCourses(user.uid);
        setAllowed(assigned.includes(courseId));
      } catch {
        setAllowed(false);
      }
    })();
  }, [user, role, courseId]);

  async function refresh() {
    const data = await getCourseContent(courseId);
    setContent(data);
  }

  useEffect(() => {
    if (allowed) refresh();
  }, [allowed, courseId]);

  async function onUpload(e) {
    e.preventDefault();
    setMsg({ state: "idle", text: "" });
    setMsg({ state: "loading", text: "" });
    try {
      await uploadContent({
        user,
        course: courseId,
        type: tab,
        title: form.title,
        description: form.description,
        link: form.link,
      });
      setForm({ title: "", description: "", link: "" });
      setMsg({ state: "success", text: "Uploaded successfully." });
      refresh();
    } catch (e) {
      setMsg({ state: "error", text: e?.message || "Upload failed." });
    }
  }

  async function loadStudents() {
    setShowStudents(true);
    try {
      const list = await getEnrolledStudentsForCourse(user, courseId);
      setStudents(list);
    } catch (e) {
      setStudents([]);
      setMsg({ state: "error", text: e?.message || "Failed to load students." });
    }
  }

  if (allowed === null) return <div className="p-10 text-muted-foreground">Loading…</div>;
  if (!allowed)
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h2 className="text-xl font-semibold">Course not assigned to you</h2>
        <Link to="/teacher" className="mt-4 inline-block text-primary underline">Back</Link>
      </div>
    );

  const currentList =
    tab === "Learning Material"
      ? content.material
      : tab === "Assignments"
      ? content.assignments
      : content.lectures;

  const linkLabel = UPLOAD_TABS.find((t) => t.key === tab).linkLabel;
  const field =
    "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/teacher" className="text-sm text-muted-foreground hover:underline">← All courses</Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
          <p className="mt-1 text-muted-foreground">Manage content for this course</p>
        </div>
        <button
          onClick={loadStudents}
          className="rounded-md border border-border bg-background px-4 py-2 text-sm hover:bg-secondary"
        >
          View enrolled students
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
        {UPLOAD_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setMsg({ state: "idle", text: "" }); }}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={onUpload} className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-foreground">Title</span>
            <input className={field} required value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-foreground">Description</span>
            <textarea rows={3} className={field} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-foreground">{linkLabel}</span>
            <input className={field} required placeholder={
              tab === "Recorded Lectures"
                ? "https://www.youtube.com/watch?v=..."
                : "https://drive.google.com/..."
            } value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </label>
        </div>
        {msg.text && (
          <div className={`mt-4 rounded-md px-3 py-2 text-sm ${
            msg.state === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>{msg.text}</div>
        )}
        <button disabled={msg.state === "loading"}
          className="mt-5 inline-flex rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
          {msg.state === "loading" ? "Uploading…" : "Upload"}
        </button>
      </form>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Existing {tab}</h2>
        <div className="mt-4 grid gap-3">
          {currentList.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Nothing uploaded yet.
            </div>
          )}
          {currentList.map((it) => (
            <div key={it.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
              <div>
                <div className="font-medium text-foreground">{it.title}</div>
                {it.description && (
                  <div className="text-sm text-muted-foreground">{it.description}</div>
                )}
              </div>
              <a className="text-sm text-primary underline" target="_blank" rel="noreferrer"
                href={it.youtubeLink || it.link}>
                Open ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {showStudents && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Enrolled Students ({students.length})</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Class</th>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Gender</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">No students enrolled.</td></tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.uid} className="border-t border-border">
                      <td className="px-4 py-2 text-foreground">{s.name}</td>
                      <td className="px-4 py-2">{s.className}</td>
                      <td className="px-4 py-2">{s.id}</td>
                      <td className="px-4 py-2">{s.gender}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}