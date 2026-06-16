# ERP-PEER Quick Reference

## 🚀 Get Started in 3 Steps

### Step 1: Clone & Install
```bash
git clone https://github.com/SaklineFarabee/ERP-PEER.git
cd ERP-PEER
npm run install:all
```

### Step 2: Add Gemini API Key
```bash
cp server/.env.example server/.env
# Edit server/.env and add your API key from https://aistudio.google.com/apikey
```

### Step 3: Run
```bash
npm run dev
# Open http://localhost:5173
```

---

## 📚 File Locations

| Feature | File |
|---------|------|
| Dashboard | `client/src/pages/Dashboard.jsx` |
| Products | `client/src/pages/Products.jsx` |
| Orders | `client/src/pages/Orders.jsx` |
| Customers | `client/src/pages/Customers.jsx` |
| AI Helper | `client/src/pages/AIHelper.jsx` |
| Navigation | `client/src/components/Sidebar.jsx` |
| Header | `client/src/components/Header.jsx` |
| API Routes | `server/routes/*.js` |
| Database | `server/db/database.js` |
| Server | `server/index.js` |
| Styling | `client/src/index.css` |
| Config | `client/tailwind.config.js` |

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Production
npm run build            # Build everything
npm start                # Start production server

# Utilities
npm install              # Install root deps
npm run install:all      # Install all deps (root, client, server)
```

---

## 🌐 API Endpoints

### Dashboard
```
GET /api/dashboard
```

### Products
```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Customers
```
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Orders
```
GET    /api/orders
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
```

### AI
```
POST /api/ai/ask      { question: "..." }
POST /api/ai/insight
```

---

## 🎨 Customizing the UI

### Change Colors
Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Change Logo/Title
Edit `client/src/components/Sidebar.jsx`:
```jsx
<h2 className="text-xl font-bold">Your Brand</h2>
```

### Add New Page
1. Create `client/src/pages/YourPage.jsx`
2. Add to `client/src/App.jsx` navigation
3. Add route in Sidebar

---

## 📊 Sample Data Locations

All in `server/db/database.js`:
- Products: 5 sample items
- Customers: 10 sample contacts
- Orders: 15 sample orders

To modify, edit the `insertSampleData()` function.

---

## 🔌 Adding an API Endpoint

1. Create route in `server/routes/myroute.js`:
```javascript
import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

export default router
```

2. Import in `server/index.js`:
```javascript
import myRouter from './routes/myroute.js'
app.use('/api/myroute', myRouter)
```

3. Call from frontend:
```javascript
const response = await axios.get('/api/myroute')
```

---

## 💾 Database Operations

Using Better-SQLite3 in routes:

```javascript
const db = getDatabase()

// SELECT
const items = db.prepare('SELECT * FROM table').all()
const one = db.prepare('SELECT * FROM table WHERE id = ?').get(id)

// INSERT
const result = db.prepare(
  'INSERT INTO table (col1, col2) VALUES (?, ?)'
).run(val1, val2)

// UPDATE
db.prepare('UPDATE table SET col1 = ? WHERE id = ?').run(val, id)

// DELETE
db.prepare('DELETE FROM table WHERE id = ?').run(id)
```

---

## 🤖 Using the AI

### In Frontend
```javascript
const response = await axios.post('/api/ai/ask', {
  question: 'What is my revenue?'
})
console.log(response.data.answer)
```

### In Backend
```javascript
import { askAI } from './routes/ai.js'
const answer = await askAI('Your question')
```

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change in `.env` or `vite.config.js` |
| DB errors | `rm server/erp.db*` then restart |
| Npm install fails | `npm cache clean --force` |
| AI not working | Check Gemini API key in `.env` |
| Blank page | Check browser console for errors |

---

## 📱 Responsive Breakpoints

Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Use in JSX: `className="md:col-span-2 lg:col-span-3"`

---

## 🚀 Deploy Checklist

- [ ] Remove sample data (or keep for demo)
- [ ] Set `NODE_ENV=production`
- [ ] Update API base URL in frontend
- [ ] Test all features
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Set secure database password
- [ ] Enable HTTPS
- [ ] Configure CORS for production
- [ ] Set up monitoring/logging
- [ ] Create database backups

---

## 📞 Support

For detailed info, see:
- `README.md` - Overview
- `SETUP.md` - Installation guide
- `CONTRIBUTING.md` - How to contribute
- `CHANGELOG.md` - Version history

---

**Happy building! 🎉**
