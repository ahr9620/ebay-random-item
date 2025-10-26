# Server Setup for eBay Random Item Extension

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/ashtonreeder/Desktop/CritX/Chrome\ Extensions/eBay_Random
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Test the Server
Visit: http://localhost:3000/health

## 🎯 How It Works

### **Server Side (No CORS Issues):**
- ✅ Receives budget from Chrome extension
- ✅ Makes API calls to eBay (server-to-server, no CORS)
- ✅ Returns real eBay items with titles, prices, images, links
- ✅ Handles API errors gracefully

### **Chrome Extension:**
- ✅ Sends budget to your server
- ✅ Receives real eBay item data
- ✅ Displays actual purchasable items
- ✅ Falls back to inspiration if server is down

## 🔧 Server Features

### **Real eBay Integration:**
- Uses your eBay App ID: `AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7`
- Searches for items within 80-100% of your budget
- Returns random items from top 20% closest to budget
- Real titles, prices, images, and direct eBay links

### **Error Handling:**
- API rate limiting
- No items found
- Network errors
- Graceful fallbacks

## 🌐 Deployment Options

### **Local Development:**
- Server runs on `http://localhost:3000`
- Extension connects to local server
- Perfect for testing

### **Production Deployment:**
- Deploy to Heroku, Railway, or Vercel
- Update extension to use production URL
- Add environment variables for API keys

## 📝 Environment Variables

Create `.env` file:
```
EBAY_APP_ID=AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7
PORT=3000
```

## 🎉 Benefits

### **No CORS Issues:**
- Server makes API calls (no browser restrictions)
- Extension just receives data

### **Real eBay Items:**
- Actual titles, prices, images
- Direct links to item pages
- Real purchasable items

### **Reliable:**
- Server handles API complexity
- Extension stays simple
- Fallback if server is down

## 🚀 Test It

1. **Start server:** `npm start`
2. **Load extension** in Chrome
3. **Enter budget** (e.g., $50)
4. **Get real eBay item** with actual price and link!

The server approach completely solves the CORS problem and gives you real eBay items! 🎯
