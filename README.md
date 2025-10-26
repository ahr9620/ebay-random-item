# eBay Random Item Finder - Chrome Extension

A Chrome extension that finds random eBay items within your specified budget.

## Features

- eBay-themed UI with red and blue color scheme
- Input your budget and get a random item close to that price
- Items are selected from the top 80-100% of your budget range
- **Built-in eBay App ID** - works out of the box!
- Optional: Use your own App ID for higher rate limits

## Setup Instructions

### 1. Create Icon Files

You need to create three icon files. You have two options:

#### Option A: Use the Icon Generator (Easiest)
1. Open `create_icons.html` in your browser
2. Click each button to download the icon files
3. Save them in the extension folder

#### Option B: Create Simple Icons Manually
Create three PNG files (icon16.png, icon48.png, icon128.png) with any simple eBay-themed design, or use any placeholder images temporarily.

### 2. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `eBay_Random` folder
5. The extension should now appear in your extensions list

### 3. Use the Extension

1. Click the extension icon in your Chrome toolbar
2. Enter your budget in USD (App ID is pre-filled)
3. Click "Find Random Item"
4. View your random item and click "View on eBay" to see more details

**Optional:** You can replace the built-in App ID with your own for higher rate limits

## Test Case

**Test Input:**
- Budget: $50.00 (App ID is built-in)

**Expected Result:**
- Extension should display a random eBay item priced between $40-$50
- Item should have an image, title, price, condition, and link to eBay

## Troubleshooting

- **"No items found"**: Try a different budget amount (e.g., $20-$100 usually has good results)
- **API errors**: The built-in App ID should work fine. If you get rate limit errors, consider getting your own App ID

## Files Included

- `manifest.json` - Extension configuration
- `popup.html` - UI layout
- `popup.js` - Logic and eBay API integration
- `styles.css` - eBay-themed styling
- `create_icons.html` - Icon generator tool
- `README.md` - This file


