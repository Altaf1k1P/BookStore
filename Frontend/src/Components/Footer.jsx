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
          <img src="/Logo.png" alt="Epione Logo" className="w-[100px] mb-4" />
          <p className="text-sm mb-3">
            Epione is one of India’s leading pain management centers founded by <span className="text-yellow-400">Dr. Sudheer Dara</span>, a pioneer in pain management with over 20+ years of experience in the field of pain medicine. Epione center for pain relief and beyond is regarded as one of the best pain management hospitals in Bengaluru, India.
          </p>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 741617XXX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contact@remdombookstore.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>House No: 946, 21st Main Rd, Banashankari 2nd Stage, Bangalore, 560070, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Middle Links */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>NECK PAIN</li>
            <li>KNEE PAIN</li>
            <li>LOW BACK PAIN</li>
            <li>SHOULDER PAIN</li>
            <li>MIGRAINE HEADACHE</li>
            <li>NEWS & EVENTS</li>
            <li>CONTACT</li>
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
          <h3 className="text-lg font-semibold mb-3">Working Hours</h3>
          <ul className="text-sm space-y-2">
            {['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'].map(day => (
              <li key={day} className="flex justify-between">
                <span>{day}</span>
                <span>08:00 AM – 07:00 PM</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-400 pt-4 flex flex-col md:flex-row justify-between text-sm">
        <span>Copyright ©2021 | All Rights Reserved</span>
        <span>
          Technology & Marketing by <span className="text-yellow-400">CultNerds IT Solutions</span>
        </span>
      </div>
    </footer>
  );
};
export default Footer;
