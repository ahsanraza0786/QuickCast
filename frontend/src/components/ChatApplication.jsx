'use client';
import { useState, useEffect, useRef } from 'react';

const ChatApplication = ({ roomCode, isAdmin, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('chatToggled', (enabled) => {
      setIsChatEnabled(enabled);
    });

    return () => {
      socket.off('newMessage');
      socket.off('chatToggled');
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isChatEnabled) return;

    const messageData = {
      roomCode,
      message: newMessage.trim(),
      sender: isAdmin ? 'Presenter' : localStorage.getItem('guestName'),
      timestamp: new Date()
    };
    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  const toggleChat = () => {
    if (isAdmin) {
      socket.emit('toggleChat', { roomCode });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div className="flex justify-between items-center p-3 bg-white border-b">
        <h3 className="font-medium text-black">Chat</h3>
        {isAdmin && (
          <button
            onClick={toggleChat}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isChatEnabled 
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isChatEnabled ? 'Disable Chat' : 'Enable Chat'}
          </button>
        )}
      </div>
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: 'calc(100vh - 15rem)' }}
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex flex-col ${
              msg.username === (isAdmin ? 'Presenter' : localStorage.getItem('guestName'))
                ? 'items-end'
                : 'items-start'
            }`}
          >
            <div className={`max-w-[85%] rounded-lg px-4 py-2 ${
              msg.username === (isAdmin ? 'Presenter' : localStorage.getItem('guestName'))
                ? 'bg-blue-500 text-white'
                : 'bg-white border shadow-sm'
            }`}>
              <div className="text-xs font-medium mb-1">
                {msg.username === 'System' ? msg.username : msg.username || msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              <p className="break-words">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form 
        onSubmit={sendMessage}
        className="p-3 bg-white border-t"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isChatEnabled ? "Type a message..." : "Chat is disabled"}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isChatEnabled}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !isChatEnabled}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatApplication;