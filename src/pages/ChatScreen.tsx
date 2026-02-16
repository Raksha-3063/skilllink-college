import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import { mockChats, mockMessages } from "@/data/mockData";

const ChatListScreen = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const navigate = useNavigate();

  if (selectedChat !== null) {
    const chat = mockChats.find((c) => c.id === selectedChat);
    return <ChatDetailScreen chat={chat!} onBack={() => setSelectedChat(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Messages</h1>
      </div>

      <div className="flex flex-col">
        {mockChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="flex items-center gap-3 px-4 py-3 border-b border-border transition-colors hover:bg-muted/50 text-left"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover bg-muted" />
              {chat.unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {chat.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{chat.name}</h3>
                <span className="text-[10px] text-muted-foreground">{chat.time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

const ChatDetailScreen = ({ chat, onBack }: { chat: typeof mockChats[0]; onBack: () => void }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card border-b border-border px-4 py-3">
        <button onClick={onBack}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <img src={chat.avatar} alt={chat.name} className="h-9 w-9 rounded-full object-cover bg-muted" />
        <h1 className="text-sm font-semibold text-foreground">{chat.name}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                msg.sent
                  ? "bg-chat-sent text-chat-sent-foreground rounded-br-md"
                  : "bg-chat-received text-chat-received-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.sent ? "text-chat-sent-foreground/60" : "text-muted-foreground"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            className="h-10 rounded-full border-0 bg-muted flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Send size={18} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatListScreen;
