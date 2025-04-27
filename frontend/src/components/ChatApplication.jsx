'use client';
import { useState, useEffect, useRef } from 'react';

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
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chat Room</h2>
        {isAdmin && (
          <button
            onClick={toggleChat}
            className={`px-4 py-2 rounded text-white ${
              isChatEnabled 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isChatEnabled ? 'Disable Chat' : 'Enable Chat'}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.username === username
                ? 'ml-auto bg-blue-100'
                : 'bg-gray-100'
            }`}
          >
            <div className="font-semibold text-sm text-gray-600">
              {msg.username}
            </div>
            <div className="mt-1">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        {!isChatEnabled ? (
          <div className="text-center text-gray-500">
            Chat has been disabled by the presenter
          </div>
        ) : (
          <div className="flex gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded resize-none"
              rows="2"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`px-4 py-2 text-white rounded ${
                message.trim()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}