
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { featuredProducts, categories } from '@/lib/data';
import { ProductCategory } from '@/lib/types';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [showHeroAnimation, setShowHeroAnimation] = useState(false);
  
  useEffect(() => {
    // Trigger hero animations after component mounts
    setShowHeroAnimation(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-1000 ${showHeroAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block">Light Up Your</span> 
                <span className="festive-gradient bg-clip-text text-transparent">Festival Celebrations</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover premium quality fireworks for all your special occasions.
                From colorful flower pots to spectacular aerial shots, we've got everything to make your celebrations memorable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="btn-sparkle">
                  <Link to="/products">
                    Explore Products
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${showHeroAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <img 
                src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=1000" 
                alt="Festival Fireworks" 
                className="w-full h-auto rounded-lg shadow-2xl float-animation"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat.value !== "all").map(category => (
              <Link 
                key={category.value}
                to={`/products?category=${category.value}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      {/* Simple category icon based on name */}
                      <div className="text-2xl">
                        {category.value === "flower-pots" ? "🌸" : 
                          category.value === "ground-chakkars" ? "🔄" :
                          category.value === "rockets" ? "🚀" :
                          category.value === "fancy-shots" ? "✨" :
                          category.value === "gift-boxes" ? "🎁" : "🎇"}
                      </div>
                    </div>
                    <h3 className="font-medium">{category.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-festival-purple hover:underline"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Special Offer Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-festival-purple to-festival-pink rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Diwali Offer</h2>
              <p className="text-lg mb-6 max-w-2xl">
                Get 20% off on all gift boxes and combo packs. Use promo code <span className="font-bold">DIWALI20</span> at checkout.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products?category=gift-boxes">
                  Shop Gift Boxes
                </Link>
              </Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                text: "The quality of fireworks is exceptional. My family loved the gift box I purchased for Diwali celebrations!",
                rating: 5
              },
              {
                name: "Priya Sharma",
                text: "Fast delivery and great packaging. The flower pots were beautiful and lasted longer than expected.",
                rating: 4
              },
              {
                name: "Amit Patel",
                text: "Excellent customer service! They helped me choose the perfect fireworks for my daughter's birthday party.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
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
                  <p className="text-gray-600 mb-4 flex-grow">{testimonial.text}</p>
                  <footer className="text-right font-medium">{testimonial.name}</footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Safety Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Safety First</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            We care about your safety. Please follow these essential tips when enjoying our fireworks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Keep a Safe Distance",
                description: "Always maintain a safe distance from lit fireworks. Never lean over them while lighting."
              },
              {
                title: "Adult Supervision Required",
                description: "Children should never handle fireworks. Always ensure adult supervision."
              },
              {
                title: "Have Water Nearby",
                description: "Keep a bucket of water or a garden hose nearby in case of emergencies."
              },
              {
                title: "Don't Relight Duds",
                description: "Never try to relight a 'dud' firework. Wait 20 minutes and then soak in water."
              },
              {
                title: "Use in Open Areas",
                description: "Only use fireworks outdoors in clear, open spaces away from buildings."
              },
              {
                title: "Follow Instructions",
                description: "Read and follow all instructions on the packaging carefully."
              }
            ].map((tip, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
