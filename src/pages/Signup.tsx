import { useState, FormEvent } from "react";

import { auth, provider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { showToast } from "../components/ToastNotification";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showToast("Sign Up successful", "success");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignup = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        showToast("Sign Up successful with Google", "success");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-10 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handleSignup}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="mb-4 w-full flex items-center justify-center text-center">
            <div className="w-full border-t border-gray-600"></div>
            <span className="px-3 text-sm w-full text-gray-400 ">
              Or sign up with
            </span>
            <div className="w-full border-t border-gray-600"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="rounded-full h-12 w-12 flex items-center justify-center bg-white hover:bg-gray-200 transition"
            aria-label="Sign Up with Google"
          >
            <FaGoogle className="text-green-500 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
