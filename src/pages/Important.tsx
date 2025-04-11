
import Navigation from "@/components/Navigation";
import DocumentItem from "@/components/DocumentItem";
import { useDocuments } from "@/context/DocumentContext";

const Important = () => {
  const { importantDocuments } = useDocuments();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Important Documents</h1>
        
        {importantDocuments.length === 0 ? (
          <div className="text-center p-10 border rounded-md bg-gray-50">
            <p className="text-gray-500">
              No important documents found. Mark documents as important to see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {importantDocuments.map((document) => (
              <DocumentItem key={document.id} document={document} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Important;
