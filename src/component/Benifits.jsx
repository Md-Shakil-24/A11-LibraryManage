import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Ayesha Khan',
    role: 'University Student',
    quote: 'This platform made my semester so much easier! I could borrow reference books without worrying about late returns.',
    rating: 5,
  },
  {
    name: 'Rafiul Islam',
    role: 'Software Engineer',
    quote: 'I discovered rare programming books I couldn’t find anywhere else. Borrowing is quick and effortless.',
    rating: 5,
  },
  {
    name: 'Nusrat Jahan',
    role: 'Teacher',
    quote: 'My students love the reading recommendations. The platform is a treasure for passionate readers.',
    rating: 4,
  },
];
//new add for 7 section
const ReaderStories = () => {
  return (
    <section className="mt-20 px-1 lg:px-5 w-[99%] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Reader <span className="text-indigo-600">Stories</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Hear from readers who are already enjoying a smarter way to discover and borrow books.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-indigo-200 transition"
          >
            <p className="text-gray-600 mb-4 italic">"{story.quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{story.name}</h4>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
              <div className="flex">
                {[...Array(story.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReaderStories;
