const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 bg-blue-950 w-full p-3">
      <h1 className="text-2xl font-bold text-white">RESUME ATS </h1>
      <div className="flex space-x-4">
        <a href="#" className="text-white hover:text-gray-900">
          sign in
        </a>
        <a href="#" className="text-white hover:text-gray-900">
          Login
        </a>
      </div>
    </div>
  );
};

export default Header;
