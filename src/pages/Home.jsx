import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ResumeWorded = () => {
  const [activeTab, setActiveTab] = useState("INSTANT RESUME REVIEW");
  const tabs = [
    "INSTANT RESUME REVIEW",
    "RESUME SAMPLES",
    "RESUME TARGETING",
    "LINKEDIN OPTIMIZATION",
  ];
  return (
    <div className="bg-gradient-to-t from-violet-900 to-blue-950 mx-auto font-sans ">
      <Header />

      <div className="mb-8 flex  flex-wrap justify-between items-center">
        <div className="w-1/2 px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Improve your resume and LinkedIn profile
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Designed by top recruiters, our AI-powered platform instantly <br />
            gives you tailored feedback on your resume and LinkedIn profile.
          </p>
          <p className="text-gray-300 text-lg mb-8">
            Land 5x more interviews, opportunities, and job offers.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get started for free ➤
            </button>
            <button className="bg-transparent border-2 border-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              See preview ➤
            </button>
          </div>
        </div>

        <div className="w-1/2 px-8">
          <img
            className="w-full rounded-lg shadow-2xl"
            src="https://placehold.co/600x400"
            alt="Resume Improvement"
          />
        </div>
      </div>
      <hr />

      <div className=" text-white p-8">
        <h1 className="text-3xl font-bold text-center">
          Your personal resume & LinkedIn coach
        </h1>
        <p className="text-center mt-2">
          Join over 1 million experienced professionals, graduates, and students
          who have used Resume Worded's toolkit to get ahead in their careers.
        </p>

        <div className="flex justify-center mt-6  ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-2 text-sm font-semibold transition-colors duration-300 border-b-2 ${
                activeTab === tab ? "border-white" : "border-transparent"
              } hover:border-gray-300`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className=" p-4 rounded-lg shadow-lg w-full md:w-1/2">
            <video
              className="w-full rounded-lg"
              controls
              src="/path-to-video.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className=" p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-xl font-semibold">
              Get expert feedback on your resume, instantly
            </h2>
            <p className="mt-2 text-gray-300">
              Score My Resume scores your resume on key criteria recruiters and
              hiring managers look for. Upload your resume and in just 30
              seconds, you'll get actionable steps to revamp your resume and
              land more interviews.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all">
              Upload resume ➤
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResumeWorded;
