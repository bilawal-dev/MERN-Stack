import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';

const BackToHomePage = () => {

    const navigate = useNavigate();

    return (
        <button onClick={() => {navigate('/')}} type="button" className="absolute top-20 left-10 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-2xl py-2.5 px-4 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            <IoMdArrowBack />
        </button>
    )
}

export default BackToHomePage