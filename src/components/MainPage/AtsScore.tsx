import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AtScoreModalProps {
  atsScore: string;
}

const AtScoreModal: React.FC<AtScoreModalProps> = ({ atsScore }) => {
  return (
    <CircularProgressbar
      value={+atsScore}
      text={`${atsScore}%`}
      styles={{
        path: {
          stroke: "#3b82f6",
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
        },
        trail: { stroke: "#374151" },
        text: {
          fill: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default AtScoreModal;
