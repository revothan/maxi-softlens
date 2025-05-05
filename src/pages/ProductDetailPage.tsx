import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useSupabase';
import { useCart } from '@/contexts/CartContext';
import { generateWhatsAppLink } from '@/lib/utils';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  
  const [selectedPower, setSelectedPower] = useState<string>('');
  const [buyNowClicked, setBuyNowClicked] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Find the current product
  const product = products.find(p => p.id === Number(productId));
  
  // Reset selected power when product changes
  useEffect(() => {
    setSelectedPower('');
  }, [productId]);
  
  // Display notification for 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedPower) {
      setNotification({
        message: 'Please select a power first',
        type: 'error'
      });
      return;
    }
    
    addItem(product, selectedPower);
    setNotification({
      message: 'Product added to cart',
      type: 'success'
    });
  };
  
  // Handle buy now
  const handleBuyNow = () => {
    if (!product) return;
    
    if (!selectedPower) {
      setNotification({
        message: 'Please select a power first',
        type: 'error'
      });
      return;
    }
    
    setBuyNowClicked(true);
  };
  
  // Buy directly on WhatsApp
  const handleBuyWhatsApp = () => {
    if (!product || !selectedPower) return;
    
    const whatsappLink = generateWhatsAppLink(
      '+62 818 0330 0441',
      `${product.name} (Power: ${selectedPower})`,
      '', // User will fill these in WhatsApp
      '',
      ''
    );
    
    window.open(whatsappLink, '_blank');
  };
  
  // If loading or product not found
  if (loading) {
    return <div className="container py-20 text-center">Loading product...</div>;
  }
  
  if (error) {
    return <div className="container py-20 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!product) {
    return <div className="container py-20 text-center">Product not found</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Maxi Softlens</title>
        <meta name="description" content={`${product.description || product.name} - Available in various powers. Free delivery for Gading Serpong & BSD areas.`} />
      </Helmet>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-muted">
            <img 
              src={product.image_url || '/images/placeholder.jpg'} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="heading-2">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {product.series}
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {product.color}
              </span>
            </div>
            
            <p className="text-lg">{product.description || `${product.name} softlens in beautiful ${product.color} color. Perfect for enhancing your natural eye color.`}</p>
            
            {/* Power Selection */}
            <div className="space-y-2">
              <h3 className="font-medium">Select Power</h3>
              <Select onValueChange={setSelectedPower} value={selectedPower}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a power" />
                </SelectTrigger>
                <SelectContent>
                  {product.powers.map((power) => (
                    <SelectItem key={power.id} value={power.power}>
                      {power.power}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Free Delivery Info */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Free Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Available at 13:00 and 17:00 every day for Gading Serpong and BSD areas only.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button
                onClick={buyNowClicked ? handleBuyWhatsApp : handleBuyNow}
                className="flex-1"
              >
                {buyNowClicked ? 'Continue to WhatsApp' : 'Buy Now'}
              </Button>
            </div>
            
            {/* E-commerce Links */}
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Also available on:</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.tokopedia.com/maxi-softlens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Tokopedia
                </a>
                <a 
                  href="https://www.shopee.com/maxi-softlens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Shopee
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification */}
        {notification && (
          <div 
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg flex items-center space-x-3 ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
      </div>
    </>
  );
}
