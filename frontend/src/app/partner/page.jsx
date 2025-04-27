'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Presenter() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchRooms();
  }, []);

  const checkAuthAndFetchRooms = async () => {
    const token = localStorage.getItem('token');
    const presenter = localStorage.getItem('presenter');

    if (!token || !presenter) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/rooms/presenter', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('presenter');
        router.push('/login');
      } else {
        setError('Failed to fetch rooms');
        setLoading(false);
      }
    }
  };

  const createRoom = async () => {
    try {
      if (!newRoomName.trim()) {
        setError('Room name is required');
        return;
      }

      const token = localStorage.getItem('token');
      const presenter = JSON.parse(localStorage.getItem('presenter'));

      const response = await axios.post('http://localhost:5000/api/rooms/create', 
        { 
          name: newRoomName,
          presenterId: presenter.id,
          isPrivate: isPrivate,
          password: roomPassword
        },
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRooms(prevRooms => [...prevRooms, response.data]);
      setNewRoomName('');
      setRoomPassword('');
      setIsPrivate(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room');
    }
  };

  const enterRoom = (roomCode) => {
    try {
      router.push(`/room/${roomCode}`);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to enter room');
    }
  };

  const deleteRoom = async (roomCode) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/rooms/${roomCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(prevRooms => prevRooms.filter(room => room.code !== roomCode));
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Presenter Dashboard</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-402 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Room</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="Room Name"
          />
          <button
            onClick={createRoom}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Room
          </button>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="mr-2"
            />
            Make Room Private
          </label>
          {isPrivate && (
            <input
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder="Room Password"
              className="mt-2 px-3 py-2 border rounded"
              required
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map(room => (
          <div key={room._id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-600">Code: {room.code}</p>
                {room.isPrivate ? (
                  <p className="text-green-600">Private</p>
                ) : (
                  <p className="text-blue-600">Public</p>
                )}
              </div>
              <button
                onClick={() => deleteRoom(room.code)}
                className="p-2 text-red-600 hover:text-red-800"
                title="Delete Room"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push(`/room/${room.code}`)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Enter Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}