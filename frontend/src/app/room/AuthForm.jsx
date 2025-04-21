export default function AuthForm({ username, setUsername, authMode, setAuthMode, handleAuth }) {
    return (
      <div className="space-y-2">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full" />
        <button onClick={handleAuth} className="bg-blue-500 text-white p-2 w-full">
          {authMode === 'login' ? 'Login' : 'Register'}
        </button>
        <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-blue-500 underline">
          Switch to {authMode === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
    );
  }
  
  // frontend/src/components/RoomForm.js
  export default function RoomForm({ roomId, setRoomId, createRoom, joinRoom }) {
    return (
      <div className="space-y-2">
        <button onClick={createRoom} className="bg-green-500 text-white p-2 w-full">Create Room</button>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" className="border p-2 w-full" />
        <button onClick={joinRoom} className="bg-purple-500 text-white p-2 w-full">Join Room</button>
      </div>
    );
  }