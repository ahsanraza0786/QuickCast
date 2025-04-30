'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { io } from "socket.io-client";
import ChatApplication from '@/components/ChatApplication';
import PollCreator from '@/components/PollCreater';
import PollList from '@/components/PollList';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const socket = io("http://localhost:8000");

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
      const { data: publicRoom } = await axios.get(`http://localhost:8000/rooms/${code}/check`);
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
          const { data: detailedRoom } = await axios.get(`http://localhost:8000/rooms/${code}/details`, config);
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
      const { data } = await axios.post(`http://localhost:8000/rooms/join/${code}`, {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (error)
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50"
      >
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-600 font-medium">{error}</div>
        </div>
      </motion.div>
    );

  if (!room)
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100"
      >
        <div className="text-slate-600 font-medium">Room not found</div>
      </motion.div>
    );

  if (showJoinForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="max-w-md w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Join Room: {room.name}
          </h2>
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinGuest();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={joinData.username}
                onChange={(e) => setJoinData({ ...joinData, username: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>
            {room.isPrivate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  value={joinData.password}
                  onChange={(e) => setJoinData({ ...joinData, password: e.target.value })}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter room password"
                />
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            >
              Join Room
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {room.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Room Code: {code}
                </span>
                <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {isAdmin
                    ? 'Presenter: ' + JSON.parse(localStorage.getItem('presenter'))?.name
                    : 'Guest: ' + localStorage.getItem('guestName')}
                </span>
              </div>
            </div>
            {isAdmin && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-indigo-50 p-4 rounded-xl"
              >
                <h3 className="text-sm font-medium text-indigo-700 mb-2">
                  Participants ({participants.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {participants.map((p, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 bg-white text-sm text-indigo-600 rounded-full shadow-sm"
                    >
                      {p.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ChatApplication roomCode={code} isAdmin={isAdmin} socket={socket} />
          </div>
          <div>
            {isAdmin ? (
              <PollCreator roomCode={code} socket={socket} />
            ) : (
              <PollList roomCode={code} socket={socket} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}