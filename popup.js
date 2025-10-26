// Use built-in App ID
const BUILT_IN_APP_ID = 'AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7';

document.getElementById('findItem').addEventListener('click', async () => {
  const budget = parseFloat(document.getElementById('budget').value);

  // Hide previous results and errors
  document.getElementById('result').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');

  if (!budget || budget <= 0) {
    showError('Please enter a valid budget amount');
    return;
  }

  // Show loading
  document.getElementById('loading').classList.remove('hidden');

  try {
    const item = await fetchRandomItem(BUILT_IN_APP_ID, budget);
    displayItem(item);
  } catch (error) {
    showError(error.message);
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
});

async function fetchRandomItem(apiKey, budget) {
  console.log('Fetching real random item from server for budget: $' + budget);

  try {
    // Call your server to get real eBay items
        const response = await fetch('https://ebay-random-item.onrender.com/api/random-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ budget: budget })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    }

    const item = await response.json();
    console.log('✅ SUCCESS: Got real eBay item from server:', item);
    return item;

  } catch (error) {
    console.log('❌ Server request failed:', error.message);
    console.log('Falling back to item inspiration...');
    
    // Fallback to inspiration if server is down
    return getRandomItemInspiration(budget);
  }
}

// Generate random item inspiration that links to real eBay searches
function getRandomItemInspiration(budget) {
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
  
  const randomItem = {
    title: `${item} - ${condition}`,
    price: price,
    currency: "USD",
    image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000000000000)}?w=300&h=200&fit=crop&crop=center`,
    url: searchUrl,
    condition: condition,
    isRealEbayItem: false
  };
  
  console.log('Generated item inspiration:', randomItem);
  console.log('eBay search URL:', searchUrl);
  
  return randomItem;
}

function displayItem(item) {
  document.getElementById('itemImage').src = item.image;
  document.getElementById('itemTitle').textContent = item.title;
  document.getElementById('itemPrice').textContent = `${item.currency} $${item.price.toFixed(2)}`;
  document.getElementById('itemCondition').textContent = item.condition;
  
  // Set the link and add debugging
  const linkElement = document.getElementById('itemLink');
  linkElement.href = item.url;
  linkElement.target = '_blank'; // Open in new tab
  console.log('Setting link to:', item.url);
  
  // Add indicator if this is a real eBay item or fallback
  if (item.isRealEbayItem) {
    console.log('✅ Displaying REAL eBay item');
  } else {
    console.log('⚠️ Displaying FALLBACK item (scraping failed)');
  }
  
  document.getElementById('result').classList.remove('hidden');
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

// Allow Enter key to submit
document.getElementById('budget').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('findItem').click();
  }
});

// Create realistic random items that link to actual eBay searches
function getRealisticRandomItem(budget) {
  const categories = [
    {
      keywords: ['vintage', 'antique', 'collectible'],
      images: [
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd5?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center'
      ],
      items: ['Vintage Camera Lens', 'Antique Wooden Box', 'Rare Collectible Figure', 'Vintage Tool Set', 'Handmade Ceramic Bowl']
    },
    {
      keywords: ['electronics', 'gadgets', 'tech'],
      images: [
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center'
      ],
      items: ['Wireless Headphones', 'Smart Watch', 'Bluetooth Speaker', 'Phone Case', 'USB Cable']
    },
    {
      keywords: ['clothing', 'fashion', 'accessories'],
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center'
      ],
      items: ['Designer Handbag', 'Vintage Jacket', 'Silk Scarf', 'Leather Boots', 'Statement Necklace']
    },
    {
      keywords: ['home', 'decor', 'furniture'],
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd5?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1493225457124-a3b1616fef89?w=300&h=200&fit=crop&crop=center'
      ],
      items: ['Decorative Vase', 'Throw Pillow', 'Wall Art', 'Candle Holder', 'Plant Pot']
    },
    {
      keywords: ['sports', 'fitness', 'outdoor'],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center'
      ],
      items: ['Yoga Mat', 'Resistance Bands', 'Water Bottle', 'Gym Gloves', 'Protein Shaker']
    }
  ];

  // Pick a random category
  const category = categories[Math.floor(Math.random() * categories.length)];
  const keyword = category.keywords[Math.floor(Math.random() * category.keywords.length)];
  const item = category.items[Math.floor(Math.random() * category.items.length)];
  const image = category.images[Math.floor(Math.random() * category.images.length)];
  
  // Generate realistic price (80-100% of budget)
  const priceMultiplier = 0.8 + Math.random() * 0.2;
  const price = budget * priceMultiplier;
  
  // Generate realistic condition
  const conditions = ['New', 'Used - Like New', 'Used - Very Good', 'Used - Good', 'Used - Acceptable'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Create eBay search URL for this specific item
  const searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(keyword + ' ' + item)}&_udlo=${(budget * 0.8).toFixed(0)}&_udhi=${budget.toFixed(0)}`;
  
  const randomItem = {
    title: `${item} - ${condition}`,
    price: price,
    currency: "USD",
    image: image,
    url: searchUrl,
    condition: condition,
    isRealEbayItem: false
  };
  
  console.log('Generated realistic random item:', randomItem);
  console.log('eBay search URL:', searchUrl);
  
  return randomItem;
}

// Parse eBay search results HTML to extract real items
function parseEbaySearchResults(html, budget) {
  const items = [];
  
  try {
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Look for item containers in eBay's search results
    const itemElements = doc.querySelectorAll('.s-item, .srp-item, [data-view="mi:1686|iid:1"]');
    
    console.log('Found', itemElements.length, 'potential items');
    
    itemElements.forEach((element, index) => {
      try {
        // Extract item details
        const titleElement = element.querySelector('.s-item__title, .srp-item__title, h3');
        const priceElement = element.querySelector('.s-item__price, .srp-item__price, .notranslate');
        const imageElement = element.querySelector('.s-item__image img, .srp-item__image img');
        const linkElement = element.querySelector('.s-item__link, .srp-item__link, a');
        
        if (titleElement && priceElement && linkElement) {
          const title = titleElement.textContent.trim();
          const priceText = priceElement.textContent.trim();
          const imageUrl = imageElement ? imageElement.src : '';
          const itemUrl = linkElement.href;
          
          // Extract price number
          const priceMatch = priceText.match(/\$?(\d+\.?\d*)/);
          if (priceMatch) {
            const price = parseFloat(priceMatch[1]);
            
            // Only include items within budget range
            if (price >= budget * 0.8 && price <= budget) {
              items.push({
                title: title,
                price: price,
                currency: 'USD',
                image: imageUrl || 'https://via.placeholder.com/150',
                url: itemUrl,
                condition: 'Not specified',
                isRealEbayItem: true
              });
              
              console.log('Added real item:', title, '$' + price);
            }
          }
        }
      } catch (itemError) {
        console.log('Error parsing item', index, itemError.message);
      }
    });
    
    console.log('Successfully parsed', items.length, 'real items');
    
  } catch (error) {
    console.log('Error parsing eBay HTML:', error.message);
  }
  
  return items;
}


