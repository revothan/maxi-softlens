import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useSupabase';

export function HomePage() {
  const { products, loading, error } = useProducts();
  
  // Featured products (show first 3)
  const featuredProducts = products.slice(0, 3);
  
  return (
    <>
      <Helmet>
        <title>Maxi Softlens | Pusat Softlens Gading Serpong & BSD</title>
        <meta name="description" content="Maxi Softlens - Pusat softlens di Gading Serpong & BSD. Jual softlens berkualitas dengan berbagai pilihan warna dan power. Free delivery di area Gading Serpong & BSD." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Temukan Softlens Berkualitas untuk Penampilan Terbaikmu
            </h1>
            <p className="body-text mb-8">
              Maxi Softlens menyediakan berbagai pilihan softlens dengan kualitas terbaik. Free delivery untuk area Gading Serpong & BSD.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">Lihat Produk</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white border-white hover:bg-white/90">
                <a href="https://wa.me/6281803300441">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section bg-muted">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold ml-4">Free Delivery</h3>
              </div>
              <p>
                Nikmati layanan pengiriman gratis untuk area Gading Serpong dan BSD setiap hari pada jam 13:00 dan 17:00.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold ml-4">Pelayanan Cepat</h3>
              </div>
              <p>
                Semua pesanan akan diproses dengan cepat. Pesan sekarang, terima hari ini untuk area Gading Serpong dan BSD.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold ml-4">Lokasi Strategis</h3>
              </div>
              <p>
                Toko kami berlokasi di Maxwell Selatan 1 No.68, mudah diakses dari area Gading Serpong dan BSD.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-2">Produk Unggulan</h2>
            <Button asChild variant="ghost">
              <Link to="/products" className="flex items-center">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-muted mb-4 aspect-[4/3]">
                    <img 
                      src={product.image_url || '/images/placeholder.jpg'} 
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.series}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Siap untuk Mencoba?</h2>
            <p className="body-text mb-8">
              Dapatkan softlens berkualitas dengan power yang sesuai kebutuhan Anda. Hubungi kami atau kunjungi toko online kami sekarang!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="https://www.tokopedia.com/maxi-softlens" target="_blank" rel="noopener noreferrer">
                  Tokopedia
                </a>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="https://www.shopee.com/maxi-softlens" target="_blank" rel="noopener noreferrer">
                  Shopee
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white">
                <a href="https://wa.me/6281803300441">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
