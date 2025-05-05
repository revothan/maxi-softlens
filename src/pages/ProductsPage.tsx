import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '@/hooks/useSupabase';

export function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  
  // Extract unique series from products
  const series = [...new Set(products.map(product => product.series))];
  
  // Filter products when selection changes
  useEffect(() => {
    if (selectedSeries) {
      setFilteredProducts(products.filter(product => product.series === selectedSeries));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedSeries, products]);
  
  return (
    <>
      <Helmet>
        <title>Products | Maxi Softlens</title>
        <meta name="description" content="Browse our collection of high-quality softlens products. Various colors and powers available. Free delivery for Gading Serpong & BSD areas." />
      </Helmet>
      
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-4">Our Products</h1>
            <p className="body-text">
              Explore our range of high-quality softlens products in various colors and powers.
            </p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          {/* Filter Controls */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Filter by Series</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSeries(null)}
                className={`px-4 py-2 rounded-md text-sm ${
                  selectedSeries === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {series.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeries(s)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedSeries === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">Error: {error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">No products found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-muted mb-4 aspect-square">
                    <img 
                      src={product.image_url || '/images/placeholder.jpg'} 
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">{product.series}</p>
                    <p className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {product.powers.length} powers
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Can't Find What You're Looking For?</h2>
            <p className="body-text mb-8">
              Contact us directly via WhatsApp for assistance or special orders.
            </p>
            <div className="inline-block">
              <a 
                href="https://wa.me/6281803300441" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium"
              >
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
