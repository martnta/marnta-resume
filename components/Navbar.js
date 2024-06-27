// components/Navbar.js
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className={`w-full z-50 fixed top-0 transition-all duration-300 ${scrolled ? 'bg-blue-600 shadow-lg' : 'bg-blue-500'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            CodePipe Resume
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {['About', 'Contact'].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={`/${item.toLowerCase()}`} className="text-white hover:text-blue-200 transition-colors">
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-700"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {['About', 'Contact'].map((item) => (
              <div key={item}>
                <Link href={`/${item.toLowerCase()}`} className="block py-3 px-4 text-white">
                  {item}
                </Link>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;