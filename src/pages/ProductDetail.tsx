import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/useCartStore';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/products';
import { ArrowLeft, Star, Heart, ShoppingCart, Check } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });

    openCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1 inline" />
          Back to Shop
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnail images - using same image for demo */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-primary cursor-pointer">
                <img
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">4.8 (124 reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-elegant font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          <Separator />

          {/* Product Features */}
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Shipping & Returns</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Free shipping on orders over $100</li>
                <li>• 2-3 business days delivery</li>
                <li>• 30-day return policy</li>
                <li>• Easy exchanges</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-elegant font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-primary">${relatedProduct.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};