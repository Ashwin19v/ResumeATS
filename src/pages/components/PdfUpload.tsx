import React from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";

interface PdfUploadProps {
  setPdfFile: React.Dispatch<React.SetStateAction<string | null>>;
  setExtractedText: React.Dispatch<React.SetStateAction<string>>;
}

const PdfUpload = ({ setPdfFile, setExtractedText }: PdfUploadProps) => {
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);

      const text = await extractTextFromPdf(file);
      const markdownText = convertToMarkdown(text);
      setExtractedText(markdownText);
      console.log(markdownText);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractTextFromPdf = async (file: File) => {
    const reader = new FileReader();
    const fileData = await new Promise<string>((resolve) => {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsBinaryString(file);
    });

    const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;
    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      textContent.items.forEach((item) => {
        if ("str" in item) {
          extractedText += item.str + " ";
        }
      });
    }

    return extractedText.trim();
  };

  const convertToMarkdown = (text: string) => {
    let markdownText = text;

    // Convert headings (lines in all caps or with specific patterns)
    markdownText = markdownText.replace(/^(.*[A-Z].*)$/gm, (match) => {
      if (match === match.toUpperCase() && match.trim().length > 0) {
        return `# ${match}`; // Convert to H1
      }
      return match;
    });

    // Convert bullet points (lines starting with •, -, or *)
    markdownText = markdownText.replace(/^(\s*[•\-*]\s*)(.*)$/gm, "- $2");

    // Convert numbered lists (lines starting with numbers)
    markdownText = markdownText.replace(/^(\s*\d+\.\s*)(.*)$/gm, "1. $2");

    // Convert bold text (text wrapped in ** or __)
    markdownText = markdownText.replace(/(\*\*|__)(.*?)\1/g, "**$2**");

    // Convert italic text (text wrapped in * or _)
    markdownText = markdownText.replace(/(\*|_)(.*?)\1/g, "*$2*");

    // Convert blockquotes (lines starting with >)
    markdownText = markdownText.replace(/^>\s*(.*)$/gm, "> $1");

    // Convert code blocks (text wrapped in ```)
    markdownText = markdownText.replace(/```(.*?)```/gs, "```\n$1\n```");

    // Convert inline code (text wrapped in `)
    markdownText = markdownText.replace(/`(.*?)`/g, "`$1`");

    // Convert horizontal rules (lines with ---, ***, or ___)
    markdownText = markdownText.replace(/^([-*_]{3,})$/gm, "---");

    // Convert links (text in [description](url) format)
    markdownText = markdownText.replace(/\[(.*?)\]\((.*?)\)/g, "[$1]($2)");

    // Convert images (text in ![alt](url) format)
    markdownText = markdownText.replace(/!\[(.*?)\]\((.*?)\)/g, "![$1]($2)");

    // Clean up extra spaces and newlines
    markdownText = markdownText.replace(/\n{3,}/g, "\n\n"); // Remove extra newlines
    markdownText = markdownText.replace(/\s{2,}/g, " "); // Remove extra spaces

    return markdownText.trim();
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 h-[300px] flex flex-col items-center justify-center bg-gray-800 border border-gray-600 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors"
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
