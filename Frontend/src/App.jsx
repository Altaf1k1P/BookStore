import { useState } from 'react'
import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import Card from './Components/Card'

function App() {

  return (
    <>
    <NavBar/>
    <Hero/>
    <div className='flex justify-center items-center px-[5%] pb-[3rem] gap-[20px]'>
    <Card/>
    <Card/>
    <Card/>
    </div>
    
    </>
  )
}

export default App
