# 🚀 QUICK DEPLOYMENT TO YOUR GITHUB REPO

Since Replit has git restrictions, here's how to deploy your portfolio in 3 simple steps:

## 📥 Step 1: Download Your Portfolio

1. **In Replit**: Click the 3-dot menu (⋯) at the top
2. Select **"Download as ZIP"**
3. Extract the ZIP file on your computer

## 🌐 Step 2: Upload to GitHub

```bash
# Navigate to your extracted folder
cd quantum-portfolio

# Initialize git (if not already done)
git init

# Add your GitHub repo
git remote add origin https://github.com/vinay0826/my-portfolio.git

# Add all files
git add .

# Commit your portfolio
git commit -m "Deploy quantum portfolio with 3D effects"

# Push to GitHub
git push -u origin main
```

## 🚀 Step 3: Deploy to GitHub Pages

```bash
# Run the deployment script
node deploy.js
```

**OR manually:**

```bash
# Build static site
npx vite build --config vite.config.static.ts

# Deploy to GitHub Pages
npx gh-pages -d dist
```

## ⚙️ Step 4: Enable GitHub Pages

1. Go to https://github.com/vinay0826/my-portfolio
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages**
5. Folder: **/ (root)**
6. Click **Save**

## 🎉 Step 5: Access Your Live Portfolio

Your portfolio will be live at:
**https://vinay0826.github.io/my-portfolio**

---

## 🔄 Alternative: GitHub Desktop (Easiest)

1. Download GitHub Desktop
2. Clone your repo: https://github.com/vinay0826/my-portfolio.git
3. Copy all portfolio files to the cloned folder
4. Commit and push through GitHub Desktop
5. Run `node deploy.js` in terminal

---

## 🛠 If You Get Errors

**Error: "npm not found"**
```bash
# Install Node.js from nodejs.org first
```

**Error: "gh-pages not found"**  
```bash
npm install
```

**Error: "Permission denied"**
```bash
# Make sure you're logged into GitHub
git config --global user.name "vinay0826"
git config --global user.email "your-email@example.com"
```

---

## ✅ What's Already Configured

- ✅ 3D Skills Wheel with smooth rotation
- ✅ Cyberpunk terminal effects  
- ✅ Project carousel
- ✅ Mobile responsive
- ✅ GitHub Pages ready
- ✅ Deployment scripts included
- ✅ All animations optimized

Your portfolio is ready to impress! 🚀