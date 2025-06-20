import React from 'react';
import { Link } from 'react-router-dom';

function Card({ id, title, author, rating, coverImage }) {
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
      to={`/book-detail/${id}`}
      className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-2xl p-4 gap-4 max-w-[320px] hover:shadow-md transition duration-200"
    >
      <div className="overflow-hidden rounded-lg aspect-[3/4]">
        <img
          src={coverImage || '/fallback.jpg'}
          alt={title || 'Book Cover'}
          className="object-cover w-full h-full rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02]"
          loading="lazy"
          width={300} 
          height={450}
        />

      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-600">By {author}</p>
        <div className="text-yellow-500 text-sm mt-1">
          {renderStars(rating)}
        </div>
      </div>
    </Link>
  );
}

export default Card;
