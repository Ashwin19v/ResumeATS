import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4">
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

          <button className="w-full bg-green-600  py-3 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log In
          </a>
        </div>

        <div className=" flex flex-col items-center justify-center">
          <div className="mb-4">
            ---------------------------- or --------------------------
          </div>
          <div>Login with Google</div>
          <button className="rounded-full h-10 w-10">
            <FaGoogle className="text-lg text-green-500 bg-white rounded-full h-10 w-10 p-2 my-2 hover:text-green-300 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
