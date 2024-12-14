import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../context/authContext';

const CreateBook = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if(isLoading){
      return;
    }
    
    if(!isLoading && !user){
      navigate('/login');
    }
  }, [isLoading])

  const [data, setData] = useState({ title: '', author: '', publishYear: '' });

  function handleInputChange(event) {
    setData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/books`, data, {
        withCredentials: true
      });
      enqueueSnackbar('New Book Added To Store', { variant: 'success' });
      setData({ title: '', author: '', publishYear: '' });
      navigate('/');
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar('Failed To Add Book To Store', { variant: 'error' });
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Add New Book</h1>
          <p className="text-xl text-blue-600">Expand your book collection with ease</p>
        </div>

        <section className='w-full flex flex-col justify-center items-center mt-6'>
          <form onSubmit={handleSubmit} className="bg-white max-w-md mx-auto h-2/3 w-full flex flex-col justify-between p-5 rounded-md">

            <div className="relative z-0 w-full mb-5 group">
              <input type='text' value={data.title} onChange={handleInputChange} name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1.5px] border-slate-200 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Title</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input type='text' value={data.author} onChange={handleInputChange} name="author" id="author" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1.5px] border-slate-200 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Author</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input type='number' value={data.publishYear} onChange={handleInputChange} name="publishYear" id="publishYear" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1.5px] border-slate-200 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="publishYear" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Publish Year</label>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Register Book</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default CreateBook