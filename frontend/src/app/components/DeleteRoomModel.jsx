'use client';
import React from "react";

export default function DeleteRoomModal({ isOpen, onClose, onConfirm, roomName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Delete Room</h3>
        <p className="mb-4">
          Are you sure you want to delete "{roomName}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-702"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}