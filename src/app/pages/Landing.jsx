import { Link } from "react-router-dom";
import { COURSES } from "../../backend/courseConstants";

const COURSE_ICONS = {
  "Digital Marketing": "📈",
  "Vibe Coding": "✨",
  "Basic Web development": "💻",
  "Google docs/sheets with AI": "🧠",
};

const FEATURES = [
  { icon: "🎯", title: "Project-first learning", desc: "Every class ships something real — portfolios, campaigns, working sites." },
  { icon: "👨‍🏫", title: "Mentors, not lecturers", desc: "Small batches with one-on-one feedback from working professionals." },
  { icon: "🎥", title: "Lifetime recordings", desc: "Recorded lectures, notes and assignments — revisit anything, anytime." },
  { icon: "🏆", title: "Completion certificate", desc: "Verified certificate at the end of every program." },
];

const STATS = [
  ["500+", "Students trained"],
  ["4", "Industry tracks"],
  ["12+", "Expert mentors"],
  ["96%", "Course satisfaction"],
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 15% -10%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 60%), radial-gradient(700px 420px at 90% 10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 65%), linear-gradient(180deg, var(--background), var(--background))",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at top, black 30%, transparent 75%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Admissions open · Batch 2026
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn the skills{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, var(--primary), var(--accent))",
                }}
              >
                tomorrow pays for
              </span>
              .
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Short, hands-on programs in modern tech & marketing — taught live at
              Learn Smart Academy, backed by structured online material,
              assignments and recorded lectures.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition hover:shadow-lg"
              >
                <span>Register Now</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-6 py-3 font-medium text-foreground backdrop-blur hover:bg-secondary"
              >
                Student / Teacher Login
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-bold text-foreground sm:text-3xl">{v}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual card */}
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primary) 50%, transparent), color-mix(in oklab, var(--accent) 40%, transparent))",
              }}
              aria-hidden
            />
            <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                </div>
                <span className="text-xs text-muted-foreground">learnsmart.academy</span>
              </div>
              <div className="mt-5 space-y-3">
                {COURSES.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-3 transition hover:border-primary/40 hover:bg-secondary/60"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-lg">
                      {COURSE_ICONS[c.id] || "📚"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-foreground">{c.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{c.duration} · {c.fee}</div>
                    </div>
                    <span className="text-xs text-primary">Live</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">Why Learn Smart</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built like a studio, not a classroom.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            We train students the way modern teams actually work — fast feedback,
            real briefs and tools you'll use on day one of a job.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-xl"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, transparent), color-mix(in oklab, var(--accent) 18%, transparent))",
                }}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="relative">
        <div className="absolute inset-0 -z-10 bg-secondary/30" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">Programs</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Courses</h2>
            </div>
            <Link to="/register" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
              Apply now →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {COURSES.map((c) => (
              <article
                key={c.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 blur-3xl transition group-hover:opacity-70"
                  style={{
                    background:
                      "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 60%, transparent), transparent)",
                  }}
                />
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                    {COURSE_ICONS[c.id] || "📚"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">⏱ {c.duration}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">💳 {c.fee}</span>
                  </div>
                  <Link to="/register" className="text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Enroll →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Get started</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How Registration Works
          </h2>
        </div>
        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Fill the form", "Submit your details on our registration page."],
            ["02", "Admin review", "Our team reviews your request and seat availability."],
            ["03", "Account created", "Admin creates your login and assigns your course."],
            ["04", "Start learning", "Log in to access material, assignments & lectures."],
          ].map(([n, t, d]) => (
            <li
              key={n}
              className="relative rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <div className="text-3xl font-bold tracking-tight text-primary/30">{n}</div>
              <h4 className="mt-2 font-semibold text-foreground">{t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 text-center sm:p-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 90%, transparent), color-mix(in oklab, var(--accent) 85%, transparent))",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 80% 60%, white 1px, transparent 1.5px)",
              backgroundSize: "28px 28px, 36px 36px",
            }}
          />
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to upgrade your skills?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
            Join the next batch and learn alongside motivated peers in a focused,
            mentor-led environment.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="rounded-md bg-background px-6 py-3 font-medium text-foreground shadow hover:opacity-95"
            >
              Register Now
            </Link>
            <a
              href="#contact"
              className="rounded-md border border-primary-foreground/40 px-6 py-3 font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-20">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">Visit us</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">Visit the academy or reach out — we're happy to help.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Address", "📍", "Learn Smart Academy Campus"],
            ["Phone", "📞", "+92 300 0000000"],
            ["Email", "✉️", "info@learnsmart.academy"],
          ].map(([label, icon, value]) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-lg">{icon}</div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
              </div>
              <div className="mt-3 text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Learn Smart Academy · Part of the APS LMS ecosystem
      </footer>
    </div>
  );
}