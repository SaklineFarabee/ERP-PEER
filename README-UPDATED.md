# ERP-PEER: Modern Business Management System

> A polished, full-stack ERP web application for small businesses with AI-powered insights

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Free Gemini API key (https://aistudio.google.com/apikey)

### Installation (2 minutes)

```bash
# Clone and setup
git clone https://github.com/SaklineFarabee/ERP-PEER.git
cd ERP-PEER
npm install
npm run install:all

# Add your Gemini API key
cp server/.env.example server/.env
# Edit server/.env and add your GEMINI_API_KEY

# Start the app
npm run dev
```

Then open **http://localhost:5173** in your browser!

## ✨ Features

- **📊 Dashboard** - Real-time business metrics and analytics
- **📦 Inventory** - Manage products and stock levels
- **🛒 Orders** - Create and track customer orders
- **👥 Customers** - Organize customer information
- **🤖 AI Assistant** - Gemini-powered business insights
- **🎨 Modern UI** - Clean, intuitive interface with Tailwind CSS
- **📱 Responsive** - Works on desktop and tablet

## 📋 What's Included

✅ **5 Sample Products** with inventory tracking  
✅ **10 Sample Customers** with contact info  
✅ **15 Sample Orders** at various stages  
✅ **Pre-built Analytics** dashboard  
✅ **SQLite Database** with sample data  
✅ **AI Helper** for business insights  
✅ **Modern UI** ready for production  

## 🎯 Main Pages

### Dashboard
- 4 key metrics (revenue, orders, products, customers)
- Sales trend chart
- Order status breakdown
- Top products list

### Products
- Add/edit/delete products
- Search functionality
- Track inventory
- Manage pricing

### Orders
- Create new orders
- Track order status
- View order history
- Status filtering

### Customers
- Manage customer profiles
- Contact information
- Order history
- Beautiful card layout

### AI Helper
- Ask business questions
- Get AI recommendations
- Revenue analysis
- Inventory insights

## 🛠 API Endpoints

```
GET    /health                    Health check
GET    /api/dashboard             Metrics
GET    /api/products              List products
POST   /api/products              Create product
PUT    /api/products/:id          Update product
DELETE /api/products/:id          Delete product
GET    /api/customers             List customers
POST   /api/customers             Create customer
PUT    /api/customers/:id         Update customer
DELETE /api/customers/:id         Delete customer
GET    /api/orders                List orders
POST   /api/orders                Create order
PUT    /api/orders/:id            Update order
DELETE /api/orders/:id            Delete order
POST   /api/ai/ask                Ask AI question
POST   /api/ai/insight            Get recommendations
```

## 📁 Project Structure

```
ERP-PEER/
├── client/                    React/Vite frontend
│   ├── src/
│   │   ├── components/        Header, Sidebar
│   │   ├── pages/             Dashboard, Products, etc.
│   │   └── index.css          Tailwind styles
│   └── package.json
├── server/                    Node.js/Express API
│   ├── db/database.js         SQLite setup
│   ├── routes/                API routes & AI
│   ├── index.js               Server entry
│   └── package.json
├── package.json               Root scripts
├── README.md                  This file
└── SETUP.md                   Detailed setup guide
```

## 🔧 Tech Stack

**Frontend:**
- React 18
- Vite (ultra-fast build)
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)
- Axios (HTTP)

**Backend:**
- Node.js + Express
- Better-SQLite3 (database)
- Google Generative AI (Gemini)
- CORS enabled

## 🚀 Development Commands

```bash
# Start both client and server
npm run dev

# Start only client
npm run dev:client

# Start only server
npm run dev:server

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

### Environment Variables (server/.env)

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### Ports
- Frontend: `http://localhost:5173` (Vite)
- Backend: `http://localhost:5000` (Express)

## 🎨 UI Features

- Clean, modern design
- Responsive layout
- Dark sidebar navigation
- Card-based components
- Color-coded status badges
- Smooth transitions
- Professional typography

## 📊 Sample Data

The app comes pre-loaded with realistic sample data:

**Products:**
- Laptop Pro ($1,299.99)
- Wireless Mouse ($49.99)
- USB-C Hub ($79.99)
- Mechanical Keyboard ($149.99)
- 4K Monitor ($399.99)

**Orders:**
- 15 sample orders (completed, pending, processing)
- Realistic customer names
- Varied order amounts

**Customers:**
- 10 sample customers
- Full contact information
- Different cities

## 🤖 AI Features

The AI Helper provides:
- Business insights
- Revenue analysis
- Inventory recommendations
- Customer insights
- Order analysis

*Requires valid Gemini API key*

## 🐛 Troubleshooting

### Port conflicts
```bash
# Change port in server/.env
PORT=5001
```

### Clear database
```bash
rm server/erp.db*
```

### Fresh install
```bash
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚢 Deployment

**Frontend (Vercel/Netlify):**
```bash
cd client && npm run build
```

**Backend (Railway/Render):**
```bash
cd server && npm start
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [Gemini API Docs](https://ai.google.dev)

## 💡 Next Steps

1. **Explore the app** - Check out all the features
2. **Modify sample data** - Update products/customers
3. **Customize styling** - Edit Tailwind config
4. **Add features** - Extend the API
5. **Deploy** - Share with your team

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

MIT License - Use this project freely for personal or commercial use.

## ❓ Questions?

Check out [SETUP.md](./SETUP.md) for detailed setup instructions and troubleshooting.

---

**Ready to build your business management system?**

```bash
npm run dev
```

Then visit http://localhost:5173 🎉
