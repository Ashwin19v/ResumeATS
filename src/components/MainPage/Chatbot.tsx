import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/AppContext";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = ({
  toggle,
  handleToggle,
}: {
  toggle: boolean;
  handleToggle: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [queryData, setQueryData] = useState<any>(null);

  const handleSendMessage = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      if (input.trim() !== "") {
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: "Hello! How can I help?", sender: "bot" },
          ]);
        }, 1000);
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
            className={`mb-3 text-sm ${msg.sender === "user" ? "text-blue-400" : "text-green-400"
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
          onKeyDown={(e) => handleSendMessage(e)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-800 rounded-lg text-white outline-none"
        />
        <button
          onClick={(e) => handleSendMessage(e)}
          className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
