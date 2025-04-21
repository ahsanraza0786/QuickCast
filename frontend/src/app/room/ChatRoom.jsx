export default function ChatRoom({ roomId, username, message, setMessage, messages, sendMessage }) {
    return (
      <div>
        <h2 className="font-semibold mb-2">Room: {roomId}</h2>
        <div className="border p-2 h-48 overflow-y-auto mb-2 bg-gray-100">
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="border p-2 flex-1"
          />
          <button onClick={sendMessage} className="bg-blue-600 text-white p-2">Send</button>
        </div>
      </div>
    );
  }