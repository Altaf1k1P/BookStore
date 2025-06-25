import React from 'react';
import { motion } from 'framer-motion';

function Review({ reviewer, rating, comment, avatar }) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 flex items-start gap-4">
      <img
        src={avatar || '/default-avatar.webp'}
        alt={reviewer}
        className="w-10 h-10 rounded-full object-cover border shadow-sm"
        loading="lazy"
        width={40}
        height={40}
        decoding="async"
      />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold text-gray-800">{reviewer}</h4>
          <motion.div
            className="text-yellow-500 text-sm flex gap-[1px]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < rating ? '★' : '☆'}</span>
            ))}
          </motion.div>
        </div>
        <p className="text-gray-600 text-sm">{comment}</p>
      </div>
    </div>
  );
}

export default Review;
