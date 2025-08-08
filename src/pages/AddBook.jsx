import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { getJWT } from '../utils/getJWT'; 
import { Helmet } from 'react-helmet';

const AddBook = () => {
  const [form, setForm] = useState({
    name: '',
    author: '',
    category: '',
    quantity: '',
    rating: '',
    image: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, author, category, quantity, rating, description } = form;
    if (!name || !author || !category || !quantity || !rating || !description) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = await getJWT(); 

      const res = await fetch('https://a11-server-side-omega.vercel.app/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(quantity),
          rating: Number(rating),
          image: form.image || 'https://via.placeholder.com/150'
        })
      });

      if (res.status === 401) {
        Swal.fire('Unauthorized', 'Please login to add books.', 'error');
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error('Failed to add book.');

      Swal.fire({
        icon: 'success',
        title: 'Book Added!',
        text: 'Book Addeded Successfully',
        timer: 2000,
        showConfirmButton: false
      }).then(() => navigate('/auth/all-books'));

      setForm({
        name: '',
        author: '',
        category: '',
        quantity: '',
        rating: '',
        image: '',
        description: ''
      });
    } catch (error) {
      Swal.fire('Error', error.message || 'Something went wrong.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-1 lg:px-5 py-8 bg-white rounded-2xl shadow-lg mt-6"
    >
      <motion.h2
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8 text-center text-indigo-700"
      >
        <Typewriter
          words={['📚 Add a New Book to the Library']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </motion.h2>



  <Helmet>
        <title>AddBook | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>




      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: 'Book Name', name: 'name', type: 'text' },
          { label: 'Author Name', name: 'author', type: 'text' },
          { label: 'Image URL', name: 'image', type: 'url', optional: true },
          { label: 'Quantity', name: 'quantity', type: 'number' },
          { label: 'Rating (1 to 5)', name: 'rating', type: 'number', step: '0.1', min: 1, max: 5 }
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">
              {field.label}{!field.optional && ' *'}
            </label>
            <input
              type={field.type}
              name={field.name}
              step={field.step}
              min={field.min}
              max={field.max}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required={!field.optional}
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium ">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select category</option>
            <option value="Novel">Novel</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Science">Science</option>
            <option value="CSE">CSE</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="EEE">EEE</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          type="submit"
          className={`w-full py-2 font-semibold rounded-lg transition duration-300 text-white ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Adding...' : 'Add Book'}
        </motion.button>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
      >
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">ℹ️ Book Content</h3>
        <p className="text-gray-700 text-sm">
          Share a short summary or context about the book — its plot, topic, or theme to help readers decide.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AddBook;
