import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../store/slices/bookSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addBookStatus, addBookError } = useSelector(state => state.book);

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return alert("Cover image is required");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("coverImage", coverImage);

    const res = await dispatch(addBook(formData));
    console.log(res);

    if (addBook.fulfilled.match(res)) {
      navigate('/all-books');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-10 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Book</h2>

      {addBookError && <p className="text-red-500 mb-2">{addBookError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Book Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded resize-none h-28"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-44 object-cover rounded border mt-2"
          />
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={addBookStatus === 'loading'}
        >
          {addBookStatus === 'loading' ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
