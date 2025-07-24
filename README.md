# Quantum Developer Portfolio

A revolutionary cyberpunk-themed developer portfolio featuring 3D interactive skills visualization, holographic effects, and quantum-inspired animations.

## 🚀 Features

- **3D Interactive Skills Wheel**: Drag-to-rotate 3D skills visualization in space
- **Cyberpunk Design**: Futuristic terminal interface with neon effects
- **Project Dimension**: 3D rotating project carousel
- **Holographic Text Effects**: Dynamic color-shifting typography
- **Matrix Rain Background**: Animated digital rain effects
- **Quantum Particle Fields**: Interactive floating particles
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile

## 🛠 Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + Custom CSS animations
- **3D Graphics**: HTML5 Canvas with custom 3D rendering
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Query
- **Routing**: Wouter

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/quantum-portfolio.git
cd quantum-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
```

### 4. Development Server
```bash
npm run dev
```
Visit `http://localhost:5000` to view the portfolio.

### 5. Deploy to GitHub Pages
```bash
node deploy.js
```

## 🌐 GitHub Pages Deployment

### Quick Deployment Steps

1. **Clone and Setup**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   node deploy.js
   ```

3. **Enable GitHub Pages**:
   - Go to your GitHub repo → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Folder: "/ (root)"

4. **Access Your Portfolio**:
   Visit: `https://yourusername.github.io/your-repo-name`

### Alternative: GitHub Actions Deployment

1. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: "GitHub Actions"

2. **Push to Main Branch**:
   The included `.github/workflows/deploy.yml` will auto-deploy

### Manual Build Commands

```bash
# Build static site
npx vite build --config vite.config.static.ts

# Deploy manually
npx gh-pages -d dist
```

## 🔧 Configuration

### Customizing Your Portfolio

1. **Personal Information**: Edit `client/src/components/sections/Hero.tsx`
2. **Skills**: Modify the skills array in `client/src/components/sections/Skills.tsx`
3. **Projects**: Update projects in `client/src/components/sections/Projects.tsx`
4. **Publications**: Edit `client/src/components/sections/Publications.tsx`
5. **Contact Info**: Update `client/src/components/sections/Contact.tsx`

### Color Themes
Customize cyberpunk colors in `client/src/index.css`:
```css
:root {
  --cyber-cyan: #00ffff;
  --cyber-pink: #ff00ff;
  --cyber-green: #00ff00;
  --cyber-amber: #ffbf00;
}
```

## 📱 Mobile Optimization

The portfolio is fully responsive with:
- Adaptive grid layouts
- Touch-friendly 3D controls
- Optimized animations for mobile
- Responsive typography scaling

## 🎨 Customization Guide

### Adding New Skills
```javascript
const newSkill = {
  name: "Your Skill",
  level: 90,
  category: "Languages", // Languages, Frameworks, Databases, Cloud, AI/ML
  color: "cyan" // cyan, pink, green, amber
};
```

### Modifying 3D Effects
- Adjust sensitivity in `Skills3DWheel.tsx`
- Modify particle counts and colors
- Change rotation speeds and interpolation

### Color Schemes
Replace color variables in `index.css` for different themes:
- Neon Blue: `#0099ff`
- Electric Purple: `#9900ff`
- Matrix Green: `#00ff41`
- Cyber Orange: `#ff6600`

## 🚀 Performance Optimization

- Lazy loading for heavy components
- Optimized 3D rendering with requestAnimationFrame
- Responsive image loading
- Minified production builds
- Tree-shaking for unused code

## 📄 License

MIT License - feel free to use this portfolio template for your own projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Open an issue on GitHub

---

**Built with ❤️ and lots of caffeine** ☕