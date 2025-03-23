import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdf from "../assets/images/pdf.png";
import { useAppContext } from "../context/AppContext";

interface PdfPreviewProps {
  pdfFile: string | null;
  resumeReview: boolean;
}

const PdfPreview = ({ pdfFile, resumeReview }: PdfPreviewProps) => {
  const { progress, uploading } = useAppContext();
  return (
    <div
      className={`h-screen  bg-gray-900  overflow-auto ${
        resumeReview == true ? "w-0 p-0" : "w-full sm:w-[50%]  px-4 pt-16 pb-2"
      }`}
    >
      <div className="w-full h-full">
        {uploading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <div className="loader mb-2 w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white font-medium">Uploading...</p>
              <p className="text-gray-500 text-sm">{progress}%</p>
            </div>
          </div>
        )}

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
