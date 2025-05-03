"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample book data - in a real app, this would come from a database or API
const books = [
  {
    slug: "summa-theologica-part1-q1",
    title: "Summa Theologica, Part I, Question 1",
    description: "Whether sacred doctrine is a science?",
    year: "1265-1274",
    category: "Theology",
    summary:
      "This question examines whether theology can be considered a true science. Aquinas argues that sacred doctrine is indeed a science, though it derives its principles not from natural reason but from divine revelation. He explains that while other sciences proceed from self-evident principles, sacred doctrine proceeds from principles known by the light of a higher science - the science of God and the blessed.",
  },
  {
    slug: "summa-theologica-part1-q2",
    title: "Summa Theologica, Part I, Question 2",
    description:
      "The existence of God. In this question, Aquinas explores five ways to prove the existence of God through reason, examining causation, motion, necessity, gradation, and design.",
    year: "1265-1274",
    category: "Theology",
    summary:
      "Question 2 presents the famous Five Ways - five philosophical proofs for the existence of God. These include arguments from motion, efficient causation, necessity, gradation of being, and design (or governance). These arguments form the foundation of natural theology and have been discussed extensively throughout history.",
  },
  {
    slug: "summa-theologica-part1-q3",
    title: "Summa Theologica, Part I, Question 3",
    description:
      "On the simplicity of God. This question examines divine simplicity, explaining why God cannot be composite and must be wholly simple in nature.",
    year: "1265-1274",
    category: "Theology",
    summary:
      "This question explores the concept of divine simplicity - that God is not composed of parts but is absolutely simple. Aquinas argues that God cannot be a body, cannot be composed of matter and form, and is identical with His essence. This paves the way for understanding other divine attributes.",
  },
  // You can add more books as needed
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    const searchContent =
      `${book.title} ${book.description}${book.category}`.toLowerCase();
    return searchContent.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Fixed search bar */}
      <div className="sticky top-0 z-10 bg-background border-b py-3 px-4">
        <div className="w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search books..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <div className="space-y-4 w-full mx-auto">
          {/* Stacked Cards */}
          {filteredBooks.length === 0 ? (
            <div className="flex justify-center items-center bg-muted/30 rounded-lg h-40">
              <p className="text-muted-foreground">No results found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <Card
                  key={book.slug}
                  className="transition-all hover:shadow-md hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{book.category}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {book.year}
                      </Badge>
                    </div>
                    <CardTitle>
                      <Link
                        href={`/library/${book.slug}`}
                        className="hover:text-primary underline-offset-4 hover:underline"
                      >
                        {book.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {book.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {book.summary}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
