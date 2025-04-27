'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function ChatApplication({ roomCode, isAdmin, socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const username = isAdmin ? 
    JSON.parse(localStorage.getItem('presenter'))?.name : 
    localStorage.getItem('guestName');

  useEffect(() => {
    if (!socket || !username) return;

    // Join room and get initial state
    socket.emit('joinRoom', { roomCode, username });

    // Listen for messages
    socket.on('previousMessages', (previousMessages) => {
      if (Array.isArray(previousMessages)) {
        setMessages(previousMessages);
      }
    });

    socket.on('newMessage', (newMessage) => {
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
      }
    });

    socket.on('chatToggled', (enabled) => {
      setIsChatEnabled(enabled);
    });

    // Cleanup socket listeners
    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
      socket.off('chatToggled');
      socket.emit('leaveRoom', { roomCode, username });
    };
  }, [roomCode, socket, username]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && isChatEnabled && username && socket) {
      socket.emit('sendMessage', { 
        roomCode, 
        message: message.trim(), 
        username 
      });
      setMessage('');
    }
  };

  const toggleChat = () => {
    if (isAdmin && socket) {
      socket.emit('toggleChat', { roomCode });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[600px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/90">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Chat Room
        </h2>
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleChat}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
              isChatEnabled 
                ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700' 
                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
            }`}
          >
            {isChatEnabled ? 'Disable Chat' : 'Enable Chat'}
          </motion.button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-3 rounded-2xl max-w-[80%] shadow-sm ${
                msg.username === username
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-auto'
                  : 'bg-white border border-gray-100'
              }`}>
                <div className={`font-medium text-sm ${
                  msg.username === username ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {msg.username}
                </div>
                <div className="mt-1 text-sm">{msg.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white/90">
        {!isChatEnabled ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 bg-gray-50/50 p-3 rounded-lg"
          >
            Chat has been disabled by the presenter
          </motion.div>
        ) : (
          <div className="flex gap-2">
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="2"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`px-6 rounded-xl font-medium transition-all ${
                message.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Send
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}