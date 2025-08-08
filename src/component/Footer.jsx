import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-10  mt-12">
      <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-1 lg:px-5">

       
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2 select-none  bg-emerald-300/10 rounded-2xl px-3 text-center pb-[3px]">
            <span className="text-blue-500">Library</span><span className="text-red-500">Manage</span>
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Empowering readers and researchers through accessible, digital knowledge.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaYoutube />
            </a>
          </div>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/auth/all-books" className="hover:text-blue-400">All Books</Link></li>
            <li><Link to="/auth/add-book" className="hover:text-blue-400">Add Book</Link></li>
            <li><Link to="/auth/borrowed" className="hover:text-blue-400">Borrowed Books</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-blue-400">Help Center</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Borrowing Policy</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Accessibility</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">Join our newsletter for book releases and updates.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              <FaEnvelope />
            </button>
          </div>
        </div>
      </div>

      
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} LibraryManage. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition">Terms of Use</Link>
          <Link to="#" className="hover:text-white transition">Cookie Preferences</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
