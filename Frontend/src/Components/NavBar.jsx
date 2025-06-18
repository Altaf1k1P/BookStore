import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import Button from './Button.jsx'
import { Link } from 'react-router-dom';

const navItems = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'About Us', path: '/about' },
    { id: 3, label: 'All Books', path: '/all-book' },
];

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-blue-200">

            <div className="text-left text-[14px] text-[#594a47] py-2 border-b border-blue-100 px-4 md:px-20">
                Free Book Store
            </div>


            <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto md:px-8">
                {/* Logo */}
                <Link to={'/'} className="flex items-center ">
                    <img src="/Logo1.png" alt="Logo" className="h-10 sm:h-12" />
                </Link>


                <ul className="hidden md:flex gap-6 text-sm font-semibold text-gray-800 uppercase">
                    {navItems.map(item => (
                        <li key={item.id} className="relative group">
                            <Link to={item.path} className="hover:text-[#594a47] transition duration-200">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="primary" className="px-6">Login</Button>
                    <Button variant="secondary" className="px-4">Sign Up</Button>
                </div>

                {/*Toggle */}
                <button onClick={toggleMenu} className="md:hidden text-gray-800">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-4 text-sm font-semibold text-gray-800 uppercase">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a href={item.path} className="block py-2 hover:text-[#05668D]">
                                    {item.label}
                                    {item.dropdown && <span className="ml-1">▼</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                   
                    <Button variant="primary" className="px-6 mb-2.5">Login</Button><br />
                    <Button variant="secondary" className="px-4">Sign Up</Button>
  
                    
                </div>
            )}
        </nav>
    );
}

export default NavBar;
