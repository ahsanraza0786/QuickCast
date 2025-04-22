'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function RoomPage() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isPresenter, setIsPresenter] = useState(false);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);

  const createPresenterRoom = async () => {
    const res = await axios.post('http://localhost:3000/create-room');
    setRoomId(res.data.roomId);
    setIsPresenter(true);
    setJoined(true);
    socket.emit('join-room', { roomId: res.data.roomId, username: 'Presenter' });
  };

  const joinRoomAsClient = () => {
    if (!roomId || !username) return alert('Enter both room ID and username');
    socket.emit('join-room', { roomId, username });
    setJoined(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('send-message', {
        roomId,
        username: isPresenter ? 'Presenter' : username,
        message: newMessage,
      });
      setNewMessage('');
    }
  };

  useEffect(() => {
    socket.on('user-joined', (user) => {
      setMessages((prev) => [...prev, `${user} joined the room`]);
    });

    socket.on('receive-message', ({ username, message }) => {
      setMessages((prev) => [...prev, `${username}: ${message}`]);
    });

    socket.on('user-list', (list) => {
      setUsers(list);
    });

    socket.on('room-full', () => {
      alert('Room is full!');
    });

    return () => {
      socket.off('user-joined');
      socket.off('receive-message');
      socket.off('user-list');
      socket.off('room-full');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {!joined ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create or Join a Room
          </h2>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
            onClick={createPresenterRoom}
          >
            Create Presenter Room
          </button>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium transition"
            onClick={joinRoomAsClient}
          >
            Join as Client
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {isPresenter ? '🎤 Presenter View' : '👤 Client View'}
            </h2>
            <h3 className="text-md font-medium text-gray-500">Room: {roomId}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="bg-gray-100 p-4 rounded h-60 overflow-y-scroll border">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-1 text-sm text-gray-700">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="flex mt-4 gap-2">
                <input
                  className="flex-1 border border-gray-300 p-2 rounded"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Users in room:</h4>
              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                {users.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
