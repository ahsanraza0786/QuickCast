import React from 'react';

const Room = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Room Header */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h2 className=" text-blue-500 text-2xl font-bold">QuickCast Room</h2>
          <p className="text-yellow-500">Meeting ID: 123-456-789</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
          Join Meeting
        </button>
      </div>

      {/* Main Content with Chat */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Participants */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-48 rounded-2xl shadow-md flex items-center justify-center text-gray-600 text-xl"
            >
              Participant {i + 1}
            </div>
          ))}
        </div>

        {/* Chat Sidebar */}
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl">
            <h3 className="text-lg font-semibold">Chat</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
            <div className="bg-gray-500 p-2 rounded-md">👋 Hello everyone!</div>
            <div className="bg-gray-500 p-2 rounded-md">🙋 Question: How do we share screen?</div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text "
              placeholder=" Type a message..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white-300 px-4 py-2 rounded-xl hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
