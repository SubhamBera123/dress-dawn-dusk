import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/useAuthStore';
import { ShoppingBag, Package, Calendar, DollarSign } from 'lucide-react';
import { useEffect } from 'react';

export const Orders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'default';
      case 'shipped':
        return 'outline';
      case 'delivered':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-elegant font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your orders and view purchase history</p>
        </div>

        {user.orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {user.orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.date)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusColor(order.status)} className="capitalize">
                        <Package className="h-3 w-3 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                            <span className="font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                      <Button variant="outline" size="sm">
                        Order Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};