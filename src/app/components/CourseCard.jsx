import { Link } from "react-router-dom";
import { getCourseMeta } from "../../backend/courseConstants";

export default function CourseCard({ courseId, to }) {
  const meta = getCourseMeta(courseId);
  return (
    <div className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="mb-3 inline-flex rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-foreground" style={{ backgroundColor: "color-mix(in oklab, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
          Course
        </div>
        <h3 className="text-lg font-semibold text-foreground">{meta.name}</h3>
        {meta.description && (
          <p className="mt-2 text-sm text-muted-foreground">{meta.description}</p>
        )}
      </div>
      <Link
        to={to}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Enter Course →
      </Link>
    </div>
  );
}