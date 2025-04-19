
import { Product, ProductCategory } from './types';

export const products: Product[] = [
  {
    id: "flower-pot-1",
    name: "Rainbow Bloomer",
    description: "Colorful flower pot that emits rainbow-colored sparks that bloom like a flower. Perfect for special occasions.",
    price: 299,
    originalPrice: 349,
    images: [
      "https://images.unsplash.com/photo-1625470506910-3c98e984d966?q=80&w=500",
      "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
    featured: true,
    rating: 4.7,
    tags: ["colorful", "medium", "safe"],
    brand: "SkyMagic"
  },
  {
    id: "flower-pot-2",
    name: "Golden Fountain",
    description: "Beautiful golden shower that rises up to 10 feet. Creates a stunning fountain effect with crackling sounds.",
    price: 499,
    originalPrice: 599,
    images: [
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=500",
      "https://images.unsplash.com/photo-1532598187460-98fe8826d1e0?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
    rating: 4.9,
    tags: ["gold", "high", "crackling"],
    brand: "FireWorks Pro"
  },
  {
    id: "ground-chakkar-1",
    name: "Spinning Whizzer",
    description: "Fast-spinning ground chakkar with multi-colored sparks. Creates an amazing circular pattern on the ground.",
    price: 149,
    originalPrice: 199,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500",
      "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?q=80&w=500"
    ],
    category: "ground-chakkars",
    inStock: true,
    featured: true,
    rating: 4.5,
    tags: ["spinning", "colorful", "ground"],
    brand: "SpinMaster"
  },
  {
    id: "rockets-1",
    name: "Sky Screamer",
    description: "High-flying rocket with a loud whistling sound and colorful burst at peak height. Reaches up to 100 feet.",
    price: 249,
    originalPrice: 299,
    images: [
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=500",
      "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=500"
    ],
    category: "rockets",
    inStock: true,
    rating: 4.3,
    tags: ["whistling", "aerial", "burst"],
    brand: "SkyMagic"
  },
  {
    id: "fancy-shot-1",
    name: "Multi-Color Candle",
    description: "Shoots 10 consecutive multi-colored shots into the sky. Each shot creates a different pattern and color.",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1560813962-ff09d8121780?q=80&w=500",
      "https://images.unsplash.com/photo-1597177266435-ed61a33cd5a8?q=80&w=500"
    ],
    category: "fancy-shots",
    inStock: true,
    featured: true,
    rating: 4.8,
    tags: ["multi-shot", "colorful", "aerial"],
    brand: "FireWorks Pro"
  },
  {
    id: "gift-box-1",
    name: "Festival Special Pack",
    description: "Complete gift box with a variety of 20 different fireworks including flower pots, sparklers, ground chakkars, and small aerial shots.",
    price: 1499,
    originalPrice: 1899,
    images: [
      "https://images.unsplash.com/photo-1608755728617-0c5935458be2?q=80&w=500",
      "https://images.unsplash.com/photo-1514996699907-54ed57acd4df?q=80&w=500"
    ],
    category: "gift-boxes",
    inStock: true,
    featured: true,
    rating: 4.9,
    tags: ["assortment", "gift", "family"],
    brand: "CelebrationKing"
  },
  {
    id: "sparklers-1",
    name: "Magic Sparklers (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 99,
    images: [
      "https://images.unsplash.com/photo-1533177243638-ec694608ef96?q=80&w=500",
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=500"
    ],
    category: "sparklers",
    inStock: true,
    rating: 4.6,
    tags: ["smokeless", "kids", "safe"],
    brand: "SparkJoy"
  },
  {
    id: "rockets-2",
    name: "Thunder Missile",
    description: "Powerful rocket with a thunderous sound and bright flash. Creates a large burst pattern in the sky.",
    price: 299,
    images: [
      "https://images.unsplash.com/photo-1481232112546-8680e23c7b97?q=80&w=500",
      "https://images.unsplash.com/photo-1533230408708-8f9f161c43a0?q=80&w=500"
    ],
    category: "rockets",
    inStock: true,
    rating: 4.2,
    tags: ["loud", "aerial", "powerful"],
    brand: "ThunderWorks"
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (category: ProductCategory) => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const categories = [
  { value: "all", label: "All Products" },
  { value: "flower-pots", label: "Flower Pots" },
  { value: "ground-chakkars", label: "Ground Chakkars" },
  { value: "rockets", label: "Rockets" },
  { value: "fancy-shots", label: "Fancy Shots" },
  { value: "gift-boxes", label: "Gift Boxes" },
  { value: "sparklers", label: "Sparklers" }
];
