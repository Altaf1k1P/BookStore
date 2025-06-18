import React from 'react';

function Review({ name, rating, comment }) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
        <div className="text-yellow-500 text-sm">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>
      </div>
      <p className="text-gray-600 text-sm">{comment}</p>
    </div>
  );
}

export default Review;
