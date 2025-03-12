import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/AppContext";

const Chatbot = ({
  toggle,
  handleToggle,
}: {
  toggle: boolean;
  handleToggle: () => void;
}) => {
  const [input, setInput] = useState("");
  const { handleChatPrompt, messages, selectedSection, isBotTyping } =
    useAppContext();

  const handleSendMessage = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      if (input.trim() !== "") {
        handleChatPrompt(input, "");
        setInput("");
      } else {
        alert("Please enter a message");
      }
    }
  };

  return (
    <div
      className={`fixed left-0 top-0     h-full w-full sm:w-[50%] 
                flex flex-col justify-between p-5 bg-gray-900 transition-all duration-500 ease-in-out 
                ${toggle ? "translate-x-0" : "-translate-x-full"}`}
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

      <div className="h-full overflow-y-auto bg-gray-800 p-4 rounded-lg">
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
        {isBotTyping && (
          <div className="mb-3 text-sm text-green-400">
            <span className="font-bold animate-pulse"> Typing...</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col space-y-4">
        {selectedSection && (
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-white font-semibold">
              {selectedSection[0].section}
            </div>
            <div className="text-gray-300">{selectedSection[0].content}</div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleSendMessage(e)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-800 rounded-lg text-white outline-none"
          />
          <button
            onClick={(e) => handleSendMessage(e)}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
