import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import logo from "../../assets/logos/log.jpg";

const Header = () => {
  const { user, logout } = useAppContext();
  return (
    <div className="flex justify-between items-center mb-8 bg-gradient-to-l from-gray-950 to-gray-800 w-full py-6 px-10">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="logo"
          className="sm:w-20 sm:h-20  w-10 h-10rounded-full scale-150"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-white">
          RESUME ATS{" "}
        </h1>
      </div>

      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link
              to="/signup"
              className="hover:text-gray-900  bg-white text-blue-900 sm:px-4 sm:py-2 p-1 rounded-lg font-semibold text-md "
            >
              Sign in
            </Link>
            <Link
              to="/login"
              className=" bg-gray-300 text-blue-900 hover:text-gray-900 sm:px-4 sm:py-2 p-1 rounded-lg font-semibold text-md"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={logout}
              className="hover:text-gray-900  bg-white text-blue-900 sm:px-4 sm:py-2 p-1 rounded-lg font-semibold text-md"
            >
              Logout
            </button>
            <img
              src={user?.photoURL || ""}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
