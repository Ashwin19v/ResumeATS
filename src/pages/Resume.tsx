import React, { useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppContext } from "../context/AppContext";

const Resume = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { preview, handlePreview, resumeData } = useAppContext();

  const downloadPDF = () => {
    if (pdfRef.current) {
      html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        console.log(imgHeight, imgWidth);

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("resume.pdf");
      });
    }
  };

  return (
    <div className="relative">
      {preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handlePreview}
        >
          <div className="bg-white w-full sm:w-[50%]  p-6 rounded-lg shadow-lg relative h-full overflow-auto flex flex-col justify-between font-times">
            {/* Resume Content */}
            <div ref={pdfRef} id="resume-content" className="p-6">
              {/* Header */}
              <header className="text-center mb-4">
                <h1 className="text-xl font-bold text-black">
                  {resumeData?.structured_data?.name}
                </h1>
                <div className="flex justify-center items-center gap-6 text-black mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaPhone />
                    <span>{resumeData?.structured_data?.phone} </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaEnvelope />
                    <a
                      href="mailto:harishkb20205@gmail.com"
                      className="hover:underline text-blue-500"
                    >
                      {resumeData?.structured_data?.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaLinkedin />
                    <a
                      href="https://linkedin.com/in/harishkb"
                      className="hover:underline text-blue-500"
                    >
                      Harish KB
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaGithub />
                    <a
                      href="https://github.com/HARISH20205"
                      className="hover:underline text-blue-500"
                    >
                      HARISH20205
                    </a>
                  </div>
                </div>
              </header>

              {/* Objective Section */}
              {resumeData?.structured_data?.summary_or_objective && (
                <section className="mb-4">
                  <h2 className="text-md font-semibold text-black">
                    OBJECTIVE
                  </h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  <p className="text-xs text-black">
                    To secure a challenging position in a reputable organization
                    to expand my learnings, knowledge, and skills.
                  </p>
                </section>
              )}

              {/* Education Section */}
              {resumeData?.structured_data?.education && (
                <section className="pb-2">
                  <h2 className="text-md font-semibold text-black">
                    EDUCATION
                  </h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  {resumeData.structured_data?.education?.map((edu, index) => (
                    <div
                      key={index}
                      className="mb-4 text-black flex justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold">
                          {edu.institution}
                        </h4>
                        <p className="text-xs text-black">
                          {edu.degree} (CGPA: {edu.gpa})
                        </p>
                      </div>

                      <p className="text-xs text-black">
                        {edu.start_date} - {edu.end_date}
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Skills Section */}
              <section className="mb-4 pb-2 text-xs">
                <h2 className="text-md font-semibold text-black">SKILLS</h2>
                <div className="border-b-2 border-black mt-2"></div>
                <div className="text-black flex   items-center flex-wrap">
                  {resumeData?.structured_data?.skills?.map((skill, index) => (
                    <li key={index} className="mx-1">
                      {skill}
                    </li>
                  ))}
                </div>
              </section>

              {/* Experience Section */}
              {resumeData?.structured_data?.experience && (
                <section className="mb-4 pb-2 text-xs">
                  <h2 className="text-md font-semibold text-black">
                    EXPERIENCE
                  </h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  {resumeData?.structured_data?.experience?.map(
                    (exp, index) => (
                      <div key={index} className="mt-2 text-black">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-semibold">
                            {exp.title} <hr></hr> {exp.company}
                          </h4>
                          <p className="text-xs">
                            {exp.start_date} - {exp.end_date}
                          </p>
                        </div>

                        <ul className="list-disc pl-6">
                          {Array.isArray(exp.description) ? (
                            exp.description.map((desc, idx) => (
                              <li key={idx} className="text-xs">
                                {desc}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs">{exp.description}</li>
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </section>
              )}

              {/* Projects Section */}
              {resumeData?.structured_data?.projects && (
                <section className="mb-4 pb-2 text-xs">
                  <h2 className="text-md font-semibold text-black">PROJECTS</h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  <ul className="list-disc text-black pl-1">
                    {resumeData.structured_data?.projects?.map((project) => (
                      <div className="pl-5">
                        <li className="mb-2 text-black ">{project.project}</li>
                        <ul className="list-disc pl-5">
                          {Array.isArray(project?.description) &&
                            project.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </section>
              )}

              {/* Certifications Section */}
              {resumeData?.structured_data?.certifications && (
                <section className="mb-4 pb-2 text-xs">
                  <h2 className="text-md font-semibold text-black">
                    CERTIFICATIONS
                  </h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  <ul className="list-disc text-black pl-6">
                    {resumeData?.structured_data?.certifications?.map(
                      (cert, index) => (
                        <li key={index} className="text-xs">
                          {cert}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}

              {/* Area of interest*/}
              {resumeData?.structured_data?.areas_of_interest && (
                <section className="mb-4 pb-2 text-xs">
                  <h2 className="text-md font-semibold text-black">
                    AREA OF INTEREST
                  </h2>
                  <div className="border-b-2 border-black mt-2"></div>
                  <ul className="list-disc text-black pl-6">
                    {resumeData?.structured_data?.areas_of_interest?.map(
                      (interest, index) => (
                        <li key={index} className="text-xs">
                          {interest}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </div>

            {/* PDF Download Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={downloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Download as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
