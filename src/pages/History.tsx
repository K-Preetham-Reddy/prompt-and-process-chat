
import Navigation from "@/components/Navigation";
import DocumentItem from "@/components/DocumentItem";
import { useDocuments } from "@/context/DocumentContext";

const History = () => {
  const { documents } = useDocuments();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Document History</h1>
        
        {documents.length === 0 ? (
          <div className="text-center p-10 border rounded-md bg-gray-50">
            <p className="text-gray-500">No documents found. Upload a document to begin.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <DocumentItem key={document.id} document={document} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
