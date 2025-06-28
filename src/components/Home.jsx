import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Notes Manager
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between mb-6">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {pasteId ? 'Update Note' : 'Create Note'}
        </button>
      </div>

      <textarea
        className="w-full h-[300px] p-4 rounded-lg bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500"
        placeholder="Enter content here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  );
};

export default Home;
