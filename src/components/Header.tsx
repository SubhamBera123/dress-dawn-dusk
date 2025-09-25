import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const totalItems = getTotalItems();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-elegant font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Élégance
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-4 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};