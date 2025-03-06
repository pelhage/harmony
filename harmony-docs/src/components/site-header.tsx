"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-indigo-500"></div>
            <span className="font-bold text-xl">Harmony</span>
            <span className="text-xs text-indigo-500 hidden sm:inline-block">
              CLI
            </span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#demo"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/#installation"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Installation
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-indigo-500/50 text-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500"
              asChild
            >
              <Link href="https://github.com/pelhage/harmony" target="_blank">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
