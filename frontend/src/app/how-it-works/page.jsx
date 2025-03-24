// pages/how-it-works.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const HowItWorksPage = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Presentation",
      description: "Design your presentation using our intuitive interface or import existing slides from PowerPoint, Google Slides, or other tools. Add interactive elements like polls, quizzes, and Q&A sections.",
      image: "/images/create-presentation.jpg", // Replace with your actual image path
      alt: "Person creating a presentation on laptop"
    },
    {
      id: 2,
      title: "Invite Your Audience",
      description: "Generate a unique link to share with your audience or schedule your presentation for a specific time. Send invitations via email, calendar integrations, or share directly to social platforms.",
      image: "/images/invite-audience.jpg", // Replace with your actual image path
      alt: "Share link illustration with devices"
    },
    {
      id: 3,
      title: "Present in Real-time",
      description: "Start your presentation and engage with your audience in real-time. See live reactions, answer questions as they come in, and adapt your content based on audience feedback and engagement metrics.",
      image: "/images/live-presentation.jpg", // Replace with your actual image path
      alt: "Presenter engaging with virtual audience"
    },
    {
      id: 4,
      title: "Analyze & Improve",
      description: "After your presentation, review comprehensive analytics to understand audience engagement, identify areas of interest, and gain insights for improving future presentations.",
      image: "/images/analyze-data.jpg", // Replace with your actual image path
      alt: "Analytics dashboard with presentation data"
    }
  ];

  const useCases = [
    {
      title: "Corporate Meetings",
      description: "Transform board meetings and company updates with interactive elements that keep everyone engaged.",
      icon: "🏢"
    },
    {
      title: "Educational Lectures",
      description: "Help students learn more effectively with dynamic classroom presentations that promote active participation.",
      icon: "🎓"
    },
    {
      title: "Sales Pitches",
      description: "Close more deals by creating compelling, interactive presentations that respond to prospect interests in real-time.",
      icon: "💼"
    },
    {
      title: "Conferences",
      description: "Deliver keynotes that stand out with audience participation features and real-time feedback loops.",
      icon: "🎤"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>How It Works - PresentLive</title>
        <meta name="description" content="Learn how PresentLive transforms your presentation experience with real-time audience engagement" />
      </Head>

      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat text-white flex items-end"
        style={{
          backgroundImage: "url('https://www.printworkers.com/images/post-6-1689111379.jpg')",
          height: "100vh", // Full viewport height
        }}
      >
        <div className="w-full"> {/* Removed background blur */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center pb-20"> {/* Added padding-bottom to push text up slightly */}

              {/* Animated Heading */}
              <h1
                className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up 
                     transition-all duration-500 ease-in-out hover:text-indigo-400 hover:scale-105"
              >
                How PresentLive Works
              </h1>

              {/* Animated Paragraph */}
              <p
                className="text-xl opacity-90 mb-10 animate-fade-in-up-delay 
                     transition-all duration-500 ease-in-out hover:text-gray-300 hover:opacity-100"
              >
                A simple four-step process to create engaging, interactive presentations
                that captivate your audience and deliver measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* How It Works Steps */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 animate-fade-in transition duration-300 hover:scale-105 hover:text-blue-600">
            Four Simple Steps to Interactive Presentations
          </h2>


          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
              >
                {/* Image/Number Section */}
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 transition-transform duration-300">
                    {/* Placeholder for Image */}
                    <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-600'} flex items-center justify-center transition-all duration-300 group-hover:opacity-90`}>
                      {/* Large Number */}
                      <div className="text-white text-9xl font-bold opacity-30 transition-all duration-300 group-hover:opacity-50">
                        {step.id}
                      </div>
                      {/* Icon and Title */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                            {['✏️', '🔗', '🎯', '📊'][index]}
                          </div>
                          <p className="text-xl font-medium transition-colors duration-300 group-hover:text-indigo-200">
                            {step.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="md:w-1/2">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-transform duration-300 group">
                    {/* Step Badge */}
                    <div className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full px-4 py-1 text-sm mb-4 transition-colors duration-300 group-hover:bg-blue-200 group-hover:text-blue-900">
                      Step {step.id}
                    </div>
                    {/* Step Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-indigo-600">
                      {step.title}
                    </h3>
                    {/* Step Description */}
                    <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 animate-fade-in transition duration-300 hover:scale-105 hover:text-blue-600">
              Perfect For Any Presentation Setting
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-delay transition duration-300 hover:text-gray-800 hover:scale-105">
              PresentLive adapts to your specific presentation needs, whether you're in a boardroom, classroom, or conference hall.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 transition-transform group"
                >
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-indigo-600">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
          <div className="md:flex">
            {/* Testimonial Image Section */}
            <div className="md:w-1/3 bg-indigo-600">
              <div className="h-48 md:h-full flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-indigo-400 mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Text Section */}
            <div className="p-8 md:p-12 md:w-2/3">
              <div className="text-indigo-600 mb-4 transition-colors duration-300 group-hover:text-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-300 ease-in-out hover:scale-110 animate-pulse"
                >
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                </svg>

              </div>
              <blockquote className="text-xl text-gray-700 italic mb-6 transition-all duration-300 group-hover:text-gray-800 hover:scale-105 hover:text-blue-600 animate-fade-in">
                PresentLive has completely transformed how we deliver client presentations. The real-time engagement features have helped us close 40% more deals since we started using the platform.
              </blockquote>
              <div className="group transition-all duration-300 hover:scale-105 hover:shadow-lg p-2 rounded-lg">
                <p className="font-bold text-gray-800 transition-colors duration-300 group-hover:text-indigo-600">
                  Sarah Johnson
                </p>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  VP of Sales, TechInnovate Inc.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Animated Heading */}
          <h2
            className="text-3xl font-bold mb-6 hover:text-gray-200 transition-colors duration-300 animate-fade-in"
          >
            Ready to Transform Your Presentations?
          </h2>

          {/* Animated Paragraph */}
          <p
            className="text-xl max-w-2xl mx-auto mb-8 hover:text-gray-300 transition-colors duration-300 animate-fade-in-delay"
          >
            Start creating engaging, interactive presentations today with our easy-to-use platform.
          </p>

          {/* Buttons with Hover Effects */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="bg-transparent hover:bg-indigo-500 transition-colors border-2 border-white font-semibold py-3 px-8 rounded-lg hover:border-indigo-300 hover:scale-105 transition-transform duration-300"
            >
              See a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;