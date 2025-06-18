import { useState } from 'react'
import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import Card from './Components/Card'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar />
     <Outlet/>
      <Footer />
    </>
  )
}

export default App
