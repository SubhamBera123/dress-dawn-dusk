import dress1 from '@/assets/dress-1.jpg';
import dress2 from '@/assets/dress-2.jpg';
import dress3 from '@/assets/dress-3.jpg';
import dress4 from '@/assets/dress-4.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'casual' | 'evening' | 'formal' | 'summer';
  sizes: string[];
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Rosé Elegance Dress',
    price: 189,
    image: dress1,
    category: 'evening',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A stunning rose-colored dress perfect for special occasions. Features a flowing silhouette that flatters every figure.',
    features: ['Premium silk blend', 'Hand-finished details', 'Invisible zip closure', 'Dry clean only']
  },
  {
    id: '2',
    name: 'Crimson Romance Dress',
    price: 249,
    image: dress2,
    category: 'formal',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Bold and beautiful red dress that makes a statement. Perfect for formal events and romantic dinners.',
    features: ['Luxe satin fabric', 'Structured bodice', 'Hidden back zipper', 'Professional cleaning recommended']
  },
  {
    id: '3',
    name: 'Navy Sophisticate',
    price: 199,
    image: dress3,
    category: 'formal',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Timeless navy blue dress that exudes sophistication. A versatile piece for business and formal occasions.',
    features: ['Wrinkle-resistant fabric', 'Classic cut', 'Side zip', 'Machine washable']
  },
  {
    id: '4',
    name: 'Pure Elegance White',
    price: 229,
    image: dress4,
    category: 'summer',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Pristine white dress perfect for summer events. Light and airy with beautiful draping.',
    features: ['Breathable cotton blend', 'UV protection', 'Easy care fabric', 'Adjustable straps']
  },
  {
    id: '5',
    name: 'Sunset Glow Maxi',
    price: 179,
    image: dress1,
    category: 'casual',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flowing maxi dress in warm sunset tones. Perfect for casual outings and weekend wear.',
    features: ['Comfort stretch fabric', 'Maxi length', 'Elastic waist', 'Machine washable']
  },
  {
    id: '6',
    name: 'Midnight Glamour',
    price: 299,
    image: dress3,
    category: 'evening',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Sophisticated evening dress in deep midnight blue. Features elegant beading and a flattering silhouette.',
    features: ['Hand-beaded details', 'Silk lining', 'Concealed zipper', 'Dry clean only']
  }
];

export const categories = [
  { id: 'all', name: 'All Dresses', count: products.length },
  { id: 'casual', name: 'Casual', count: products.filter(p => p.category === 'casual').length },
  { id: 'evening', name: 'Evening', count: products.filter(p => p.category === 'evening').length },
  { id: 'formal', name: 'Formal', count: products.filter(p => p.category === 'formal').length },
  { id: 'summer', name: 'Summer', count: products.filter(p => p.category === 'summer').length },
];