
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Message, useDocuments } from "@/context/DocumentContext";

interface ChatInterfaceProps {
  documentId: string;
}

const ChatInterface = ({ documentId }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getDocument, addMessage, toggleImportant } = useDocuments();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const document = getDocument(documentId);
  const messages = document?.chats[document.activeSessionId] || [];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    addMessage(documentId, {
      role: "user",
      content: input
    });
    
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      addMessage(documentId, {
        role: "assistant",
        content: `I'm analyzing the document "${document?.name}". This is a simulated response to your query: "${input}"`
      });
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleExportToImportant = () => {
    if (document) {
      toggleImportant(documentId);
      toast({
        title: document.isImportant ? "Removed from Important" : "Added to Important",
        description: document.isImportant 
          ? "Document has been removed from Important"
          : "Document has been added to Important",
      });
    }
  };
  
  if (!document) {
    return <div>Document not found</div>;
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium truncate">{document.name}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportToImportant}
          className="flex items-center gap-1"
        >
          {document.isImportant ? (
            <>
              <StarOff className="h-4 w-4" />
              Remove from Important
            </>
          ) : (
            <>
              <Star className="h-4 w-4" />
              Export to Important
            </>
          )}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>Start chatting about your document</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[50px] resize-none"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || input.trim() === ""} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
