import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Squad — Nova landing page" },
      {
        name: "description",
        content: "Base limpa pronta para receber a futura landing page da Squad.",
      },
      { property: "og:title", content: "Squad — Nova landing page" },
      {
        property: "og:description",
        content: "Base limpa pronta para receber a futura landing page da Squad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-16" />
    </main>
  );
}
