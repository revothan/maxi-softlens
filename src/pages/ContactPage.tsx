import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.whatsapp || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // In a real app, this would be a fetch request to a backend API
      
      // Open WhatsApp with the message
      const message = encodeURIComponent(
        `New inquiry from website:\n\nName: ${formData.name}\nEmail: ${formData.email || 'Not provided'}\nMessage: ${formData.message}`
      );
      
      window.open(`https://wa.me/6281803300441?text=${message}`, '_blank');
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        message: ''
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us | Maxi Softlens</title>
        <meta name="description" content="Get in touch with Maxi Softlens. We're here to help with your softlens needs. Contact us via WhatsApp, email, or visit our store in Gading Serpong." />
      </Helmet>
      
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-4">Contact Us</h1>
            <p className="body-text">
              Have questions or need assistance? We're here to help!
            </p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-3 mb-6">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We'd love to hear from you. Reach out to us through any of these channels or fill out the form.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Store Address</h3>
                      <p className="text-muted-foreground">
                        Maxwell Selatan 1 No.68, Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten 15334
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a 
                        href="mailto:serpongmaxvision@gmail.com" 
                        className="text-primary hover:underline"
                      >
                        serpongmaxvision@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp</h3>
                      <a 
                        href="https://wa.me/6281803300441" 
                        className="text-primary hover:underline"
                      >
                        +62 818 0330 0441
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Free Delivery Hours</h3>
                      <p className="text-muted-foreground">
                        Available at 13:00 and 17:00 every day for Gading Serpong and BSD areas only.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="heading-3 mb-6">Online Shops</h2>
                <p className="text-muted-foreground mb-6">
                  You can also shop our products on these e-commerce platforms:
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="https://www.tokopedia.com/maxi-softlens" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Shop on Tokopedia
                  </a>
                  
                  <a 
                    href="https://www.shopee.com/maxi-softlens" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors ml-4"
                  >
                    Shop on Shopee
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Send us a Message</h2>
              
              {isSuccess ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Message Sent!</h3>
                  <p>Thank you for your message. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  * Required fields. Your message will be sent via WhatsApp for faster response.
                </p>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16">
            <h2 className="heading-3 mb-6">Find Us</h2>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2054340601384!2d106.6323!3d-6.2443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMzkuNSJTIDEwNsKwMzcnNTYuMyJF!5e0!3m2!1sen!2sid!4v1652345678901!5m2!1sen!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maxi Softlens Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
