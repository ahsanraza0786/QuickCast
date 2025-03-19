"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js

const Home = () => {
  const router = useRouter(); // ✅ Correct hook for navigation

  function handleClick() {
    router.push("/login"); // ✅ Correct navigation function
  }

  // Sample card data
  const cards = [
    {
      id: 1,
      title: "Web Development",
      description: "Learn modern web development using React, Node.js, and more.",
      img: "https://th.bing.com/th/id/OIP.g7klCcgD-chsoyuYGw3e4AHaE7?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Build cross-platform mobile apps using React Native.",
      img: "https://th.bing.com/th/id/OIP.rl-Vq9TXNeDkdtF-RRI5hgHaE7?w=224&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "Cloud Computing",
      description: "Explore cloud platforms like AWS, Azure, and Google Cloud.",
      img: "https://th.bing.com/th/id/OIP.mPlDfTUMhC90OLNTZnuDGgHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      title: "Machine Learning",
      description: "Discover the power of AI and machine learning in tech.",
      img: "https://th.bing.com/th/id/OIP.YT1KHnJrcIpqJ8zYiQ0zogHaHa?w=626&h=626&rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div
        className="relative w-full h-[450px] flex items-center justify-center text-white text-center rounded-lg overflow-hidden group"
        style={{
          backgroundImage: "url('https://th.bing.com/th/id/R.ac54341504588eedd651ff867f1ef949?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-700 group-hover:bg-black/40"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-5xl font-extrabold tracking-wide animate-fadeIn">
            Welcome to Our Platform
          </h1>
          <p className="text-lg mt-3 text-gray-300 max-w-2xl mx-auto">
            Explore the world of technology and innovation with our expert guidance.
          </p>
          <button
            onClick={() => router.push("/login")} // ✅ Updated navigation
            className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <h2 className="text-3xl font-bold text-center text-blue-600 mt-10 mb-8">Our Services</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-lg p-4 transition transform hover:scale-105">
            <img src={card.img} alt={card.title} className="rounded-md w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mt-3">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.description}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
              Learn More
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Home;
