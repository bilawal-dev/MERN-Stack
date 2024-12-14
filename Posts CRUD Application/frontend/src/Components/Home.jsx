import React, { useEffect, useState } from 'react'
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();

        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/api/posts');
            const data = await response.json();
            setPosts(data);
        }
    }, [])

    function handleAddNewPost() {
        navigate('/createpost');
    }

    return (
        <div className="min-h-screen">
            <h1 className='pt-5 text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>Posts Media</h1>
            {posts.length ? (
                <div className='flex flex-col'>
                    <div className='pt-10 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post} setPosts={setPosts} />
                        ))}
                    </div>

                    <button onClick={handleAddNewPost} className="self-center mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Create A Post
                    </button>
                </div>
            ) : (
                <div className="text-center py-20">
                    <h2 className='text-3xl font-semibold text-gray-300'>No Posts To Show</h2>
                    <p className="mt-4 text-gray-400">Create your first post to get started!</p>
                    <button onClick={handleAddNewPost} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Create Your First Post
                    </button>
                </div>
            )}

        </div>
    )
}