'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password
      });
      console.log(response.data);
      toast.success('Login successful!');
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('presenter', JSON.stringify(response.data.presenter));
      // Immediately update UI state so the Logout button replaces the Sign In button
      setIsLoggedIn(true);
      setPresenterName(response.data.presenter?.name || 'Presenter');
      // Do not redirect automatically; user stays on this page and sees Logout button
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // No logout endpoint: client clears auth on its own when needed

  // client-side login state (read from localStorage safely)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [presenterName, setPresenterName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const presenter = localStorage.getItem('presenter');
    setIsLoggedIn(!!token);
    try {
      if (presenter) setPresenterName(JSON.parse(presenter)?.name || '');
    } catch (e) {
      setPresenterName('');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-600">Sign in to access your presentations</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          {isLoggedIn && (
            <div className="p-3 mb-2 rounded-lg bg-green-50 border border-green-200 text-green-800">
              Signed in as <strong>{presenterName || 'Presenter'}</strong>
            </div>
          )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading || isLoggedIn}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || isLoggedIn}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              {/* Reset password feature removed */}
              <div />
            </div>

            {/* Primary action: Sign In */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

        <div className="mt-6 text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            {/* Reset password feature removed */}
            <div />
          </div>

          <p className="text-gray-600">
            Don't have an account?{' '}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}