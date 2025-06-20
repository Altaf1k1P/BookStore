import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom'; 

const UserSettings = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/default-avatar.png');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({ username: user.username, email: user.email });
      setAvatarPreview(user?.avatar?.url || '/default-avatar.png');
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      // Clean up old preview URL
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    if (avatarFile) formData.append('avatar', avatarFile);

    const res = await dispatch(updateProfile(formData));
    console.log('Profile Update Res:',res);
    
    if (updateProfile.fulfilled.match(res)) {
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Settings</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="flex items-center gap-4">
          <img
            src={avatarPreview || '/default-avatar.png'}
            alt="avatar preview"
            onError={(e) => { e.target.src = '/default-avatar.png'; }}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <label className="text-sm cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            Change Avatar
            <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
          </label>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
