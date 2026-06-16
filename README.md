# Frontend Assignment - Whatbytes E-Commerce Application

A modern e-commerce application built with Next.js, featuring product listing, filtering, cart management, and product detail pages.

## 📋 Assignment Requirements - Implementation Status

### 1. Home Page (/) – Product Listing ✅

#### Header ✅
- ✅ Logo on the left (White "Logo" text)
- ✅ Search bar in the center (350px width, 40px height, rounded corners)
- ✅ Cart icon with badge (Shows cart item count)
- ❌ Profile/Avatar (Removed per design requirements)

#### Main Section ✅
- ✅ Sidebar (left):
  - ✅ Category filter (Radio buttons: All, Electronics, Clothing, Home)
  - ✅ Price range slider (0-1000 range)
  - ❌ Brand filter (Removed per design requirements)
- ✅ Product Grid (right):
  - ✅ Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
  - ✅ Each product card includes:
    - ✅ Image (cover, 140px height, centered)
    - ✅ Title (Bold, can wrap to 2 lines)
    - ✅ Price (Bold)
    - ✅ Quick "Add to Cart" button (Blue, rounded, ~110px width)
    - ❌ Rating stars (Removed per design requirements for normal cards, included in featured card)

#### Footer ✅
- ✅ Copyright information ("©2024 American")
- ✅ Social media icons (Facebook, Twitter, Instagram - circular blue icons with white logos)

### 2. Product Detail Page (/product/[id]) ✅

#### Layout ✅
- ✅ Image Section (left):
  - ✅ Large product image (Image carousel or single large image)
- ✅ Details Section (right):
  - ✅ Product title (Bold, very large)
  - ✅ Price (Bold)
  - ✅ Description (3-4 lines, gray text)
  - ✅ Category (Label + value)
  - ✅ Quantity selector (+/- buttons)
  - ✅ "Add to Cart" button (Large blue button)
  - ✅ Reviews section (Optional - included with sample reviews)

### 3. Bonus (Optional) – Cart Page (/cart) ✅

- ✅ List of added products
- ✅ Quantity update controls (+/- buttons)
- ✅ Remove item option (Trash icon)
- ✅ Price summary (Subtotal, Shipping, Tax, Total)

## 🔧 Logic Implementation

### ✅ Filtering logic for categories and price
- Implemented in Sidebar component
- Category filtering using radio buttons
- Price filtering using slider (0-1000 range)
- URL-based filters (e.g., ?category=Electronics&price=500)

### ✅ Search filtering with string matching
- Implemented in Header component
- Searches through product title and category
- Updates URL with search parameter

### ✅ URL-based filters
- All filters update URL parameters
- Category: ?category=Electronics
- Price: ?price=500
- Search: ?search=shoes
- Filters can be combined

### ✅ Client-side state management for the cart
- Implemented using React Context (CartContext)
- CartProvider wraps the application
- Cart state managed globally

### ✅ Dynamic routing with Next.js
- Product detail pages: /product/[id]
- Dynamic routing implemented using Next.js App Router
- Product ID passed as URL parameter

### ✅ Conditional rendering
- Shows "No products found matching your criteria" message when filters return no results
- Cart page shows empty state when cart is empty

### ✅ Persist cart state in localStorage
- Cart state automatically saved to localStorage
- Cart loads from localStorage on page refresh
- Implemented in CartContext with useEffect hooks

## 🎨 Styling Implementation

### ✅ Tailwind CSS
- Used for all styling
- Responsive design implemented
- Custom color palette defined in globals.css

### ✅ Icons
- Icons sourced from lucide-react
- Used in: Header (Search, ShoppingBag), Cart page (Trash, Plus, Minus), Product detail page (Star)

### 🎨 Color Palette
- Navbar: #0057B8 (Royal Blue)
- Sidebar: #0057B8 (Royal Blue)
- Buttons: #0066D6 (Lighter Blue)
- Footer: #003B8F (Darker Blue)
- Background: #F3F4F6 (Light Gray)
- Cards: #FFFFFF (White)
- Text: #222222 (Dark Gray)
- Secondary Text: #666666 (Medium Gray)
- Borders: #DDDDDD (Light Gray)

## 📁 Project Structure

```
themain-folder/
├── src/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.js          # Cart page
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.js      # Product detail page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.js            # Root layout with Header and Footer
│   │   └── page.js              # Home page with product listing
│   ├── components/
│   │   ├── Footer.js            # Footer component
│   │   ├── Header.js            # Header component
│   │   ├── ProductCard.js       # Product card component (normal + featured)
│   │   └── Sidebar.js           # Sidebar with filters
│   ├── context/
│   │   └── CartContext.js       # Cart state management
│   └── data/
│       └── products.json         # Product data
├── next.config.mjs              # Next.js configuration
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
pnpm start
```

## 📦 Features Implemented

### ✅ Core Features
1. **Product Listing Page**
   - Display all products in a responsive grid
   - Filter by category (All, Electronics, Clothing, Home)
   - Filter by price range (0-1000)
   - Search products by name or category
   - Featured product displayed prominently at bottom

2. **Product Detail Page**
   - Large product image
   - Product information (title, price, description, category)
   - Quantity selector
   - Add to cart functionality
   - Customer reviews section

3. **Shopping Cart**
   - View all added products
   - Update quantities
   - Remove items
   - Price summary (subtotal, shipping, tax, total)
   - Persist cart in localStorage

4. **State Management**
   - React Context for cart state
   - localStorage persistence
   - URL-based filtering

5. **Responsive Design**
   - Desktop: 3 columns
   - Tablet: 2 columns
   - Mobile: 1 column
   - Sidebar responsive

## 🔑 Key Components

### CartContext
- Manages cart state globally
- Provides: addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount
- Persists to localStorage automatically

### ProductCard
- Two variants: normal card and featured card
- Normal: 140px image, centered, compact layout
- Featured: Large layout with image on left, details on right

### Sidebar
- Dark blue card with white text
- Radio button category filters
- Price range slider (0-1000)
- Second white filter card with dropdown
- URL updates on filter changes

### Header
- Dark blue background (#0057B8)
- White logo text
- Search bar with icon
- Cart button with badge showing item count

### Footer
- Dark blue background (#003B8F)
- 3-column layout
- Social media icons (circular blue with white logos)

## 📝 Notes

- **Design Modifications**: The UI was modified to match a specific design provided, which differs from the original assignment image. Key changes include:
  - Radio buttons instead of checkboxes for categories
  - Removed brand filter
  - Removed profile/avatar from header
  - Removed rating stars from normal product cards
  - Added featured product card with different layout
  - Specific color palette (#0057B8, #003B8F, #0066D6)
  - 25% sidebar, 75% product section layout

- **Next.js Configuration**: Added remote pattern for Unsplash images in next.config.mjs

- **Infinite Loop Fix**: Sidebar useEffect was causing infinite loop due to searchParams in dependency array. Fixed by using useRef to track initialization and only updating URL after initial render.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub repository
2. Import repository in Vercel
3. Deploy automatically

### Vercel Deployment URL
[To be added after deployment]

## 📄 License

This project is part of a frontend assignment for Whatbytes.

## 🤝 Contributing

This is an assignment project. For questions or issues, please contact the assignment provider.
