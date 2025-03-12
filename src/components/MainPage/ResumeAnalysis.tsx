import AtScoreModal from "./AtsScore";
import { useAppContext } from "../../context/AppContext";

const ResumeAnalysis = () => {
  const { resumeData } = useAppContext();

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const similarityScore = resumeData.ats_score?.ats_score?.toFixed(2) || "0.00";
  const previewPage = () => {
    window.open("/resume");
  };

  const printPage = () => {
    const newWindow = window.open("/resume");
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div key={resumeData.user_id} className="mb-10">
          <div className="mt-4 flex ">
            <div className="flex items-center justify-between  w-full">
              <div>
                <h3 className="text-lg font-bold">Candidate Details</h3>
                <p>
                  <strong>Name:</strong> {resumeData.structured_data?.name}
                </p>
                <p>
                  <strong>Email:</strong> {resumeData.structured_data?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {resumeData.structured_data?.phone}
                </p>
              </div>
            </div>
            <div className="w-[100px] h-[100px] my-auto sm:w-[200px] sm:h-[200px] flex justify-center items-center">
              <AtScoreModal atsScore={similarityScore} />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Skills</h3>
            <ul className="mx-2 flex flex-wrap gap-2 items-center">
              {resumeData.structured_data?.skills?.map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Experience</h3>
            {resumeData.structured_data?.experience?.map((exp, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-700 rounded-lg"
              >
                <h4 className="text-md font-semibold">
                  {exp.title} - {exp.company}
                </h4>
                <p className="text-gray-400">
                  {exp.start_date} - {exp.end_date}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Education</h3>
            {resumeData.structured_data?.education?.map((edu, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-700 rounded-lg"
              >
                <h4 className="text-md font-semibold">{edu.institution}</h4>
                <p className="text-gray-400">
                  {edu.degree} (CGPA: {edu.gpa})
                </p>
                <p className="text-gray-400">
                  {edu.start_date} - {edu.end_date}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Certifications</h3>
            <ul className="list-disc pl-5">
              {resumeData.structured_data?.certifications?.map(
                (cert, index) => (
                  <li key={index}>{cert}</li>
                )
              )}
            </ul>
          </div>

          {/* Areas of Interest */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Areas of Interest</h3>
            <ul className="list-disc pl-5">
              {resumeData.structured_data?.areas_of_interest?.map(
                (interest: string, index: number) => (
                  <li key={index}>{interest}</li>
                )
              )}
            </ul>
          </div>
          <div className="flex justify-start gap-10 items-center w-full my-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={printPage}
            >
              Download as PDF
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={previewPage}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
