import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import PdfUpload from "../components/PdfUpload";
import PdfPreview from "./PdfPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/AppContext";
import ResumeReview from "./ResumeReview";
const Main = () => {
  const navigate = useNavigate();
  const { userName, setUserName, logout } = useAppContext();

  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [jobDescription, setJobDescription] = useState<string>("");

  const handleToggle = () => setToggle(!toggle);

  const handleLogout = async () => {
    try {
      await logout();
      setUserName("");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Chatbot toggle={toggle} handleToggle={handleToggle} />

      <div className="p-5 transition-all ease-in-out duration-500 h-screen flex flex-col justify-between w-[60%]">
        <div className="gap-4 items-center ">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <span>{userName}</span>
            <button onClick={handleLogout} className="text-red-500 hover:underline">
              Log out
            </button>
          </div>
          <h2 className="text-lg font-bold text-center">
            Upload & Preview PDF
          </h2>
        </div>

        <PdfUpload setPdfFile={setPdfFile} setExtractedText={() => { }} />
        <ResumeReview />


        <div className="flex flex-col gap-8">
          <textarea
            className="text-gray-400 bg-gray-800 p-4 rounded-lg w-full outline-none resize-none overflow-hidden"
            placeholder="Enter your job description here..."
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              e.target.style.height = "auto"; // Reset height to recalculate
              e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
            }}
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
    </div>
  );
};

export default Main;
