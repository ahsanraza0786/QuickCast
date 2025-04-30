'use client';
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const optionVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

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
      await axios.post("http://localhost:8000/polls/create", {
        question,
        roomCode,
        options, 
      });
      
      // Show success animation
      const successButton = document.getElementById('createButton');
      if (successButton) {
        successButton.classList.add('bg-green-600');
        setTimeout(() => {
          successButton.classList.remove('bg-green-600');
        }, 1000);
      }

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
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Create a Poll
        </h2>
        
        <div className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your question"
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            <AnimatePresence initial={false}>
              {options.map((opt, i) => (
                <motion.div
                  key={i}
                  variants={optionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex gap-2"
                >
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[i] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Option ${i + 1}`}
                  />
                  {options.length > 2 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeOption(i)}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove option"
                    >
                      ×
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Option Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addOption}
            type="button"
            className="w-full py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            + Add Option
          </motion.button>

          {/* Create Poll Button */}
          <motion.button
            id="createButton"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
          >
            Create Poll
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}