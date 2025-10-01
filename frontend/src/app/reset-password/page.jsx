'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const buildApiBase = () => {
        let base = process.env.NEXT_PUBLIC_API_URL || '';
        if (!base) return '';
        if (!/^https?:\/\//i.test(base)) base = `https://${base}`;
        return base;
      };

      const apiBase = buildApiBase();
      const url = apiBase ? `${apiBase}/auth/reset-password-request` : '/auth/reset-password-request';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset request');
      }

      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-600">
            {isSubmitted
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive password reset instructions'}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

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
                  Sending...
                </>
              ) : (
                'Send Reset Instructions'
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-green-50 rounded-lg text-green-700"
            >
              <p>Reset instructions sent!</p>
              <p className="text-sm mt-2">
                Please check your email and follow the instructions to reset your
                password.
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Send another request
            </motion.button>
          </div>
        )}

        <div className="mt-6 text-center">
          <motion.a
            href="/login"
            whileHover={{ scale: 1.02 }}
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Remember your password? Login
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}