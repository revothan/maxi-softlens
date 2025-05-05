import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Maxi Softlens Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold">
                Maxi Softlens
              </span>
            </Link>
            <p className="text-sm md:text-base">
              Pusat Softlens Gading Serpong & BSD. 
              Menyediakan berbagai jenis softlens dengan kualitas terbaik.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm md:text-base hover:underline">
                Home
              </Link>
              <Link to="/products" className="text-sm md:text-base hover:underline">
                Products
              </Link>
              <Link to="/about" className="text-sm md:text-base hover:underline">
                About
              </Link>
              <Link to="/contact" className="text-sm md:text-base hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">
                  Maxwell Selatan 1 No.68, Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten 15334
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a 
                  href="mailto:serpongmaxvision@gmail.com" 
                  className="text-sm md:text-base hover:underline"
                >
                  serpongmaxvision@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a 
                  href="https://wa.me/6281803300441" 
                  className="text-sm md:text-base hover:underline"
                >
                  +62 818 0330 0441
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/maxisoftlens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://facebook.com/maxisoftlens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-bold mb-2">Online Shops</h4>
              <div className="flex flex-col space-y-2">
                <a 
                  href="https://www.tokopedia.com/maxi-softlens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base hover:underline"
                >
                  Tokopedia
                </a>
                <a 
                  href="https://www.shopee.com/maxi-softlens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base hover:underline"
                >
                  Shopee
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Maxi Softlens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
