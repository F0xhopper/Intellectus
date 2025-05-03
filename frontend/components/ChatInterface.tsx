"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, BookOpen, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  sources?: {
    text: string;
    filePath: string;
  }[];
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // API call to backend
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      // Add assistant message with sources
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting answer:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I encountered an error while processing your question. Please try again.",
        role: "assistant",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-70">
            <Sparkles className="h-16 w-16 text-primary" />
            <h2 className="text-xl font-medium">Ask Intellectus</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Explore the wisdom of the Angelic Doctor. Ask questions about his
              philosophy, theology, and teachings.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 p-3 bg-muted rounded-md text-xs max-w-[80%]">
                  <div className="font-medium mb-1">Sources:</div>
                  {message.sources.map((source, index) => (
                    <div key={index} className="mb-2">
                      <div className="text-primary text-[10px] uppercase font-bold">
                        {source.filePath}
                      </div>
                      <p className="line-clamp-2">{source.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
