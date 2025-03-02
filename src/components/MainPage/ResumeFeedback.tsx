import resumeData from "../../../utils/resources/resumeData.json";
import AtScoreModal from "./AtsScore";

const ResumeReview = () => {
  const data = resumeData;
  const similarityScore = resumeData.ats_score.ats_score.toFixed(2);
  return (
    <div className="text-white bg-gray-900  p-2">
      <div className="max-w-4xl mx-auto shadow-2xl rounded-lg p-2 bg-gray-900">
        {/* User Info */}
        <div className="flex justify-between  mb-8">
          <div className="">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">
              {data.user_name}
            </h1>
            <p className="text-gray-300">
              User ID:{" "}
              <span className="font-semibold text-green-400">
                {data.user_id}
              </span>{" "}
            </p>
            <p className="text-gray-300">
              Similarity Score:{" "}
              <span className="font-semibold text-green-400">
                {data.similarity.toFixed(2)}
              </span>
            </p>
            <h2 className=" font-semibold  mb-6 ">
              ATS Score:{" "}
              <span className="text-green-400">{data.ats_score.ats_score}</span>
            </h2>
          </div>
          <div className="w-[100px] h-[100px] my-auto sm:w-[150px] sm:h-[150px] flex justify-center items-center">
            <AtScoreModal atsScore={similarityScore} />
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
                {data.ats_score.detailed_scores.skills_match}%
              </p>
            </div>
            <div className="bg-green-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-green-200">
                Experience Relevance
              </h3>
              <p className="text-2xl font-bold text-green-400">
                {data.ats_score.detailed_scores.experience_relevance}%
              </p>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-purple-200">
                Education Relevance
              </h3>
              <p className="text-2xl font-bold text-purple-400">
                {data.ats_score.detailed_scores.education_relevance}%
              </p>
            </div>
            <div className="bg-yellow-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-yellow-200">
                Overall Formatting
              </h3>
              <p className="text-2xl font-bold text-yellow-400">
                {data.ats_score.detailed_scores.overall_formatting}%
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
                {data.ats_score.feedback.strengths.map((strength, index) => (
                  <li key={index} className="mb-2">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Improvements
              </h3>
              <ul className="list-disc list-inside text-gray-200">
                {data.ats_score.feedback.improvements.length > 0 ? (
                  data.ats_score.feedback.improvements.map(
                    (improvement, index) => (
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
            {/* Skills Match */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Skills Match
              </h3>
              <p className="text-gray-200">
                <strong className="text-blue-300">Matching Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.skills_match.matching_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200">
                <strong className="text-blue-300">Missing Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.skills_match.missing_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200 mt-2">
                {data.ats_score.detailed_feedback.skills_match.explanation}
              </p>
            </div>

            {/* Experience Relevance */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Experience Relevance
              </h3>
              <p className="text-gray-200">
                <strong className="text-blue-300">Matching Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.experience_relevance.matching_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200">
                <strong className="text-blue-300">Missing Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.experience_relevance.missing_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200 mt-2">
                {
                  data.ats_score.detailed_feedback.experience_relevance
                    .explanation
                }
              </p>
            </div>

            {/* Education Relevance */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Education Relevance
              </h3>
              <p className="text-gray-200">
                <strong className="text-blue-300">Matching Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.education_relevance.matching_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200">
                <strong className="text-blue-300">Missing Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.education_relevance.missing_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200 mt-2">
                {
                  data.ats_score.detailed_feedback.education_relevance
                    .explanation
                }
              </p>
            </div>

            {/* Overall Formatting */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-blue-400 mb-4">
                Overall Formatting
              </h3>
              <p className="text-gray-200">
                <strong className="text-blue-300">Matching Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.overall_formatting.matching_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200">
                <strong className="text-blue-300">Missing Elements:</strong>{" "}
                {data.ats_score.detailed_feedback.overall_formatting.missing_elements.join(
                  ", "
                )}
              </p>
              <p className="text-gray-200 mt-2">
                {
                  data.ats_score.detailed_feedback.overall_formatting
                    .explanation
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
