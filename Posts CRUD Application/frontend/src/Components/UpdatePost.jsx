import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const [form, setForm] = useState({username: '', content: ''});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();

        async function fetchPost(){
            const { id } = params;
            const response = await fetch(`http://localhost:3000/api/posts/${id}`)
            const data = await response.json();
            console.log(data);
            setForm({username: data.username, content: data.content});
        }
    }, [params])

    function handleInputChange(event){
        setForm((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }

    async function handleFormSubmit(event){
        event.preventDefault();
        const { id } = params;
        const response = await fetch(`http://localhost:3000/api/posts/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json();
        setForm({username: '', content: ''})
        navigate('/');
    }

    return (
        <div className="pt-5 max-w-2xl mx-auto">
            <h1 className='text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>Update Post</h1>
            <form onSubmit={handleFormSubmit} className='space-y-6'>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        id="username"
                        name='username'
                        value={'@' + form.username}
                        onChange={handleInputChange}
                        disabled={true} //CAN'T CHANGE ITS VALUE READ ONLY
                        required
                        className='mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded-md text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300">Content</label>
                    <textarea
                        id="content"
                        name='content'
                        value={form.content}
                        onChange={handleInputChange}
                        required
                        placeholder='Enter Content'
                        rows={4}
                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                </div>
                <div>
                    <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105'>
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePost