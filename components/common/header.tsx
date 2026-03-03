"use client";

import {
  CompassIcon,
  HomeIcon,
  MoonIcon,
  SparkleIcon,
  SparklesIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "@/hooks/useTheme";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
        <SparkleIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">
        i<span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="h-16 flex items-center justify-between">
          {/* left */}
          <Logo />
          {/* middle */}
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground 
                        hover:text-primary hover:underline transition-colors hover:bg-muted/50 rounded-md"
            >
              <HomeIcon className="size-4"></HomeIcon>
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground
                        hover:text-primary hover:underline transition-colors hover:bg-muted/50 rounded-md"
            >
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground
                        hover:text-primary hover:underline transition-colors hover:bg-muted/50 rounded-md"
            >
              <UserIcon className="size-4" />
              <span>About</span>
            </Link>
          </nav>
          {/* right */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              {theme === "dark" ? (
                <SunIcon className="size-4" />
              ) : (
                <MoonIcon className="size-4" />
              )}
            </button>
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <Button>
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                  <Link href="/submit">
                    <SparklesIcon className="size-4" /> Submit Project
                  </Link>
                </Button>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
