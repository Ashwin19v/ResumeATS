import AtScoreModal from "./AtsScore";
import { useAppContext } from "../../context/AppContext";

type FeedbackKey = "projects" | "experience";

const ResumeAnalysis = () => {
  const { handlePreview } = useAppContext();
  const { setSelectedSection, setIsModalOpen, resumeData } = useAppContext();

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const handleSectionClick = (
    section: FeedbackKey,
    content: string,
    index: number,
    i: number
  ) => {
    console.log(section, content);

    setSelectedSection([
      { section: section, content: content, index: index, i: i },
    ]);

    setIsModalOpen(true);
  };

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const similarityScore = resumeData.ats_score?.ats_score?.toFixed(2) || "0.00";

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

          {/* summary */}
          {resumeData.structured_data?.summary_or_objective && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">Summary</h3>
              <div className="p-4 border border-gray-700 rounded-lg">
                <p className="text-white">
                  {resumeData.structured_data?.summary_or_objective}
                </p>
              </div>
            </div>
          )}
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Experience</h3>
            </div>

            {Array.isArray(resumeData?.structured_data?.experience) &&
              resumeData.structured_data.experience.length > 0 &&
              resumeData.structured_data.experience.map((exp, index) => (
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

                  {/* Ensure description is an array before mapping */}
                  {Array.isArray(exp.description) &&
                    exp.description.length > 0 && (
                      <ul className="list-disc pl-5 mt-2">
                        {exp.description.map((desc, i) => (
                          <li key={i}>
                            {desc}
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded-lg cursor-pointer ml-2"
                              onClick={() =>
                                handleSectionClick("experience", desc, index, i)
                              }
                            >
                              Ask Bot
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Education</h3>
            {resumeData?.structured_data.education &&
              resumeData?.structured_data?.education?.map((edu, index) => (
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
            <ul className="list-disc p-4 pl-6 border border-gray-700 ">
              {resumeData.structured_data?.certifications?.map(
                (cert, index) => (
                  <li key={index}>{cert}</li>
                )
              )}
            </ul>
          </div>

          {/* projects */}
          {Array.isArray(resumeData?.structured_data?.projects) &&
            resumeData.structured_data.projects.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Projects</h3>
                <ul className="list-disc p-4 pl-6 border border-gray-700">
                  {resumeData.structured_data.projects.map((project, index) => (
                    <li key={index}>
                      <strong>{project?.project}</strong>
                      <ul className="list-disc pl-5">
                        {Array.isArray(project?.description) &&
                          project.description.map((desc, i) => (
                            <li key={i}>
                              {desc}
                              <button
                                className="bg-blue-500 text-white px-2 py-1 rounded-lg cursor-pointer ml-2"
                                onClick={() =>
                                  handleSectionClick("projects", desc, index, i)
                                }
                              >
                                Ask Bot
                              </button>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Areas of Interest */}
          {resumeData.structured_data.areas_of_interest && (
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
          )}
          <div className="flex justify-start gap-10 items-center w-full my-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={handlePreview}
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
