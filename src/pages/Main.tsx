import { useState } from "react";
import log from "../assets/logos/log.jpg";
import Chatbot from "../components/MainPage/Chatbot.tsx";
import PdfUpload from "../components/MainPage/PdfUpload.tsx";
import PdfPreview from "./PdfPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faLightbulb,
  faMessage,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/AppContext";
import ResumeReview from "./ResumeReview.tsx";
import Navbar from "../components/MainPage/Navbar";
import {
  ToastNotification,
  showToast,
} from "../components/ToastNotification.tsx";
import Resume from "./Resume.tsx";

const Main = () => {
  const {
    user,
    isModalOpen,
    setIsModalOpen,
    selectedSection,
    fileUrl,
    handleProcessResume,
    jobDescription,
    setJobDescription,
  } = useAppContext();

  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const [resumeReview, setResumeReview] = useState<boolean>(false);
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  const handleToggleNav = () => setToggleNav(!toggleNav);

  const handleResumeReview = () => {
    if (!jobDescription || !fileUrl) {
      showToast(
        "Please upload a resume and provide a job description",
        "warning"
      );
      return;
    }
    handleProcessResume(jobDescription);
    setResumeReview(!resumeReview);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex w-full  bg-gray-900 text-white flex-wrap ">
      <Chatbot toggle={isModalOpen} handleToggle={handleOpenModal} />

      <div className="p-5  h-screen flex flex-col justify-between  w-full sm:w-[50%] border-r-2 border- border-gray-600">
        <div className="mb-6 space-y-4">
          <div className="flex items-center sm:gap-4 gap-1">
            <img
              src={log}
              alt="logo"
              className="w-10 h-10  rounded-full scale-[2]"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
              Welcome back,{" "}
              <span className="text-white mr-3">
                {user?.displayName?.split(" ")[0]}!
              </span>
              {toggleNav ? (
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  onClick={handleToggleNav}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  onClick={handleToggleNav}
                />
              )}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-gray-900  via-blue-950 to-gray-800 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FontAwesomeIcon icon={faLightbulb} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-blue-400 font-medium">Pro Tip</h3>
                <p className="text-sm text-gray-400">
                  Customize your resume for each job category to increase your
                  chances of success.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Upload & Preview PDF</h2>
        </div>

        <PdfUpload setPdfFile={setPdfFile} />

        <div className="flex flex-col my-4">
          <select
            className="text-gray-400 bg-gray-800 p-4  rounded-lg w-full outline-none"
            value={jobDescription || ""}
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
          >
            <option value="">Select a job category...</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="AI/ML Developer">AI/ML Developer</option>
            <option value="Fresher">Fresher</option>
          </select>

          <div className="flex justify-between items-center mt-10">
            {selectedSection && (
              <FontAwesomeIcon
                icon={faMessage}
                bounce={true}
                onClick={handleOpenModal}
                className="bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-full h-5 cursor-pointer"
              />
            )}
            <button
              className="w-1/5 bg-blue-600 rounded-lg h-10 hover:bg-blue-700 transition-colors ml-auto"
              onClick={handleResumeReview}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <PdfPreview pdfFile={pdfFile} resumeReview={resumeReview} />
      {resumeReview && <ResumeReview setResumeReview={setResumeReview} />}
      {toggleNav && (
        <Navbar toggleNav={toggleNav} handleResumeReview={handleResumeReview} />
      )}
      <Resume />
      <ToastNotification />
    </div>
  );
};

export default Main;
