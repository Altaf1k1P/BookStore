import React from 'react';

const SearchAndFilter = ({ search, setSearch, sort, setSort }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input
      type="text"
      placeholder="🔍 Search by title"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="flex-grow border px-4 py-2 rounded"
    />
    <select
      value={sort}
      onChange={e => setSort(e.target.value)}
      className="border px-4 py-2 rounded"
    >
      <option value="desc">Newest First</option>
      <option value="asc">Oldest First</option>
    </select>
  </div>
);

export default SearchAndFilter;
