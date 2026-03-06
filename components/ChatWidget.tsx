"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hej! Jag är AutomationsLudwigs AI-assistent. Hur kan jag hjälpa dig med AI-automation idag?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ursäkta, något gick fel. Försök igen eller kontakta ludwig@automationsludwig.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showWidget) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[70vh] bg-black border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">AutomationsLudwig AI</h3>
                  <p className="text-white/50 text-xs">Vanligtvis svarar inom några sekunder</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Stäng chat"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/90"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Skriv ditt meddelande..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-white hover:bg-white/90 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Skicka meddelande"
                >
                  <Send className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-white rounded-full shadow-lg shadow-black/20 flex items-center justify-center hover:shadow-xl hover:shadow-black/30 transition-all z-50"
        aria-label={isOpen ? "Stäng chat" : "Öppna chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
