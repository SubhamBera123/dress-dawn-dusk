import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/data/products';
import heroImage from '@/assets/hero-fashion.jpg';
import { ArrowRight, Star, Truck, Shield, HeartHandshake } from 'lucide-react';

export const Home = () => {
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $100"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-elegant font-bold mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Explore our curated collection of elegant dresses designed for the modern woman
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary-dark shadow-lg">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              View Lookbook
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-elegant font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect dress for every occasion in our carefully curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary">{category.count} items</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-elegant font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites from our latest collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">4.8</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-primary">${product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-elegant font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, style tips, and first access to new collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};