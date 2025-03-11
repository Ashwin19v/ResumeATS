import { useState } from "react";
import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import resume_builder from "../assets/images/resume_builder.jpeg";
import vdo from "../assets/videos/vdo.mp4";
import { useAppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
const Home = () => {
  const [activeTab, setActiveTab] = useState("INSTANT RESUME REVIEW");
  const { user } = useAppContext();
  const navigate = useNavigate();

  const tabs = [
    "INSTANT RESUME REVIEW",
    "RESUME SAMPLES",
    "RESUME TARGETING",
    "LINKEDIN OPTIMIZATION",
  ];

  return (
    <div className="bg-gradient-to-l from-gray-950 to-gray-800 min-h-screen text-white font-sans">
      <Header />

      <div className="container mx-auto px-6 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Improve your resume & LinkedIn profile
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Designed by top recruiters, our AI-powered platform instantly gives
            you tailored feedback on your resume and LinkedIn profile.
          </p>
          <p className="text-gray-300 text-lg mb-8">
            Land <span className="text-green-400 font-semibold">5x</span> more
            interviews, opportunities, and job offers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`${user ? "/home" : "/signup"}`}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              Get Started for Free ➤
            </Link>
            <button className="bg-transparent border-2 border-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              See Preview ➤
            </button>
          </div>
        </div>

        <div className="lg:w-1/2">
          <img
            className="w-full rounded-lg shadow-2xl"
            src={resume_builder}
            alt="Resume Improvement"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">
          Your personal resume & LinkedIn coach
        </h1>
        <p className="text-center text-gray-300">
          Join over 1 million professionals, graduates, and students who have
          used our toolkit to advance their careers.
        </p>

        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 ${activeTab === tab ? "border-white" : "border-transparent"
                } hover:border-gray-300`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-xl">
            <video
              className="w-full rounded-lg"
              controls
              src={vdo}
              loop
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-2">
              Get expert feedback on your resume, instantly
            </h2>
            <p className="text-gray-300">
              Score My Resume evaluates your resume based on key criteria
              recruiters look for. Upload your resume and get actionable
              insights within seconds.
            </p>

            {user ? (
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                onClick={() => navigate("/home")}
              >
                <a>Upload Resume ➤</a>
              </button>
            ) : (
              <p className="mt-4 text-gray-300">
                Please log in to upload your resume.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
