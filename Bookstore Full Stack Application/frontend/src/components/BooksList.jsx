import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BooksList = ({ books }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-blue-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Book Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Publish Year
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {index + 1}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {book.title}
                            </th>
                            <td className="px-6 py-4">
                                {book.author}
                            </td>
                            <td className="px-6 py-4">
                                {book.publishYear}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3 text-xl">
                                    <Link to={`details/${book._id}`} className="text-blue-600 hover:text-blue-800">
                                        <BsInfoCircle />
                                    </Link>
                                    <Link to={`edit/${book._id}`} className="text-green-600 hover:text-green-800">
                                        <AiOutlineEdit />
                                    </Link>
                                    <Link to={`delete/${book._id}`} className="text-red-600 hover:text-red-800">
                                        <MdOutlineDelete />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BooksList