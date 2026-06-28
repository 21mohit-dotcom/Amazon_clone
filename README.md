# Amazon Clone - amazonLite

A full-stack Amazon-inspired e-commerce web application built with **React 19**, **Node.js/Express**, and **MongoDB Atlas**. Features product browsing, search with autocomplete, shopping cart with localStorage persistence, user authentication with JWT, and a complete checkout flow.

---

## Table of Contents

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Key Implementation Notes](#key-implementation-notes)
- [Future Improvements](#future-improvements)

---

## Demo

[https://amazon-clone-opal-two-28.vercel.app](https://amazon-clone-opal-two-28.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router DOM 7, Axios, Vite 8 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas (Mongoose 9) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Deployment | Render (backend), Netlify (frontend) |

---

## Features

### Authentication
- User signup & login with email/password
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens (30-day expiry) stored in localStorage
- Auth-gated checkout (login required to place orders)
- Logout clears session

### Product Catalog
- 30 seeded products across 7 categories (Electronics, Fashion, Footwear, Accessories, Sports, Home)
- Product detail page with image, ratings, price, discount %, description, stock status
- Indian Rupee (INR) formatting throughout

### Search & Filtering
- Real-time text search by product title
- Search autocomplete dropdown (up to 8 suggestions with thumbnails)
- Category filter pills (All, Electronics, Fashion, Footwear, Accessories, Sports, Home)
- Combined search + category filtering

### Shopping Cart
- Add to cart from product cards, detail page, or navbar
- Quantity selector (1-10) with increment/decrement
- Remove items individually
- Full cart persistence in localStorage
- Mini-cart dropdown in navbar with inline editing
- Animated cart count badge
- Savings calculation from original prices

### Checkout & Orders
- Address form with order review
- Order summary sidebar
- Animated order success screen with delivery estimate
- Cart cleared after order placement

### UI/UX
- Amazon-style dark navbar with logo, search, account, cart
- Auto-sliding product carousel (8 featured products, 3s interval, thumbnails)
- 3 promotional offer banners with coupon codes
- Responsive design (mobile, tablet, desktop breakpoints)
- Loading spinners and error states
- Star ratings with review counts
- Card hover animations and smooth transitions

---

## Project Structure

```
Amazon_clone/
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── main.jsx                 # Entry point (providers + BrowserRouter)
│   │   ├── App.jsx                  # Route definitions
│   │   ├── api.js                   # Axios instance (baseURL from env)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Auth state (login/logout/user/token)
│   │   │   └── CartContext.jsx      # Cart state (items/qty/total/clear)
│   │   ├── pages/
│   │   │   ├── ProductList.jsx      # Main storefront
│   │   │   ├── ProductDetail.jsx    # Single product view
│   │   │   ├── Cart.jsx             # Shopping cart page
│   │   │   ├── Checkout.jsx         # Checkout with address form
│   │   │   ├── Login.jsx            # Sign-in page
│   │   │   └── Signup.jsx           # Registration page
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── ProductCard.jsx      # Product grid card
│   │   │   ├── ProductCarousel.jsx  # Auto-sliding hero carousel
│   │   │   ├── OfferBanner.jsx      # Promotional banners
│   │   │   └── CategoryBar.jsx      # Category filter pills
│   │   └── assets/                  # Images (hero.png, logos)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Backend (Express + MongoDB)
│   ├── server.js                    # Main entry point (modular routes)
│   ├── index.js                     # Alternate simpler entry
│   ├── seed.js                      # Database seeder (30 products)
│   ├── models/
│   │   ├── user.js                  # User schema
│   │   └── product.js               # Product schema
│   ├── routes/
│   │   ├── auth.js                  # POST /api/auth/signup, /api/auth/login
│   │   └── products.js              # GET /api/products, /api/products/:id
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/21mohit-dotcom/Amazon_clone.git
cd Amazon_clone
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file (see Environment Variables below)
# Seed the database with 30 sample products
npm run seed

# Start dev server (with nodemon)
npm run dev
```

The server runs on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd client
npm install

# Start dev server
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Available Scripts

**Client:**
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

**Server:**
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon (port 5000) |
| `npm start` | Start production server |
| `npm run seed` | Seed database with 30 sample products |

---

## Environment Variables

### Server `.env`
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Client `.env`
```env
VITE_API_URL=http://localhost:5000
```

> For production, update `VITE_API_URL` to your deployed backend URL.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/api/auth/signup` | Register new user (returns JWT + user) |
| `POST` | `/api/auth/login` | Login user (returns JWT + user) |
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/products/:id` | Fetch single product by ID |

### Request/Response Examples

**Signup:**
```json
POST /api/auth/signup
Body: { "name": "Mohit", "email": "mohit@example.com", "password": "pass123" }
Response: { "token": "jwt_token", "user": { "_id", "name", "email" } }
```

**Login:**
```json
POST /api/auth/login
Body: { "email": "mohit@example.com", "password": "pass123" }
Response: { "token": "jwt_token", "user": { "_id", "name", "email" } }
```

**Products:**
```json
GET /api/products
Response: [{ "_id", "title", "price", "image", "description", "category", "rating", "numReviews", "originalPrice", "inStock" }]
```

---

## Database Schema

### User
| Field | Type | Notes |
|---|---|---|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, bcrypt hashed |
| `createdAt` | Date | Auto-generated |

### Product
| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `price` | Number | Required (INR) |
| `image` | String | Required (URL) |
| `description` | String | Required |
| `category` | String | Required |
| `rating` | Number | 0-5, default 0 |
| `numReviews` | Number | Default 0 |
| `originalPrice` | Number | For discount calculation |
| `inStock` | Boolean | Default true |

---

## Key Implementation Notes

- **Cart Persistence:** Cart state is synced to `localStorage` on every change, restoring on page load via `CartContext`.
- **Auth Session:** User and JWT token stored in `localStorage`. `AuthContext` restores session on mount.
- **Currency:** All prices are in Indian Rupees (INR/₹) with Indian number formatting (e.g., ₹1,2,999).
- **Carousel:** Auto-advances every 3 seconds, pauses on hover, with manual arrow navigation and thumbnail strip.
- **Search:** Client-side filtering with real-time results. Autocomplete triggers on input focus.
- **Two Server Files:** `server.js` (modular, production-ready) and `index.js` (simpler, inline routes). `server.js` is the primary entry point.

---

## Future Improvements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Order history & persistence in database
- [ ] User profile page & management
- [ ] Admin panel for product CRUD
- [ ] Server-side JWT middleware for route protection
- [ ] Product reviews & ratings (write)
- [ ] Email notifications for orders
- [ ] Real-time stock management
- [ ] Wishlist functionality
- [ ] Order tracking

---

## Author

**Mohit Sharma**
GitHub: [21mohit-dotcom](https://github.com/21mohit-dotcom)

---

## License

This project is for educational purposes.
