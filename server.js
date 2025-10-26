const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// eBay API configuration
const EBAY_APP_ID = process.env.EBAY_APP_ID || 'AshtonRe-RandomPu-PRD-aeae9f383-eaca758b';

// Route to get random eBay items
app.post('/api/random-item', async (req, res) => {
  try {
    const { budget } = req.body;
    
    if (!budget || budget <= 0) {
      return res.status(400).json({ error: 'Invalid budget' });
    }

    const minPrice = Math.max(1, budget * 0.8);
    const maxPrice = budget;

    // Build eBay API URL for production environment
    const apiUrl = new URL('https://svcs.ebay.com/services/search/FindingService/v1');
    apiUrl.searchParams.set('OPERATION-NAME', 'findItemsAdvanced');
    apiUrl.searchParams.set('SERVICE-VERSION', '1.0.0');
    apiUrl.searchParams.set('SECURITY-APPNAME', EBAY_APP_ID);
    apiUrl.searchParams.set('RESPONSE-DATA-FORMAT', 'JSON');
    apiUrl.searchParams.set('keywords', '*');
    apiUrl.searchParams.set('paginationInput.entriesPerPage', '100');
    apiUrl.searchParams.set('itemFilter(0).name', 'MaxPrice');
    apiUrl.searchParams.set('itemFilter(0).value', maxPrice.toFixed(2));
    apiUrl.searchParams.set('itemFilter(1).name', 'MinPrice');
    apiUrl.searchParams.set('itemFilter(1).value', minPrice.toFixed(2));
    apiUrl.searchParams.set('itemFilter(2).name', 'ListingType');
    apiUrl.searchParams.set('itemFilter(2).value', 'FixedPrice');
    
    // Random sort order
    const sortOptions = ['PricePlusShippingHighest', 'PricePlusShippingLowest', 'BestMatch', 'EndTimeSoonest'];
    const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
    apiUrl.searchParams.set('sortOrder', randomSort);

    console.log('Fetching from eBay API:', apiUrl.toString());

    // Make request to eBay API
    const response = await fetch(apiUrl.toString());
    
    console.log('eBay API response status:', response.status);
    console.log('eBay API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('eBay API error response:', errorText);
      console.log('eBay API failed, using fallback approach');
      // Fallback to realistic items that link to eBay searches
      const fallbackItem = generateFallbackItem(budget);
      return res.json(fallbackItem);
    }

    const data = await response.json();
    console.log('eBay API response received');

    // Check for API errors
    if (data.findItemsAdvancedResponse && data.findItemsAdvancedResponse[0].errorMessage) {
      const errorMsg = data.findItemsAdvancedResponse[0].errorMessage[0].error[0].message[0];
      console.log('eBay API error:', errorMsg);
      const fallbackItem = generateFallbackItem(budget);
      return res.json(fallbackItem);
    }

    const searchResult = data.findItemsAdvancedResponse[0].searchResult[0];
    
    if (!searchResult['@count'] || searchResult['@count'] === '0') {
      console.log('No items found, using fallback');
      const fallbackItem = generateFallbackItem(budget);
      return res.json(fallbackItem);
    }

    const items = searchResult.item;
    console.log(`Found ${items.length} items from eBay`);

    // Filter items to get those closest to the budget
    const sortedItems = items.sort((a, b) => {
      const priceA = parseFloat(a.sellingStatus[0].currentPrice[0].__value__);
      const priceB = parseFloat(b.sellingStatus[0].currentPrice[0].__value__);
      return priceB - priceA; // Sort descending (highest price first)
    });

    // Pick a random item from the top 20% closest to budget
    const topItems = sortedItems.slice(0, Math.max(1, Math.floor(sortedItems.length * 0.2)));
    const randomItem = topItems[Math.floor(Math.random() * topItems.length)];

    // Return the item data
    const itemData = {
      title: randomItem.title[0],
      price: parseFloat(randomItem.sellingStatus[0].currentPrice[0].__value__),
      currency: randomItem.sellingStatus[0].currentPrice[0]['@currencyId'],
      image: randomItem.galleryURL ? randomItem.galleryURL[0] : 'https://via.placeholder.com/150',
      url: randomItem.viewItemURL[0],
      condition: randomItem.condition ? randomItem.condition[0].conditionDisplayName[0] : 'Not specified',
      isRealEbayItem: true
    };

    console.log('Returning random item:', itemData.title);
    res.json(itemData);

  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'eBay Random Item Server is running' });
});

// Generate fallback items that link to real eBay searches
function generateFallbackItem(budget) {
  const categories = [
    {
      keywords: ['vintage', 'antique', 'collectible'],
      items: ['Vintage Camera', 'Antique Vase', 'Collectible Figure', 'Vintage Tool', 'Antique Book']
    },
    {
      keywords: ['electronics', 'gadgets', 'tech'],
      items: ['Wireless Headphones', 'Smart Watch', 'Bluetooth Speaker', 'Phone Case', 'USB Cable']
    },
    {
      keywords: ['clothing', 'fashion', 'accessories'],
      items: ['Designer Handbag', 'Vintage Jacket', 'Silk Scarf', 'Leather Boots', 'Statement Necklace']
    },
    {
      keywords: ['home', 'decor', 'furniture'],
      items: ['Decorative Vase', 'Throw Pillow', 'Wall Art', 'Candle Holder', 'Plant Pot']
    },
    {
      keywords: ['sports', 'fitness', 'outdoor'],
      items: ['Yoga Mat', 'Resistance Bands', 'Water Bottle', 'Gym Gloves', 'Protein Shaker']
    }
  ];

  // Pick a random category and item
  const category = categories[Math.floor(Math.random() * categories.length)];
  const keyword = category.keywords[Math.floor(Math.random() * category.keywords.length)];
  const item = category.items[Math.floor(Math.random() * category.items.length)];
  
  // Generate realistic price (80-100% of budget)
  const priceMultiplier = 0.8 + Math.random() * 0.2;
  const price = budget * priceMultiplier;
  
  // Generate realistic condition
  const conditions = ['New', 'Used - Like New', 'Used - Very Good', 'Used - Good', 'Used - Acceptable'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Create eBay search URL for this specific item
  const searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(keyword + ' ' + item)}&_udlo=${(budget * 0.8).toFixed(0)}&_udhi=${budget.toFixed(0)}`;
  
  return {
    title: `${item} - ${condition}`,
    price: price,
    currency: "USD",
    image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000000000000)}?w=300&h=200&fit=crop&crop=center`,
    url: searchUrl,
    condition: condition,
    isRealEbayItem: false
  };
}

app.listen(PORT, () => {
  console.log(`🚀 eBay Random Item Server running on http://localhost:${PORT}`);
  console.log(`📡 eBay App ID: ${EBAY_APP_ID}`);
});
