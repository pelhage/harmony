import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0 bg-background/50 backdrop-blur-sm">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-500 hover:underline underline-offset-4"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-500 hover:underline underline-offset-4"
            >
              shadcn/ui
            </a>
            . Harmony v1.0.0
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/#features"
              className="font-medium text-indigo-500 hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="https://github.com/pelhage/harmony"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-500 hover:underline underline-offset-4"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
