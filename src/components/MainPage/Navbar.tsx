import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFilePdf,
  faFileArchive,
  faUser,
  faLightbulb,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Navbar = ({
  toggleNav,
  handleResumeReview,
}: {
  toggleNav: boolean;
  handleResumeReview: () => void;
}) => {
  const navigate = useNavigate();
  const { user, setUserName, logout } = useAppContext();
  const handleLogout = async () => {
    try {
      await logout();
      setUserName("");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <div
      className={`bg-gradient-to-b from-gray-900  via-gray-950 to-gray-800 w-[60px] 
     flex items-center flex-col py-4 px-2 fixed bottom-0 right-0 h-full 
     transform transition-transform duration-100 ease-in-out z-50 
     ${toggleNav ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex flex-col gap-8">
        <div className="relative group">
          <img
            src={user?.photoURL || "img.png"}
            alt="user"
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-blue-400 p-[2px] 
                hover:scale-110 transition-all duration-300 hover:border-blue-300"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center">
          <FontAwesomeIcon
            icon={faHome}
            size="2x"
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 
                transition-all duration-300 cursor-pointer hover:rotate-[360deg]"
          />

          <FontAwesomeIcon
            icon={faFilePdf}
            onClick={handleResumeReview}
            size="2x"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 
                transition-all duration-300 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faFileArchive}
            onClick={handleResumeReview}
            size="2x"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 
                transition-all duration-300 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 
                transition-all duration-300 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faLightbulb}
            size="2x"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 
                transition-all duration-300 cursor-pointer hover:rotate-12"
          />
        </div>
      </div>
      <div className="mt-auto mb-4 cursor-pointer group" onClick={handleLogout}>
        <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          <FontAwesomeIcon
            icon={faSignOut}
            size="2x"
            className="text-gray-400 group-hover:text-blue-400 transform group-hover:scale-110 
                transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
