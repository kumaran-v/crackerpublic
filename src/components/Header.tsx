
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold festive-gradient bg-clip-text text-transparent">
              FireworksFestival
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="font-medium hover:text-festival-purple transition-colors">
              All Products
            </Link>
            <Link to="/products?category=flower-pots" className="font-medium hover:text-festival-purple transition-colors">
              Flower Pots
            </Link>
            <Link to="/products?category=rockets" className="font-medium hover:text-festival-purple transition-colors">
              Rockets
            </Link>
            <Link to="/products?category=gift-boxes" className="font-medium hover:text-festival-purple transition-colors">
              Gift Boxes
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 h-9 w-40 lg:w-56 rounded-full bg-gray-100"
              />
            </div>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-festival-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 h-9 w-full rounded-full bg-gray-100"
              />
            </div>
            
            <nav className="space-y-2">
              <Link 
                to="/products" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/products?category=flower-pots" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Flower Pots
              </Link>
              <Link 
                to="/products?category=rockets" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rockets
              </Link>
              <Link 
                to="/products?category=gift-boxes" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gift Boxes
              </Link>
              <Link 
                to="/about" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
