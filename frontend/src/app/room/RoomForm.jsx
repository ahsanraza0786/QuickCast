export default function RoomForm({ roomId, setRoomId, createRoom, joinRoom }) {
    return (
      <div className="space-y-2">
        <button onClick={createRoom} className="bg-green-500 text-white p-2 w-full">Create Room</button>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" className="border p-2 w-full" />
        <button onClick={joinRoom} className="bg-purple-500 text-white p-2 w-full">Join Room</button>
      </div>
    );
  }