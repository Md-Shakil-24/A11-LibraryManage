import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaBook, FaUserGraduate, FaGoogle } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { getJWT } from '../utils/getJWT';
import { motion, AnimatePresence } from 'framer-motion';

const SignIn = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      const token = await getJWT();
      
      localStorage.setItem('token', token);

      toast.success('Welcome to Library Management System!', {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        onClose: () => navigate(from, { replace: true }),
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(`Authentication failed: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const password = form.password.value;

    if (!email || !password) {
      setIsLoading(false);
      toast.warning('Please enter both email and password', {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const result = await signIn(email, password);
      const token = await getJWT();
      localStorage.setItem('token', token);

      toast.success('Access granted! Welcome back.', {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        onClose: () => navigate(from, { replace: true }),
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(`Login failed: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Books Animation */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaBook size={24} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-purple-400 opacity-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <FaBook size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-indigo-400 opacity-20"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          <FaBook size={28} />
        </motion.div>
      </div>

      <Helmet>
        <title>Sign In | Library Management System</title>
        <meta name="description" content="Access your library account and explore our vast collection of books and resources." />
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <FaUserGraduate className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100">Sign in to your library account</p>
          </div>

          <div className="p-8">
            {/* Google Sign In */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 transition-all duration-300 mb-6 ${
                isLoading 
                  ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                  : 'bg-white hover:shadow-lg hover:border-blue-300'
              }`}
            >
              <FaGoogle className="text-blue-600 text-lg" />
              <span className="font-medium text-gray-700">
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <input
                  name="email"
                  type="email"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 peer"
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  isFocused.email || email 
                    ? 'top-1 text-sm text-blue-600 bg-white px-1' 
                    : 'top-3 text-gray-500'
                }`}>
                  Email address
                </label>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  required
                  onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 peer"
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  isFocused.password 
                    ? 'top-1 text-sm text-blue-600 bg-white px-1' 
                    : 'top-3 text-gray-500'
                }`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-right"
              >
                <NavLink
                  to="/auth/forgate"
                  state={{ email }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </NavLink>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Authenticating...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white"
                    >
                      Access Library
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6 pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600">
                New to our library?{' '}
                <NavLink
                  to="/auth/signUp"
                  className="text-blue-600 font-semibold hover:text-blue-800 underline transition-colors duration-200"
                >
                  Create an account
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
          Access thousands of books and digital resources
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;