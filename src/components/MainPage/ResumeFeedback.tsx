import AtScoreModal from "./AtsScore";
import { useAppContext } from "../../context/AppContext";
type FeedbackKey =
  | "skills_match"
  | "experience_relevance"
  | "education_relevance"
  | "overall_formatting";

const ResumeReview = () => {
  const { resumeData } = useAppContext();

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const data = resumeData;

  const sections: { key: FeedbackKey; title: string }[] = [
    { key: "skills_match", title: "Skills Match" },
    { key: "experience_relevance", title: "Experience Relevance" },
    { key: "education_relevance", title: "Education Relevance" },
    { key: "overall_formatting", title: "Overall Formatting" },
  ];

  return (
    <div className="text-white bg-gray-900 p-2">
      <div className="max-w-4xl mx-auto shadow-2xl rounded-lg p-2 bg-gray-900">
        {/* User Info */}
        <div className="flex justify-between  items-center mb-8">
          <div>
            <p className="text-gray-300">
              User ID:{" "}
              <span className="font-semibold text-green-400">
                {data.user_id}
              </span>
            </p>

            <h2 className="font-semibold mb-6">
              ATS Score:{" "}
              <span className="text-green-400">
                {data.ats_score?.ats_score || " "}
              </span>
            </h2>
          </div>
          <div className="w-[100px] h-[100px] my-auto sm:w-[150px] sm:h-[150px] flex justify-center items-center">
            <AtScoreModal atsScore={data.ats_score?.ats_score} />
          </div>
        </div>

        {/* ATS Score */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-200">
                Skills Match
              </h3>
              <p className="text-2xl font-bold text-blue-400">
                {data.ats_score?.detailed_scores.skills_match}%
              </p>
            </div>
            <div className="bg-green-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-green-200">
                Experience Relevance
              </h3>
              <p className="text-2xl font-bold text-green-400">
                {data.ats_score?.detailed_scores.experience_relevance}%
              </p>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-purple-200">
                Education Relevance
              </h3>
              <p className="text-2xl font-bold text-purple-400">
                {data.ats_score?.detailed_scores.education_relevance}%
              </p>
            </div>
            <div className="bg-yellow-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-yellow-200">
                Project Match
              </h3>
              <p className="text-2xl font-bold text-yellow-400">
                {data.ats_score?.detailed_scores.project_relevance}%
              </p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Feedback
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Strengths
              </h3>
              <ul className="list-disc list-inside text-gray-200">
                {data.ats_score?.feedback?.strengths?.map(
                  (strength: string, index: number) => (
                    <li key={index} className="mb-2">
                      {strength}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Improvements
              </h3>
              <ul className="list-disc list-inside text-gray-200">
                {(data.ats_score?.feedback?.improvements?.length ?? 0) > 0 ? (
                  data.ats_score?.feedback?.improvements?.map(
                    (improvement: string, index: number) => (
                      <li key={index} className="mb-2">
                        {improvement}
                      </li>
                    )
                  )
                ) : (
                  <li>No improvements suggested</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Detailed Feedback
          </h2>
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.key}
                className="bg-gray-700 p-6 rounded-lg shadow-md relative group"
              >
                <h3 className="text-xl font-medium text-blue-400 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-200">
                  <strong className="text-blue-300">Matching Elements:</strong>{" "}
                  {data.ats_score?.detailed_feedback?.[
                    section.key
                  ]?.matching_elements?.join(", ")}
                </p>
                <p className="text-gray-200">
                  <strong className="text-blue-300">Missing Elements:</strong>{" "}
                  {data.ats_score?.detailed_feedback?.[
                    section.key
                  ]?.missing_elements?.join(", ")}
                </p>
                <p className="text-gray-200 mt-2">
                  {
                    data.ats_score?.detailed_feedback?.[section.key]
                      ?.explanation
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
