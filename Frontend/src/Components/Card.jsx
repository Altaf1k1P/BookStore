import React from 'react';

function Card() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-md rounded-2xl p-4 gap-4 max-w-sm hover:shadow-lg transition-shadow duration-200">
      <div className="overflow-hidden rounded-lg aspect-[3/4]">
        <img
          src="/IKI.jpeg"
          alt="Ikigai book cover"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* Book Info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-snug">
          Ikigai: The Japanese Secret to a Long and Happy Life
        </h3>
        <p className="text-sm text-gray-600">
          Book by Francesc Miralles and Hector Garcia
        </p>
      </div>
    </div>
  );
}

export default Card;
