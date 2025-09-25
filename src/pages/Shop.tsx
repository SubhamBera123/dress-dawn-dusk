import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { products, categories } from '@/data/products';
import { Filter, SlidersHorizontal, Star } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortBy('name');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-elegant font-bold mb-4">
          Shop All Dresses
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover our complete collection of elegant dresses
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={`w-full md:w-80 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-medium">Categories</h4>
                {categories.slice(1).map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={category.id} className="text-sm">
                      {category.name} ({category.count})
                    </Label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-0-100"
                      checked={priceRange[0] === 0 && priceRange[1] === 100}
                      onCheckedChange={(checked) => 
                        checked && setPriceRange([0, 100])
                      }
                    />
                    <Label htmlFor="price-0-100" className="text-sm">$0 - $100</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-100-200"
                      checked={priceRange[0] === 100 && priceRange[1] === 200}
                      onCheckedChange={(checked) => 
                        checked && setPriceRange([100, 200])
                      }
                    />
                    <Label htmlFor="price-100-200" className="text-sm">$100 - $200</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-200-300"
                      checked={priceRange[0] === 200 && priceRange[1] === 300}
                      onCheckedChange={(checked) => 
                        checked && setPriceRange([200, 300])
                      }
                    />
                    <Label htmlFor="price-200-300" className="text-sm">$200 - $300</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-300-plus"
                      checked={priceRange[0] === 300 && priceRange[1] === 500}
                      onCheckedChange={(checked) => 
                        checked && setPriceRange([300, 500])
                      }
                    />
                    <Label htmlFor="price-300-plus" className="text-sm">$300+</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No products found matching your filters
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                        <Badge variant="outline" className="text-xs capitalize">
                          {product.category}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">4.8</span>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">${product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};