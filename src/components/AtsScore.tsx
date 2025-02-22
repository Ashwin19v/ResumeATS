import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "react-circular-progressbar/dist/styles.css";


interface AtScoreModalProps {
    atsScore: number;
    details: {
        skills_match: number;
        experience_relevance: number;
        education_relevance: number;
        overall_formatting: number;
    };
}

const AtScoreModal: React.FC<AtScoreModalProps> = ({ atsScore, details }) => {
    const { skills_match, experience_relevance, education_relevance, overall_formatting } = details;
    return (
        <>


            <div className="fixed flex justify-center items-center z-50 ">
                <div className="w-[400px] bg-gray-800 p-5 rounded-lg">

                    <div className="w-48 h-48 mx-auto my-4">
                        <CircularProgressbar
                            value={atsScore}
                            text={`${atsScore}%`}
                            styles={buildStyles({
                                pathColor: "#3b82f6",
                                textColor: "#ffffff",
                                trailColor: "#374151",
                                textSize: "16px",
                            })}
                        />
                    </div>
                    <div className="text-white mt-4">
                        <p>Skills Match: {skills_match}%</p>
                        <p>Experience Relevance: {experience_relevance}%</p>
                        <p>Education Relevance: {education_relevance}%</p>
                        <p>Overall Formatting: {overall_formatting}%</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AtScoreModal;
