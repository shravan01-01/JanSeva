import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  { en: "How to register a complaint?", hi: "शिकायत कैसे दर्ज करें?" },
  { en: "How to track my complaint?", hi: "अपनी शिकायत कैसे ट्रैक करें?" },
  { en: "What services are available?", hi: "कौन-कौन सी सेवाएँ उपलब्ध हैं?" },
  { en: "What is the complaint resolution time?", hi: "शिकायत निपटान का समय क्या है?" },
];

const AI_RESPONSES: Record<string, string> = {
  greeting: "नमस्ते! मैं सहायक AI हूं। मैं आपकी कैसे मदद कर सकता हूं? (Hello! I'm Sahayak AI. How can I help you?)",
  default: "मैं आपकी समस्या समझ गया हूं। कृपया निम्नलिखित जानकारी प्रदान करें:\n\n1. आपकी समस्या किस विभाग से संबंधित है?\n2. क्या आपने पहले कोई शिकायत दर्ज की है?\n\nमैं आपको सही मार्गदर्शन प्रदान करूंगा।",
  register: "शिकायत दर्ज करने के लिए:\n\n1. 'Register Complaint' बटन पर क्लिक करें\n2. अपनी व्यक्तिगत जानकारी भरें\n3. समस्या का विवरण दें\n4. संबंधित दस्तावेज अपलोड करें (यदि कोई हो)\n5. 'Submit' बटन पर क्लिक करें\n\nआपकी शिकायत स्वचालित रूप से संबंधित विभाग को भेज दी जाएगी।",
  track: "शिकायत की स्थिति जांचने के लिए:\n\n1. 'Track Complaint' पेज पर जाएं\n2. अपना शिकायत ID दर्ज करें\n3. आपको अपनी शिकायत की वास्तविक समय स्थिति दिखाई जाएगी\n\nआप SMS और ईमेल के माध्यम से भी अपडेट प्राप्त कर सकते हैं।",
  services: "हमारे पोर्टल पर निम्नलिखित सेवाएं उपलब्ध हैं:\n\n🏛️ नगर निगम सेवाएं\n💧 जल आपूर्ति\n⚡ बिजली\n🚧 सड़कें और यातायात\n🗑️ स्वच्छता\n🌳 पर्यावरण\n🛡️ सार्वजनिक सुरक्षा\n📋 राजस्व विभाग\n\nकिसी भी सेवा से संबंधित शिकायत दर्ज कर सकते हैं।",
  resolution: "शिकायत समाधान समय:\n\n⚡ सामान्य शिकायतें: 48 घंटे\n📋 जटिल मामले: 7-15 दिन\n🏛️ विशेष मामले: 30 दिन तक\n\nSLA (Service Level Agreement) के अनुसार, सभी शिकायतों का समय पर निपटान सुनिश्चित किया जाता है।",
};

const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("नमस्ते") || lowerMessage.includes("नमस्कार")) {
    return AI_RESPONSES.greeting;
  }
  
  if (lowerMessage.includes("register") || lowerMessage.includes("दर्ज") || lowerMessage.includes("शिकायत दर्ज")) {
    return AI_RESPONSES.register;
  }
  
  if (lowerMessage.includes("track") || lowerMessage.includes("स्थिति") || lowerMessage.includes("status")) {
    return AI_RESPONSES.track;
  }
  
  if (lowerMessage.includes("service") || lowerMessage.includes("सेवा") || lowerMessage.includes("available")) {
    return AI_RESPONSES.services;
  }
  
  if (lowerMessage.includes("time") || lowerMessage.includes("resolution") || lowerMessage.includes("समय") || lowerMessage.includes("कितना समय")) {
    return AI_RESPONSES.resolution;
  }
  
  return AI_RESPONSES.default;
};

const SahayakAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्ते! मैं सहायक AI हूं। मैं आपकी कैसे मदद कर सकता हूं? आप शिकायत दर्ज करने, ट्रैक करने, या सेवाओं के बारे में जानकारी प्राप्त करने के लिए पूछ सकते हैं।",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(question),
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-saffron to-saffron-light shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
        size="icon"
        aria-label="Open Sahayak AI Assistant"
      >
        <MessageCircle className="h-7 w-7 text-white" />
        <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary p-0 flex items-center justify-center animate-pulse-glow">
          <Sparkles className="h-3 w-3 text-white" />
        </Badge>
      </Button>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-saffron flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-xl font-bold text-primary-foreground">
                  सहायक AI (Sahayak AI)
                </SheetTitle>
                <SheetDescription className="text-primary-foreground/80 text-sm">
                  Your 24/7 Government Service Assistant
                </SheetDescription>
              </div>
            </div>
            <Badge className="w-fit mt-2 bg-saffron/20 text-saffron-foreground border-saffron/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </SheetHeader>

          {/* Intro Card */}
          <div className="px-4 py-4 border-b bg-muted/10">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-saffron flex items-center justify-center shadow-inner">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold text-foreground">सहायक AI (Sahayak AI)</div>
                    <div className="text-xs text-muted-foreground">Your 24/7 Government Service Assistant • AI Powered</div>
                  </div>
                </div>

                <div className="mt-3 bg-muted rounded-lg p-3 text-sm text-foreground/95 leading-relaxed whitespace-pre-wrap">
                  नमस्ते! मैं सहायक AI हूं। मैं आपकी कैसे मदद कर सकता हूं? आप शिकायत दर्ज करने, ट्रैक करने, या सेवाओं के बारे में जानकारी प्राप्त करने के लिए पूछ सकते हैं।
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">11:36 am</div>
                  <div className="flex gap-2">
                    <span className="text-xs text-muted-foreground mr-2">Quick Questions:</span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_QUESTIONS.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickQuestion(q.en)}
                          className="text-xs px-3 py-1 rounded-md bg-muted/50 hover:bg-primary/10 transition"
                        >
                          <div className="font-medium">{q.hi}</div>
                          <div className="text-[11px] text-muted-foreground">{q.en}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  {message.sender === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    } shadow-sm`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.text}
                    </p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions (compact) */}
          {messages.length <= 1 && (
            <div className="px-4 py-3 border-t bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Quick Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => handleQuickQuestion(q.en)}
                  >
                    <div className="text-sm font-medium">{q.hi}</div>
                    <div className="text-[11px] opacity-80">{q.en}</div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="px-4 py-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (English/Hindi)"
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-saffron hover:bg-saffron-light text-white"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💡 Ask about complaints, services, or get help
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SahayakAssistant;

