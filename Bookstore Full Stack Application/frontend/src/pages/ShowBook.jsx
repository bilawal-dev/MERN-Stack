import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/authContext';

const ShowBook = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  const { user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(isLoading){
      return;
    }

    if(!isLoading && !user){
      navigate('/login');
    }

    console.log("LORA");

    fetchBook();

    async function fetchBook() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
          withCredentials: true,  // Include cookies in the request
        });
        setLoading(false);
        setBook(data.book);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [id, isLoading])

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl flex flex-col items-center mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Book Details</h1>
          <p className="text-xl text-blue-600">Explore the specifics of your selected book</p>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : (
            book && <BookCard book={book} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowBook