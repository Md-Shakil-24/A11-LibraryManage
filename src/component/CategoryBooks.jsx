import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getJWT } from '../utils/getJWT';
import { Helmet } from 'react-helmet';

const CategoryBooks = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState('card');
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const token = await getJWT();
        const res = await fetch('https://a11-server-side-omega.vercel.app/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const filtered = data.filter(book => book.category === category);
        setBooks(filtered);
      } catch (err) {
        console.error('Failed to load books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const filteredBooks = books
    .filter(book =>
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter(book => (showAvailableOnly ? book.quantity > 0 : true));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-blue-600 font-medium">Loading books in category...</p>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto py-8 px-1 lg:px-10">



      <Helmet>
        <title>Book-Categories | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>




      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📚 Books in Category: <span className="capitalize text-fuchsia-500">{category}</span>
      </h2>

      <div className=" items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-2/3 mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-700 bg-amber-100 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search books or authors..."
          />
          <div className="absolute inset-y-0 left-4 flex items-center  pointer-events-none text-blue-600 text-xl">🔍</div>
          <div className="absolute left-12 top-full mt-1 text-gray-400 text-sm">
            <Typewriter
              words={["Search by book name...", "Search by author..."]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={55}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </div>
        </div>

        <div className="flex justify-center  gap-3 mt-8 lg:mt-7 relative">
          <button
            onClick={() => setShowAvailableOnly(prev => !prev)}
            className={`px-5 py-2 rounded-full font-medium border transition text-sm ${
              showAvailableOnly
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {showAvailableOnly ? 'Show All Books' : 'Show Available Only'}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowViewDropdown(prev => !prev)}
              className="px-5 py-2 rounded-full font-medium border transition text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              title="Toggle View"
            >
              {view === 'card' ? '📘 Card View ▾' : '📋 Table View ▾'}
            </button>
            {showViewDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded border z-20">
                <button
                  onClick={() => {
                    setView('card');
                    setShowViewDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  📘 Card View
                </button>
                <button
                  onClick={() => {
                    setView('table');
                    setShowViewDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  📋 Table View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found in this category.</p>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div key={book._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col">


              <div className='flex justify-center'><img src={book.image} alt={book.name} className="h-53 w-40  object-cover border border-amber-600 rounded-lg mb-3" /></div>


              <h3 className="text-xl font-semibold text-blue-800">{book.name}</h3>
              <p className="text-sm text-gray-600 mt-1">👤 Author: {book.author}</p>

              <p className="text-gray-700 flex items-center gap-1">
                ⭐ Rating:
                <span className="flex items-center text-yellow-500 ml-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const full = i + 1 <= Math.floor(book.rating);
                    const half = book.rating - i > 0 && book.rating - i < 1;
                    return (
                      <span key={i}>
                        {full ? <FaStar /> : half ? <FaStarHalfAlt /> : <FaRegStar />}
                      </span>
                    );
                  })}
                </span>
                <span className="text-sm text-gray-600">({book.rating})</span>
              </p>

              <p className="text-sm mt-1">
                📦 Available: <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{book.quantity}</span>
              </p>
              <button
                onClick={() => navigate(`/auth/book-details/${book._id}`)}
                className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-medium transition"
              >
                📘 View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-cyan-200 h-13">
              <tr>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Image</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Author</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-4 py-2 text-center text-ms font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map(book => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 flex justify-center  py-2">
                    <img src={book.image} alt={book.name} className="h-16 w-12 border border-amber-600 object-cover rounded" />
                  </td>
                  <td className="px-4 text-center py-2 font-semibold">{book.name}</td>
                  <td className="px-4 text-center py-2">{book.author}</td>
                  <td className="px-4 text-center py-2">{book.category}</td>
                  <td className="px-4 text-center py-2">{book.quantity}</td>
                  <td className="px-4 text-center py-2">{book.rating}</td>
                  <td className="px-4 text-center py-2">
                    <button
                      onClick={() => navigate(`/auth/book-details/${book._id}`)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 w-full"
                    >
                      📘 View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
