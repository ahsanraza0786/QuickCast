// pages/about.js
import React from 'react';
import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - PresentLive</title>
        <meta name="description" content="About PresentLive - Revolutionizing the presentation experience" />
      </Head>

      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/corporate-concept-presentation-background-generative-ai_804788-121419.jpg')" }}
      >
        <div className="relative text-center animate-fade-in">
          <h1
            className="text-5xl md:text-6xl font-bold text-[#191676] mb-4 transition-all duration-500 transform hover:text-blue-500 hover:scale-105 hover:rotate-1">
            About PresentLive
          </h1>
          <p
            className="text-2xl md:text-3xl text-gray-700 transition-all duration-500 transform hover:text-gray-900 hover:translate-y-1">
            Revolutionizing the Presentation Experience
          </p>
        </div>

      </div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Key Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center transition-all duration-500 transform hover:text-[#191676] hover:scale-105 hover:tracking-wide">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Live Audience Interaction", description: "Enable Q&A sessions, polls, and live reactions", icon: "📊" },
              { title: "Realtime Collaboration", description: "Multiple presenters can contribute simultaneously", icon: "🌐" },
              { title: "Instant Analytics", description: "Comprehensive engagement metrics and feedback", icon: "📈" },
              { title: "Seamless Integration", description: "Works with existing presentation software", icon: "🔄" },
              { title: "Cross-Platform Accessibility", description: "Present from any device, anywhere", icon: "📱" },
              { title: "Cloud Storage", description: "Securely store and access presentations", icon: "☁️" }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:rotate-6 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center bg-gradient-to-r from-[#191676] to-purple-600 text-white py-12 px-4 rounded-xl animate-gradient">
          <h2 className="text-3xl font-bold mb-4 hover:text-yellow-300 transition-colors duration-300">Join the Presentation Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
            Experience the future of presentations with PresentLive.
          </p>
          <button className="bg-white text-[#191676] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-110 duration-300">
            Get Started Today
          </button>
        </div>
      </main>
    </div>
  );
}
