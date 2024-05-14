import { useState } from 'react'
import {Routes , Route} from 'react-router-dom';
import {Box} from '@mui/material'
import Home from './pages/Home';
import UrlRedirector from './pages/Urlredirecter';
import './App.css';
function App() {

  return (
    <Box>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/:id" element={<UrlRedirector/>}/>
        </Routes>
    </Box>
  )
}

export default App
