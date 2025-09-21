// App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';

function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path='/register' element={<RegistrationPage/>}/>
      </Routes>
    </div>
  )
 
}

export default App;