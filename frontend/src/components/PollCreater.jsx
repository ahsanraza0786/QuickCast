'use client';
import { useState } from "react";
import axios from "axios";

export default function PollCreator({ roomCode, socket }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleCreate = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (options.some(opt => !opt.trim())) {
      alert("Please fill in all options");
      return;
    }

    try {
      // Send options as an array of strings and include roomCode in the payload
      await axios.post("http://localhost:5000/api/polls/create", {
        question,
        roomCode,
        options, 
      });
      alert("Poll Created!");
      setQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll: " + err.message);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Create a Poll
        </h2>
        
        <div className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your question"
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input 
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[i] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${i + 1}`}
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(i)}
                    className="px-2 py-2 text-red-600 hover:text-red-800"
                    title="Remove option"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Option Button */}
          <button
            onClick={addOption}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-301 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Option
          </button>

          {/* Create Poll Button */}
          <button
            onClick={handleCreate}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}