'use client';

import { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      console.log('Contact form submission:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <main className="min-h-screen bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-[#191676] hover:text-blue-600 transition-colors duration-300">
              QUICK<span className="text-blue-600">CAST</span>
            </h1>
            <h2 className="text-4xl font-bold mb-4 text-[#191676] hover:text-blue-600 transition duration-300">
              Contact Us
            </h2>
            <p className="text-[#191676] text-lg">
              Have questions about our realtime presentation system? We'd love
              to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-lg p-8 shadow-xl border border-blue-100 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#191676]">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                    ),
                    title: 'Email',
                    text: 'support@quickcast.com',
                  },
                  {
                    icon: <PhoneIcon className="h-6 w-6 text-blue-600" />,
                    title: 'Phone',
                    text: '+1 (555) 123-4567',
                  },
                  {
                    icon: <MapPinIcon className="h-6 w-6 text-blue-600" />,
                    title: 'Address',
                    text:
                      '123 Innovation Way\nTech District, San Francisco, CA 94103',
                  },
                  {
                    icon: <ClockIcon className="h-6 w-6 text-blue-600" />,
                    title: 'Business Hours',
                    text:
                      'Monday - Friday: 9 AM - 6 PM\nSaturday & Sunday: Closed',
                  },
                ].map(({ icon, title, text }, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start space-x-4 p-2 rounded-lg transition duration-300 hover:bg-blue-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <div>
                      <h3 className="text-lg font-medium text-[#191676] group-hover:text-blue-700">
                        {title}
                      </h3>
                      <p className="text-[#191676] whitespace-pre-line">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-lg p-8 shadow-xl border border-blue-100 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <motion.div
                    key={field}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-[#191676] mb-2"
                    >
                      {field === 'name'
                        ? 'Your Name'
                        : field === 'email'
                        ? 'Email Address'
                        : 'Subject'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-[#191676] placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:ring-1 hover:ring-blue-300"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      required
                    />
                  </motion.div>
                ))}

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#191676] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-[#191676] placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:ring-1 hover:ring-blue-300"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  ></textarea>
                </motion.div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg"
                  >
                    Thank you for your message! We'll get back to you soon.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-3 font-semibold overflow-hidden rounded-lg bg-[#191676] text-white hover:bg-blue-900 transform transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative">
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
