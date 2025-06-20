import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBook, submitReview } from '../store/slices/bookSlice';
import Button from '../Components/Button';
import ReviewForm from '../Components/ReviewForm';
import Review from '../Components/Review';

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBook: book, loading, error } = useSelector(state => state.book);
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    dispatch(fetchSingleBook(id));
  }, [dispatch, id]);

  const handleReviewSubmit = async (reviewData) => {
    await dispatch(submitReview({ id, ...reviewData }));
    dispatch(fetchSingleBook(id)); // Refresh after submitting review
  };
  const toggleDescription = () => setShowFullDescription(prev => !prev);

  if (loading) return <div className="text-center py-10">Loading book details...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!book) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Book Details */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 aspect-[3/4] max-h-[400px] overflow-hidden rounded-lg shadow">
          <img
            src={book?.coverImage?.url || '/fallback.jpg'}
            alt={book?.title || 'Book Cover'}
            className="object-cover w-full h-full  rounded-lg transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback.jpg';
            }}
          />
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#594a49]">{book.title}</h1>
          <p className="text-lg text-gray-600 font-medium">By {book.author}</p>
          <p className="text-gray-700 text-base leading-relaxed">
            {showFullDescription
              ? book.description
              : book.description.split(" ").slice(0, 80).join(" ") + (book.description.split(" ").length > 80 ? "..." : "")}
            {book.description.split(" ").length > 80 && (
              <button
                onClick={toggleDescription}
                className="ml-2 text-blue-600 underline text-sm"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
          <Button variant="primary" className="px-6 w-max">Buy Now</Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews</h2>
        <ReviewForm onSubmit={handleReviewSubmit} />

        <div className="mt-6 space-y-4">
          {book.reviews?.length === 0 ? (
            <p className="text-sm text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            book.reviews.map((review, index) => (
              <Review
                key={review.user._id || index}
                reviewer={review.user?.username || 'User'}
                avatar={review.user?.avatar?.url || '/default-avatar.png'}
                rating={review.rating}
                comment={review.comment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
