import React from 'react'
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import RecentBooks from '../Components/RecentBooks.jsx'

function Home() {
  return (
    <>
       <Hero />
       <RecentBooks/>
      {/* <h3 className='text-3xl md:text-4xl font-semibold text-[#594a47] mb-6 pl-[3rem] md:pl-[5rem]'>Recently Added Books</h3>
      <div className='flex flex-col md:flex-row justify-center items-center px-[5%] pb-[3rem] gap-[20px]'>
        <Card />
        <Card />
        <Card />
        <Card />
      </div> */}
    </>
  )
}

export default Home
