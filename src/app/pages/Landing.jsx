import { Link } from "react-router-dom";
import { COURSES } from "../../backend/courseConstants";

const COURSE_ICONS = {
  "Digital Marketing": "📈",
  "Vibe Coding": "✨",
  "Basic Web development": "💻",
  "Google docs/sheets with AI": "🧠",
};

const OFFERINGS = [
  {
    icon: "🎯",
    title: "Project-first learning",
    desc: "Build real portfolios, campaigns, and working websites instead of just reading theory.",
  },
  {
    icon: "👨‍🏫",
    title: "Mentor-led batches",
    desc: "Small groups with direct feedback from professionals actively working in the field.",
  },
  {
    icon: "🎥",
    title: "Lifetime access to recordings",
    desc: "Every lecture is recorded and stored so you can revisit lessons, notes, and assignments anytime.",
  },
  {
    icon: "🏆",
    title: "Verified certificate",
    desc: "Receive a completion certificate at the end of your program to showcase your new skills.",
  },
];

const REGISTRATION_STEPS = [
  {
    n: "01",
    title: "Fill the registration form",
    desc: "Share your name, class, contact details, and the course you want to join.",
  },
  {
    n: "02",
    title: "Wait for admin review",
    desc: "Our team checks seat availability and confirms your enrollment within 1–2 working days.",
  },
  {
    n: "03",
    title: "Get your account",
    desc: "Once approved, we create your student or teacher login and assign your course.",
  },
  {
    n: "04",
    title: "Start learning",
    desc: "Log in to access course material, assignments, recorded lectures, and updates.",
  },
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
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
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
              Short, hands-on programs in modern tech and marketing — taught live at
              Learn Smart Academy with structured online material, assignments, and
              recorded lectures.
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
                      <div className="truncate text-xs text-muted-foreground">{c.duration}</div>
                    </div>
                    <span className="text-xs text-primary">Live</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">What we offer</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built like a studio, not a classroom.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            We train students the way modern teams actually work — fast feedback,
            real briefs, and tools you'll use on day one.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERINGS.map((f) => (
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
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      ⏱ {c.duration}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Pricing</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Course Fees</h2>
          <p className="mt-2 text-muted-foreground">
            Transparent pricing for every program. Pick a course and register to reserve your seat.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60">
                  <th className="px-6 py-4 font-semibold text-foreground">Course</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Duration</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Fee</th>
                  <th className="px-6 py-4 text-right font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((c, idx) => (
                  <tr
                    key={c.id}
                    className={idx !== COURSES.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-lg">
                          {COURSE_ICONS[c.id] || "📚"}
                        </span>
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{c.duration}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">{c.fee}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to="/register"
                        className="inline-flex rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
                      >
                        Register
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to register */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-secondary/30" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">Get started</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How to Register
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Four simple steps from application to your first lecture.
            </p>
          </div>
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* connector line on large screens */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-[2.25rem] hidden h-0.5 lg:block"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))",
              }}
            />
            {REGISTRATION_STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <div
                  className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-primary shadow-sm lg:mx-0"
                >
                  {s.n}
                </div>
                <h4 className="mt-5 text-center font-semibold text-foreground lg:text-left">{s.title}</h4>
                <p className="mt-2 text-center text-sm text-muted-foreground lg:text-left">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Start your registration →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
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
