'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { io } from "socket.io-client";
import ChatApplication from '@/app/components/ChatApplication';
import PollCreator from '@/app/components/PollCreator';
import PollList from '@/app/components/PollList';

const socket = io("http://localhost:5000");

export default function Room() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinData, setJoinData] = useState({ username: '', password: '' });
  const [participants, setParticipants] = useState([]);
  const router = useRouter();
  const params = useParams();
  const code = params?.code;

  useEffect(() => {
    if (!code) {
      router.push('/');
      return;
    }
    checkRoomAccess();
  }, [code]);

  const checkRoomAccess = async () => {
    try {
      // First, check room public info
      const { data: publicRoom } = await axios.get(`http://localhost:5000/api/rooms/${code}/check`);
      if (!publicRoom) {
        setError('Room not found');
        setLoading(false);
        return;
      }
      setRoom(publicRoom);

      // Check if guest is already logged in or if presenter token exists
      const token = localStorage.getItem('token');
      const presenter = localStorage.getItem('presenter');
      const guestName = localStorage.getItem('guestName');

      if (token && presenter) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data: detailedRoom } = await axios.get(`http://localhost:5000/api/rooms/${code}/details`, config);
          // Confirm presenter identity
          const parsedPresenter = JSON.parse(presenter);
          if (detailedRoom.presenter === parsedPresenter.id || detailedRoom.presenter === parsedPresenter._id) {
            setIsAdmin(true);
            setRoom(detailedRoom);
            if (detailedRoom.participants) {
              setParticipants(detailedRoom.participants);
            }
          }
        } catch (authErr) {
          console.error('Presenter auth error:', authErr.response?.data);
          setIsAdmin(false);
        }
      } else if (!guestName) {
        // New user who is a guest: show join form.
        setShowJoinForm(true);
      }
      setLoading(false);
    } catch (err) {
      console.error('Room access error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to access room');
      setLoading(false);
    }
  };

  const handleJoinGuest = async () => {
    setError('');
    try {
      const { data } = await axios.post(`http://localhost:5000/api/rooms/join/${code}`, {
        username: joinData.username,
        password: joinData.password
      });
      // Save the guest name properly
      localStorage.setItem('guestName', joinData.username.trim());
      setRoom(data);
      setShowJoinForm(false);
      setIsAdmin(false);
      socket.emit('joinRoom', { roomCode: code, username: joinData.username.trim() });
    } catch (err) {
      console.error('Join room error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to join room');
    }
  };

  if (loading)
    return <div className="text-center p-4">Loading...</div>;
  if (error)
    return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!room)
    return <div className="text-center p-4">Room not found</div>;

  if (showJoinForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Join Room: {room.name}</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinGuest();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                value={joinData.username}
                onChange={(e) => setJoinData({ ...joinData, username: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="Enter your name"
              />
            </div>
            {room.isPrivate && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Password</label>
                <input
                  type="password"
                  value={joinData.password}
                  onChange={(e) => setJoinData({ ...joinData, password: e.target.value })}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  placeholder="Enter room password"
                />
              </div>
            )}
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{room.name}</h1>
      <p className="text-gray-600">Room Code: {code}</p>
      <p className="text-sm">
        {isAdmin
          ? 'Presenter: ' + JSON.parse(localStorage.getItem('presenter'))?.name
          : 'Guest: ' + localStorage.getItem('guestName')}
      </p>
      <ChatApplication roomCode={code} isAdmin={isAdmin} socket={socket} />
      {isAdmin ? <PollCreator roomCode={code} socket={socket} /> : <PollList roomCode={code} socket={socket} />}
      {isAdmin && participants && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Participants ({participants.length})</h2>
          {participants.map((p, i) => (
            <div key={i}>{p.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}