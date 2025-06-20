import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentBooks } from '../store/slices/bookSlice';
import Card from './Card';

function RecentBooks() {
  const dispatch = useDispatch();
  const { recentBooks, loading, error } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchRecentBooks());
  }, [dispatch]);

  return (
    <div className="px-4 md:px-20 py-10">
      <h2 className="text-2xl font-bold mb-6">📚 Recently Added Books</h2>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="flex flex-col md:flex-row justify-center items-center px-[5%] pb-[3rem] gap-[20px]">
        {recentBooks.map((book) => (
          <Card
            key={book._id}
            id={book._id}
            title={book.title}
            author={book.author}
            rating={book.averageRating || 0}
            coverImage={book.coverImage?.url}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentBooks;
