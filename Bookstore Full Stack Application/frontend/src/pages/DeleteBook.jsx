import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import BookCard from '../components/BookCard';
import { FaTrash } from "react-icons/fa";
import { useSnackbar } from 'notistack';
import { AuthContext } from '../context/authContext';

const DeleteBook = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  const { user, isLoading } = useContext(AuthContext);


  useEffect(() => {
    if(isLoading){
      return;
    }

    if (!isLoading && !user) {
      navigate('/login');
    }

    fetchBook();

    async function fetchBook() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        withCredentials: true
      });

      setLoading(false);
      setBook(data.book);
    }
  }, [isLoading])

  async function handleDeleteBook() {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        withCredentials: true
      });
      enqueueSnackbar('Book Successfully Deleted From Store', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Failed To Delete The Book', { variant: 'error' });
      console.log(error.message);
    }

  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl flex flex-col items-center mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Delete Book</h1>
          <p className="text-xl text-blue-600">Remove the selected book from your collection</p>
        </div>

        <div className="mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : (
            book && <BookCard book={book} />
          )}
        </div>

        {(!loading && book) && (
          <button type="button" onClick={handleDeleteBook} className="mt-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center me-2 bg-red-600 hover:bg-red-700">
            <FaTrash />
            <span>Delete Book</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default DeleteBook