import React, { useState } from 'react';
import Review from '../Components/Review';
import ReviewForm from "../Components/ReviewForm"
import Button from '../Components/Button';

const initialReviews = [
  {
    name: 'Aman Sharma',
    rating: 5,
    comment: 'This book changed the way I look at life. Must-read for everyone!',
  },
  {
    name: 'Priya Mehta',
    rating: 4,
    comment: 'Simple yet profound lessons on happiness and purpose.',
  },
];

function BookDetail() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.comment) return;

    setReviews(prev => [formData, ...prev]);
    setFormData({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Book Detail Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 aspect-[3/4] overflow-hidden rounded-xl shadow">
          <img src="/IKI.jpeg" alt="Ikigai Book Cover" className="object-cover w-full h-full" />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#594a49]">Ikigai: The Japanese Secret to a Long and Happy Life</h1>
          <p className="text-gray-600">By Francesc Miralles and Hector Garcia</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Discover the Japanese concept of ikigai and how it can help you live a longer, more fulfilling life. The book explores the habits and mindset of Okinawa’s centenarians, blending science and philosophy in a deeply inspiring read.
          </p>
          <Button variant="primary" className="px-6 w-max">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>

        {/* Review Form */}
        <ReviewForm onSubmit={(review) => setReviews(prev => [review, ...prev])} />

        {/* Review List */}
        {reviews.map((review, index) => (
          <Review
            key={index}
            name={review.name}
            rating={review.rating}
            comment={review.comment}
          />
        ))}
      </div>
    </div>
  );
}

export default BookDetail;
