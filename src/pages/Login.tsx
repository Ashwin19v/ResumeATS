import { useState, FormEvent } from "react";
import { FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-2">
          Register for new User{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="mb-4 w-full text-center">
            <span className="block w-full border-t border-gray-600 my-2"></span>
            <span className="text-sm text-gray-400">Or login with</span>
            <span className="block w-full border-t border-gray-600 my-2"></span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="rounded-full h-12 w-12 flex items-center justify-center bg-white hover:bg-gray-200 transition"
            aria-label="Login with Google"
          >
            <FaGoogle className="text-blue-500 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
