import React, { useState } from "react";
import CreateRoom from "./CreateRoom";
import { db } from "../firebase-config";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    const docRef = doc(db, "room", roomId);
    const lowerUser = user.toLowerCase();
    try {
      await setDoc(docRef, {
        id: roomId,
        users: [lowerUser],
      });
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const loggedRoomId = JSON.parse(localStorage.getItem("roomId"));

      if (!loggedUser && !loggedRoomId) {
        localStorage.setItem("user", JSON.stringify(lowerUser));
        localStorage.setItem("roomId", JSON.stringify(roomId));
        console.log("User added to local storage");
      }
      alert(`You have created room with id ${roomId} with username ${user}`);
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const findAndJoinRoom = async (roomId, user) => {
    const docRef = doc(db, "room", roomId);

    const lowerUser = user.toLowerCase();

    try {
  
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
      
        const truthValue = docSnapshot.data().users.includes(lowerUser);

        if (truthValue === false) {

          await updateDoc(docRef, {
            users: arrayUnion(lowerUser),
          });
        }

        const loggedUser = JSON.parse(localStorage.getItem("user"));
        const loggedRoomId = JSON.parse(localStorage.getItem("roomId"));

        if (loggedUser && loggedRoomId) {
          localStorage.removeItem("user");
          localStorage.removeItem("roomId");
        }
        localStorage.setItem("user", JSON.stringify(lowerUser));
        localStorage.setItem("roomId", JSON.stringify(roomId));

        alert(`You have joined room with id ${roomId} with username ${user}`);
        navigate("/chat");
      } else {
        alert("No such room exists. Create One....");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-6 text-2xl sm:text-3xl md:text-4xl font-bold m-4">
        Welcome to the chat application
      </h1>
      {/* <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0">
        <div className="mx-10 md:mx-20 mt-5">
          <p className="text-lg">Want to create a new room:</p>
          <button
            onClick={() => {
              setRoom("Create");
            }}
            className="ml-4 md:ml-14 p-3 border m-3 bg-violet-700 rounded-lg text-white hover:bg-violet-800 transition-all duration-300"
          >
            Create Room
          </button>
        </div>

        <div className="mx-10 md:mx-20 mt-5">
          <p className="text-lg">Already have a room id:</p>
          <button
            onClick={() => {
              setRoom("Join");
            }}
            className="ml-4 md:ml-12 p-3 border m-3 bg-violet-700 rounded-lg text-white hover:bg-violet-800 transition-all duration-300"
          >
            Join Room
          </button>
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-10 ">
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700">
            Want to create a new room:
          </p>
          <button
            onClick={() => {
              setRoom("Create");
            }}
            className="mt-4 px-6 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-all duration-300"
          >
            Create Room
          </button>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700">
            Already have a room id:
          </p>
          <button
            onClick={() => {
              setRoom("Join");
            }}
            className="mt-4 px-6 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-all duration-300"
          >
            Join Room
          </button>
        </div>
      </div>
      <div className="mx-auto w-full sm:w-80 md:w-96 mt-20 sm:mt-32 md:mt-40">
        {room !== null && (
          <CreateRoom
            room={room}
            user={user}
            setRoomId={setRoomId}
            setUser={setUser}
            findAndJoinRoom={findAndJoinRoom}
            createRoom={createRoom}
            roomId={roomId}
          />
        )}
      </div>
    </>
  );
};

export default Home;
