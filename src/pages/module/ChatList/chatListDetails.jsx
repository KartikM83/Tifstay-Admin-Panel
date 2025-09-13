import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BackButton from "../../../assets/BackButton.svg";

function ChatDetails() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { state } = useLocation();
  const personName = state?.name || `Chat #${chatId}`;
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor harshal sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:32 AM",
      sender: "other",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:33 AM",
      sender: "me",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:34 AM",
      sender: "other",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:35 AM",
      sender: "me",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:36 AM",
      sender: "other",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 6,
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:37 AM",
      sender: "me",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
    ]);
    setInput("");
  };

  return (
    <div className="w-full h-screen flex flex-col font-inter ">
      {/* Header */}
      <div className="w-full h-[72px] flex items-center gap-3 bg-white rounded-lg p-9 shadow-sm">
        <button onClick={() => navigate(`/chats`)}>
          {/* <IoIosArrowBack className="w-6 h-6" /> */}
          <img src={BackButton} alt="Back Button" />
        </button>
        <h2 className="text-[24px] font-medium  leading-none">
          Chat List / Details - {personName}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow border  mt-7 border-black p-4 flex flex-col gap-4">
        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y- mt-8">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              {/* Time Centered */}
              {/* <div className="text-center text-xs text-gray-400">
                {msg.time}
              </div> */}

              <div
                className={`flex items-end gap-2 ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "other" && (
                  <img
                    src={msg.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`max-w-[30%] p-3 text-sm shadow ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white rounded-2xl rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-gray-300 mt-1 text-right">
                    {msg.time}
                  </p>
                </div>
                {msg.sender === "me" && (
                  <img
                    src={msg.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t bg-white p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatDetails;
