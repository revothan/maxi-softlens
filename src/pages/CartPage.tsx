import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { generateWhatsAppLink } from '@/lib/utils';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.address) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create product list text for WhatsApp
    const productsText = items.map(item => 
      `${item.product.name} (Power: ${item.power}) x ${item.quantity}`
    ).join('\\n');
    
    // Generate WhatsApp link
    const whatsappLink = generateWhatsAppLink(
      '+62 818 0330 0441',
      productsText,
      formData.name,
      formData.whatsapp,
      formData.address
    );
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Clear cart
    clearCart();
  };
  
  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      <Helmet>
        <title>Shopping Cart | Maxi Softlens</title>
        <meta name="description" content="View your shopping cart and checkout your softlens products. Free delivery for Gading Serpong & BSD areas." />
      </Helmet>
      
      <div className="container py-12">
        <h1 className="heading-2 mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.power}`}
                  className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md bg-muted shrink-0">
                    <img 
                      src={item.product.image_url || '/images/placeholder.jpg'} 
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(item.product.id, item.power)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2 text-sm text-muted-foreground">
                      <span>{item.product.series}</span>
                      <span>•</span>
                      <span>Power: {item.power}</span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.power, item.quantity - 1)}
                        className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </button>
                      
                      <span className="w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.power, item.quantity + 1)}
                        className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button asChild variant="ghost">
                  <Link to="/products" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="bg-muted p-6 rounded-lg h-fit">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>{totalItems} items</span>
                </div>
              </div>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Checkout via WhatsApp
                </Button>
              </form>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="mb-2">
                  You'll be redirected to WhatsApp to confirm your order.
                </p>
                <p>
                  Free delivery available at 13:00 and 17:00 every day for Gading Serpong and BSD areas only.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
