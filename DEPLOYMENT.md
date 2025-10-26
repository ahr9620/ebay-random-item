# Deployment Guide

## Option 1: Heroku (Recommended)

### 1. Install Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create your-app-name
```

### 4. Set Environment Variables
```bash
heroku config:set EBAY_APP_ID=AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7
```

### 5. Deploy
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

### 6. Update Chrome Extension
Replace `https://your-app-name.herokuapp.com` in `popup.js` with your actual Heroku URL.

---

## Option 2: Railway

### 1. Go to [railway.app](https://railway.app)
### 2. Connect GitHub repository
### 3. Deploy automatically
### 4. Set environment variable: `EBAY_APP_ID=AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7`

---

## Option 3: Render

### 1. Go to [render.com](https://render.com)
### 2. Create new Web Service
### 3. Connect GitHub repository
### 4. Set environment variable: `EBAY_APP_ID=AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7`

---

## After Deployment

1. **Update Chrome Extension**: Replace the server URL in `popup.js`
2. **Test**: Use the Chrome extension with your hosted server
3. **Share**: Anyone can now use your extension without running a local server!

## Environment Variables

Make sure to set this environment variable on your hosting platform:
- `EBAY_APP_ID=AshtonRe-RandomPu-SBX-dc5825f8b-cca316a7`
