import React from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

interface PdfUploadProps {
  setPdfFile: React.Dispatch<React.SetStateAction<string | null>>;
}

const PdfUpload = ({ setPdfFile }: PdfUploadProps) => {
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 h-[300px] flex flex-col items-center justify-center bg-gray-800 border border-gray-600 
      rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors
      my-8"
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center">
        <FaCloudUploadAlt className="text-blue-400 text-6xl mb-4 animate-bounce" />

        {isDragActive ? (
          <p className="text-blue-400 text-lg font-medium">
            Drop the PDF here...
          </p>
        ) : (
          <p className="text-gray-400 text-lg font-medium">
            Drag & drop a PDF file here, or click to select one
          </p>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
