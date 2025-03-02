import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import gif from "../assets/gifs/gif.gif";

import ResumeAnalysis from "../components/MainPage/ResumeAnalysis";
import ResumeFeedback from "../components/MainPage/ResumeFeedback";

const ResumeReview = ({
  setResumeReview,
}: {
  setResumeReview: (value: boolean) => void;
}) => {
  const [currentPage, setCurrentPage] = useState<string>("Resume Analysis");

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center w-full sm:w-[50%] bg-gray-900">
        <img src={gif} alt="logo" />
        <h1 className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </h1>
        <p className="text-gray-400">Estimated Time: 10s</p>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[50%]  bg-gray-900 text-white shadow-lg h-screen overflow-auto p-6 transition-all ease-in-out duration-500">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h2
            className={`${
              currentPage === "Resume Analysis" ? "text-blue-400" : "text-white"
            } font-bold text-xl`}
            onClick={() => setCurrentPage("Resume Analysis")}
          >
            Resume Analysis
          </h2>
          <h2
            className={`${
              currentPage === "Resume Review" ? "text-blue-400" : "text-white"
            } font-bold text-xl`}
            onClick={() => setCurrentPage("Resume Review")}
          >
            Resume Review
          </h2>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          onClick={() => setResumeReview(false)}
        >
          Close
        </button>
      </div>

      {currentPage === "Resume Analysis" && <ResumeAnalysis />}

      {currentPage === "Resume Review" && <ResumeFeedback />}
    </div>
  );
};

export default ResumeReview;
