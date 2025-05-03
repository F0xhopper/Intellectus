"use client";

import React from "react";
import Link from "next/link";
import { BellIcon, UserCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center justify-between">
        <div>{title && <h1 className="text-xl font-semibold">{title}</h1>}</div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <BellIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="User menu">
            <UserCircleIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
