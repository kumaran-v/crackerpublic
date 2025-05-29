
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { logOrder, logPageVisit } from '@/lib/googleSheets';
import { OrderData, PageVisitData } from '@/lib/types';

// List of valid pincodes
const VALID_PINCODES = [
  '600001',
'600017',
'600020',
'600040',
'600011',
'600004',
'600042',
'600015',
'600045',
'600034',
'600024',
'600014',
'600041',
'600116',
'600032',
'600008',
'600083',
'600090',
'600095',
'600068',
'602001',
'600054',
'600053',
'601204',
'601102',
'600072',
'600056',
'600052',
'600067',
'602024',
'600124',
'602108',
'601201',
'602026',
'631210',
'601203',
'602025'
];

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [pincodeError, setPincodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  // Log page visit
  useEffect(() => {
    const pageVisitData: PageVisitData = {
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      referrer: document.referrer || null
    };
    
    logPageVisit(pageVisitData).catch(() => {
      // Silent catch - we don't want to show errors for analytics
    });
  }, [location.pathname]);
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate pincode if that's the field being changed
    if (name === 'pincode') {
      if (value && !VALID_PINCODES.includes(value)) {
        setPincodeError('This pincode is not serviceable');
      } else {
        setPincodeError('');
      }
    }
  };
  
  const handleQuickPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      return;
    }
    
    // Validate pincode before submission
    if (!formData.pincode) {
      setPincodeError('Pincode is required');
      toast.error('Please enter a valid pincode');
      return;
    }
    
    if (!VALID_PINCODES.includes(formData.pincode)) {
      setPincodeError('This pincode is not serviceable');
      toast.error('The entered pincode is not serviceable');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format order items for the spreadsheet
      const orderItemsStr = cart.items
        .map(item => `${item.product.name} (${item.quantity}x ₹${item.product.price})`)
        .join(', ');
      
      // Prepare order data for Google Sheets (matching Python script format)
      const orderData: OrderData = {
        timestamp: new Date().toISOString(),
        customerName: formData.name,
        customerEmail: '', // Keeping this field for compatibility
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, Pincode: ${formData.pincode}`,
        orderItems: orderItemsStr,
        totalAmount: cart.total,
        orderStatus: "New"
      };
      
      
      // Try to log to Google Sheets
      toast.info("Processing your order...");
      const sheetLogged = await logOrder(orderData);
      
      if (sheetLogged) {
        toast.success("Order received successfully!");
        
        // Clear the cart and reset form
        clearCart();
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          pincode: ''
        });
      } else {
        toast.error("Unable to place order. Please try again later.");
      }
    } catch (error) {
      toast.error("There was an issue processing your order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cart.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">Cart Items ({cart.items.reduce((total, item) => total + item.quantity, 0)})</h2>
                    
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-b-0">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium">
                            <Link to={`/products/${item.product.id}`} className="hover:text-festival-purple">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {item.product.description}
                          </p>
                          <div className="flex flex-wrap items-center mt-2 gap-2">
                            <span className="font-bold">₹{item.product.price}</span>
                            {item.product.originalPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0 sm:ml-4">
                          <div className="flex items-center mr-4">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                              className="h-8 w-12 rounded-none text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-500 hover:text-festival-red"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-4 justify-between items-center">
                    <Button variant="outline" onClick={() => clearCart()}>
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{cart.subtotal}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between text-festival-purple">
                        <span>Discount</span>
                        <span>-₹{cart.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{cart.total}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                </div>
                
                {/* Quick Purchase Form */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Purchase</h2>
                  <p className="text-gray-600 mb-4">
                    Fill in your details to place an order without creating an account.
                  </p>
                  
                  <form onSubmit={handleQuickPurchase}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                          Delivery Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium mb-1">
                          Pincode
                        </label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                        {pincodeError && (
                          <p className="text-festival-red text-sm mt-1">{pincodeError}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          We deliver only to select areas. Please check if your pincode is serviceable.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-sparkle flex items-center justify-center"
                        disabled={isSubmitting || !!pincodeError}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            Place Order
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any fireworks to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/+919940507152" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
