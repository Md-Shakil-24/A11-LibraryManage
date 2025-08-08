import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { getJWT } from '../utils/getJWT';
import { Helmet } from 'react-helmet';

const AllBooks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [borrowedIds, setBorrowedIds] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [search, setSearch] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState('card');
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://a11-server-side-omega.vercel.app/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(() => toast.error('Failed to load books.'))
      .finally(() => setLoading(false));

    const fetchBorrowed = async () => {
      try {
        if (user?.email) {
          const token = await getJWT();
          const res = await fetch(`https://a11-server-side-omega.vercel.app/borrow/${user.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setBorrowedIds(data.map(item => item.bookId));
        }
      } catch {
        toast.error('Failed to load borrowed info.');
      }
    };

    fetchBorrowed();
  }, [user]);

  const openModal = (book) => {
    setSelectedBook(book);
    const today = new Date().toISOString().split('T')[0];
    setBorrowDate(today);
    const defaultReturn = new Date();
    defaultReturn.setDate(defaultReturn.getDate() + 7);
    setReturnDate(defaultReturn.toISOString().split('T')[0]);
  };

  const confirmBorrow = async () => {
    if (!user?.email || !user?.displayName) {
      toast.error('Please log in to borrow books.');
      return;
    }

    if (!returnDate || !selectedBook) {
      toast.error('Please select a return date.');
      return;
    }

    const borrowPayload = {
      bookId: selectedBook._id,
      title: selectedBook.name,
      image: selectedBook.image,
      category: selectedBook.category,
      email: user.email,
      userName: user.displayName,
      borrowDate,
      returnDate,
    };

    try {
      const token = await getJWT();
      const res = await fetch('https://a11-server-side-omega.vercel.app/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowPayload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Borrow failed');
      }

      await res.json();
      toast.success('Book borrowed successfully!');
      setBorrowedIds([...borrowedIds, selectedBook._id]);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book._id === selectedBook._id ? { ...book, quantity: book.quantity - 1 } : book
        )
      );
      setSelectedBook(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredBooks = books
    .filter(book =>
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter(book => (showAvailableOnly ? book.quantity > 0 : true));


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-blue-600 text-lg font-medium">Loading Books...</p>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto px-1 lg:px-5 mt-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📚 All Books
      </h2>


<Helmet>
        <title>All-Books | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>




      <div className="flex flex-col items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-700 bg-amber-100 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search books or authors..."
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-blue-600 text-xl">
            🔍
          </div>
          <div className="absolute left-12 top-full mt-1 text-gray-400 text-sm">
            <Typewriter
              words={['Search by book name...', 'Search by author...']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={55}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-2 relative">
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
        <p className="text-center text-gray-500">No books found.</p>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div key={book._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col">
              <div className='flex justify-center'>
              <img
                src={book.image}
                alt={book.name}
                className="h-53 w-40  border border-amber-600 object-cover rounded-lg mb-3"
              />
              </div>
              <h3 className="text-xl font-semibold text-blue-800">{book.name}</h3>
              <p className="text-sm text-gray-600 mt-1">👤 Author: {book.author}</p>
              <p className="text-sm mt-1">⭐ Category: {book.category}</p>
              <p className="text-sm mt-1">
                📦 Available: <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{book.quantity}</span>
              </p>
              <button
                onClick={() => navigate(`/auth/book-details/${book._id}`)}
                className="bg-indigo-600 my-2 py-2 text-white px-3 rounded-3xl hover:bg-indigo-700 w-full"
              >
                📘 View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-cyan-200 h-13">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3  text-sm font-medium text-gray-500 text-center uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3  text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map(book => (
                <tr key={book._id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={book.image} alt={book.name} className="h-16 w-16 border border-amber-600 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap font-semibold text-blue-700">{book.name}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{book.category}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{book.quantity}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/auth/book-details/${book._id}`)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
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

export default AllBooks;
