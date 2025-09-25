import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/useCartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-elegant">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link to="/shop">
                  <Button onClick={closeCart}>
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Size:</span>
                          <Badge variant="outline" className="text-xs">{item.size}</Badge>
                        </div>
                        <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id, item.size)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Footer */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Link to="/checkout" className="block">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={closeCart}
                    >
                      Checkout
                    </Button>
                  </Link>
                  <Link to="/shop" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={closeCart}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};