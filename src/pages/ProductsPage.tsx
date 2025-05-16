
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories, getProductsByCategory } from '@/lib/data';
import { ProductCategory, Product } from '@/lib/types';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  
  // Get unique brands from products
  const brands = [...new Set(products.map(product => product.brand))].filter(Boolean) as string[];
  
  // Find min and max prices from products
  const minPrice = Math.min(...products.map(product => product.price));
  const maxPrice = Math.max(...products.map(product => product.price));
  
  useEffect(() => {
    // Update category when URL param changes
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  useEffect(() => {
    // Apply filters to products
    let filtered = getProductsByCategory(selectedCategory);
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchQuery, selectedBrands, sortOption]);
  
  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };
  
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            {selectedCategory === 'all' ? 'All Products' : 
              categories.find(cat => cat.value === selectedCategory)?.label || 'Products'}
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 xl:w-1/5">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <button
                        key={category.value}
                        className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                          selectedCategory === category.value
                            ? 'bg-festival-purple text-white'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleCategoryChange(category.value as ProductCategory)}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
               {/* <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div> */}
                
                {/* Brands */}
               {/* <div className="mb-6">
                  <h3 className="font-medium mb-2">Brands</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <Label 
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-sm"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4 xl:w-4/5">
              <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full sm:w-auto sm:flex-grow">
                    <Input 
                      type="text" 
                      placeholder="Search products..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center w-full sm:w-auto">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="border rounded p-2 text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="rating-desc">Highest Rated</option>
                    </select>
                  </div>
                  
                  <div className="text-sm text-gray-500 ml-auto">
                    {filteredProducts.length} products
                  </div>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search term to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
