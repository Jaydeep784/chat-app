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
    try {
      await setDoc(docRef, {
        id: roomId,
        users: [user],
      });
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      const loggedRoomId = JSON.parse(localStorage.getItem('roomId'));

      if(!loggedUser && !loggedRoomId) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('roomId', JSON.stringify(roomId));
        console.log("User added to local storage");
      }

      navigate("/chat");
      
    } catch (error) {
      console.log(error);
    }
  };

  const findAndJoinRoom = async (roomId, user) => {
    const docRef = doc(db, "room", roomId);

    try {
      // Get the document snapshot to check if the document exists
      const docSnapshot = await getDoc(docRef);
      console.log(docSnapshot.exists()); // Log whether the document exists

      if (docSnapshot.exists()) {
        // If the document exists, update the 'users' array by adding the user
        await updateDoc(docRef, {
          users: arrayUnion(user),
        });

        const loggedUser = JSON.parse(localStorage.getItem('user'));
        const loggedRoomId = JSON.parse(localStorage.getItem('roomId'));
        console.log(loggedRoomId);

        if(!loggedUser && !loggedRoomId) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('roomId', JSON.stringify(roomId));
        }
        console.log("User added to local storage");
        console.log("User added to the room!");
        
        navigate("/chat");
        
      } else {
        // If the document does not exist, log a message
        console.log("No such room exists. Create One....");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   async function findAndJoinRoom() {
  //     console.log("inside find and join room ");
  //   }

  return (
    <>
      <h1 className="text-center mt-6 text-4xl font-bold m-4">
        Welcome to the chat application
      </h1>
      <div className="flex justify-center">
        <div className="mx-20 mt-5">
          <p className="text-lg">Want to create a new room : </p>
          <button
            onClick={() => {
              setRoom("Create");
            }}
            className="ml-14 p-3 border m-3 bg-violet-700 rounded-lg text-white hover:text-lg"
          >
            Create Room
          </button>
        </div>

        <div className="m-5 ">
          <p className="text-lg">Already have a room id : </p>
          <button
            onClick={() => {
              setRoom("Join");
            }}
            className="ml-12 p-3 border m-3 bg-violet-700 rounded-lg text-white hover:text-lg"
          >
            Join Room
          </button>
        </div>
      </div>
      <div className="mx-auto w-96 mt-40">
        {(() => {
          if (room !== null)
            return (
              <CreateRoom
                room={room}
                user={user}
                setRoomId={setRoomId}
                setUser={setUser}
                findAndJoinRoom={findAndJoinRoom}
                createRoom={createRoom}
                roomId={roomId}
              />
            );
        })()}
      </div>
    </>
  );
};

export default Home;
