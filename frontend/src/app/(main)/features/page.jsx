// "use client";
// import React from 'react';
// import Head from 'next/head';
// import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';

// const FeaturesPage = () => {
//   const mainFeatures = [
//     {
//       title: "Live Audience Interaction",
//       description: "Transform one-way presentations into dynamic conversations with live polls, Q&A sessions, and real-time audience feedback.",
//       icon: "💬",
//       details: [
//         "Live polling with instant results visualization",
//         "Moderated Q&A with upvoting capabilities",
//         "Audience reaction tools and sentiment analysis",
//         "Anonymous feedback options for honest input"
//       ]
//     },
//     {
//       title: "Real-time Collaboration",
//       description: "Enable multiple presenters to contribute simultaneously regardless of their location, creating truly collaborative experiences.",
//       icon: "🤝",
//       details: [
//         "Multi-presenter mode with seamless transitions",
//         "Live slide editing and annotation by team members",
//         "Presenter chat and coordination tools",
//         "Role-based permissions for controlled collaboration"
//       ]
//     },
//     {
//       title: "Advanced Analytics",
//       description: "Gain valuable insights into audience engagement and presentation effectiveness with comprehensive analytics.",
//       icon: "📊",
//       details: [
//         "Engagement metrics for each slide and segment",
//         "Audience attention tracking and heatmaps",
//         "Question and feedback analysis",
//         "Presentation performance comparison over time"
//       ]
//     },
//     {
//       title: "Cross-Platform Accessibility",
//       description: "Present and participate from any device, anywhere, ensuring maximum accessibility for all participants.",
//       icon: "🌐",
//       details: [
//         "Responsive design across desktop, tablet, and mobile",
//         "Native apps for iOS and Android",
//         "Low-bandwidth mode for unreliable connections",
//         "Offline capabilities with automatic sync"
//       ]
//     }
//   ];

//   const additionalFeatures = [
//     { name: "Custom Branding", description: "Apply your organization's brand colors, logos, and styling" },
//     { name: "Template Library", description: "Access professionally designed templates for quick presentation creation" },
//     { name: "AI-Powered Insights", description: "Get smart suggestions to improve presentation effectiveness" },
//     { name: "Breakout Rooms", description: "Split audiences into smaller groups for focused discussions" },
//     { name: "Media Integration", description: "Seamlessly embed videos, audio, and interactive media" },
//     { name: "Recording & Playback", description: "Record presentations with all interactions for later review" },
//     { name: "Advanced Security", description: "Enterprise-grade encryption and access controls" },
//     { name: "Integration Ecosystem", description: "Connect with popular tools like Slack, Teams, and Zoom" }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Features - PresentLive</title>
//         <meta name="description" content="Explore the powerful features of PresentLive - the ultimate realtime presentation platform" />
//       </Head>

//       {/* Hero Section with Background Image - Increased Height */}
//       <div
//         className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
//         style={{
//           backgroundImage: "url('https://img.freepik.com/premium-photo/young-businessman-leading-presentation-boardroom_625516-868.jpg?w=2000')"
//         }}
//       >
//         <div className="container mx-auto px-4 py-20 text-center group">
//           <h1
//             className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in transition-all duration-500 ease-in-out
//                hover:scale-105 hover:text-indigo-300 group-hover:text-cyan-300 hover:shadow-lg"
//           >
//             Powerful Features for Impactful Presentations
//           </h1>
//           <p
//             className="text-xl md:text-2xl max-w-3xl mx-auto text-white opacity-90 animate-fade-in-delay transition-all duration-500 ease-in-out
//                hover:translate-y-1 hover:text-indigo-200 group-hover:text-pink-300"
//           >
//             Discover the tools that will transform your presentations from monologues to engaging experiences
//           </p>
//         </div>
//       </div>

//       {/* Main Features */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {mainFeatures.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group transform hover:-translate-y-2"
//             >
//               <div className="p-6">
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
//                   {feature.title}
//                 </h2>
//                 <p className="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors duration-300">
//                   {feature.description}
//                 </p>

//                 <h3 className="font-semibold text-gray-700 mb-3">Key capabilities:</h3>
//                 <ul className="space-y-2">
//                   {feature.details.map((detail, i) => (
//                     <li key={i} className="flex items-start">
//                       <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0 group-hover:text-indigo-600 transition-colors duration-300" />
//                       <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//                         {detail}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Additional Features */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <h2
//             className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in transition-all duration-500 ease-in-out
//              hover:text-indigo-500 group-hover:text-cyan-500"
//           >
//             Additional Features
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//             {additionalFeatures.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-2"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
//                   {feature.name}
//                 </h3>
//                 <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-indigo-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-6">
//             Ready to Experience the Power?
//           </h2>
//           <p className="text-lg text-center mb-12">
//             Join us today and elevate your presentations to a whole new level.
//           </p>
//           <div className="flex justify-center">
//             <Link href="/sign-up">
//               <div className="bg-cyan-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-300">
//                 Get Started
//               </div>
//             </Link>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturesPage;
// pages/features.js
"use client";
import React from 'react';
import Head from 'next/head';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AnimatedContainer, AnimatedItem, fadeInUpVariants, hoverVariants } from "@/animations/PageTransation";

import { motion } from "framer-motion";
import { Clock, Users, BarChart2, Presentation, MessageSquare, Settings } from "lucide-react";

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

  const features = [
    {
      icon: <Presentation className="h-8 w-8" />,
      title: "Interactive Slides",
      description: "Create engaging presentations with interactive elements and real-time updates."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Live Q&A",
      description: "Enable audience participation with live questions and answers during your presentation."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Polls",
      description: "Gather instant feedback with live polls and surveys during your presentation."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Audience Analytics",
      description: "Get detailed insights into audience engagement and interaction patterns."
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Performance Metrics",
      description: "Track presentation performance with comprehensive analytics and reports."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customizable Settings",
      description: "Tailor your presentation experience with customizable settings and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <Head>
        <title>Features - PresentLive</title>
        <meta name="description" content="Explore the powerful features of PresentLive - the ultimate realtime presentation platform" />
      </Head>

      <AnimatedContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUpVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.05, color: "#818CF8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Powerful Features
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            whileHover={{ y: -5, color: "#4B5563" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Everything you need to create engaging presentations
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedItem key={index}>
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden group"
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Hover Effect Background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                <motion.div 
                  className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-3 relative z-10"
                  whileHover={{ color: "#818CF8" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 relative z-10"
                  whileHover={{ color: "#4B5563" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedContainer>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {mainFeatures.map((feature, index) => (
            <AnimatedItem key={index}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden relative group"
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Feature Icon with Animation */}
                <motion.div 
                  className="absolute top-4 right-4 text-4xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>

                <div className="p-6 relative z-10">
                  <motion.h2 
                    className="text-2xl font-bold text-gray-800 mb-3"
                    whileHover={{ color: "#818CF8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.title}
                  </motion.h2>
                  <motion.p 
                    className="text-gray-600 mb-6"
                    whileHover={{ color: "#4B5563" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.description}
                  </motion.p>

                  <motion.h3 
                    className="font-semibold text-gray-700 mb-3"
                    whileHover={{ color: "#818CF8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Key capabilities:
                  </motion.h3>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-600">
                          {detail}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <motion.div 
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            whileHover={{ scale: 1.05, color: "#818CF8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Additional Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <AnimatedItem key={index}>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow relative overflow-hidden group"
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Hover Effect Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  <motion.h3 
                    className="text-xl font-semibold text-gray-800 mb-2 relative z-10"
                    whileHover={{ color: "#818CF8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.name}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 relative z-10"
                    whileHover={{ color: "#4B5563" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-indigo-900 text-white py-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl font-bold mb-6"
            whileHover={{ scale: 1.05, color: "#FCD34D" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ready to Transform Your Presentations?
          </motion.h2>

          <motion.p
            className="text-xl max-w-2xl mx-auto mb-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Join thousands of organizations already using PresentLive to create engaging, interactive presentations.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/demo"
                className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-lg shadow-lg inline-block"
              >
                Request a Demo
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/pricing"
                className="bg-transparent border-2 border-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center shadow-lg"
              >
                View Pricing
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;