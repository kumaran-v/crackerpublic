
import { Product, ProductCategory } from './types';

export const products: Product[] = [
  {
    id: "flower-pot-1",
    name: "Flower Pot Small",
    description: "Colorful flower pot that emits rainbow-colored sparks that bloom like a flower. Perfect for special occasions.",
    price: 65,
    originalPrice: 130,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
  
    tags: ["colorful", "fountain"]
  },
  {
    id: "flower-pot-2",
    name: "Flower Pot Big",
    description: "Beautiful shower that rises up to 10 feet. Creates a stunning fountain effect with crackling sounds.",
    price: 120,
    originalPrice: 250,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
    tags: ["Fountain", "colour", "crackling"]
  },
  {
    id: "flower-pot-3",
    name: "Flower Pot Special",
    description: "Beautiful shower that rises up to 10 feet. Creates a stunning fountain effect with crackling sounds.",
    price: 210,
    originalPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
    tags: ["Fountain", "colour", "crackling"]
  },
  {
    id: "flower-pot-4",
    name: "Flower Pot Koti",
    description: "Beautiful shower that rises up to 10 feet. Creates a stunning fountain effect with crackling sounds.",
    price: 300,
    originalPrice: 500,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "flower-pots",
    inStock: true,
    tags: ["Fountain", "colour", "crackling"]
  },
  {
    id: "ground-chakkar-1",
    name: "Chakkar Small",
    description: "Fast-spinning ground chakkar with multi-colored sparks. Creates an amazing circular pattern on the ground.",
    price: 55,
    originalPrice: 110,
    images: [
      "src/image/chakkar small.png"
    ],
    category: "ground-chakkars",
    inStock: true,
  
    tags: ["spinning", "colorful", "ground"]
  },
  {
    id: "one-sound-cracker-1",
    name: "2 3/4 SPARROW CRACKERS",
    description: "one sound cracker",
    price: 10,
    originalPrice: 25,
    images: [
      "src/image/kuruvi-onesound.png"
    ],
    category: "one-sound-cracker",
    inStock: true,
  
    tags: ["spinning", "colorful", "ground"]
  },
  {
    id: "one-sound-cracker-2",
    name: "3 1/2 LAKSHMI CRACKERS",
    description: "one sound cracker",
    price: 20,
    originalPrice: 45,
    images: [
      "src/image/lakshmi-onesound.png"
    ],
    category: "one-sound-cracker",
    inStock: true,
  
    tags: ["spinning", "colorful", "ground"]
  },
  {
    id: "one-sound-cracker-3",
    name: "4 LAKSHMI CRACKERS",
    description: "one sound cracker",
    price: 30,
    originalPrice: 55,
    images: [
       "src/image/lakshmi-onesound.png"
    ],
    category: "one-sound-cracker",
    inStock: true,
  
    tags: ["spinning", "colorful", "ground"]
  },
  {
    id: "one-sound-cracker-4",
    name: "2 SOUND CRACKERS",
    description: "one sound cracker",
    price: 40,
    originalPrice: 85,
    images: [
       "src/image/lakshmi-onesound.png"
    ],
    category: "one-sound-cracker",
    inStock: true,
  
    tags: ["spinning", "colorful", "ground"]
  },
  {
    id: "walas-1",
    name: "1000 CRACKERS",
    description: "one sound cracker",
    price: 300,
    originalPrice: 700,
    images: [
      "src/image/onesound1000.png"
    ],
    category: "walas",
    inStock: true,
  
    tags: ["one sound", "ground"]
  },
  {
    id: "walas-2",
    name: "2000 CRACKERS",
    description: "one sound cracker",
    price: 650,
    originalPrice: 1200,
    images: [
      "src/image/onesound1000.png"
    ],
    category: "walas",
    inStock: true,
  
    tags: ["one sound", "ground"]
  },
  {
    id: "walas-3",
    name: "5000 CRACKERS",
    description: "one sound cracker",
    price: 1100,
    originalPrice: 2400,
    images: [
      "src/image/onesound1000.png",
    ],
    category: "walas",
    inStock: true,
  
    tags: ["one sound", "ground"]
  },
  {
    id: "walas-4",
    name: "10000 CRACKERS",
    description: "one sound cracker",
    price: 2400,
    originalPrice: 5000,
    images: [
      "src/image/onesound1000.png",
    ],
    category: "walas",
    inStock: true,
  
    tags: ["one sound", "ground"]
  },
  {
    id: "atom-bomb-1",
    name: "Atom Bomb",
    description: "Atom bomb one sound cracker",
    price: 50,
    originalPrice: 120,
    images: [
      "src/image/atom bomb green.png"
    ],
    category: "atom-bomb",
    inStock: true, 
    tags: ["ground"]
  },
  {
    id: "atom-bomb-2",
    name: "Paper Bomb 1/4 KG",
    description: "Paper bomb one sound cracker",
    price: 70,
    originalPrice: 150,
    images: [
      "src/image/1-4paperbomb.png"
    ],
    category: "atom-bomb",
    inStock: true,
    tags: ["ground"]
  },
  {
    id: "atom-bomb-3",
    name: "Paper Bomb 1/2 KG",
    description: "Paper bomb one sound cracker",
    price: 110,
    originalPrice: 230,
    images: [
      "src/image/1-2paperbomb.png"
    ],
    category: "atom-bomb",
    inStock: true, 
    tags: ["ground"]
  },
  {
    id: "atom-bomb-4",
    name: "Paper Bomb 1 KG",
    description: "Paper bomb one sound cracker",
    price: 205,
    originalPrice: 350,
    images: [
      "src/image/1kg paperbomb.png"
    ],
    category: "atom-bomb",
    inStock: true, 
    tags: ["ground"]
  },
  {
    id: "Red-bijili-cracker-1",
    name: "Red Bijili 50 pcs Cracker",
    description: "Red Bijili one sound cracker 50 Pcs",
    price: 25,
    originalPrice: 50,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "bijili-cracker",
    inStock: true,
    tags: ["ground","one sound"]
  },
  {
    id: "Red-bijili-cracker-2",
    name: "Red Bijili 100 pcs Cracker",
    description: "Red Bijili one sound cracker 100 Pcs",
    price: 60,
    originalPrice: 130,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "bijili-cracker",
    inStock: true,
    tags: ["ground","one sound"]
  },
  {
    id: "rockets-1",
    name: "Rocket Bomb",
    description: "",
    price: 100,
    originalPrice: 210,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "rockets",
    inStock: true,
    tags: ["sound", "aerial", "burst"]
  },
  {
    id: "fancy-shot-1",
    name: "15 Shorts Multi Colour",
    description: "Shoots 15 consecutive multi-colored shots into the sky. Each shot creates a different pattern and color.",
    price: 350,
    originalPrice: 800,
    images: [
      "src/image/15 shorts.png"
    ],
    category: "fancy-shots",
    inStock: true,
  
    tags: ["multi-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-shot-2",
    name: "30 Shorts Multi Colour",
    description: "Shoots 30 consecutive multi-colored shots into the sky. Each shot creates a different pattern and color.",
    price: 650,
    originalPrice: 1400,
    images: [
      "src/image/30short.png"
    ],
    category: "fancy-shots",
    inStock: true,
  
    tags: ["multi-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-shot-3",
    name: "60 Shots Multi Colour",
    description: "Shoots 60 consecutive multi-colored shots into the sky. Each shot creates a different pattern and color.",
    price: 1100,
    originalPrice: 2400,
    images: [
      "src/image/60 shorts.png"
    ],
    category: "fancy-shots",
    inStock: true,
  
    tags: ["multi-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-shot-4",
    name: "120 Shots Multi Colour",
    description: "Shoots 120 consecutive multi-colored shots into the sky. Each shot creates a different pattern and color.",
    price: 1950,
    originalPrice: 4500,
    images: [
      "src/image/120 short.png"
    ],
    category: "fancy-shots",
    inStock: true,
  
    tags: ["multi-shot", "colorful", "aerial"]
  },
  /*{
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
  
    tags: ["assortment", "gift", "family"]
  },*/
  {
    id: "fancy-aerial-shot-1",
    name: "2 fancy (5 varient)",
    description: "Shoots 1 consecutive colored shots into the sky.Shot creates a different pattern and color.",
    price: 150,
    originalPrice: 280,
    images: [
      "src/image/2  arieal fancy.png"
    ],
    category: "fancy-aerial-shots",
    inStock: true,
    tags: ["Single-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-aerial-shot-2",
    name: "3 1/2 fancy (5 varient)",
    description: "Shoots 1 consecutive colored shots into the sky.Shot creates a different pattern and color.",
    price: 300,
    originalPrice: 650,
    images: [
      "src/image/3 1-4 aerial fancy.png"
    ],
    category: "fancy-aerial-shots",
    inStock: true,
    tags: ["Single-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-aerial-shot-3",
    name: "3 1/2 fancy (Double ball)",
    description: "Shoots 1 consecutive colored shots into the sky.Shot creates a different pattern and color.",
    price: 450,
    originalPrice: 950,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "fancy-aerial-shots",
    inStock: true,
    tags: ["Single-shot", "colorful", "aerial"]
  },
  {
    id: "fancy-aerial-shot-4",
    name: "4 fancy (5 varient)",
    description: "Shoots 1 consecutive colored shots into the sky.Shot creates a different pattern and color.",
    price: 550,
    originalPrice: 950,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "fancy-aerial-shots",
    inStock: true,
    tags: ["Single-shot", "colorful", "aerial"]
  },
  /*{
    id: "sparklers-1",
    name: "7 Cm Electric Sparklers (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
       "src/image/sparklercracker.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-2",
    name: "7 Cm Colour Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-3",
    name: "10 Cm Electric Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-4",
    name: "10 Cm Colour Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-5",
    name: "15 Cm electric Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-6",
    name: "15 Cm Colour Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-7",
    name: "30 Cm electric Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },
  {
    id: "sparklers-8",
    name: "30 Cm Colour Sparklers  (Pack of 10)",
    description: "Long-lasting sparklers that burn with minimal smoke. Perfect for kids and indoor celebrations.",
    price: 10,
    originalPrice: 20,
    images: [
      "src/image/sparkler_color.webp"
    ],
    category: "sparklers",
    inStock: true,
    tags: ["smokeless", "kids", "safe"]
  },*/
  {
    id: "fancy-novelties-1",
    name: "Colour Smoke",
    description: "Colour Smoke with 5 different colour",
    price: 150,
    originalPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=500"
    ],
    category: "fancy-novelties",
    inStock: true,
    tags: ["colorful", "Smoke"] 
  },
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
  { value: "one-sound-cracker", label: "One Sound Cracker" },
  { value: "walas", label: "Walas" },
  { value: "atom-bomb", label: "Atom Bomb" },
  { value: "bijili-cracker", label: "Bijili Cracker" },
  { value: "rockets", label: "Rockets" },
  { value: "fancy-shots", label: "Multi Colour Shots" },
  { value: "fancy-aerial-shots", label: "Fancy Aerial Shots" },
  { value: "fancy-novelties", label: "Fancy Novelties" },
  { value: "new-arrival", label: "New Arrival" }
  /*{ value: "gift-boxes", label: "Gift Boxes" },*/
  /*{ value: "sparklers", label: "Sparklers" }*/
];
