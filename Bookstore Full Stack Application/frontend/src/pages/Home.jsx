import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { MdOutlineAddBox } from 'react-icons/md'
import BooksList from '../components/BooksList'
import { AuthContext } from '../context/authContext'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoading, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isLoading && !user) {
      console.log('navigating,', isLoading, user);
      navigate('/login');
    }

    fetchBooks();

    async function fetchBooks() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
          withCredentials: true
        });
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  }, [isLoading, user])

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100">
      <div className="container mx-auto p-4">
        <header className="text-center py-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to BookStore Manager</h1>
          <p className="text-xl text-blue-600">Streamline your book inventory with ease and efficiency</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-3xl font-semibold text-gray-800'>Books List</h2>
            <Link to={'/create'} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center">
              <MdOutlineAddBox className='text-2xl mr-2' />
              <span>Add Book</span>
            </Link>
          </div>

          {loading ? <Spinner /> : (
            <div className="bg-gray-50 rounded-lg p-4">
              <BooksList books={books} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home