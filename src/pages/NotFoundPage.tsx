import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Maxi Softlens</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/products" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
