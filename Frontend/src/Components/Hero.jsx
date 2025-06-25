import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col py-4 md:flex-row justify-between  px-[5%] md:gap-3 gap-5'>
      <div className='w-full md:w-[40%] md:pr-[4rem] flex flex-col justify-center items-center md:items-start gap-2'>
        <h1 className='text-4xl md:text-5xl text-[#594a47] font-bold mb-2'>Descover Your Next Great Read</h1>
        <p className='mb-2 md:text-xl text-[18px] '>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
        <Link to={'/all-books'}> <Button variant="primary" className="px-6 text-xl"> Descover Books </Button></Link>
      </div>
      <div className='w-full md:w-[58%]'>
        <img
          src="/Banner.webp"
          alt="Stunning bookstore banner"
          width="1600"
          height="600"
          decoding="async"
          fetchpriority="high"
          style="width: 100%; height: auto;"
        />
      </div>
    </div>
  )
}

export default Hero
