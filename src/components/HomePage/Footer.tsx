const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-l from-gray-950 to-gray-800 text-gray-300 p-6 text-center rounded-lg">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Resume Coach. All rights reserved.
      </p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white">
          Terms of Service
        </a>
        <a href="#" className="hover:text-white">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
