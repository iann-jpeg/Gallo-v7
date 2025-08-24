import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Claims", href: "/claims" },
    { name: "Diaspora", href: "/diaspora" },
    { name: "Consultancy", href: "/consultancy" },
    { name: "Quotes", href: "/quotes" },
    { name: "Outsourcing", href: "/outsourcing" },
  ];

  return (
    <header className="bg-background border-b shadow-sm sticky top-0 z-50">
      {/* Top bar removed for contact migration */}

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2" style={{ alignItems: 'center' }}>
            <img
              src="/galloways logo.jpg"
              alt="Galloways Logo"
              className="h-44 w-44 object-cover rounded-full mr-8 drop-shadow-lg bg-transparent border-4 border-white"
              style={{ background: 'transparent', mixBlendMode: 'multiply', marginBottom: '2.5rem' }}
            />
            <div className="hidden lg:block text-2xl font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '32rem' }}>
              Galloways Insurance Agencies & Consultancy Services
            </div>
            <div className="block lg:hidden text-xl font-bold text-primary">
              Galloways Insurance Agencies & Consultancy Services
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-accent transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/quotes">Get Quote</Link>
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link to="/consultancy">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <nav className="py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/quotes">Get Quote</Link>
                </Button>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link to="/consultancy">Book Consultation</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;