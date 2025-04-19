
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, applyPromoCode, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleApplyPromo = () => {
    if (!promoCode) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const validCodes = ['FESTIVAL10', 'DIWALI20', 'SUMMER15'];
    if (validCodes.includes(promoCode)) {
      applyPromoCode(promoCode);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const shareCartOnWhatsApp = () => {
    const message = `Check out my fireworks cart! 🎆 \n\n` + 
      cart.items.map(item => 
        `${item.product.name} - ₹${item.product.price} x ${item.quantity} = ₹${item.product.price * item.quantity}`
      ).join('\n') + 
      `\n\nTotal: ₹${cart.total}` +
      `\n\nCheck out FireworksFestival website to order these amazing products!`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };
  
  const downloadCartDetails = () => {
    const cartDetails = `FireworksFestival - Shopping Cart\n\n` + 
      cart.items.map(item => 
        `${item.product.name} - ₹${item.product.price} x ${item.quantity} = ₹${item.product.price * item.quantity}`
      ).join('\n') + 
      `\n\nSubtotal: ₹${cart.subtotal}` +
      (cart.discount > 0 ? `\nDiscount: -₹${cart.discount}` : '') +
      `\nTotal: ₹${cart.total}` +
      `\n\nThank you for shopping with FireworksFestival!`;
    
    const element = document.createElement('a');
    const file = new Blob([cartDetails], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `fireworks-cart-${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleQuickPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would normally submit the order to a backend
    // For now, we'll just simulate a successful order
    
    alert(`Order placed successfully!\n\nThank you ${formData.name}!\nYour order will be processed shortly.`);
    clearCart();
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
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" onClick={shareCartOnWhatsApp}>
                        Share on WhatsApp
                      </Button>
                      <Button variant="outline" onClick={downloadCartDetails}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Cart
                      </Button>
                    </div>
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
                  
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={handleApplyPromo}>Apply</Button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-sm mt-1">{promoError}</p>
                    )}
                    {cart.promoCode && (
                      <p className="text-green-600 text-sm mt-1">
                        Promo code {cart.promoCode} applied!
                      </p>
                    )}
                  </div>
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
                      
                      <Button type="submit" className="w-full btn-sparkle">
                        Place Order
                        <ArrowRight className="ml-2 h-4 w-4" />
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
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default CartPage;
