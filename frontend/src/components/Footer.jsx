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

import { Twitter, Linkedin, Facebook, Mail, Users, Bookmark, HelpCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#4C6FF9] to-[#9B4DFF] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PresentLive</h3>
            <p className="text-gray-200">
              Transforming presentations with real-time interaction and engagement.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#twitter" className="text-gray-200 hover:text-yellow-300 transition-all duration-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#linkedin" className="text-gray-200 hover:text-yellow-300 transition-all duration-300">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#facebook" className="text-gray-200 hover:text-yellow-300 transition-all duration-300">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Bookmark size={16} />
                  <span>Features</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Bookmark size={16} />
                  <span>Pricing</span>
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Bookmark size={16} />
                  <span>Demo</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Users size={16} />
                  <span>About</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Mail size={16} />
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Users size={16} />
                  <span>Careers</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <HelpCircle size={16} />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Bookmark size={16} />
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-200 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
                  <Mail size={16} />
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-indigo-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200">&copy; 2025 PresentLive. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#privacy" className="text-gray-200 hover:text-yellow-300 text-sm">Privacy Policy</a>
              <a href="#terms" className="text-gray-200 hover:text-yellow-300 text-sm">Terms of Service</a>
              <a href="#cookies" className="text-gray-200 hover:text-yellow-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;