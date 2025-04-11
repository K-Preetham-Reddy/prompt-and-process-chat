
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useDocuments } from "@/context/DocumentContext";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addDocument, setCurrentDocument } = useDocuments();
  const navigate = useNavigate();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Accept text and PDF files
    if (selectedFile.type === "text/plain" || 
        selectedFile.type === "application/pdf" ||
        selectedFile.name.endsWith('.txt') ||
        selectedFile.name.endsWith('.md') ||
        selectedFile.name.endsWith('.pdf')) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a text or PDF file",
        variant: "destructive"
      });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would send this file to a server or process with a library
      const content = await file.text();
      
      // Add document to context
      const newDoc = addDocument(file.name, content);
      setCurrentDocument(newDoc);
      
      // Navigate to chat page
      navigate(`/chat/${newDoc.id}`);
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "There was a problem processing your file.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : file 
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <FileText size={48} className="text-green-500" />
            <h3 className="text-xl font-medium">{file.name}</h3>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={48} className="text-gray-400" />
            <h3 className="text-xl font-medium">Drop your file here</h3>
            <p className="text-sm text-gray-500">
              or
            </p>
            <Button 
              onClick={handleBrowseClick} 
              variant="outline"
              className="mt-2"
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Supports .txt, .md, and .pdf files
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.md,.pdf,text/plain,application/pdf"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={processFile}
          disabled={!file || isProcessing}
          className="px-8 py-6 text-lg"
        >
          {isProcessing ? "Processing..." : "Process Document"}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
