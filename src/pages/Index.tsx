
import Navigation from "@/components/Navigation";
import FileUpload from "@/components/FileUpload";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Upload Your Document
        </h1>
        <p className="text-gray-500 mb-10 text-center max-w-md">
          Drag and drop your document or browse to upload. 
          Then chat with your document!
        </p>
        <FileUpload />
      </div>
    </div>
  );
};

export default Index;
