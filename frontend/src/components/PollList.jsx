'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:5000/api/polls/getall/${roomCode}`);
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
    <div className="space-y-4 mt-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <h1 className="text-2xl font-bold">Polls</h1>
      {polls.length === 0 ? (
        <p className="text-gray-500 text-center">No polls available</p>
      ) : (
        polls.map(poll => (
          <div key={poll._id} className="p-4 border rounded">
            <h3 className="font-bold mb-2">{poll.question}</h3>
            <div className="space-y-2">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => vote(poll._id, index)}
                  className={`w-full p-2 text-left rounded border ${
                    votedPolls[poll._id] === index
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option.text}
                  {typeof option.votes === 'number' && (
                    <span className="float-right">
                      {option.votes} votes
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}