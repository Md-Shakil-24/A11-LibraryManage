import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getJWT } from '../utils/getJWT';
import { Helmet } from 'react-helmet';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [borrowed, setBorrowed] = useState(false);
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDateDisplay, setReturnDateDisplay] = useState('');
  const [returnDateInput, setReturnDateInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  
  const formatToMMDDYYYY = (date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  
  const formatToYYYYMMDD = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    fetch(`https://a11-server-side-omega.vercel.app/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        if (user?.email && book?._id) {
          const token = await getJWT();
          const res = await fetch(`https://a11-server-side-omega.vercel.app/borrow/${user.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          const hasBorrowed = data.some((b) => b.bookId === book._id);
          setBorrowed(hasBorrowed);
        }
      } catch {
        toast.error('Failed to check borrow status');
      }
    };

    fetchBorrowed();
  }, [user, book]);

  useEffect(() => {
    const today = new Date();
    const returnDt = new Date();
    returnDt.setDate(today.getDate() + 7);

    setBorrowDate(formatToMMDDYYYY(today));
    setReturnDateDisplay(formatToMMDDYYYY(returnDt));
    setReturnDateInput(formatToYYYYMMDD(returnDt));
  }, []);

  const handleBorrow = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!returnDateInput) {
      toast.error('Please select return date');
      return;
    }

    setIsBorrowing(true);

    const borrowData = {
      bookId: book._id,
      title: book.name,
      image: book.image,
      category: book.category,
      email: user.email,
      userName: user.displayName,
      borrowDate,
      returnDate: returnDateDisplay,
    };

    try {
      const token = await getJWT();
      const res = await fetch('https://a11-server-side-omega.vercel.app/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Borrow failed');

      toast.success('✅ Book borrowed successfully');
      setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
      setBorrowed(true);
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBorrowing(false);
    }
  };

  if (!book)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-blue-600 font-medium">Loading the book details...</p>
      </div>
    );

  return (
    <div className="w-[99%] mx-auto px-1 lg:px-5 mt-8">
      <Helmet>
        <title>Book-Details | Library-Manage</title>
      </Helmet>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.name}
            className="w-68 border border-amber-600 h-97 object-cover rounded-lg mb-4"
          />
        </div>
        <h2 className="text-3xl text-center font-bold text-blue-700 mb-2">{book.name}</h2>
        <p className="text-gray-700">👤 Author: {book.author}</p>
        <p className="text-gray-700">📂 Category: {book.category}</p>

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

        <p className="text-gray-700">📦 Available: {book.quantity}</p>
        <p className="text-gray-700">📚 Description:</p>
        <p className="text-gray-700 border border-green-600 rounded-2xl h-20 bg-amber-100 px-2 py-1">
          {book.description}
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => navigate(`/auth/update-book/${book._id}`)}
            className="bg-green-600 w-full rounded-3xl text-white px-4 py-2 hover:bg-green-700"
          >
            ✏️ Update
          </button>

          <button
            onClick={handleBorrow}
            disabled={borrowed || book.quantity <= 0}
            className={`px-4 py-2 text-white w-full rounded-3xl font-medium transition ${
              borrowed || book.quantity <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {borrowed
              ? '✅ Already Borrowed'
              : book.quantity <= 0
              ? 'Out of Stock'
              : '📖 Borrow'}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">📖 Borrow Book</h3>
            <p><strong>📘 Book:</strong> {book.name}</p>
            <p><strong>🙍 User:</strong> {user?.displayName}</p>
            <p><strong>✉️ Email:</strong> {user?.email}</p>
            <p><strong>📅 Borrow Date:</strong> {borrowDate}</p>

            <div className="mt-4">
              <label className="font-medium">📅 Return Date:</label>
              <input
                type="date"
                value={returnDateInput}
                onChange={(e) => {
                  const selected = new Date(e.target.value);
                  setReturnDateInput(e.target.value);
                  setReturnDateDisplay(formatToMMDDYYYY(selected));
                }}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={formatToYYYYMMDD(new Date())}
              />
              <p className="text-sm text-gray-500 mt-1">
                Selected Return Date: {returnDateDisplay}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isBorrowing}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isBorrowing}
                className={`px-4 py-2 rounded text-white ${
                  isBorrowing
                    ? 'bg-gray-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isBorrowing ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </span>
                ) : (
                  'Confirm Borrow'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
