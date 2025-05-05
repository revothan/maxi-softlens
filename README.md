# Maxi Softlens Website

A modern, SEO-optimized product website for Maxi Softlens, a company that sells softlens products in the Gading Serpong and BSD areas.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **UI Library**: Shadcn UI
- **Backend**: Supabase
- **Hosting**: Netlify

## Features

- **WhatsApp Integration**: Users can purchase directly through WhatsApp
- **E-commerce Links**: Direct links to Tokopedia and Shopee stores
- **Product Catalog**: Display softlens products with selectable power values
- **Shopping Cart**: Allow users to add products to cart before checkout
- **Responsive Design**: Mobile-first approach ensuring a great experience on all devices
- **SEO Optimizations**: Semantic HTML, meta tags, and responsive design

## Local Development

1. **Clone the repository**
   ```
   git clone https://github.com/revothan/maxi-softlens.git
   cd maxi-softlens
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Create environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials
   ```
   cp .env.example .env
   ```

4. **Run the development server**
   ```
   npm run dev
   ```

5. **Build for production**
   ```
   npm run build
   ```

## Supabase Backend Setup

The project uses Supabase as a backend service. Follow these steps to set it up:

1. Create a new project on [Supabase](https://supabase.com)
2. Set up the database tables:
   
   ```sql
   -- Create products table
   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     series TEXT NOT NULL,
     color TEXT NOT NULL,
     description TEXT,
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create product powers table
   CREATE TABLE product_powers (
     id SERIAL PRIMARY KEY,
     product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
     power TEXT NOT NULL,
     quantity INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. Add the product data for the X2 CHI series as specified in the requirements
4. Set up appropriate security permissions for your tables

## Deployment to Netlify

### Automatic Deployment via GitHub

1. Create a new site on [Netlify](https://app.netlify.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables in Netlify:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
5. Deploy the site

### Manual Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy using Netlify CLI:
   ```
   netlify deploy --prod
   ```

## Project Structure

```
maxi-softlens/
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .env.example        # Example environment variables
└── netlify.toml        # Netlify configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.
