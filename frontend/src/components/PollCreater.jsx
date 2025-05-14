'use client';
import { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { toast } from 'react-hot-toast';

const PollCreator = ({ roomCode, socket }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState(30);
  const [activePoll, setActivePoll] = useState(null);
  const [pollStats, setPollStats] = useState(null);
  const [previousPolls, setPreviousPolls] = useState([]);

  useEffect(() => {
    // Fetch existing polls when component mounts
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/polls/getall/${roomCode}`)
      .then(res => res.json())
      .then(polls => setPreviousPolls(polls))
      .catch(err => console.error('Error fetching polls:', err));

    socket.on('pollStarted', (pollData) => {
      setActivePoll(pollData);
      setPollStats({
        totalVotes: 0,
        options: pollData.options.map(opt => ({ ...opt, votes: 0, voters: [] }))
      });
    });

    socket.on('pollUpdated', (pollData) => {
      setPollStats({
        totalVotes: pollData.options.reduce((sum, opt) => sum + opt.votes, 0),
        options: pollData.options
      });
    });

    socket.on('pollEnded', (pollData) => {
      if (pollData) {
        setPreviousPolls(prev => [pollData, ...prev]);
      }
      setActivePoll(null);
      setPollStats(null);
    });

    return () => {
      socket.off('pollStarted');
      socket.off('pollUpdated');
      socket.off('pollEnded');
    };
  }, [socket, roomCode]);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const startPoll = () => {
    if (!question.trim() || options.some(opt => !opt.trim())) {
      toast.error('Please fill all fields');
      return;
    }

    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      toast.error('Add at least 2 options');
      return;
    }

    const pollData = {
      roomCode,
      question: question.trim(),
      options: validOptions.map(opt => ({ text: opt.trim() })), // Correct structure to match backend
      duration
    };

    socket.emit('startPoll', pollData);
    setQuestion('');
    setOptions(['', '']);
  };

  const endPoll = () => {
    socket.emit('endPoll', { roomCode });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Active Poll Section */}
        {activePoll && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Active Poll</h3>
                <p className="text-sm text-gray-500 mt-1">{activePoll.question}</p>
              </div>
              <button
                onClick={endPoll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                End Poll
              </button>
            </div>
            
            {pollStats && (
              <div className="space-y-3">
                {pollStats.options.map((option, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{option.text}</span>
                      <span className="text-sm text-gray-500">
                        {option.votes} votes ({Math.round((option.votes / Math.max(pollStats.totalVotes, 1)) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.round((option.votes / Math.max(pollStats.totalVotes, 1)) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-2 text-sm text-gray-500 text-center">
                  Total votes: {pollStats.totalVotes}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create New Poll Section */}
        {!activePoll && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Create New Poll</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                <div className="space-y-2">
                  {options.map((option, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {options.length < 4 && (
                  <button
                    onClick={addOption}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Option
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={90}>1.5 minutes</option>
                  <option value={120}>2 minutes</option>
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>

              <button
                onClick={startPoll}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Poll
              </button>
            </div>
          </div>
        )}

        {/* Previous Polls Section */}
        {previousPolls.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Previous Polls</h3>
            <div className="space-y-4">
              {previousPolls.map((poll, pollIdx) => (
                <div key={pollIdx} className="border rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">{poll.question}</h4>
                  <div className="space-y-2">
                    {poll.options.map((option, optIdx) => (
                      <div key={optIdx} className="bg-gray-50 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{option.text}</span>
                          <span className="text-xs text-gray-500">
                            {option.votes} votes ({Math.round((option.votes / Math.max(poll.options.reduce((sum, opt) => sum + opt.votes, 0), 1)) * 100)}%)
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${Math.round((option.votes / Math.max(poll.options.reduce((sum, opt) => sum + opt.votes, 0), 1)) * 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-right">
                    Total votes: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}
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

export default PollCreator;