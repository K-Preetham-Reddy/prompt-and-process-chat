
import { useNavigate } from "react-router-dom";
import { FileText, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Document } from "@/context/DocumentContext";

interface DocumentItemProps {
  document: Document;
}

const DocumentItem = ({ document }: DocumentItemProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/chat/${document.id}`);
  };
  
  return (
    <div
      className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <div className="mr-3">
        <FileText className="h-10 w-10 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{document.name}</h3>
          {document.isImportant && <Star className="h-4 w-4 text-yellow-500" />}
        </div>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(document.uploadDate), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default DocumentItem;
