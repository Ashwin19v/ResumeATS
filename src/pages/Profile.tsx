import { useState } from "react";

const ProfilePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [resumeScore, setResumeScore] = useState(85); // Example ATS score
  const [skills, setSkills] = useState([
    "React",
    "Tailwind CSS",
    "Firebase",
    "Node.js",
  ]);

  const handlePasswordChange = () => {
    // Add your password change logic here
    console.log("Password changed!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6">
          <h1 className="text-3xl font-bold">Profile Page</h1>
          <p className="text-gray-200">
            Manage your profile and resume ATS score.
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-lg"
            />
            <input
              type="file"
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Resume ATS Score Section */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Resume ATS Score</h2>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{resumeScore}</span>
            </div>
            <p className="text-gray-300">
              Your resume ATS score is {resumeScore}. Improve your score by
              optimizing your resume for ATS compatibility.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Change Password Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handlePasswordChange}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
