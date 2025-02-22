import { useState } from "react";
import AtScoreModal from "../components/AtsScore";
import resumeData from "../../utils/resources/resumeData.json";

const ResumeReview = () => {
    const [showAtsScore, setShowAtsScore] = useState({});

    const toggleAtsScore = (userId) => {
        setShowAtsScore((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    return (
        <div className="w-3/4 mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg max-h-screen overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Resume Analysis</h1>

            <div key={resumeData.user_id} className="mb-10 p-6 border border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Candidate: {resumeData.user_name}</h2>
                <p className="text-gray-400">Similarity Score: {(resumeData.similarity * 100).toFixed(2)}%</p>

                <button
                    onClick={() => toggleAtsScore(resumeData.user_id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
                >
                    {showAtsScore[resumeData.user_id] ? "Hide ATS Score" : "View ATS Score"}
                </button>



                <div className="mt-6 flex gap-6">
                    <div>
                        <h3 className="text-lg font-bold">Candidate Details</h3>
                        <p><strong>Name:</strong> {resumeData.structured_data.name}</p>
                        <p><strong>Email:</strong> {resumeData.structured_data.email}</p>
                        <p><strong>Phone:</strong> {resumeData.structured_data.phone}</p>
                    </div>
                    <div>
                        {showAtsScore[resumeData.user_id] && (
                            <AtScoreModal
                                atsScore={resumeData.ats_score.ats_score}
                                details={resumeData.ats_score.detailed_scores}
                            />
                        )}
                    </div>

                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold">Skills</h3>
                    <ul className="list-disc pl-5">
                        {resumeData.structured_data.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold">Experience</h3>
                    {resumeData.structured_data.experience.map((exp, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-700 rounded-lg">
                            <h4 className="text-md font-semibold">{exp.title} - {exp.company}</h4>
                            <p className="text-gray-400">{exp.start_date} - {exp.end_date}</p>
                            <p className="mt-2">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold">Education</h3>
                    {resumeData.structured_data.education.map((edu, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-700 rounded-lg">
                            <h4 className="text-md font-semibold">{edu.institution}</h4>
                            <p className="text-gray-400">{edu.degree} (CGPA: {edu.gpa})</p>
                            <p className="text-gray-400">{edu.start_date} - {edu.end_date}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold">Certifications</h3>
                    <ul className="list-disc pl-5">
                        {resumeData.structured_data.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-bold">Areas of Interest</h3>
                    <ul className="list-disc pl-5">
                        {resumeData.structured_data.areas_of_interest.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResumeReview;
