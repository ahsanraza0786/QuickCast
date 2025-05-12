// "use client";
// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { Clock, Users, BarChart2 } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import 'aos/dist/aos.css'; // Import AOS styles
// import AOS from 'aos'; // Import AOS library



// const LandingPage = () => {

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true }); // Initialize AOS with some settings
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

//       {/* Hero Section */}
//       <div
//         id="home"
//         className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[90vh] flex items-center justify-center"
//         style={{
//           backgroundImage: "url('/img/homeBGs.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "100vh"
//         }}
//         data-aos="fade-up"
//       >
//         <div className="max-w-7xl mx-auto py-24 px-4 sm:py-28 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-5xl font-extrabold tracking-tight text-[#2A259A] sm:text-6xl md:text-7xl">
//               <span className="block transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D]">
//                 Transform Your
//               </span>
//               <span className="block text-[#2A259A] transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D]">
//                 Presentations Forever
//               </span>
//             </h1>
//             <p className="mt-6 max-w-3xl mx-auto text-xl text-[#2A259A] transform transition-all duration-500 hover:scale-105 hover:text-[#211C7D] hover:shadow-lg">
//               Engage your audience in real-time with interactive slides, live polls,
//               and instant feedback. The future of presentations is here.
//             </p>
//             <div className="mt-8 flex justify-center">
//               <div className="rounded-md shadow">
//                 <a
//                   href="#demo"
//                   className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
//                 >
//                   See Demo
//                 </a>
//               </div>
//               <div className="ml-4 rounded-md shadow">
//                 <a
//                   href="#trial"
//                   className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-200 hover:scale-105 transition-all duration-300"
//                 >
//                   Start Free Trial
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Features Section */}
//       <div id="features" className="py-20 bg-gradient-to-b from-white to-gray-50" data-aos="fade-up">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-gray-900 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
//               Powerful Features
//             </h2>
//             <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-800 hover:shadow-md">
//               Everything you need to create engaging presentations that captivate your audience
//             </p>
//           </div>

//           <div className="mt-20">
//             <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//               {/* Feature 1 */}
//               <div
//                 className="relative bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
//                 style={{
//                   backgroundImage: "url('https://png.pngtree.com/png-clipart/20190516/original/pngtree-company-presentation-png-image_2959728.jpg')",
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   backgroundRepeat: "no-repeat",
//                   minHeight: "250px"
//                 }}
//                 data-aos="fade-up"
//               >
//                 {/* Background Overlay (Optional) */}
//                 <div className="absolute inset-0 bg-white/80 rounded-xl"></div>

//                 <div className="relative z-10">
//                   <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center transition-colors">
//                     <Clock className="h-7 w-7 text-white" />
//                   </div>
//                   <h3 className="mt-5 text-xl font-semibold text-gray-900">Real-time Interaction</h3>
//                   <p className="mt-3 text-gray-600 leading-relaxed">
//                     Connect with your audience in real-time with interactive polls, quizzes, and Q&A sessions. Boost engagement and participation instantly.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 2 */}
//               <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out" data-aos="fade-up">
//                 <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center">
//                   <Users className="h-7 w-7 text-white" />
//                 </div>
//                 <h3 className="mt-5 text-xl font-semibold text-gray-900">Audience Insights</h3>
//                 <p className="mt-3 text-gray-600 leading-relaxed">
//                   Gain valuable insights with comprehensive analytics on audience engagement, interaction patterns, and content performance.
//                 </p>
//               </div>

//               {/* Feature 3 */}
//               <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out" data-aos="fade-up">
//                 <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center">
//                   <BarChart2 className="h-7 w-7 text-white" />
//                 </div>
//                 <h3 className="mt-5 text-xl font-semibold text-gray-900">Dynamic Content</h3>
//                 <p className="mt-3 text-gray-600 leading-relaxed">
//                   Create stunning presentations with rich multimedia, animations, and interactive elements that leave a lasting impression.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works */}
//       <div id="how-it-works" className="py-16 bg-gray-50" data-aos="fade-up">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 transition-all duration-300 hover:text-indigo-600 hover:scale-105">
//               How It Works
//             </h2>
//             <p className="mt-4 text-lg text-gray-500 transition-all duration-300 hover:text-gray-700 hover:scale-105">
//               Simple. Powerful. Effective.
//             </p>
//           </div>

//           <div className="mt-16">
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

//               {/* Step 1 */}
//               <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
//                   1
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
//                   Create Presentation
//                 </h3>
//                 <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
//                   Design your slides using our intuitive drag-and-drop editor with templates and rich media support.
//                 </p>
//               </div>

//               {/* Step 2 */}
//               <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
//                   2
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
//                   Share with Audience
//                 </h3>
//                 <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
//                   Invite viewers via email or generate a unique link that allows anyone to join your presentation.
//                 </p>
//               </div>

//               {/* Step 3 */}
//               <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
//                   3
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
//                   Engage and Collect Feedback
//                 </h3>
//                 <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
//                   Use live polls, quizzes, and feedback forms to capture your audience's attention and get valuable insights.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default LandingPage;


"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library

import { motion } from 'framer-motion';
import Footer from './Footer';

const LandingPage = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with some settings
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <motion.div
        id="home"
        className="relative overflow-hidden min-h-[90vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/img/homeBGs.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70 mix-blend-multiply"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:py-28 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <motion.h1
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Transform Your
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Presentations Forever
              </motion.span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl mx-auto text-xl text-white/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Engage your audience in real-time with interactive slides, live polls,
              and instant feedback. The future of presentations is here.
            </motion.p>
            <motion.div
              className="mt-8 flex justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="rounded-md shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/signup"
                  className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg"
                >
                  See Demo
                </a>
              </motion.div>
              <motion.div
                className="rounded-md shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/signup"
                  className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Start Free Trial
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-white to-gray-50" data-aos="fade-up">
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
                  minHeight: "250px"
                }}
                data-aos="fade-up"
              >
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
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out" data-aos="fade-up">
                <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Audience Insights</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Gain valuable insights with comprehensive analytics on audience engagement, interaction patterns, and content performance.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-2 transition-all duration-300 ease-in-out" data-aos="fade-up">
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
      <div id="how-it-works" className="py-16 bg-gray-50" data-aos="fade-up">
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
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
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
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
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
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:scale-105" data-aos="fade-up">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300">
                  Engage and Collect Feedback
                </h3>
                <p className="mt-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                  Use live polls, quizzes, and feedback forms to capture your audience's attention and get valuable insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default LandingPage;
