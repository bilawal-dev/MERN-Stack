import React from 'react'

const BookCard = ({ book }) => {
    return (
        <div className="max-w-sm px-6 py-10 flex flex-col gap-5 rounded-lg shadow-lg bg-gray-800 border border-blue-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{book.title}</h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-300">Author: {book.author}</h5>
            <p className="mb-3 font-normal text-gray-300">Publish Year: {book.publishYear}</p>
            <p className="mb-3 font-normal text-gray-300">Book ID: {book._id}</p>
        </div>
    )
}

export default BookCard