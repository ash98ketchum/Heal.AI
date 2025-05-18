// Chatbot.tsx
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowLeft, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await response.json();

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'bot',
          text: 'Sorry, something went wrong. Please try again later.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-20 pb-4">
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto bg-white shadow rounded-lg overflow-hidden">
        {/* Header with back link */}
        <div className="bg-teal-600 text-white p-4 flex items-center">
          <Link to="/" className="mr-3 p-1 hover:bg-teal-500 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Health Assistant Chat</h1>
        </div>

        {/* Messages container */}
        <div
          ref={containerRef}
          className="flex-1 px-4 py-6 overflow-y-auto space-y-4"
        >
          {/* Initial greeting */}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 italic mb-4">
              Hey there! 🩺 How can <span className="font-semibold">Heal.ai</span> assist you today?
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <Bot className="w-6 h-6 mr-2 text-teal-600" />
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-right mt-1 text-gray-500">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
              {msg.sender === 'user' && (
                <User className="w-6 h-6 ml-2 text-teal-600" />
              )}
            </div>
          ))}
        </div>

        {/* Input form */}
        <form
          onSubmit={sendMessage}
          className="border-t p-4 flex items-center space-x-2"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(e as any);
              }
            }}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-2 rounded-full transition-colors ${
              input.trim() && !loading
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
