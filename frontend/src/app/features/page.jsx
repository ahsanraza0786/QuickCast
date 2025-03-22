// pages/features.js
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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Impactful Presentations</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Discover the tools that will transform your presentations from monologues to engaging experiences
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h2>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <h3 className="font-semibold text-gray-700 mb-3">Key capabilities:</h3>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Additional Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How PresentLive Compares</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4 text-left rounded-tl-lg">Feature</th>
                <th className="p-4 text-center">PresentLive</th>
                <th className="p-4 text-center">Traditional Solutions</th>
                <th className="p-4 text-center rounded-tr-lg">Basic Online Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200">
                <td className="p-4 font-medium">Real-time Audience Interaction</td>
                <td className="p-4 text-center text-green-500 font-bold">Advanced</td>
                <td className="p-4 text-center text-red-500">Limited</td>
                <td className="p-4 text-center text-yellow-500">Basic</td>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="p-4 font-medium">Multi-Presenter Collaboration</td>
                <td className="p-4 text-center text-green-500 font-bold">Built-in</td>
                <td className="p-4 text-center text-red-500">Not Available</td>
                <td className="p-4 text-center text-yellow-500">Limited</td>
              </tr>
              <tr className="bg-white border-b border-gray-200">
                <td className="p-4 font-medium">Engagement Analytics</td>
                <td className="p-4 text-center text-green-500 font-bold">Comprehensive</td>
                <td className="p-4 text-center text-red-500">Minimal</td>
                <td className="p-4 text-center text-red-500">Not Available</td>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="p-4 font-medium">Cross-Platform Support</td>
                <td className="p-4 text-center text-green-500 font-bold">All Devices</td>
                <td className="p-4 text-center text-yellow-500">Desktop Only</td>
                <td className="p-4 text-center text-yellow-500">Varies</td>
              </tr>
              <tr className="bg-white">
                <td className="p-4 font-medium rounded-bl-lg">Enterprise Security</td>
                <td className="p-4 text-center text-green-500 font-bold">Enterprise-Grade</td>
                <td className="p-4 text-center text-yellow-500">Basic</td>
                <td className="p-4 text-center text-red-500 rounded-br-lg">Minimal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Presentations?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of organizations already using PresentLive to create engaging, interactive presentations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demo" className="bg-white text-indigo-700 hover:bg-gray-100 transition-colors font-semibold py-3 px-6 rounded-lg">
              Request a Demo
            </Link>
            <Link href="/pricing" className="bg-transparent hover:bg-indigo-800 transition-colors border-2 border-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center">
              View Pricing
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;