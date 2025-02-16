import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PdfPreviewProps {
    pdfFile: string | null;
}

const PdfPreview = ({ pdfFile }: PdfPreviewProps) => {
    return (
        <div className="h-screen bg-gray-800 p-8 overflow-auto w-[40%]">
            {pdfFile ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfFile} />
                </Worker>
            ) : (
                <p className="text-gray-400">No PDF selected</p>
            )}
        </div>
    );
};

export default PdfPreview;
