import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaImage, FaEnvelope, FaLock, FaBookOpen } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { getJWT } from '../utils/getJWT';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const SignUp = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    photo: false,
    email: false,
    password: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const token = await getJWT(); 
        localStorage.setItem('token', token); 
        setUser(user);
        toast.success('Welcome to our library community!', {
          position: 'top-center',
          autoClose: 2000,
          theme: "colored",
          onClose: () => navigate(from),
        });
      })
      .catch(err => {
        setLoading(false);
        toast.error('Google registration failed: ' + err.message, {
          position: 'top-center',
          autoClose: 2000,
          theme: "colored",
        });
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error('Password must be at least 6 characters with both uppercase and lowercase letters.', {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setUser({ ...user, displayName: name, photoURL: photo });

      const token = await getJWT(); 
      localStorage.setItem('token', token); 

      toast.success('Welcome to our library! Account created successfully.', {
        position: 'top-center',
        autoClose: 2000,
        theme: "colored",
        onClose: () => navigate(from),
      });
    } catch (error) {
      toast.error('Registration failed: ' + error.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setIsFocused(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Books Animation */}
        <motion.div
          className="absolute top-20 left-10 text-green-400 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaBookOpen size={24} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-blue-400 opacity-20"
          animate={{ y: [0, -30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <FaBookOpen size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-purple-400 opacity-20"
          animate={{ y: [0, -25, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          <FaBookOpen size={28} />
        </motion.div>
      </div>

      <Helmet>
        <title>Join Our Library | Sign Up</title>
        <meta name="description" content="Create your library account to access thousands of books and resources." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 mb-6 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <FaBookOpen className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Join Our Library</h1>
            <p className="text-green-100">Start your reading journey today</p>
          </div>

          <div className="p-8">
            {/* Google Sign Up */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 transition-all duration-300 mb-6 ${
                loading 
                  ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                  : 'bg-white hover:shadow-lg hover:border-green-300'
              }`}
            >
              <FaGoogle className="text-green-600 text-lg" />
              <span className="font-medium text-gray-700">
                {loading ? 'Creating Account...' : 'Sign up with Google'}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or register with email</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    placeholder=" "
                    required
                    disabled={loading}
                    onFocus={() => handleFocus('name')}
                    onBlur={(e) => handleBlur('name', e.target.value)}
                    className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white/50 peer disabled:opacity-50"
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-green-500 transition-colors duration-300" />
                  <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    isFocused.name 
                      ? 'top-1 text-sm text-green-600 bg-white px-1' 
                      : 'top-3 text-gray-500'
                  }`}>
                    Full Name
                  </label>
                </div>
              </motion.div>

              {/* Photo URL Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="relative">
                  <input
                    name="photoURL"
                    type="text"
                    placeholder=" "
                    required
                    disabled={loading}
                    onFocus={() => handleFocus('photo')}
                    onBlur={(e) => handleBlur('photo', e.target.value)}
                    className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white/50 peer disabled:opacity-50"
                  />
                  <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-green-500 transition-colors duration-300" />
                  <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    isFocused.photo 
                      ? 'top-1 text-sm text-green-600 bg-white px-1' 
                      : 'top-3 text-gray-500'
                  }`}>
                    Photo URL
                  </label>
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder=" "
                    required
                    disabled={loading}
                    onFocus={() => handleFocus('email')}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white/50 peer disabled:opacity-50"
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-green-500 transition-colors duration-300" />
                  <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    isFocused.email 
                      ? 'top-1 text-sm text-green-600 bg-white px-1' 
                      : 'top-3 text-gray-500'
                  }`}>
                    Email Address
                  </label>
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" "
                    required
                    disabled={loading}
                    onFocus={() => handleFocus('password')}
                    onBlur={(e) => handleBlur('password', e.target.value)}
                    className="w-full px-4 py-3 pl-11 pr-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white/50 peer disabled:opacity-50"
                  />
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-green-500 transition-colors duration-300" />
                  <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    isFocused.password 
                      ? 'top-1 text-sm text-green-600 bg-white px-1' 
                      : 'top-3 text-gray-500'
                  }`}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showPassword ? 'show' : 'hide'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  Must be at least 6 characters with uppercase and lowercase letters
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Creating Account...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="register"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white"
                    >
                      Join Library
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-6 pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600">
                Already have an account?{' '}
                <NavLink
                  to="/auth/signIn"
                  className="text-green-600 font-semibold hover:text-green-800 underline transition-colors duration-200"
                >
                  Sign in here
                </NavLink>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm"
        >
          Unlock access to thousands of books and resources
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;