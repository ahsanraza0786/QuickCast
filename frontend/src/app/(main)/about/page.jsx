// // pages/about.js
// import React from 'react';
// import Head from 'next/head';

// export default function About() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>About - PresentLive</title>
//         <meta name="description" content="About PresentLive - Revolutionizing the presentation experience" />
//       </Head>

//       {/* Hero Section */}
//       <div
//         className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
//         style={{
//           backgroundImage: "url('/img/aboutbg.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "100vh"
//         }}
//       >
//         <div className="relative text-center animate-fade-in mt-96">
//           <h1
//             className="text-5xl md:text-6xl font-bold text-[#191676] mb-4 transition-all duration-500 transform hover:text-blue-500 hover:scale-105 hover:rotate-1"
//           >
//             About PresentLive
//           </h1>
//           <p
//             className="text-2xl md:text-3xl text-gray-700 transition-all duration-500 transform hover:text-gray-900 hover:translate-y-1"
//           >
//             Revolutionizing the Presentation Experience
//           </p>
//         </div>
//       </div>

//       <main className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* Key Features Section */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center transition-all duration-500 transform hover:text-[#191676] hover:scale-105 hover:tracking-wide">
//             Key Features
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "Live Audience Interaction", description: "Enable Q&A sessions, polls, and live reactions", icon: "📊" },
//               { title: "Realtime Collaboration", description: "Multiple presenters can contribute simultaneously", icon: "🌐" },
//               { title: "Instant Analytics", description: "Comprehensive engagement metrics and feedback", icon: "📈" },
//               { title: "Seamless Integration", description: "Works with existing presentation software", icon: "🔄" },
//               { title: "Cross-Platform Accessibility", description: "Present from any device, anywhere", icon: "📱" },
//               { title: "Cloud Storage", description: "Securely store and access presentations", icon: "☁️" }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
//               >
//                 <div className="text-3xl mb-4 group-hover:rotate-6 transition-transform duration-300">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">{feature.title}</h3>
//                 <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call-to-Action Section */}
//         <div className="text-center bg-gradient-to-r from-[#191676] to-purple-600 text-white py-12 px-4 rounded-xl animate-gradient">
//           <h2 className="text-3xl font-bold mb-4 hover:text-yellow-300 transition-colors duration-300">
//             Join the Presentation Revolution
//           </h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
//             Experience the future of presentations with PresentLive.
//           </p>
//           <button className="bg-white text-[#191676] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-110 duration-300">
//             Get Started Today
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { AnimatedContainer, AnimatedItem, fadeInUpVariants, hoverVariants } from "@/animations/PageTransation.jsx";
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - PresentLive</title>
        <meta name="description" content="About PresentLive - Revolutionizing the presentation experience" />
      </Head>

      {/* Hero Section */}
      <motion.div
        className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/img/aboutbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Floating Particles */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="relative text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About PresentLive
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-white/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            Revolutionizing the Presentation Experience
          </motion.p>
        </motion.div>
      </motion.div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Key Features Section */}
        <AnimatedContainer className="mb-16">
          <motion.h2 
            className="text-3xl font-semibold text-gray-800 mb-6 text-center"
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.05, color: "#818CF8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Live Audience Interaction", description: "Enable Q&A sessions, polls, and live reactions", icon: "📊" },
              { title: "Realtime Collaboration", description: "Multiple presenters can contribute simultaneously", icon: "🌐" },
              { title: "Instant Analytics", description: "Comprehensive engagement metrics and feedback", icon: "📈" },
              { title: "Seamless Integration", description: "Works with existing presentation software", icon: "🔄" },
              { title: "Cross-Platform Accessibility", description: "Present from any device, anywhere", icon: "📱" },
              { title: "Cloud Storage", description: "Securely store and access presentations", icon: "☁️" }
            ].map((feature, index) => (
              <AnimatedItem key={index}>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden group"
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
                    className="text-3xl mb-4 relative z-10"
                    whileHover={{ rotate: 6, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-gray-800 mb-2 relative z-10"
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

        {/* Call-to-Action Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-[#191676] to-purple-600 text-white py-12 px-4 rounded-xl relative overflow-hidden"
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
          
          <motion.h2 
            className="text-3xl font-bold mb-4 relative z-10"
            whileHover={{ color: "#FCD34D", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Join the Presentation Revolution
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto relative z-10"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Experience the future of presentations with PresentLive.
          </motion.p>
          <motion.button 
            className="bg-white text-[#191676] font-semibold py-3 px-8 rounded-lg relative z-10 shadow-lg"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "#F3F4F6",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </main>
      <Footer/>
    </div>
  );
}
