import React from 'react'
import { Home } from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import UpdatePost from './Components/UpdatePost';

const App = () => {
  return (
    <div className='w-screen h-screen bg-black text-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/createpost' element={<CreatePost />}></Route>
          <Route path='/updatepost/:id' element={<UpdatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;