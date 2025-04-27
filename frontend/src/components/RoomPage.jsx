/*'use client';
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
*/

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function RoomPage() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isPresenter, setIsPresenter] = useState(false);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollData, setPollData] = useState(null);

  const createPresenterRoom = async () => {
    const res = await axios.post('http://localhost:5000/create-room');
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

  const createPoll = () => {
    if (!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())) {
      return alert('Enter a question and all options.');
    }

    const poll = {
      question: pollQuestion,
      options: pollOptions,
      votes: Array(pollOptions.length).fill(0),
    };

    socket.emit('create-poll', { roomId, poll });
    setPollData(poll);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  const vote = (index) => {
    if (!isPresenter) {
      socket.emit('vote', { roomId, optionIndex: index });
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

    socket.on('poll-updated', (poll) => {
      setPollData(poll);
    });

    return () => {
      socket.off('user-joined');
      socket.off('receive-message');
      socket.off('user-list');
      socket.off('room-full');
      socket.off('poll-updated');
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
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl space-y-6">
          <div className="flex justify-between items-center">
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
              <h4 className="font-semibold text-gray-700 mb-2">Users in Room:</h4>
              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                {users.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          </div>

          {isPresenter && (
            <div>
              <h3 className="text-lg font-bold mt-4">Create a Poll</h3>
              <input
                className="w-full border p-2 mt-2 rounded"
                placeholder="Poll question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
              {pollOptions.map((opt, i) => (
                <input
                  key={i}
                  className="w-full border p-2 mt-2 rounded"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...pollOptions];
                    newOptions[i] = e.target.value;
                    setPollOptions(newOptions);
                  }}
                />
              ))}
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={createPoll}
              >
                Launch Poll
              </button>
            </div>
          )}

          {pollData && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">{pollData.question}</h3>
              <ul className="mt-2 space-y-2">
                {pollData.options.map((opt, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border p-2 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => vote(i)}
                  >
                    <span>{opt}</span>
                    <span className="text-sm text-gray-500">
                      {pollData.votes[i]} vote(s)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

