'use client';
import { useState, useEffect } from 'react';

const PollList = ({ roomCode, socket }) => {
  const [activePoll, setActivePoll] = useState(null);
  const [votedOption, setVotedOption] = useState(null);
  const [previousPolls, setPreviousPolls] = useState([]);
  const [voterId] = useState(() => {
    const stored = localStorage.getItem('guestId');
    return stored || Math.random().toString(36).substr(2, 9);
  });

  useEffect(() => {
    if (!localStorage.getItem('guestId')) {
      localStorage.setItem('guestId', voterId);
    }

    socket.on('pollStarted', (pollData) => {
      setActivePoll({
        ...pollData,
        totalVotes: pollData.options.reduce((sum, opt) => sum + opt.votes, 0)
      });
      setVotedOption(null);
    });

    socket.on('pollUpdated', (pollData) => {
      setActivePoll({
        ...pollData,
        totalVotes: pollData.options.reduce((sum, opt) => sum + opt.votes, 0)
      });
    });

    socket.on('pollEnded', (pollData) => {
      if (pollData) {
        setPreviousPolls(prev => [pollData, ...prev]);
      }
      setActivePoll(null);
      setVotedOption(null);
    });

    return () => {
      socket.off('pollStarted');
      socket.off('pollUpdated');
      socket.off('pollEnded');
    };
  }, [socket, voterId]);

  const submitVote = (optionIndex) => {
    if (votedOption === optionIndex) return;
    
    if (votedOption !== null) {
      // Change vote
      socket.emit('changeVote', {
        roomCode,
        pollId: activePoll._id,
        newOption: optionIndex,
        voterId
      });
    } else {
      // New vote
      socket.emit('vote', {
        roomCode,
        pollId: activePoll._id,
        optionIndex,
        voterId
      });
    }
    
    setVotedOption(optionIndex);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activePoll && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">{activePoll.question}</h3>
            <div className="space-y-2">
              {activePoll.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => submitVote(idx)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    votedOption === idx
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm'
                  } ${
                    votedOption !== null ? 'relative overflow-hidden' : ''
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-medium text-sm">{option.text}</span>
                    {votedOption !== null && (
                      <span className="text-sm text-gray-500">
                        {option.votes} votes ({Math.round((option.votes / Math.max(activePoll.totalVotes, 1)) * 100)}%)
                      </span>
                    )}
                  </div>
                  {votedOption !== null && (
                    <div 
                      className="absolute inset-0 bg-blue-500 opacity-10 transition-all duration-500"
                      style={{
                        width: `${Math.round((option.votes / Math.max(activePoll.totalVotes, 1)) * 100)}%`
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 text-center text-sm text-gray-500">
              {votedOption !== null ? (
                <p>
                  Total votes: {activePoll.totalVotes}
                  <span className="text-blue-600 ml-2 cursor-pointer" onClick={() => setVotedOption(null)}>
                    Change your vote
                  </span>
                </p>
              ) : (
                <p>Vote to see results</p>
              )}
            </div>
          </div>
        )}

        {!activePoll && (
          <div className="text-center py-6 text-gray-500">
            No active polls at the moment
          </div>
        )}

        {previousPolls.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Previous Polls</h3>
            <div className="space-y-3">
              {previousPolls.map((poll, pollIdx) => (
                <div key={pollIdx} className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">{poll.question}</h4>
                  <div className="space-y-2">
                    {poll.options.map((option, optIdx) => (
                      <div key={optIdx} className="bg-gray-50 rounded-lg p-3 relative overflow-hidden">
                        <div className="flex justify-between items-center relative z-10">
                          <span className="text-sm font-medium">{option.text}</span>
                          <span className="text-sm text-gray-500">
                            {option.votes} votes ({Math.round((option.votes / Math.max(poll.totalVotes, 1)) * 100)}%)
                          </span>
                        </div>
                        <div 
                          className="absolute inset-0 bg-blue-500 opacity-10"
                          style={{
                            width: `${Math.round((option.votes / Math.max(poll.totalVotes, 1)) * 100)}%`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center text-sm text-gray-500">
                    Total votes: {poll.totalVotes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollList;