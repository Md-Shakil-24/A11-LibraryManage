import { Link, NavLink } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from 'react-icons/fa';
//footer
const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white  pt-16 pb-12 mt-16 shadow-lg"
      aria-label="Site Footer"
    >
      <div className="w-[99%] px-3 lg:px-10 mx-auto justify-between grid grid-cols-1 md:grid-cols-3 gap-12">
       
        <section aria-labelledby="footer-about" className="space-y-4 max-w-md">
          <NavLink
          to="/"
          
          className="px-3  py-1 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 text-2xl font-extrabold shadow-sm select-none hover:brightness-110 transition"
        >
          Library<span className="text-yellow-400">Manage</span>
        </NavLink>
          <p className="text-gray-300 mt-4 text-base leading-relaxed">
            Empowering readers and researchers through accessible, digital knowledge.
          </p>
          <nav aria-label="Social media" className="flex space-x-6 mt-4">
            {[{
              href: 'https://facebook.com',
              label: 'Facebook',
              icon: <FaFacebookF size={24} />
            },{
              href: 'https://x.com',
              label: 'Twitter',
              icon: <FaTwitter size={24} />
            },{
              href: 'https://instagram.com',
              label: 'Instagram',
              icon: <FaInstagram size={24} />
            },{
              href: 'https://youtube.com',
              label: 'YouTube',
              icon: <FaYoutube size={24} />
            }].map(({href, label, icon}) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </nav>
        </section>

       
        <section aria-labelledby="footer-explore" className="space-y-4">
          <h3
            id="footer-explore"
            className="text-xl font-semibold border-b border-gray-700 pb-2"
          >
            Explore
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/auth/all-books", label: "All Books" },
              { to: "/auth/add-book", label: "Add Book" },
              { to: "/auth/borrowed", label: "Borrowed Books" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

   
        <section aria-labelledby="footer-newsletter" className="space-y-4 max-w-md">
          <h3
            id="footer-newsletter"
            className="text-xl font-semibold border-b border-gray-700 pb-2"
          >
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm font-medium">
            Join our newsletter for book releases and updates.
          </p>
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed!');
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="bg-blue-600 px-5 py-3 rounded-r-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <FaEnvelope size={20} />
            </button>
          </form>
        </section>
      </div>

     
      <div className="mt-16 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 select-none">
        <p>© {new Date().getFullYear()} LibraryManage. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6 text-xs font-medium">
          {[
            { to: "#", label: "Privacy Policy" },
            { to: "#", label: "Terms of Use" },
            { to: "#", label: "Cookie Preferences" },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
