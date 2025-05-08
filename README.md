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
- **User Authentication**: Email/password login and registration
- **Coin-Based Reward System**: Animated rewards with sound effects
- **User Profile Management**: Manage personal details with validation
- **Interactive Reward Redemption**: Visually engaging reward system

## Member System Features

### Authentication System
- Modern, mobile-responsive login and registration
- Validation for user-friendly errors
- Branded visuals matching Maxi Softlens identity
- Auto-redirect to dashboard upon successful login

### Coin Reward System
- First-time login bonus: +50 coins
- Animated coin counter on dashboard
- Visual effects when coins are earned
- Progress bars for reward milestones

### Reward Tiers
- 50 Coins → 5% Discount
- 150 Coins → 20% Discount
- 1000 Coins → Free X2 Chi Vol. 2 Softlens

### Rewards Page
- Interactive reward cards with unlock states
- Animation effects on reward redemption
- Confirmation modal with coin deduction animation
- Active/used/expired states for redeemed rewards

### Profile Management
- Update personal details (name, WhatsApp number, birthdate, address)
- Input validation with visual feedback
- Animation on successful save

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

The project uses Supabase as a backend service. The database schema includes:

### Core Product Tables
- `products`: Stores product information
- `product_powers`: Stores power options for products

### Member System Tables
- `profiles`: Stores user profile information
- `coins`: Tracks user coin balances
- `coin_transactions`: Records coin earning/spending history
- `rewards`: Defines available rewards
- `user_rewards`: Tracks redeemed rewards

### Helper Functions
- `add_coins()`: Manages coin transactions
- `handle_first_login_bonus()`: Awards first-time login bonus
- `redeem_reward()`: Processes reward redemptions

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
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   └── ui/         # UI components from shadcn
│   ├── contexts/       # React contexts
│   │   ├── AuthContext.tsx    # Authentication context
│   │   └── RewardsContext.tsx # Rewards management context
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   │   ├── animations.ts     # Animation utilities
│   │   ├── supabase.ts       # Supabase client
│   │   └── utils.ts          # General utilities
│   ├── pages/          # Page components
│   │   ├── DashboardPage.tsx  # User dashboard
│   │   ├── LoginPage.tsx      # Login page
│   │   ├── ProfilePage.tsx    # Profile management
│   │   ├── RegisterPage.tsx   # Registration page
│   │   └── RewardsPage.tsx    # Rewards management
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
