import React, { useState } from 'react';
import Button from './Button';

function ReviewForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;
    onSubmit(formData);
    setFormData({ name: '', rating: 5, comment: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-4 p-4 border border-gray-200 rounded-lg"
    >
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded outline-[#05668D]"
        required
      />

      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="border p-2 rounded outline-[#05668D]"
      >
        {[5, 4, 3, 2, 1].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 && 's'}
          </option>
        ))}
      </select>

      <textarea
        name="comment"
        placeholder="Your review"
        value={formData.comment}
        onChange={handleChange}
        className="border p-2 rounded h-24 resize-none outline-[#05668D]"
        required
      />

      <Button
        type="submit"
        variant="primary" className="px-6 w-max"
      >
        Submit Review
      </Button>
    </form>
  );
}

export default ReviewForm;
