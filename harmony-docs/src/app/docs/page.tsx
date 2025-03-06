import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-10">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-bold text-3xl leading-tight sm:text-5xl md:text-6xl">
              Documentation
            </h1>
            <p className="max-w-[85%] leading-normal text-stone-700 sm:text-lg sm:leading-7">
              Everything you need to know about Harmony
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {docSections.map((section) => (
              <Link key={section.title} href={section.href}>
                <Card className="h-full transition-colors hover:bg-stone-50">
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const docSections = [
  {
    title: "Getting Started",
    description: "Everything you need to get up and running with Harmony",
    href: "/docs/getting-started",
    items: ["Installation", "Basic usage", "Configuration", "First steps"],
  },
  {
    title: "Commands",
    description: "Reference for all available commands",
    href: "/docs/commands",
    items: [
      "Core commands",
      "File operations",
      "System utilities",
      "Advanced features",
    ],
  },
  {
    title: "Configuration",
    description: "Learn how to customize Harmony to your needs",
    href: "/docs/configuration",
    items: [
      "Config file format",
      "Environment variables",
      "Themes and styling",
      "Keyboard shortcuts",
    ],
  },
  {
    title: "API Reference",
    description: "Detailed API documentation for developers",
    href: "/docs/api",
    items: [
      "Core API",
      "Plugin development",
      "Integration options",
      "Scripting interface",
    ],
  },
];
