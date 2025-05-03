"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Intellectus. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
