import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success('Paste deleted!');
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl font-bold text-center text-indigo-400 mb-10">Your Notes</h1>

      <div className="flex justify-center mb-8">
        <input
          type="search"
          placeholder="Search by title..."
          className="p-3 rounded-lg bg-gray-900 text-white w-full max-w-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id || paste.id}
              className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:shadow-indigo-600 transition-all"
            >
              <div className="text-2xl font-semibold text-indigo-300">
                {paste.title}
              </div>

              <div className="mt-3 text-gray-300 whitespace-pre-wrap break-words">
                {paste.content}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-between items-center text-sm text-gray-400">
                <div className="flex gap-3 flex-wrap">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white transition"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/pastes/${paste?._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      const shareableLink = `${window.location.origin}/pastes/${paste?._id}`;
                      navigator.clipboard.writeText(shareableLink);
                      toast.success('Link copied to clipboard!');
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-black transition"
                  >
                    Share
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Content copied!');
                    }}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-xs text-right w-full sm:w-auto mt-3 sm:mt-0">
                  <span className="italic">Created: {new Date(paste.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-indigo-400">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
