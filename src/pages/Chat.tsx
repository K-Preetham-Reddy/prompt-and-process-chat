
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { useDocuments } from "@/context/DocumentContext";

const Chat = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { getDocument, setCurrentDocument } = useDocuments();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (documentId) {
      const document = getDocument(documentId);
      if (document) {
        setCurrentDocument(document);
      } else {
        navigate("/");
      }
    }
  }, [documentId, getDocument, navigate, setCurrentDocument]);
  
  if (!documentId) return <div>No document selected</div>;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ChatInterface documentId={documentId} />
    </div>
  );
};

export default Chat;
