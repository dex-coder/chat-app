import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';


//connectiong to the backend socket.io
const socket = io.connect("http://localhost:3001")

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  //joining room function
  const joinRoom = () => {
    if(userName !== '' && room !== ''){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
{!showChat ? (
     <div className='joinChatContainer'>
     <input
      type="text"
      placeholder='jhonn..'
      onChange={(event) => {
        setUserName(event.target.value)
      }}
      />

<input
      type="text"
      placeholder='room..'
      onChange={(event) => {
        setRoom(event.target.value)
      }}
      /> 
      <button onClick={joinRoom} >Submit</button>
     </div>
) : (

     <Chat socket={socket} username={userName} room={room} />
)}
    </div>
  );
}

export default App;
