import { useAppContext } from "../context/AppContext";

const Resume = () => {
  const { user, resumeData } = useAppContext();
  console.log(user, resumeData);

  if (user === null || resumeData === null) {
    return (
      <div className="h-screen flex flex-col justify-center items-center w-full sm:w-[50%] bg-gray-900">
        <h1 className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </h1>
        <p className="text-gray-400">Estimated Time: 10s</p>
      </div>
    );
  }

  const { structured_data } = resumeData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-sm">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {structured_data?.name}
        </h1>
        <p className="text-gray-700">
          {structured_data?.phone}, {structured_data?.location}
        </p>
        <p className="text-blue-500">
          <a
            href={`mailto:${structured_data?.email}`}
            className="hover:underline"
          >
            Email
          </a>{" "}
          |
          <a href={structured_data?.linkedin} className="hover:underline">
            {" "}
            LinkedIn
          </a>{" "}
          |
          <a href={structured_data?.github} className="hover:underline">
            {" "}
            GitHub
          </a>
        </p>
      </header>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">OBJECTIVE</h2>
        <p className="text-gray-700">{structured_data?.objective}</p>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">EDUCATION</h2>
        {structured_data?.education?.map((edu, index) => (
          <p key={index} className="text-gray-700">
            <strong>{edu.degree}</strong>, {edu.institution} ({edu.start_date} -{" "}
            {edu.end_date})
          </p>
        ))}
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">SKILLS</h2>
        <div className="text-gray-700">
          <div>
            <p>
              <strong>Frontend:</strong>{" "}
              {structured_data?.skills?.frontend?.join(", ")}
            </p>
            <p>
              <strong>Backend:</strong>{" "}
              {structured_data?.skills?.backend?.join(", ")}
            </p>
          </div>
          <div>
            <p>
              <strong>Databases:</strong>{" "}
              {structured_data?.skills?.databases?.join(", ")}
            </p>
            <p>
              <strong>Tools:</strong>{" "}
              {structured_data?.skills?.tools?.join(", ")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">EXPERIENCE</h2>
        {structured_data?.experience?.map((exp, index) => (
          <div key={index}>
            <h3 className="text-md font-semibold text-gray-900">{exp.title}</h3>
            <p className="text-gray-600">
              {exp.company} ({exp.start_date} - {exp.end_date})
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              {exp.responsibilities?.map((responsibility, idx) => (
                <li key={idx}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">PROJECTS</h2>
        {structured_data?.projects?.map((project, index) => (
          <p key={index} className="text-gray-700">
            {project.name} - {project.description}
          </p>
        ))}
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">CERTIFICATIONS</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {structured_data?.certifications?.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          EXTRA-CURRICULAR
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          {structured_data?.extra_curricular?.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">LEADERSHIP</h2>
        <p className="text-gray-700">{structured_data?.leadership}</p>
      </section>
    </div>
  );
};

export default Resume;
