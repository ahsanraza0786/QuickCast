"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, BarChart2, Menu, X } from 'lucide-react';
import Navbar from '@/components/Navbar';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar Component */}
      <Navbar />
      {/* Hero Section */}
      <div
        id="home"
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[90vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/z/modern-blue-white-abstract-presentation-background-corporate-concept-beautiful-293973337.jpg')",
        }}
      >
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-28 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#2A259A] sm:text-6xl md:text-7xl">
              <span className="block transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D]">
                Transform Your
              </span>
              <span className="block text-[#2A259A] transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D]">
                Presentations Forever
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-[#2A259A] transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D] hover:shadow-lg">
              Engage your audience in real-time with interactive slides, live polls,
              and instant feedback. The future of presentations is here.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="rounded-md shadow">
                <a
                  href="#demo"
                  className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                >
                  See Demo
                </a>
              </div>
              <div className="ml-4 rounded-md shadow">
                <a
                  href="#trial"
                  className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-800 hover:shadow-md">
              Everything you need to create engaging presentations that captivate your audience
            </p>
          </div>


          <div className="mt-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div
                className="relative bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
                style={{
                  backgroundImage: "url('https://png.pngtree.com/png-clipart/20190516/original/pngtree-company-presentation-png-image_2959728.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "250px" // Ensure there's enough height to see the background
                }}
              >
                {/* Background Overlay (Optional) */}
                <div className="absolute inset-0 bg-white/80 rounded-xl"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center transition-colors">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">Real-time Interaction</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Connect with your audience in real-time with interactive polls, quizzes, and Q&A sessions. Boost engagement and participation instantly.
                  </p>
                </div>
              </div>


              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Audience Insights</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Gain valuable insights with comprehensive analytics on audience engagement, interaction patterns, and content performance.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <BarChart2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Dynamic Content</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Create stunning presentations with rich multimedia, animations, and interactive elements that leave a lasting impression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 transition-all duration-300 hover:text-indigo-600 hover:scale-105">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500 transition-all duration-300 hover:text-gray-700 hover:scale-105">
              Simple. Powerful. Effective.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

              {/* Step 1 */}
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
                  Create Presentation
                </h3>
                <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                  Design your slides using our intuitive drag-and-drop editor with templates and rich media support.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
                  Share with Audience
                </h3>
                <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                  Invite viewers via email or generate a unique link that allows anyone to join your presentation.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
                  Present & Engage
                </h3>
                <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                  Start your presentation and interact with your audience through polls, questions, and feedback.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
      {/* About Section */}
      <div id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 transition duration-300 ease-in-out transform hover:text-gray-600 hover:scale-105">
              About PresentLive
            </h2>
            <p className="mt-4 text-lg text-gray-500 transition duration-300 ease-in-out transform hover:text-gray-800 hover:translate-y-1">
              Transforming the way people present and engage
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Our Mission */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-blue-400">
              <h3 className="text-xl font-bold text-gray-900 mb-4 transition duration-300 ease-in-out transform hover:text-blue-600 hover:scale-110 hover:tracking-wide">
                Our Mission
              </h3>
              <p className="text-gray-700 transition duration-300 ease-in-out transform hover:text-gray-900 hover:translate-y-1">
                At PresentLive, we believe presentations should be dynamic, interactive experiences that engage audiences and drive better outcomes. Our mission is to transform static presentations into powerful tools for connection and collaboration.
              </p>
            </div>

            {/* Our Story */}
            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-purple-400">
              <h3 className="text-xl font-bold text-gray-900 mb-4 transition duration-300 ease-in-out transform hover:text-purple-600 hover:scale-110 hover:tracking-wide">
                Our Story
              </h3>
              <p className="text-gray-700 transition duration-300 ease-in-out transform hover:text-gray-900 hover:translate-y-1">
                Founded in 2023, PresentLive was born from a simple observation: traditional presentations often fail to engage audiences. Our team of presentation experts and software engineers came together to create a solution that bridges the gap between presenters and their audiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#ECE5FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#191676] transition duration-300 ease-in-out transform hover:text-[#100e4a] hover:scale-105">
              Ready to transform your presentations?
            </h2>
            <p className="mt-4 text-lg text-[#5a4fcf] transition duration-300 ease-in-out transform hover:text-[#3d32a3] hover:translate-y-1">
              Start engaging your audience in real-time today.
            </p>

            {/* Animated Cards */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Interactive Features */}
              <div className="bg-gradient-to-br from-[#ECE5FD] to-[#D8C9FF] rounded-lg p-6 border border-[#c4b6fd] h-48 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:bg-opacity-100">
                <h3 className="text-xl font-bold text-[#191676] mb-4 transition duration-300 ease-in-out transform hover:text-[#100e4a] hover:scale-105">
                  Interactive Features
                </h3>
                <p className="text-[#3d32a3] transition duration-300 ease-in-out transform hover:text-[#191676] hover:translate-y-1">
                  Engage audiences with real-time polling, Q&A, and live feedback.
                </p>
              </div>

              {/* Card 2: Q&A Sessions */}
              <div className="bg-gradient-to-br from-[#ECE5FD] to-[#D8C9FF] rounded-lg p-6 border border-[#c4b6fd] h-48 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:bg-opacity-100">
                <h3 className="text-xl font-bold text-[#191676] mb-4 transition duration-300 ease-in-out transform hover:text-[#100e4a] hover:scale-105">
                  Question & Answer Sessions
                </h3>
                <p className="text-[#3d32a3] transition duration-300 ease-in-out transform hover:text-[#191676] hover:translate-y-1">
                  Allow your audience to ask questions in real-time and get instant responses.
                </p>
              </div>

              {/* Card 3: Live Polling */}
              <div className="bg-gradient-to-br from-[#ECE5FD] to-[#D8C9FF] rounded-lg p-6 border border-[#c4b6fd] h-48 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:bg-opacity-100">
                <h3 className="text-xl font-bold text-[#191676] mb-4 transition duration-300 ease-in-out transform hover:text-[#100e4a] hover:scale-105">
                  Live Polling
                </h3>
                <p className="text-[#3d32a3] transition duration-300 ease-in-out transform hover:text-[#191676] hover:translate-y-1">
                  Create interactive polls to gather instant audience feedback and boost engagement.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <a
                href="#signup"
                className="bg-[#191676] text-white font-medium px-6 py-3 rounded-md transition duration-300 ease-in-out transform hover:bg-[#100e4a] hover:text-[#ECE5FD] hover:scale-110"
              >
                Sign Up for Free
              </a>
            </div>
          </div>
        </div>
      </div>




      {/* Footer */}
      <footer className="bg-[#090562] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PresentLive</h3>
              <p className="text-gray-300">Transforming presentations with real-time interaction and engagement.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#demo" className="text-gray-300 hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#careers" className="text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#twitter" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#linkedin" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#facebook" className="text-gray-300 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 PresentLive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;