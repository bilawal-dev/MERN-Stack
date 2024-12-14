import React from 'react'
import { useNavigate } from 'react-router-dom';

export const PostCard = ({ post, setPosts }) => {
  const navigate = useNavigate();

  async function deletePost() {
    const id = post._id;
    console.log(id);
    await fetch(`http://localhost:3000/api/posts/delete/${id}`)
    setPosts((prev) => prev.filter((item) => item._id !== id));
  }

  function navigateUpdatePost() {
    const id = post._id;
    navigate(`/updatepost/${id}`)
  }

  return (
    <div className='bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105'>
      <div className='p-6 space-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold text-blue-400'>@{post.username}</h1>
          <div className='flex gap-2'>
            <button onClick={navigateUpdatePost} className='text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button onClick={deletePost} className='text-gray-400 hover:text-red-400 transition duration-300 ease-in-out'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <p className='text-gray-300'>{post.content}</p>
      </div>
    </div>
  )
}