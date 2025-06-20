import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircleMore,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#211f1e] text-white py-10 px-[5%]">
      <div className="flex flex-col md:flex-row justify-between gap-10">

        <div className="md:w-1/3">
          <img src="/Logo.png" alt="BookReview Logo" className="w-[100px] mb-4" />
          <p className="text-sm mb-3">
            <span className="text-yellow-400">BookReview</span> is your go-to platform for discovering, reviewing, and sharing your favorite reads. Whether you're into fiction, non-fiction, or indie titles, our community-driven app helps you explore books, share thoughts, and connect with fellow readers across the world.
          </p>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@bookreviewapp.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>Plot 42, Tech Park, Udaipur, Rajasthan 313001, India</span>
            </div>
          </div>
        </div>

        {/* Middle Links */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Top Rated Books</li>
            <li>Latest Reviews</li>
            <li>Genres</li>
            <li>My Library</li>
            <li>Submit a Review</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <Facebook className="cursor-pointer hover:text-yellow-300" />
            <Instagram className="cursor-pointer hover:text-yellow-300" />
            <Youtube className="cursor-pointer hover:text-yellow-300" />
            <MessageCircleMore className="cursor-pointer hover:text-yellow-300" />
          </div>
        </div>

        {/* Working Hours */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Support Hours</h3>
          <ul className="text-sm space-y-2">
            {['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'].map(day => (
              <li key={day} className="flex justify-between">
                <span>{day}</span>
                <span>09:00 AM – 06:00 PM</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-400 pt-4 flex flex-col md:flex-row justify-between text-sm">
        <span>Copyright ©2025 | All Rights Reserved</span>
        <span>
          Designed & Developed by <span className="text-yellow-400">Altaf Khan</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
