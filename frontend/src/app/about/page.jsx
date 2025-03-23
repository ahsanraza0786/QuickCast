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

      {/* Hero Section - Full width, outside the container */}
      <div 
        className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ 
          backgroundImage: "url('https://img.freepik.com/premium-photo/corporate-concept-presentation-background-generative-ai_804788-121419.jpg')"
        }}
      >
        <div className="relative text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-[#191676] mb-4">About PresentLive</h1>
          <p className="text-2xl md:text-3xl text-gray-700">Revolutionizing the Presentation Experience</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Our Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe presentations should be dynamic conversations, not one-way monologues.
              PresentLive empowers presenters to connect with their audience in meaningful ways
              through realtime feedback, interactive elements, and collaborative tools that break
              down the barriers between speaker and listener.
            </p>
            <div className="bg-[#191676]/10 p-6 rounded-lg border-l-4 border-[#191676] hover:bg-[#191676]/20 transition-colors duration-300">
              <p className="italic text-[#191676]">
                "Transforming presentations from static slideshows into dynamic, collaborative experiences."
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#191676] to-purple-600 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Connect • Engage • Inspire</h3>
                  <p>Realtime presentation solutions for the modern workspace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Live Audience Interaction",
                description: "Enable Q&A sessions, polls, and live reactions during your presentation",
                icon: "📊"
              },
              {
                title: "Realtime Collaboration",
                description: "Multiple presenters can contribute simultaneously from anywhere in the world",
                icon: "🌐"
              },
              {
                title: "Instant Analytics",
                description: "Gain valuable insights with comprehensive engagement metrics and audience feedback",
                icon: "📈"
              },
              {
                title: "Seamless Integration",
                description: "Works with your existing presentation software and collaboration tools",
                icon: "🔄"
              },
              {
                title: "Cross-Platform Accessibility",
                description: "Present and participate from any device, anywhere",
                icon: "📱"
              },
              {
                title: "Cloud Storage",
                description: "Access your presentations anywhere with secure cloud storage",
                icon: "☁️"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-600 mb-4">
              Founded in 2023 by a team of communication experts and software engineers,
              PresentLive was born from a simple observation: traditional presentations
              often fail to engage audiences meaningfully. We set out to create a platform
              that would transform presentations from static slideshows into dynamic,
              collaborative experiences.
            </p>
            <p className="text-gray-600">
              Today, thousands of organizations worldwide rely on PresentLive to deliver
              impactful presentations that drive understanding, decision-making, and action.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center bg-gradient-to-r from-[#191676] to-purple-600 text-white py-12 px-4 rounded-xl animate-gradient">
          <h2 className="text-3xl font-bold mb-4">Join the Presentation Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of presentations with PresentLive. Transform how you
            share ideas, engage audiences, and drive meaningful outcomes through the
            power of realtime connection.
          </p>
          <button className="bg-white text-[#191676] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 transition-transform duration-300">
            Get Started Today
          </button>
        </div>
      </main>

      
    </div>
  );
}