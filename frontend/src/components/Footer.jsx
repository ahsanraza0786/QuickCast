function Footer() {
    return (
      <footer className="bg-[#090562] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PresentLive</h3>
              <p className="text-gray-300">
                Transforming presentations with real-time interaction and engagement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#demo" className="text-gray-300 hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#careers" className="text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#twitter" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#linkedin" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#facebook" className="text-gray-300 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 PresentLive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer; // ✅ Using export default Footer;
  