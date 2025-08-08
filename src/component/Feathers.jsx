import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';

const highlights = [
  {
    title: 'Seamless Borrowing',
    description: 'Easily borrow and manage your favorite books with a single click.',
    icon: BookOpenIcon,
  },
  {
    title: 'Powerful Search',
    description: 'Find books by name, author, or category using our advanced filters.',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Personal Dashboard',
    description: 'Track your borrowed books, due dates, and reading history in one place.',
    icon: UserIcon,
  },

  {
    title: 'All BookList',
    description: 'Track your books and reading and enjoying more to read.',
    icon: BookOpenIcon,
  },
];

const Feathers = () => {
  return (
    <section className="py-20 px-1 lg:px-5 w-[95%] mx-auto  ">
      <div className=" flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover, Borrow, and Enjoy <span className="text-indigo-600">Thousands of Books</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your all-in-one platform for managing personal library experiences with speed and style.
          </p>
          <Link to='/auth/all-books'>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Browse Library
          </button></Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-indigo-200 border border-gray-100 hover:border-indigo-300 transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feathers;
