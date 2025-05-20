// function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-[#4C6FF9] to-[#9B4DFF] text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-bold mb-4">PresentLive</h3>
//             <p className="text-gray-200">
//               Transforming presentations with real-time interaction and engagement.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li><a href="#features" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Features</a></li>
//               <li><a href="#pricing" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Pricing</a></li>
//               <li><a href="#demo" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Demo</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               <li><a href="#about" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">About</a></li>
//               <li><a href="#contact" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Contact</a></li>
//               <li><a href="#careers" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Careers</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Connect</h3>
//             <ul className="space-y-2">
//               <li><a href="#twitter" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Twitter</a></li>
//               <li><a href="#linkedin" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">LinkedIn</a></li>
//               <li><a href="#facebook" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Facebook</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-indigo-300 text-center text-gray-100">
//           <p>&copy; 2025 PresentLive. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
"use client"


import { Twitter, Linkedin, Facebook, Mail, Users, Bookmark, HelpCircle, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Only generate bubbles on the client to avoid hydration mismatch
    const generated = Array.from({ length: 6 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
    }));
    setBubbles(generated);
  }, []);

  const socialIcons = [
    { name: "twitter", icon: Twitter, href: "#twitter" },
    { name: "linkedin", icon: Linkedin, href: "#linkedin" },
    { name: "facebook", icon: Facebook, href: "#facebook" }
  ];
  
  return (
    <footer className="bg-gradient-to-r from-[#4C6FF9] to-[#9B4DFF] text-white py-12 relative overflow-hidden">
      {/* Animated background particles - only render after mount to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
              animation: `float ${bubble.duration}s linear infinite`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, 50px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .social-icon:hover {
          animation: pulse 1s infinite;
        }
        
        .link-hover:hover .icon-arrow {
          transform: translateX(4px);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="transform transition-all duration-500 hover:scale-105">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              PresentLive
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <p className="text-gray-200">
              Transforming presentations with real-time interaction and engagement.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialIcons.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className="text-gray-200 hover:text-yellow-300 transition-all duration-300 transform hover:scale-125 social-icon"
                  onMouseEnter={() => setHoveredIcon(social.name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <social.icon 
                    size={24} 
                    className={`transform transition-all duration-300 ${hoveredIcon === social.name ? 'text-yellow-300' : ''}`}
                  />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
              Product
            </h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Demo'].map((item) => (
                <li key={item} className="transform transition-all duration-300 hover:translate-x-2">
                  <a href={`#${item.toLowerCase()}`} className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2 link-hover group">
                    <Bookmark size={16} className="opacity-70 group-hover:opacity-100" />
                    <span>{item}</span>
                    <ArrowUpRight size={12} className="icon-arrow opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About', icon: Users },
                { name: 'Contact', icon: Mail },
                { name: 'Careers', icon: Users }
              ].map((item) => (
                <li key={item.name} className="transform transition-all duration-300 hover:translate-x-2">
                  <a href={`#${item.name.toLowerCase()}`} className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2 link-hover group">
                    <item.icon size={16} className="opacity-70 group-hover:opacity-100" />
                    <span>{item.name}</span>
                    <ArrowUpRight size={12} className="icon-arrow opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', icon: HelpCircle },
                { name: 'Blog', icon: Bookmark },
                { name: 'Support', icon: Mail }
              ].map((item) => (
                <li key={item.name} className="transform transition-all duration-300 hover:translate-x-2">
                  <a href={`#${item.name.toLowerCase().replace(' ', '-')}`} className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2 link-hover group">
                    <item.icon size={16} className="opacity-70 group-hover:opacity-100" />
                    <span>{item.name}</span>
                    <ArrowUpRight size={12} className="icon-arrow opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-indigo-300 border-opacity-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200">&copy; 2025 PresentLive. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-gray-200 hover:text-yellow-300 text-sm relative group"
                >
                  <span>{item}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;