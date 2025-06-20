import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg z-50">
      <div className="flex flex-col items-center p-4 border-b">
        <img
          src={user?.avatar?.url || '/default-avatar.png'}
          alt={user?.username ? `${user.username}'s avatar` : 'User Avatar'}
          className="w-16 h-16 rounded-full object-cover border shadow-sm transition-transform duration-200 hover:scale-105"
          loading="lazy"
          width={64}
          height={64}
        />

        <h2 className="mt-2 font-semibold text-lg">Hi, {user?.username}!</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>

        {/* ✅ Manage Account */}
        <button
          className="mt-3 text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition"
          onClick={() => {
            navigate('/settings');
            onClose();
          }}
        >
          Manage Account
        </button>

        {/* ✅ Add Book (only for admin) */}
        {user?.role === 'admin' && (
          <button
            className="mt-2 text-green-600 border border-green-600 px-4 py-1 rounded hover:bg-green-50 transition"
            onClick={() => {
              navigate('/admin/add-book');
              onClose();
            }}
          >
            Add Book
          </button>
        )}
      </div>

      {/* ✅ Logout */}
      <button
        className="w-full py-3 text-center text-red-600 hover:bg-red-50 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
