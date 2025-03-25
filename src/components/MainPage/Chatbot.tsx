import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/AppContext";
import bot from "../../assets/images/bot.webp";
import { showToast } from "../ToastNotification";

const Chatbot = ({
    toggle,
    handleToggle,
}: {
    toggle: boolean;
    handleToggle: () => void;
}) => {
    const [input, setInput] = useState("");
    const {
        handleChatPrompt,
        handelUpdateResume,
        messages,
        selectedSection,
        isBotTyping,
        user,
    } = useAppContext();

    const handleSendMessage = (e: any) => {
        if (e.key === "Enter" || e.type === "click") {
            if (input.trim() !== "") {
                handleChatPrompt(input, "");
                setInput("");
            } else {
                showToast("Please enter a message", "warning");
            }
        }
    };
    const handleUpdate = (msg: { text: string; index: number }) => {
        if (!selectedSection) {
            showToast("No section selected", "warning");
            return;
        }

        const sectionInfo = selectedSection[0];
        console.log("Selected Section:", sectionInfo);

        if (!sectionInfo || !sectionInfo.section) {
            showToast("Invalid section data", "error");
            return;
        }

        const sectionName = sectionInfo.section;

        const sectionPath = `processed_data.structured_data.${sectionName}`;

        console.log("Updating section:", sectionPath);
        console.log("With text:", msg.text);

        handelUpdateResume({
            section: sectionPath,
            text: msg.text,
            index: msg.index,
        });
    };

    return (
        <div
            className={`fixed left-0 top-0     h-full w-full sm:w-[50%] 
                flex flex-col justify-between p-5 bg-gray-900 transition-all duration-500 ease-in-out 
                ${toggle ? "translate-x-0" : "-translate-x-full"}`}
            style={{ zIndex: 50 }}>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mb-3 cursor-pointer">
                    Chatbot
                </h2>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    onClick={handleToggle}
                    className="p-2 rounded-full hover:bg-gray-600 transition-all duration-500 ease-in-out cursor-pointer"
                />
            </div>

            <div className="h-full overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-3 text-sm flex items-start space-x-2 ${
                            msg.sender === "user"
                                ? " justify-end items-center"
                                : "items-center"
                        }`}>
                        {msg.sender !== "user" && (
                            <img
                                src={bot}
                                alt="Bot Avatar"
                                className="rounded-full h-6 w-6"
                            />
                        )}
                        <div
                            className={`p-3 rounded-lg ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white "
                                    : "bg-gray-700 text-white"
                            }`}>
                            {msg.text}
                            {msg.sender !== "user" && (
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                        className="bg-green-700 rounded-md p-1"
                                        onClick={() => {
                                            if (
                                                !selectedSection ||
                                                !selectedSection[0]
                                            ) {
                                                showToast(
                                                    "No section selected or invalid section",
                                                    "error"
                                                );
                                                return;
                                            }

                                            handleUpdate({
                                                text: msg.text,
                                                index,
                                            });
                                        }}>
                                        Accept and update
                                    </button>
                                    <button className="bg-red-700 rounded-md p-1">
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                        {msg.sender === "user" && user?.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="rounded-full h-6 w-6"
                            />
                        )}
                    </div>
                ))}
                {isBotTyping && (
                    <div className="text-sm text-green-400 flex items-center justify-center space-x-2">
                        <div className="loader-dots flex space-x-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-400"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-col space-y-4">
                {selectedSection && (
                    <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="text-white font-semibold">
                            {selectedSection[0].section}
                        </div>
                        <div className="text-gray-300">
                            {selectedSection[0].content}
                        </div>
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
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
