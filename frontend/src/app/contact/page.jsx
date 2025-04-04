import React from 'react';
import Link from 'next/link';
import { Presentation, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Real-Time Presentation System
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
          Synchronize slides, engage with live polls, and interact through Q&A — making every presentation more interactive and effective.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-white text-lg px-6 py-6 rounded-md">
            Get Started
          </button>
          <Link href="/contact" passHref legacyBehavior>
            <a>
              <button className="border border-gray-300 bg-white hover:bg-gray-50 transition duration-300 transform hover:scale-105 text-gray-700 text-lg px-6 py-6 rounded-md">
                Contact Us
              </button>
            </a>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              Designed to enhance presentation experiences for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-100 hover:bg-indigo-200 transition duration-300 transform hover:scale-105 rounded-lg p-8 text-center shadow-md">
              <div className="bg-indigo-200 rounded-full p-3 inline-block mb-4">
                <Presentation className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Synchronized Slides</h3>
              <p className="text-gray-700">
                Every attendee sees the same clear view, regardless of their seat.
              </p>
            </div>

            <div className="bg-indigo-100 hover:bg-indigo-200 transition duration-300 transform hover:scale-105 rounded-lg p-8 text-center shadow-md">
              <div className="bg-indigo-200 rounded-full p-3 inline-block mb-4">
                <MessageSquare className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Q&A</h3>
              <p className="text-gray-700">
                Ask questions and get immediate responses through our chat system.
              </p>
            </div>

            <div className="bg-indigo-100 hover:bg-indigo-200 transition duration-300 transform hover:scale-105 rounded-lg p-8 text-center shadow-md">
              <div className="bg-indigo-200 rounded-full p-3 inline-block mb-4">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Polls</h3>
              <p className="text-gray-700">
                Gauge audience understanding with interactive polling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">80%</div>
              <p>Professionals report losing audience engagement due to static presentations</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">65%</div>
              <p>Students prefer interactive presentations for better learning outcomes</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30%</div>
              <p>Increase in collaboration efficiency using real-time presentation tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Presentations?</h2>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
          Join the growing number of professionals enhancing engagement with our Real-Time Presentation System.
        </p>
        <Link href="/contact" passHref legacyBehavior>
          <a className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-white font-bold py-3 px-6 rounded-lg">
            Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
