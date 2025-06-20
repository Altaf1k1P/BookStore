import React, { useState, useEffect } from 'react';
import axios from '../helper/axiosInstance';
import Card from '../Components/Card';
import SearchAndFilter from '../Components/SearchAndFilter';
import SkeletonCard from '../Components/SkeletonCard';

const LIMIT = 12;

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadBooks = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    const nextPage = reset ? 1 : page;

    try {
      const { data } = await axios.get(
        `/books?search=${search}&sort=${sort}&page=${nextPage}&limit=${LIMIT}`
      );

      const newBooks = data.books;
      setBooks(prev => (reset ? newBooks : [...prev, ...newBooks]));
      setHasMore(newBooks.length === LIMIT);
      setPage(nextPage + 1);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(true); // reset on search/sort change
  }, [search, sort]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <div className="flex flex-col md:flex-row justify-center flex-wrap items-center px-[2%] md:px-[5%] pb-[3rem] gap-[20px]">
        {books.map(b => (
          <Card
            key={b._id}
            id={b._id}
            title={b.title}
            author={b.author}
            rating={b.averageRating}
            coverImage={b.coverImage?.url}
          />
        ))}

        {/* Show skeletons only during initial load */}
        {loading && books.length === 0 &&
          Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => loadBooks()}
            disabled={loading}
            className={`px-6 py-2 rounded transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
