import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faMessage } from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  import.meta.url
).toString();

const Main = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleScore, setToggleScore] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop,
  });

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Hello! How can I help?", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleToggleScore = () => {
    setToggleScore(!toggleScore);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Chatbot */}
      <div
        className={`fixed left-0 top-0 h-full w-[60%] flex flex-col justify-between p-5 bg-gray-800 transition-all duration-500 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-3 cursor-pointer">Chatbot</h2>
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={handleToggle}
            className="p-2 rounded-full hover:bg-gray-600 transition-all duration-500 ease-in-out cursor-pointer"
          />
        </div>

        <div className="h-full overflow-y-auto bg-gray-700 p-4 rounded-lg">
          <div className="flex mb-4 flex-col bg-gray-600 p-4 rounded-lg">
            <div>ATS SCORE : </div>
            <div>ATS SCORE : </div>
            <div>ATS SCORE : </div>
            <div>ATS SCORE : </div>
            <div>ATS SCORE : </div>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 text-sm ${
                msg.sender === "user" ? "text-blue-400" : "text-green-400"
              }`}
            >
              <span className="font-bold">
                {msg.sender === "user" ? "You: " : "Bot: "}
              </span>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-600 rounded-lg text-white outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 transition-all ease-in-out duration-500 h-screen flex flex-col justify-between w-[60%]">
        <h2 className="text-lg font-bold">Upload & Preview PDF</h2>

        <div
          {...getRootProps()}
          className="p-4 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-400">Drop the PDF here...</p>
          ) : (
            <p className="text-gray-400">
              Drag & drop a PDF file here, or click to select one
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <textarea
            className="text-gray-400 bg-gray-800 p-4 rounded-lg w-full outline-none h-[200px] resize-none"
            placeholder="Enter your job description here..."
          ></textarea>
          <div className="flex justify-between items-center">
            <FontAwesomeIcon
              icon={faMessage}
              shake={true}
              size="1x"
              onClick={handleToggle}
              className=" bg-blue-600  hover:bg-blue-700 transition-colors  p-3 rounded-full h-5 cursor-pointer"
            />
            <button className="w-1/5 bg-blue-600 rounded-lg h-10 hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="h-screen bg-gray-800 p-3 rounded-lg overflow-auto w-[40%]">
        {/* {pdfFile ? (
          <Document file={pdfFile}>
            <Page pageNumber={1} width={500} />
          </Document>
        ) : (
          <p className="text-gray-400">No PDF selected</p>
        )} */}
      </div>
      {toggleScore && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 "
            onClick={handleToggleScore}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 h-screen">
            <div className=" w-[400px] bg-gray-800 p-5 rounded-lg">
              <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={handleToggleScore}
                className="p-2 rounded-full hover:bg-gray-600 transition-all duration-500 ease-in-out cursor-pointer"
              />

              <div className="w-48 h-48 mx-auto my-4">
                <CircularProgressbar
                  value={90}
                  text={`${90}%`}
                  styles={buildStyles({
                    pathColor: `#3b82f6`,
                    textColor: "#ffffff",
                    trailColor: "#374151",
                    textSize: "16px",
                    pathTransitionDuration: 1,
                  })}
                />
              </div>

              <div>
                ATS : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Accusamus ipsam ducimus sapiente officiis facilis provident
                expedita fugit repellat sunt iure. Culpa corrupti vero iure
                asperiores praesentium deleniti, unde in facere.
              </div>
              <div> ATS</div>
              <div> ATS</div>
              <div> ATS</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
