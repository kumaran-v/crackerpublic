
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, isInCart } = useCart();
  
  const product = productId ? getProductById(productId) : null;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this amazing firework: ${product?.name}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      window.open(`mailto:?subject=Check out this amazing firework&body=Check out this amazing firework: ${product?.name} - ${window.location.href}`);
    }
  };
  
  const handleDownload = () => {
    if (!product) return;
    
    // Create a temporary element to hold product details text
    const element = document.createElement('a');
    const productDetails = `
      Product: ${product.name}
      Price: ₹${product.price}
      Category: ${product.category}
      Description: ${product.description}
      
      Visit our website to purchase this product!
      https://fireworksfestival.com/products/${product.id}
    `;
    
    const file = new Blob([productDetails], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${product.name.toLowerCase().replace(/\s+/g, '-')}-details.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // Get similar products (same category, exclude current product)
  const similarProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border bg-white">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 rounded-md border overflow-hidden ${
                        selectedImageIndex === index 
                          ? 'border-festival-purple ring-2 ring-festival-purple ring-opacity-50' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="mt-4 flex items-baseline">
                <span className="text-2xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-2 bg-festival-red text-white text-xs px-2 py-0.5 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              {product.rating && (
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                  </div>
                  <span className="text-gray-600 ml-2">{product.rating} Rating</span>
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              {/* Tags if available */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <span className="font-medium mr-4">Quantity:</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="h-8 w-16 rounded-none text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="btn-sparkle flex-1 sm:flex-none" 
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleShare}
                  >
                    <Share className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="safety">Safety Instructions</TabsTrigger>
                <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <p className="mb-4">{product.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Category: {product.category.replace('-', ' ')}</li>
                  {product.brand && <li>Brand: {product.brand}</li>}
                  <li>In Stock: {product.inStock ? 'Yes' : 'No'}</li>
                </ul>
              </TabsContent>
              <TabsContent value="safety" className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Safety Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Always read and follow all instructions on the packaging.</li>
                  <li>Never allow children to handle or light fireworks. Adult supervision required at all times.</li>
                  <li>Keep a safe distance from lit fireworks. Never lean over them when lighting.</li>
                  <li>Only use fireworks outdoors in clear, open spaces away from buildings and vehicles.</li>
                  <li>Keep a bucket of water or a garden hose nearby in case of emergencies.</li>
                  <li>Light fireworks one at a time, then move back quickly.</li>
                  <li>Never try to relight or pick up fireworks that have not ignited fully.</li>
                  <li>After fireworks complete their burning, douse them with plenty of water before discarding.</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                <p className="mb-4">We deliver fireworks to most locations in India. Please note that shipping of fireworks is subject to local regulations.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Standard Delivery: 3-5 business days</li>
                  <li>Express Delivery: 1-2 business days (additional charges apply)</li>
                  <li>Free shipping on orders above ₹999</li>
                  <li>Delivery is available only to addresses where fireworks are permitted by law.</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map(product => (
                  <div 
                    key={product.id}
                    className="product-card"
                    onClick={() => navigate(`/products/${product.id}`)}
                    role="button"
                  >
                    <div className="relative overflow-hidden rounded-t-lg aspect-square">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 right-2 bg-festival-red text-white text-xs font-bold py-1 px-2 rounded-full">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-b-lg">
                      <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
                      <div className="flex items-baseline">
                        <span className="font-bold">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
