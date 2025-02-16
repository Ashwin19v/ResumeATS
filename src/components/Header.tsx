const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 bg-blue-950 w-full py-6 px-10">
      <h1 className="text-2xl font-bold text-white">RESUME ATS </h1>
      <div className="flex space-x-4">
        <a href="signup" className=" hover:text-gray-900 inline-block bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold">
          sign in
        </a>
        <a href="login" className="inline-block bg-gray-300 text-blue-900 hover:text-gray-900 px-4 py-2 rounded-lg font-semibold">
          Login
        </a>
      </div>
    </div>
  );
};

export default Header;
