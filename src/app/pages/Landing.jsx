import { Link } from "react-router-dom";
import { COURSES } from "../../backend/courseConstants";

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 50% -10%, color-mix(in oklab, var(--primary) 20%, transparent), transparent), linear-gradient(180deg, var(--background), var(--background))",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Learn Smart Academy
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Practical skills. Real outcomes.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Short, focused courses in modern tech & marketing — taught at our physical academy
            with structured online material, assignments, and recorded lectures.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90">
              Register Now
            </Link>
            <Link to="/login" className="rounded-md border border-border bg-background px-5 py-3 font-medium hover:bg-secondary">
              Student / Teacher Login
            </Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Our Courses</h2>
        <p className="mt-1 text-muted-foreground">Hands-on programs led by experienced teachers.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {COURSES.map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">{c.duration}</span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">Fee: {c.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-foreground">How Registration Works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Fill the form", "Submit your details on our registration page."],
              ["2", "Admin review", "Our team reviews your request and seat availability."],
              ["3", "Account created", "Admin creates your login and assigns your course."],
              ["4", "Start learning", "Log in and access learning material, assignments & lectures."],
            ].map(([n, t, d]) => (
              <li key={n} className="rounded-xl border border-border bg-card p-5">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">{n}</div>
                <h4 className="mt-3 font-semibold text-foreground">{t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
        <p className="mt-2 text-muted-foreground">Visit the academy or reach out — we're happy to help.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium uppercase text-muted-foreground">Address</div>
            <div className="mt-1 text-foreground">Learn Smart Academy Campus</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium uppercase text-muted-foreground">Phone</div>
            <div className="mt-1 text-foreground">+92 300 0000000</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium uppercase text-muted-foreground">Email</div>
            <div className="mt-1 text-foreground">info@learnsmart.academy</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Learn Smart Academy
      </footer>
    </div>
  );
}