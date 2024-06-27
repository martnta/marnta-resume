// components/Footer.js
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter signup
    console.log('Signed up with:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-2">CodePipe Resume</h3>
            <p className="text-gray-300">Empowering your career journey</p>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h5 className="uppercase mb-3 font-bold">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link href="/about" className="hover:underline">About</Link>
              </li>
              <li className="mt-2">
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
              <li className="mt-2">
                <Link href="/pricing" className="hover:underline">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h5 className="uppercase mb-3 font-bold">Legal</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="mt-2">
                <Link href="/terms" className="hover:underline">Terms of Use</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-3 font-bold">Stay Connected</h5>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:justify-center md:items-center mt-4">
                <input 
                  type="email"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2 md:mb-0 md:mr-2"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-900 to-indigo-1000">
        <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
          <div className="flex justify-center md:justify-start">
            <a href="#" className="mx-2" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="mx-2" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="mx-2" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="mx-2" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0 text-center">
            <p>&copy; {new Date().getFullYear()} CodePipe Resume. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;