import React from "react";

const CreateRoom = ({
  room,
  roomId,
  user,
  setRoomId,
  setUser,
  createRoom,
  findAndJoinRoom,
}) => {
  // console.log(room)
  const handleClick = () => {
    if(user == '' || roomId == null) return alert("Please fill all fields...")
    if (room === "Create") createRoom();
    else if (room === "Join") findAndJoinRoom(roomId, user);
  };
  return (
    <div className="flex flex-col max-w-md mx-auto p-4 sm:p-6 md:p-8">
      <input
        className="p-2 sm:p-3 md:p-2 rounded-lg border my-4 sm:my-6 md:my-4"
        type="text"
        placeholder="Enter your name..."
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        className="p-2 sm:p-3 md:p-2 rounded-lg border my-4"
        type="number"
        placeholder="Enter room number..."
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="mt-4 sm:mt-6 md:mt-4 p-3 sm:p-2 md:p-3 border bg-violet-700 rounded-lg text-white hover:bg-violet-800 transition-all duration-300"
      >
        {room} Room
      </button>
    </div>
  );
};

export default CreateRoom;
