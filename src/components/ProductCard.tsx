
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ZoomIn, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [sparkleElements, setSparkleElements] = useState<JSX.Element[]>([]);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    // Create sparkle effect
    const sparkles: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 0.5;
      
      sparkles.push(
        <span 
          key={`sparkle-${i}`}
          className="sparkle" 
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            backgroundColor: i % 2 === 0 ? '#F97316' : '#9b87f5'
          }}
        />
      );
    }
    
    setSparkleElements(sparkles);
    setTimeout(() => setSparkleElements([]), 1500);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-10 w-10 rounded-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                      <p className="text-lg font-bold mb-1">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </p>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => addToCart(product, 1)}
                          className="btn-sparkle"
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleDownload}
                        >
                          <Download className="mr-2 h-4 w-4" /> Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          {product.originalPrice && (
            <div className="absolute top-2 right-2 bg-festival-red text-white text-xs font-bold py-1 px-2 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white rounded-b-lg">
          <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
          
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={`relative btn-sparkle ${isInCart(product.id) ? 'text-festival-purple' : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {sparkleElements}
            </Button>
          </div>
          
          {product.rating && (
            <div className="flex items-center mt-1">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
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
              <span className="text-sm text-gray-500 ml-1">
                {product.rating}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
