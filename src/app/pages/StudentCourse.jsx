import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getEnrolledCourses, assertEnrolled } from "../../backend/studentService";
import { getCourseContent } from "../../backend/contentService";
import { getCourseMeta, COURSES } from "../../backend/courseConstants";
import { assertCourseId } from "../../backend/security";
import { youtubeIdFromUrl } from "../../backend/helpers";

const TABS = [
  { key: "material", label: "Learning Material" },
  { key: "assignments", label: "Assignments" },
  { key: "lectures", label: "Recorded Lectures" },
];

export default function StudentCourse() {
  const { courseId: rawId } = useParams();
  const courseId = decodeURIComponent(rawId).trim().replace(/^["']|["']$/g, "");
  const { user, role } = useAuth();
  const meta = getCourseMeta(courseId);
  
  console.log("[DEBUG StudentCourse] rawId:", rawId);
  console.log("[DEBUG StudentCourse] courseId:", courseId);
  console.log("[DEBUG StudentCourse] All hardcoded COURSES:", COURSES);

  const [tab, setTab] = useState("material");
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        if (role !== "student") throw new Error("Only students can view this page.");
        assertCourseId(courseId);
        await assertEnrolled(user, courseId);
        const data = await getCourseContent(courseId);
        setContent(data);
      } catch (e) {
        setError(e?.message || "Failed to load.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, role, courseId]);

  if (loading) return <div className="p-10 text-muted-foreground">Loading…</div>;
  if (error)
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h2 className="text-xl font-semibold">{error}</h2>
        <Link to="/student" className="mt-4 inline-block text-primary underline">Back to dashboard</Link>
      </div>
    );

  const items =
    tab === "material" ? content.material : tab === "assignments" ? content.assignments : content.lectures;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/student" className="text-sm text-muted-foreground hover:underline">← All courses</Link>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{meta.name}</h1>
      <p className="mt-1 text-muted-foreground">{meta.description}</p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            Nothing here yet.
          </div>
        )}
        {items.map((it) => (
          <ContentCard key={it.id} item={it} type={tab} />
        ))}
      </div>
    </div>
  );
}

function ContentCard({ item, type }) {
  const isVideo = type === "lectures";
  const link = isVideo ? item.youtubeLink : item.link;
  const ytId = isVideo ? youtubeIdFromUrl(link) : null;

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      )}

      {isVideo ? (
        ytId ? (
          <div className="mt-4 overflow-hidden rounded-lg">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${ytId}`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          link && (
            <a href={link} target="_blank" rel="noreferrer"
              className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Watch on YouTube ↗
            </a>
          )
        )
      ) : (
        link && (
          <a href={link} target="_blank" rel="noreferrer"
            className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Open Document ↗
          </a>
        )
      )}
    </article>
  );
}