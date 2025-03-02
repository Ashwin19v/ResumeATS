import { useAppContext } from "../context/AppContext";

const Resume = () => {
  const { user } = useAppContext();

  if (user === null) {
    return (
      <div className="h-screen flex flex-col justify-center items-center w-full sm:w-[50%] bg-gray-900">
        <h1 className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </h1>
        <p className="text-gray-400">Estimated Time: 10s</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  text-sm">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">ASHWIN V</h1>
        <p className="text-gray-700">995659675, Chennai, TamilNadu</p>
        <p className="text-blue-500">
          <a href="mailto:vdeepakvaithe@gmail.com" className="hover:underline">
            Email
          </a>{" "}
          |
          <a
            href="https://linkedin.com/in/Deepakkumar"
            className="hover:underline"
          >
            {" "}
            LinkedIn
          </a>{" "}
          |
          <a href="https://github.com/Deepakkumar" className="hover:underline">
            {" "}
            GitHub
          </a>
        </p>
      </header>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">OBJECTIVE</h2>
        <p className="text-gray-700">
          Software Engineer with 3 years in MERN Stack, seeking a Full Stack,
          Frontend, or Backend role.
        </p>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">EDUCATION</h2>
        <p className="text-gray-700">
          <strong>Bachelor’s in Automobile Engineering</strong>, MIT, Anna
          University (2017 - 2021)
        </p>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">SKILLS</h2>
        <div className=" text-gray-700">
          <div>
            <p>
              <strong>Frontend:</strong> React.js, Redux, Next.js, HTML, CSS,
              Tailwind
            </p>
            <p>
              <strong>Backend:</strong> Node.js, Express.js, JWT, Auth0
            </p>
          </div>
          <div>
            <p>
              <strong>Databases:</strong> MongoDB, MySQL
            </p>
            <p>
              <strong>Tools:</strong> GitHub, Jenkins, Postman, VS Code, Figma
            </p>
          </div>
        </div>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">EXPERIENCE</h2>
        <h3 className="text-md font-semibold text-gray-900">
          Senior Software Engineer
        </h3>
        <p className="text-gray-600">
          Solaritis Technology Services Pvt Ltd (Sept 2021 - Present)
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Built React & Node.js app with MongoDB & Express.</li>
          <li>Used Redux for state management & reusable components.</li>
          <li>Developed no-code UI with React & MySQL.</li>
        </ul>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">PROJECTS</h2>
        <p className="text-gray-700">
          Todo List App - Built using React, Node.js, Express, and MongoDB.
        </p>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">CERTIFICATIONS</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>React.js - Context API & Redux.</li>
          <li>HTML, CSS, JS - Web Development.</li>
        </ul>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          EXTRA-CURRICULAR
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Contributing to Open-Source.</li>
          <li>Learning DSA.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">LEADERSHIP</h2>
        <p className="text-gray-700">
          Mentored 3 developers, guiding team collaboration & knowledge-sharing.
        </p>
      </section>
    </div>
  );
};

export default Resume;
