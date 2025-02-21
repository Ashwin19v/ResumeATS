import { useState } from "react";
import Chatbot from "./components/Chatbot";
import PdfUpload from "./components/PdfUpload";
import PdfPreview from "./components/PdfPreview";
import AtScoreModal from "./components/AtScoreModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [toggleScore, setToggleScore] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");

  const handleToggle = () => setToggle(!toggle);
  const handleToggleScore = () => setToggleScore(!toggleScore);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Chatbot toggle={toggle} handleToggle={handleToggle} />

      <div className="p-5 transition-all ease-in-out duration-500 h-screen flex flex-col justify-between w-[60%]">
        <div className="gap-4 items-center ">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <a href="/">Log out</a>
          </div>
          <h2 className="text-lg font-bold text-center">
            Upload & Preview PDF
          </h2>
        </div>

        <PdfUpload
          setPdfFile={setPdfFile}
          setExtractedText={setExtractedText}
        />

        <button
          className="bg-blue-300 text-slate-800 mx-auto inline-block p-2 rounded-lg"
          onClick={handleToggleScore}
        >View ATS Score
        </button>

        <div className="flex flex-col gap-8">
          <textarea
            className="text-gray-400 bg-gray-800 p-4 rounded-lg w-full outline-none h-[200px] resize-none"
            placeholder="Enter your job description here..."
          ></textarea>
          <div className="flex justify-between items-center">
            <FontAwesomeIcon
              icon={faMessage}
              bounce={true}
              onClick={handleToggle}
              className="bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-full h-5 cursor-pointer"
            />
            <button className="w-1/5 bg-blue-600 rounded-lg h-10 hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>

      <PdfPreview pdfFile={pdfFile} />

      <AtScoreModal
        toggleScore={toggleScore}
        handleToggleScore={handleToggleScore}
      />
    </div>
  );
};

export default Main;
