import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Maxi Softlens</title>
        <meta name="description" content="Learn more about Maxi Softlens, the premier softlens provider in Gading Serpong and BSD. We offer high-quality softlens products with excellent customer service." />
      </Helmet>
      
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-4">About Maxi Softlens</h1>
            <p className="body-text">
              Your trusted source for high-quality softlens products in Gading Serpong and BSD.
            </p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="heading-3 mb-6">Our Story</h2>
              <p className="mb-4">
                Maxi Softlens was established with a simple mission: to provide high-quality softlens products with exceptional customer service to the Gading Serpong and BSD communities.
              </p>
              <p className="mb-4">
                As softlens enthusiasts ourselves, we understand the importance of quality, comfort, and style when it comes to eye accessories. We carefully select our products to ensure they meet the highest standards of quality and safety.
              </p>
              <p>
                Over the years, we have built a reputation for reliability and excellent service, becoming the trusted choice for softlens needs in the area.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="heading-3 mb-6">What Sets Us Apart</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Quality Products</h3>
                  <p>
                    We offer only premium softlens products that are safe, comfortable, and durable. Our X2 CHI series is known for its natural look and all-day comfort.
                  </p>
                </div>
                
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Expert Advice</h3>
                  <p>
                    Our team is knowledgeable about all our products and can help you find the perfect softlens that suits your needs and preferences.
                  </p>
                </div>
                
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Convenient Delivery</h3>
                  <p>
                    We offer free delivery at 13:00 and 17:00 every day for customers in the Gading Serpong and BSD areas, making it easy to get your softlens when you need them.
                  </p>
                </div>
                
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Multiple Purchasing Options</h3>
                  <p>
                    Shop directly through WhatsApp or visit our stores on Tokopedia and Shopee for your convenience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="heading-3 mb-6">Visit Us</h2>
              <p className="mb-4">
                Our store is located at Maxwell Selatan 1 No.68, Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten 15334. 
              </p>
              <p>
                We welcome you to visit us in person to explore our products and get personalized assistance from our friendly staff.
              </p>
              
              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2054340601384!2d106.6323!3d-6.2443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMzkuNSJTIDEwNsKwMzcnNTYuMyJF!5e0!3m2!1sen!2sid!4v1652345678901!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maxi Softlens Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="heading-3 mb-6">Ready to Shop?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/products">Browse Our Products</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
