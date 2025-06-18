import React from 'react';
import { Link } from 'react-router-dom';

function Card() {
  const rating = 4.5; 

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <Link
      to="/book-detail"
      className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-2xl p-4 gap-4 max-w-[320px] hover:shadow-md transition duration-200"
    >
    
      <div className="overflow-hidden rounded-lg aspect-[3/4]">
        <img
          src="/IKI.jpeg"
          alt="Ikigai book cover"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
          Ikigai: The Japanese Secret to a Long and Happy Life
        </h3>
        <p className="text-sm text-gray-600">
          By Francesc Miralles & Hector Garcia
        </p>
        <div className="text-yellow-500 text-sm mt-1">
          {renderStars(rating)}
        </div>
      </div>
    </Link>
  );
}

export default Card;
