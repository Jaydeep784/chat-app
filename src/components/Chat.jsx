import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const roomId = JSON.parse(localStorage.getItem("roomId"));
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getData = async () => {
      const roomRef = doc(db, "room", roomId);
      const roomData = await getDoc(roomRef);
      if (roomData.exists()) {
        const chatData = roomData.data().chat;
        setMessages(Array.isArray(chatData) ? chatData : []);
        console.log(messages);
      } else {
        console.log("No data exists");
      }
    };
    getData();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if(msg === '') return alert("Can't send empty message..")

    const roomRef = doc(db, "room", roomId);
    const msgRef = collection(roomRef, "messages");
    try {
      // await addDoc(msgRef, {
      //     username : loggedUser,
      //     message : msg,
      //     timestamp : new Date(),
      // });

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      await updateDoc(roomRef, {
        chat: arrayUnion({
          username: loggedUser,
          message: msg,
          timestamp: time,
        }),
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: loggedUser,
          message: msg,
          timestamp: time,
        },
      ]);

      console.log("message added");
    } catch (error) {
      console.log(error);
    }
    setMsg("");
  };

  return (
    <>
      {/* <h1 className='text-center'>Chat component with all chats</h1> */}
      <div className="flex flex-col w-full bg-violet-600 h-screen mx-auto">
        <h1 className="text-center bg-violet-950 text-blue-200 font-semibold text-3xl py-2">
          Room Id : {roomId}
        </h1>

        <div className="flex flex-col mt-3 pb-1 overflow-auto ">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="mb-1 flex m-1 ml-4 mr-4 text-sm">
                <div
                  className={`w-auto bg-blue-400 h-auto rounded-lg pl-2 ${
                    message.username === loggedUser ? "ml-auto" : ""
                  } `}
                >
                  <p
                    className={`${
                      message.username === loggedUser ? "hidden" : ""
                    }`}
                  >
                    {message.username}
                  </p>
                  <div className="flex mb-1">
                    {" "}
                    <p>{message.message}</p>
                    <p className="ml-4 text-xs pr-2 pt-1 text-gray-600">
                      {message.timestamp}
                    </p>{" "}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}
        </div>
        <div className="mt-auto bg-violet-500 p-3 rounded-b-lg">
          <div className="flex h-10 ">
            <input
              className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
              type="text"
              value={msg}
              placeholder="Enter message..."
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="bg-violet-700 text-white p-2 rounded-r-lg hover:bg-violet-800 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
