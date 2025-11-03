# PremiumStore - Premium E-commerce Platform

A modern, responsive e-commerce platform built with Next.js, React, and Tailwind CSS. PremiumStore delivers a premium shopping experience with clean design, smooth interactions, and comprehensive functionality.

![PremiumStore Preview](https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### 🏠 Homepage
- **Hero Section**: Striking product showcase with compelling call-to-action
- **Category Grid**: Magazine-style category cards with hover animations
- **Trending Deals**: Curated selection of time-sensitive offers
- **Trust Signals**: Security badges, shipping info, and guarantees

### 🛍️ Shopping Experience
- **Product Grid**: Premium product showcase with smooth hover interactions
- **Advanced Filtering**: Hidden drawer-style filters for category, price, and brand
- **Product Details**: Large product images with tabbed information (description, reviews, shipping)
- **Quick Actions**: Add to cart, wishlist, and quick view functionality

### 🛒 Cart & Checkout
- **Smart Cart**: Clean item cards with quantity controls and suggestions
- **Multi-step Checkout**: Progress-tracked checkout flow (shipping → payment → review)
- **Trust Elements**: SSL badges, return policy, and customer support info
- **Order Confirmation**: Professional order completion experience

### 👤 Account Management
- **Dashboard**: App-like interface with modern order history
- **Profile Management**: Clean, friendly profile editing
- **Wishlist**: Curated gallery-style saved items
- **Order Tracking**: Detailed order status and history

### 🎨 Design Philosophy
- **Apple-inspired Aesthetics**: Clean, minimal design with premium feel
- **Accessibility First**: WCAG compliant with proper contrast ratios
- **Mobile Responsive**: Optimized for all device sizes
- **Micro-interactions**: Smooth animations and hover effects

## 🚀 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Frontend**: [React 18](https://reactjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Build**: Static export optimized for deployment

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/premiumstore.git
cd premiumstore

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Project Structure

```
premiumstore/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Feature-specific components
├── data/                 # Static data and types
├── lib/                  # Utility functions
└── public/              # Static assets
```

### Key Components

- **Navigation**: Responsive header with search, cart, and user actions
- **Hero**: Landing page hero section with CTA
- **ProductGrid**: Responsive product showcase with filtering
- **ProductFilters**: Advanced filtering sidebar
- **TrendingDeals**: Time-sensitive offers section
- **Categories**: Magazine-style category navigation

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Trust and reliability
- **Secondary**: Gray scale for content hierarchy
- **Accent**: Red (#ef4444) for sales and urgency
- **Success**: Green (#10b981) for positive actions

### Typography
- **Font**: Inter - Clean, modern, highly readable
- **Hierarchy**: 6 heading levels with consistent spacing
- **Body**: Optimized line height (1.6) for readability

### Spacing
- **System**: 8px base unit for consistent spacing
- **Breakpoints**: Mobile-first responsive design
- **Grid**: CSS Grid and Flexbox for layouts

## 📱 Responsive Design

- **Mobile**: 320px - 768px (Touch-optimized navigation)
- **Tablet**: 768px - 1024px (Adaptive grid layouts)
- **Desktop**: 1024px+ (Full feature experience)
- **Large**: 1440px+ (Optimized for large screens)

## 🔧 Configuration

### Environment Variables
```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Tailwind Configuration
Custom design tokens and utilities are defined in `tailwind.config.ts`:
- Custom color palette
- Extended spacing scale
- Animation utilities
- Component variants

## 🚀 Deployment

### Static Export (Recommended)
```bash
# Build for static hosting
npm run build

# Deploy the 'out' directory to your hosting provider
```

### Vercel (Optimal)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- **Netlify**: Drag and drop the `out` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `out` folder to S3 bucket

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads and displays correctly
- [ ] Product filtering and sorting works
- [ ] Cart functionality (add, remove, update quantities)
- [ ] Checkout flow completes successfully
- [ ] Responsive design on mobile devices
- [ ] Accessibility with keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes across different screen sizes
- Ensure accessibility standards are maintained

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Apple's product pages and modern e-commerce leaders
- **UI Components**: shadcn/ui for the excellent component library
- **Images**: Pexels for high-quality stock photography
- **Icons**: Lucide for the comprehensive icon set

## 📞 Support

For support, email support@premiumstore.com or join our community discussions.

---

**Built with ❤️ by Ganeshyam Verma(Htet Myo Win)**

*Creating premium shopping experiences for the modern web.*
