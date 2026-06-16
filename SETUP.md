# Detailed Setup Instructions

## Prerequisites
- Node.js 16+ (download from https://nodejs.org/)
- npm (comes with Node.js)
- A free Gemini API key (https://aistudio.google.com/apikey)

## Step 1: Get Your Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy the generated API key
4. Keep it safe - you'll need it in the next step

## Step 2: Clone and Setup the Repository

```bash
# Clone the repository
git clone https://github.com/SaklineFarabee/ERP-PEER.git
cd ERP-PEER

# Install root dependencies
npm install

# Install all dependencies (client and server)
npm run install:all
```

## Step 3: Configure Environment Variables

### For the Server:

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```

3. Edit `server/.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. Save the file

## Step 4: Start the Development Server

From the root directory:

```bash
npm run dev
```

This command will start:
- **Frontend**: React Vite dev server at http://localhost:5173
- **Backend**: Node.js API at http://localhost:5000

You should see output like:
```
✅ Database initialized
✅ Gemini AI initialized
🚀 ERP-PEER Server
✅ Server running at http://localhost:5000
✅ Client should be running at http://localhost:5173
```

## Step 5: Open the App

1. Open your browser and navigate to: **http://localhost:5173**
2. You should see the ERP-PEER dashboard with sample data
3. Explore the different sections:
   - **Dashboard**: View business metrics and analytics
   - **Products**: Manage your product inventory
   - **Orders**: Create and manage customer orders
   - **Customers**: Manage customer information
   - **AI Helper**: Ask the AI assistant business questions

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use, you can change them:
- **Client port**: Edit `client/vite.config.js` and change the `port` value
- **Server port**: Edit `server/.env` and change `PORT`

### Database Errors
If you get database errors:
```bash
# Delete the old database
rm server/erp.db*

# Restart the server
npm run dev
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules client/node_modules server/node_modules

# Reinstall
npm run install:all
```

### AI Not Working
If the AI helper shows fallback responses:
1. Verify your Gemini API key is correct in `server/.env`
2. Check your internet connection
3. Restart the server with `npm run dev`

## Project Structure

```
ERP-PEER/
├── client/                 # React/Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable components (Header, Sidebar)
│   │   ├── pages/          # Page components (Dashboard, Products, etc.)
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Tailwind styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js/Express backend
│   ├── db/
│   │   └── database.js     # Database setup & sample data
│   ├── routes/
│   │   ├── products.js     # Product API endpoints
│   │   ├── customers.js    # Customer API endpoints
│   │   ├── orders.js       # Order API endpoints
│   │   ├── dashboard.js    # Dashboard metrics
│   │   ├── ai.js           # Gemini AI integration
│   │   └── aiRouter.js     # AI API endpoints
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── .env.example
├── package.json            # Root scripts
└── README.md               # This file
```

## Available Features

### Dashboard
- Real-time business metrics (revenue, orders, products, customers)
- Sales trend chart
- Order status breakdown
- Top products list

### Products Management
- Add, edit, delete products
- Search by name or SKU
- Track inventory levels
- Manage pricing

### Order Management
- Create new orders
- Track order status
- View order history
- Multiple order statuses (pending, processing, completed, cancelled)

### Customer Management
- Add and manage customer information
- View customer contact details
- Track customer orders
- Beautiful card-based interface

### AI Business Assistant
- Ask questions about your business
- Get insights on revenue, orders, and products
- AI-powered recommendations
- Fallback responses when API is unavailable

## API Endpoints

### Health & General
- `GET /health` - Check server health

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Dashboard
- `GET /api/dashboard` - Get metrics and analytics

### AI
- `POST /api/ai/ask` - Ask AI a question
- `POST /api/ai/insight` - Get business recommendations

## Sample Data

The app comes pre-loaded with:
- **5 Products**: Laptop Pro, Wireless Mouse, USB-C Hub, Mechanical Keyboard, 4K Monitor
- **10 Customers**: Various business contacts
- **15 Orders**: Sample orders with different statuses
- **Analytics Data**: Pre-calculated metrics and trends

## Development

### Frontend Only
```bash
cd client
npm run dev
```

### Backend Only
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
- Vite (fast build tool)
- Tailwind CSS (styling)
- Recharts (charts)
- Lucide React (icons)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express (web framework)
- Better-SQLite3 (database)
- Google Generative AI (Gemini)

## Next Steps

After getting the MVP running, you can:

1. **Add More Features**
   - Export to PDF/CSV
   - Email notifications
   - Multi-user login
   - Advanced filtering

2. **Enhance UI/UX**
   - Dark mode
   - Mobile app version
   - Custom themes
   - Drag-and-drop functionality

3. **Improve Data**
   - Advanced reporting
   - Forecasting
   - Inventory alerts
   - Customer analytics

4. **Deploy**
   - Deploy frontend to Vercel
   - Deploy backend to Railway or Render
   - Set up production database

## Support & Troubleshooting

If you encounter any issues:

1. Check that both client and server are running
2. Verify your Gemini API key is set correctly
3. Clear browser cache and restart
4. Check the console for error messages
5. Ensure Node.js version 16+ is installed

## License

MIT License - Feel free to use this project for your business!

---

**Ready to get started?**

```bash
npm install
npm run install:all
npm run dev
```

Then open http://localhost:5173 in your browser! 🎉
