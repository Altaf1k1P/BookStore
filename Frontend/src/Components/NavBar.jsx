import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';

const navItems = [
  { id: 1, label: 'Home', path: '/' },
  { id: 2, label: 'About Us', path: '/about' },
  { id: 3, label: 'All Books', path: '/all-books' },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const toggleProfile = () => setShowProfile(prev => !prev);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-blue-200">
      <div className="text-left text-[14px] text-[#594a47] py-2 border-b border-blue-100 px-4 md:px-20">
        Free Book Store Admin
      </div>

      <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto md:px-8 relative">
        <Link to="/" className="flex items-center">
          <img src="/Logo1.png" alt="Logo" className="h-10 sm:h-12" />
        </Link>

        <ul className="hidden md:flex gap-6 text-sm font-semibold text-gray-800 uppercase">
          {navItems.map(item => (
            <li key={item.id}>
              <Link to={item.path} className="hover:text-[#594a47] transition duration-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link to="/login"><Button variant="primary">Login</Button></Link>
              <Link to="/signup"><Button variant="secondary">Sign Up</Button></Link>
            </>
          ) : (
            <div className="relative flex flex-col justify-center items-center
            ">
              <img
                src={user?.avatar?.url || '/default-avatar.png'}
                alt={user?.username ? `${user.username}'s avatar` : 'User avatar'}
                onClick={toggleProfile}
                className="w-10 h-10 rounded-full border object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                loading="lazy"
                width={40}
                height={40}
              />
              <p>{user?.username}</p>
              {showProfile && (
                <ProfileDropdown onClose={() => setShowProfile(false)} />
              )}
            </div>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 text-sm font-semibold text-gray-800 uppercase">
            {navItems.map(item => (
              <li key={item.id}>
                <Link to={item.path} className="block py-2 hover:text-[#05668D]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {!user ? (
            <>
              <Link to="/login"><Button variant="primary" className="mt-4">Login</Button></Link>
              <Link to="/signup"><Button variant="secondary" className="mt-2">Sign Up</Button></Link>
            </>
          ) : (
            <div className="mt-4">
              <Button variant="secondary" onClick={toggleProfile}>Profile</Button>
              {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
