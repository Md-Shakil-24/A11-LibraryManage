import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { getJWT } from '../utils/getJWT'; 
import { Helmet } from 'react-helmet';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    author: '',
    category: '',
    quantity: '',
    rating: '',
    image: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getJWT();

        const res = await fetch(`https://a11-server-side-omega.vercel.app/books/${id}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          }
        });

        if (res.status === 401) {
          Swal.fire('Unauthorized', 'Please login to update books.', 'error');
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch book data');

        const data = await res.json();

        setForm({
          name: data.name || '',
          author: data.author || '',
          category: data.category || '',
          quantity: data.quantity?.toString() || '',
          rating: data.rating?.toString() || '',
          image: data.image || '',
          description: data.description || ''
        });
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

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

    setSaving(true);

    try {
      const token = await getJWT();

      const res = await fetch(`https://a11-server-side-omega.vercel.app/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(quantity),
          rating: Number(rating)
        })
      });

      if (res.status === 401) {
        Swal.fire('Unauthorized', 'Please login to update books.', 'error');
        setSaving(false);
        return;
      }

      if (!res.ok) throw new Error('Failed to update book.');

      await Swal.fire({
        icon: 'success',
        title: 'Book Updated!',
        text: 'You updated Successfully',
        timer: 2000,
        showConfirmButton: false
      });

      navigate(-1);
    } catch (error) {
      Swal.fire('Error', error.message || 'Something went wrong.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-blue-600 font-medium">Loading books data...</p>
      </div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-lg mt-6"
    >
      <motion.h2
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8 text-center text-indigo-700"
      >
        <Typewriter
          words={['✏️ Update Book Details']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </motion.h2>


<Helmet>
        <title>UpdateBook | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>




      <form onSubmit={handleSubmit} className="space-y-5">
        {[ 
          { label: 'Book Name', name: 'name', type: 'text' },
          { label: 'Author Name', name: 'author', type: 'text' },
          { label: 'Image URL', name: 'image', type: 'url', optional: true },
          { label: 'Quantity', name: 'quantity', type: 'number', min: 0 },
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
          <label className="block mb-1 font-medium">Category *</label>
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
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={saving}
          type="submit"
          className={`w-full py-2 font-semibold rounded-lg transition duration-300 text-white ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {saving ? 'Updating...' : 'Update Book'}
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

export default UpdateBook;
