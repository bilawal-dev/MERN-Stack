import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import { SnackbarProvider } from 'notistack';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create' element={<CreateBook />} />
              <Route path='/details/:id' element={<ShowBook />} />
              <Route path='/edit/:id' element={<EditBook />} />
              <Route path='/delete/:id' element={<DeleteBook />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App;