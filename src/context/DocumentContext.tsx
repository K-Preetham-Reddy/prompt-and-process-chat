
import { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  content?: string; // Raw text content of document
  isImportant: boolean;
  chats: {
    [sessionId: string]: Message[];
  };
  activeSessionId: string;
}

interface DocumentContextType {
  documents: Document[];
  currentDocument: Document | null;
  setCurrentDocument: (doc: Document | null) => void;
  addDocument: (name: string, content?: string) => Document;
  addMessage: (documentId: string, message: Omit<Message, "id" | "timestamp">) => void;
  toggleImportant: (documentId: string) => void;
  getDocument: (id: string) => Document | undefined;
  importantDocuments: Document[];
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addDocument = (name: string, content?: string) => {
    const sessionId = generateId();
    const newDocument: Document = {
      id: generateId(),
      name,
      uploadDate: new Date(),
      content,
      isImportant: false,
      chats: {
        [sessionId]: []
      },
      activeSessionId: sessionId
    };

    setDocuments(prev => [...prev, newDocument]);
    return newDocument;
  };

  const addMessage = (documentId: string, message: Omit<Message, "id" | "timestamp">) => {
    setDocuments(prevDocs => {
      return prevDocs.map(doc => {
        if (doc.id === documentId) {
          const newMessage: Message = {
            ...message,
            id: generateId(),
            timestamp: new Date()
          };
          
          return {
            ...doc,
            chats: {
              ...doc.chats,
              [doc.activeSessionId]: [
                ...(doc.chats[doc.activeSessionId] || []),
                newMessage
              ]
            }
          };
        }
        return doc;
      });
    });
  };

  const toggleImportant = (documentId: string) => {
    setDocuments(prevDocs => {
      return prevDocs.map(doc => {
        if (doc.id === documentId) {
          return { ...doc, isImportant: !doc.isImportant };
        }
        return doc;
      });
    });
  };

  const getDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  const importantDocuments = documents.filter(doc => doc.isImportant);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        setCurrentDocument,
        addDocument,
        addMessage,
        toggleImportant,
        getDocument,
        importantDocuments
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};
