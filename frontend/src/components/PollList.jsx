'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pollVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export default function PollList({ roomCode, socket }) {
  // Initialize votedPolls from localStorage if available
  const [votedPolls, setVotedPolls] = useState(() => {
    const stored = localStorage.getItem("votedPolls");
    return stored ? JSON.parse(stored) : {};
  });
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');

  // Persist voterId in localStorage
  useEffect(() => {
    let voterId = localStorage.getItem("voterId");
    if (!voterId) {
      voterId = Date.now().toString() + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("voterId", voterId);
    }
  }, []);

  // Persist votedPolls in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
  }, [votedPolls]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/polls/getall/${roomCode}`);
        setPolls(response.data);
      } catch (err) {
        setError('Failed to load polls');
      }
    };

    fetchPolls();

    socket.on('newPoll', (poll) => {
      if (poll.roomCode === roomCode) { // ensure the poll matches the room
        setPolls(prev => [...prev, poll]);
      }
    });

    socket.on('pollUpdated', (updatedPoll) => {
      if (updatedPoll.roomCode === roomCode) {
        setPolls(prev => prev.map(p =>
          p._id === updatedPoll._id ? updatedPoll : p
        ));
      }
    });

    return () => {
      socket.off('newPoll');
      socket.off('pollUpdated');
    };
  }, [roomCode, socket]);

  const vote = (pollId, optionIndex) => {
    const voterId = localStorage.getItem("voterId");
    if (votedPolls[pollId] === undefined) {
      // First vote
      socket.emit('vote', { roomCode, pollId, optionIndex, voterId });
      setVotedPolls(prev => ({ ...prev, [pollId]: optionIndex }));
    } else if (votedPolls[pollId] !== optionIndex) {
      // Change vote
      socket.emit('changeVote', { roomCode, pollId, newOption: optionIndex, voterId });
      setVotedPolls(prev => ({ ...prev, [pollId]: optionIndex }));
    }
    // Otherwise, clicking the same option does nothing.
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Active Polls
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-4 bg-red-50 border border-red-100 text-red-600 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {polls.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              No active polls at the moment
            </motion.div>
          ) : (
            <div className="space-y-4">
              {polls.map(poll => (
                <motion.div
                  key={poll._id}
                  variants={pollVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                  className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {poll.question}
                  </h3>
                  <div className="space-y-3">
                    {poll.options.map((option, index) => {
                      const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
                      const votePercentage = totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0;
                      
                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => vote(poll._id, index)}
                          className={`relative w-full text-left group ${
                            votedPolls[poll._id] === index
                              ? 'ring-2 ring-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="relative z-10 p-4 rounded-lg border border-gray-200 bg-white transition-colors">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${
                                votedPolls[poll._id] === index ? 'text-blue-600' : 'text-gray-900'
                              }`}>
                                {option.text}
                              </span>
                              <span className="text-sm text-gray-500">
                                {option.votes || 0} votes ({votePercentage.toFixed(1)}%)
                              </span>
                            </div>
                            
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${votePercentage}%` }}
                              className={`absolute left-0 top-0 h-full rounded-lg ${
                                votedPolls[poll._id] === index
                                  ? 'bg-blue-50'
                                  : 'bg-gray-50'
                              }`}
                              style={{ zIndex: -1 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}