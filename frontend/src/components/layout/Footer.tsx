import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Galloways</h3>
            <p className="text-sm opacity-90">
              Professional insurance agencies and consultancy services, managing risk and arranging insurance solutions tailored to customers' needs.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm opacity-90 hover:text-accent transition-colors">Insurance Products</Link></li>
              <li><Link to="/claims" className="text-sm opacity-90 hover:text-accent transition-colors">Claims</Link></li>
              <li><Link to="/diaspora" className="text-sm opacity-90 hover:text-accent transition-colors">Diaspora Services</Link></li>
              <li><Link to="/consultancy" className="text-sm opacity-90 hover:text-accent transition-colors">Consultancy</Link></li>
              <li><Link to="/quotes" className="text-sm opacity-90 hover:text-accent transition-colors">Get Quote</Link></li>
              <li><Link to="/downloads" className="text-sm opacity-90 hover:text-accent transition-colors">Forms & Downloads</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm opacity-90">Health Insurance</li>
              <li className="text-sm opacity-90">Motor Insurance</li>
              <li className="text-sm opacity-90">Life Insurance</li>
              <li className="text-sm opacity-90">Property Insurance</li>
              <li className="text-sm opacity-90">Travel Insurance</li>
              <li className="text-sm opacity-90">Corporate Packages</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+254720769993 / +254758301346</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Gallowayunderwritting@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Gallowaysquotations@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Gallowayscustomerservice@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Gallowaysclaims@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2 border border-primary">
          <span className="mr-2 text-primary font-semibold">Live Chat</span>
          <button
            className="bg-primary text-white rounded-full px-3 py-1 font-bold hover:bg-primary/90 focus:outline-none"
            onClick={() => window.open('https://wa.me/254720769993?text=Hello%20Galloways%20Insurance%20Agency%20-%20I%20need%20assistance', '_blank')}
          >
            WhatsApp Chat
          </button>
        </div>
      </div>
          <div className="text-sm opacity-90">
            © 2025 Galloways Insurance Agencies & Consultancy Services. All rights reserved.
          </div>
          <div className="text-sm opacity-90 mt-4 md:mt-0">
            Licensed by Insurance Regulatory Authority (IRA) Kenya
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;