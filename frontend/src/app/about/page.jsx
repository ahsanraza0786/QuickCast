// pages/about.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - PresentLive</title>
        <meta name="description" content="About PresentLive - Revolutionizing the presentation experience" />
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">About PresentLive</h1>
          <p className="text-xl text-gray-600">Revolutionizing the Presentation Experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe presentations should be dynamic conversations, not one-way monologues. 
              PresentLive empowers presenters to connect with their audience in meaningful ways 
              through realtime feedback, interactive elements, and collaborative tools that break 
              down the barriers between speaker and listener.
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <p className="italic text-indigo-700">
                "Transforming presentations from static slideshows into dynamic, collaborative experiences."
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              {/* Replace with your actual image path */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Connect • Engage • Inspire</h3>
                  <p>Realtime presentation solutions for the modern workspace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
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

        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Join the Presentation Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of presentations with PresentLive. Transform how you 
            share ideas, engage audiences, and drive meaningful outcomes through the 
            power of realtime connection.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </main>
    </div>
  );
}