import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "react-circular-progressbar/dist/styles.css";
interface AtScoreModalProps {
    toggleScore: boolean;
    handleToggleScore: () => void;
}

const AtScoreModal = ({ toggleScore, handleToggleScore }: AtScoreModalProps) => {
    if (!toggleScore) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-40 "
                onClick={handleToggleScore}
            ></div>

            <div className="fixed inset-0 flex justify-center items-center z-50 h-screen">
                <div className="w-[400px] bg-gray-800 p-5 rounded-lg">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={handleToggleScore}
                        className="p-2 rounded-full hover:bg-gray-600 transition-all duration-500 ease-in-out cursor-pointer"
                    />



                    <div className="w-48 h-48 mx-auto my-4">
                        <CircularProgressbar
                            value={90}
                            text={`90%`}
                            styles={buildStyles({
                                pathColor: "#3b82f6",
                                textColor: "#ffffff",
                                trailColor: "#374151",
                                textSize: "16px",
                            })}
                        />
                    </div>


                    export default ProgressBar;


                    <div>ATS: Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div>ATS</div>
                    <div>ATS</div>
                    <div>ATS</div>
                </div>
            </div>
        </>
    );
};

export default AtScoreModal;
