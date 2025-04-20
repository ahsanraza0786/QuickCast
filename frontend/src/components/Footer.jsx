function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#4C6FF9] to-[#9B4DFF] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PresentLive</h3>
            <p className="text-gray-200">
              Transforming presentations with real-time interaction and engagement.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Features</a></li>
              <li><a href="#pricing" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Pricing</a></li>
              <li><a href="#demo" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Demo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">About</a></li>
              <li><a href="#contact" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Contact</a></li>
              <li><a href="#careers" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#twitter" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Twitter</a></li>
              <li><a href="#linkedin" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">LinkedIn</a></li>
              <li><a href="#facebook" className="text-gray-200 transition-all duration-300 hover:text-yellow-300 hover:scale-105 inline-block">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-indigo-300 text-center text-gray-100">
          <p>&copy; 2025 PresentLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
