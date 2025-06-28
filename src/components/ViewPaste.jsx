import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center text-red-400 mt-10 text-xl">
        Paste not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-indigo-400 text-center">
          View Note
        </h1>

        <input
          className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />

        <textarea
          className="w-full min-h-[400px] p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          value={paste.content}
          placeholder="Enter content here"
          disabled
        />

        <p className="text-right text-gray-400 text-sm italic">
          Created: {new Date(paste.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ViewPaste;
