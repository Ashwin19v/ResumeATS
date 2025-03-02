import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdf from "../assets/images/pdf.png";

interface PdfPreviewProps {
  pdfFile: string | null;
  resumeReview: boolean;
}

const PdfPreview = ({ pdfFile, resumeReview }: PdfPreviewProps) => {
  return (
    <div
      className={`h-screen  bg-gray-900  overflow-auto ${
        resumeReview == true ? "w-0 p-0" : "w-full sm:w-[50%]  px-4 pt-16 pb-2"
      }`}
    >
      <div className="w-full h-full">
        {pdfFile ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} />
          </Worker>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h2 className="text-white text-2xl font-bold">No PDF selected</h2>
            <img
              src={pdf}
              alt="pdf"
              className="sm:w-1/2 sm:h-1/2 w-full h-full mx-auto "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfPreview;
