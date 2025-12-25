import { useState, useRef, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowLeft, User, Bot } from "lucide-react";
import { API_URL } from "../config";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply || "I'm here to help 😊",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-20 pb-4">
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto bg-white shadow rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 text-white p-4 flex items-center">
          <Link to="/" className="mr-3">
            <ArrowLeft />
          </Link>
          <h1 className="text-xl font-semibold">Health Assistant</h1>
        </div>

        {/* Chat */}
        <div
          ref={containerRef}
          className="flex-1 p-4 overflow-y-auto space-y-4"
        >
          {messages.length === 0 && (
            <p className="text-center text-gray-500">
              Hi 👋 How can I help you today?
            </p>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && <Bot className="mr-2 text-teal-600" />}
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {msg.sender === "user" && <User className="ml-2 text-teal-600" />}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 flex gap-2 border-t">
          <input
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={!input || loading}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <ArrowUp />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
