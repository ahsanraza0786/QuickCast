"use client";
import React from 'react';
import Head from 'next/head';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      title: "Live Audience Interaction",
      description: "Transform one-way presentations into dynamic conversations with live polls, Q&A sessions, and real-time audience feedback.",
      icon: "💬",
      details: [
        "Live polling with instant results visualization",
        "Moderated Q&A with upvoting capabilities",
        "Audience reaction tools and sentiment analysis",
        "Anonymous feedback options for honest input"
      ]
    },
    {
      title: "Real-time Collaboration",
      description: "Enable multiple presenters to contribute simultaneously regardless of their location, creating truly collaborative experiences.",
      icon: "🤝",
      details: [
        "Multi-presenter mode with seamless transitions",
        "Live slide editing and annotation by team members",
        "Presenter chat and coordination tools",
        "Role-based permissions for controlled collaboration"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Gain valuable insights into audience engagement and presentation effectiveness with comprehensive analytics.",
      icon: "📊",
      details: [
        "Engagement metrics for each slide and segment",
        "Audience attention tracking and heatmaps",
        "Question and feedback analysis",
        "Presentation performance comparison over time"
      ]
    },
    {
      title: "Cross-Platform Accessibility",
      description: "Present and participate from any device, anywhere, ensuring maximum accessibility for all participants.",
      icon: "🌐",
      details: [
        "Responsive design across desktop, tablet, and mobile",
        "Native apps for iOS and Android",
        "Low-bandwidth mode for unreliable connections",
        "Offline capabilities with automatic sync"
      ]
    }
  ];

  const additionalFeatures = [
    { name: "Custom Branding", description: "Apply your organization's brand colors, logos, and styling" },
    { name: "Template Library", description: "Access professionally designed templates for quick presentation creation" },
    { name: "AI-Powered Insights", description: "Get smart suggestions to improve presentation effectiveness" },
    { name: "Breakout Rooms", description: "Split audiences into smaller groups for focused discussions" },
    { name: "Media Integration", description: "Seamlessly embed videos, audio, and interactive media" },
    { name: "Recording & Playback", description: "Record presentations with all interactions for later review" },
    { name: "Advanced Security", description: "Enterprise-grade encryption and access controls" },
    { name: "Integration Ecosystem", description: "Connect with popular tools like Slack, Teams, and Zoom" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Features - PresentLive</title>
        <meta name="description" content="Explore the powerful features of PresentLive - the ultimate realtime presentation platform" />
      </Head>

      {/* Hero Section with Background Image - Increased Height */}
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/young-businessman-leading-presentation-boardroom_625516-868.jpg?w=2000')"
        }}
      >
        <div className="container mx-auto px-4 py-20 text-center group">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in transition-all duration-500 ease-in-out
               hover:scale-105 hover:text-indigo-300 group-hover:text-cyan-300 hover:shadow-lg"
          >
            Powerful Features for Impactful Presentations
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-white opacity-90 animate-fade-in-delay transition-all duration-500 ease-in-out
               hover:translate-y-1 hover:text-indigo-200 group-hover:text-pink-300"
          >
            Discover the tools that will transform your presentations from monologues to engaging experiences
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>

                <h3 className="font-semibold text-gray-700 mb-3">Key capabilities:</h3>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0 group-hover:text-indigo-600 transition-colors duration-300" />
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in transition-all duration-500 ease-in-out
             hover:text-indigo-500 group-hover:text-cyan-500"
          >
            Additional Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">
            Ready to Experience the Power?
          </h2>
          <p className="text-lg text-center mb-12">
            Join us today and elevate your presentations to a whole new level.
          </p>
          <div className="flex justify-center">
            <Link href="/sign-up">
              <div className="bg-cyan-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-300">
                Get Started
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
