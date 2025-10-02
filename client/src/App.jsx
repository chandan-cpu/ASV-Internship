// App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import Login from './components/Login';

function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
 
}

export default App;