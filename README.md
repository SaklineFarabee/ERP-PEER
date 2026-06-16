# ERP-PEER: Modern Business Management System

A polished, full-stack ERP web application for small businesses with a clean dashboard, intelligent AI helper, and comprehensive business management features.

## Features

✨ **Dashboard** - Real-time business overview with key metrics  
📦 **Inventory Management** - Track products and stock levels  
🛒 **Order Management** - Create and manage customer orders  
👥 **Customer Management** - Organize and track customer information  
📊 **Analytics & Reports** - Business insights and performance tracking  
🤖 **AI Helper** - Gemini-powered business assistant  
🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS  

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- A Gemini API key (get one at https://aistudio.google.com/apikey)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaklineFarabee/ERP-PEER.git
   cd ERP-PEER
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the `server` directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Initialize the database** (runs automatically on first server start)
   
5. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start:
   - Client: http://localhost:5173 (Vite dev server)
   - Server: http://localhost:5000 (Node.js API)

## Project Structure

```
ERP-PEER/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Node.js Express backend
│   ├── routes/            # API routes
│   ├── db/                # Database setup and migrations
│   ├── middleware/        # Express middleware
│   ├── index.js           # Server entry point
│   └── package.json
└── package.json          # Root package.json
```

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `GET /api/orders/:id` - Get order details

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer

### AI Helper
- `POST /api/ai/ask` - Ask the AI assistant a question
- `POST /api/ai/insight` - Get business insight

## Development

### Frontend Development
```bash
cd client
npm run dev
```

### Backend Development
```bash
cd server
node --watch index.js
```

### Build for Production
```bash
npm run build
```

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express
- SQLite3
- Google Gemini API

## Configuration

### Environment Variables (server/.env)

| Variable | Description | Example |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIza...` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |

## Sample Data

The application comes pre-loaded with sample data including:
- 5 sample products
- 10 sample customers
- 15 sample orders
- Historical data for analytics

This allows you to test the full functionality immediately after setup.

## Deployment

The app is ready for deployment to services like:
- Vercel (frontend)
- Heroku / Railway / Render (backend)
- or any Node.js hosting provider

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open a GitHub issue.
