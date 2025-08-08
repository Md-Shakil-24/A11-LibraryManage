import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { getJWT } from '../utils/getJWT';
import { Helmet } from 'react-helmet';

const MyBorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowed, setBorrowed] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    const fetchBorrowed = async () => {
      setLoading(true);
      try {
        if (!user?.email) return;
        const token = await getJWT();
        const res = await fetch(`https://a11-server-side-omega.vercel.app/borrow/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBorrowed(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowed();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      borrowed.forEach(book => {
        const now = Date.now();
        const returnTime = new Date(book.returnDate).getTime();
        const distance = returnTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          newCountdowns[book._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[book._id] = 'Expired';
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [borrowed]);

  const handleReturn = async (id) => {
    const book = borrowed.find(b => b._id === id);
    const result = await Swal.fire({
      title: 'Return this book?',
      text: `Do you want to return "${book?.title}" now?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, return it!',
      background: '#fff',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

   
    Swal.fire({
      title: 'Processing...',
      text: 'Returning your book, please wait.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    
    setReturningId(id);
    setBorrowed(prev => prev.filter(item => item._id !== id));

    try {
      const token = await getJWT();
      const res = await fetch(`https://a11-server-side-omega.vercel.app/borrow/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        Swal.fire('✅ Returned!', 'Book returned successfully.', 'success');
      } else {
        throw new Error('Return failed');
      }
    } catch (err) {
     
      setBorrowed(prev => [...prev, book].sort((a, b) => a._id.localeCompare(b._id)));
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-blue-600 font-medium">Loading your borrowed books...</p>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto p-6 px-2 lg:px-5">



<Helmet>
        <title>Borrowed-Books | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>



      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center">📚 My Borrowed Books</h2>

      {borrowed.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">You haven't borrowed any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {borrowed.map(book => (
            <article
              key={book._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col"
            >
              <div className='flex justify-center'>
              <img
                src={book.image}
                alt={book.title}
                className="h-54 w-40 object-cover border border-amber-600 rounded-lg mb-4 shadow-sm"
              /></div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">📚 Category: {book.category}</p>
              <p className="text-sm text-gray-700 mb-1">
                📅 Borrow Date:{' '}
                <time>{book.borrowDate ? new Date(book.borrowDate).toLocaleDateString() : '-'}</time>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                📅 Return Date:{' '}
                <time>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : '-'}</time>
              </p>
              <p
                className={`text-sm font-semibold mb-4 ${
                  countdowns[book._id] === 'Expired' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                ⏳ Time Left: {countdowns[book._id] || 'Calculating...'}
              </p>

              <button
                onClick={() => handleReturn(book._id)}
                disabled={returningId === book._id}
                className={`mt-auto py-2 ${
                  returningId === book._id ? 'bg-gray-400 cursor-wait' : 'bg-red-600 hover:bg-red-700'
                } focus:ring-4 focus:ring-red-300 text-white font-semibold rounded-lg shadow-md transition-colors duration-200`}
              >
                {returningId === book._id ? 'Returning...' : '🔄 Return Book'}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBorrowedBooks;
