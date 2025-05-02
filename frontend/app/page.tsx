import React from "react";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex flex-col w-full h-screen">
        <ChatInterface />
      </div>
    </main>
  );
}
