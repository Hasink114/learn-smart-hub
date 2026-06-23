import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import App from "../app/App.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn Smart Academy — Practical courses in tech & marketing" },
      { name: "description", content: "Short, hands-on courses in Vibe Coding, Web Development, Digital Marketing and Google Workspace + AI." },
      { property: "og:title", content: "Learn Smart Academy" },
      { property: "og:description", content: "Hands-on courses with structured material, assignments and recorded lectures." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-background" />}>
      <App />
    </ClientOnly>
  );
}