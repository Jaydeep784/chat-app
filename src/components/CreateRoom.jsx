import React from 'react'

const CreateRoom = ({room, roomId, user, setRoomId, setUser, createRoom, findAndJoinRoom}) => {
    // console.log(room)
    const handleClick = () =>{
        if(room === 'Create') createRoom();
        else if(room === 'Join') findAndJoinRoom(roomId, user);
    }
  return (
    <div className='flex flex-col '>
        <input className='p-2 rounded-lg border my-6' type="text" placeholder='Enter your name...' onChange={((e) => setUser(e.target.value))} />
        <input className='p-2 border rounded-lg' type="number" placeholder='Enter room number...' onChange={(e) => setRoomId(e.target.value)}/>
        <button onClick={handleClick} className='mt-6 p-3 border m-3 bg-violet-700 rounded-lg text-white'>{room} Room</button>
    </div>
  )
}

export default CreateRoom