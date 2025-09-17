# FastMove Carpenters

Professional static website for FastMove Carpenters. Built with modular vanilla HTML/CSS/JS architecture. Ready for GitHub Pages.

## 🏗️ Architecture

This project uses a **modular architecture** for better maintainability, scalability, and organization.

### Key Features
- ✅ **Modular CSS** - Split into logical files (variables, components, layout, etc.)
- ✅ **Modular JavaScript** - Organized by functionality (forms, navigation, analytics, etc.)
- ✅ **Organized Images** - Structured folders for different image types
- ✅ **Configuration-driven** - Easy customization via JSON config
- ✅ **Responsive Design** - Mobile-first approach with smooth animations
- ✅ **SEO Optimized** - Structured data, meta tags, and sitemap
- ✅ **Accessible** - ARIA attributes and semantic HTML

## 📁 Project Structure

```
├── index.html                 # Main HTML file
├── site.config.json          # Site configuration
├── PROJECT_STRUCTURE.md      # Detailed architecture docs
│
├── assets/
│   ├── css/                   # Modular stylesheets
│   ├── js/                    # Modular JavaScript
│   └── images/                # Organized image assets
│
├── seo/                       # SEO files
└── .github/workflows/         # GitHub Pages deployment
```

For detailed architecture information, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

## 🚀 Local Development

### Quick Start
1. **Serve the files:**
   ```bash
   # Python
   python3 -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

2. **Open in browser:** `http://localhost:8000`

### Development Workflow
1. **Styles:** Edit files in `assets/css/`
2. **JavaScript:** Edit files in `assets/js/`
3. **Images:** Add to appropriate folder in `assets/images/`
4. **Configuration:** Update `site.config.json`

## ⚙️ Configuration

### Contact Information
Update data attributes in `index.html`:
```html
<html data-phone="+27-82-000-0000" data-whatsapp-e164="27820000000">
```

### Site Settings
Modify `site.config.json` for:
- Business information
- Theme colors
- Service details
- Feature toggles

### Images
Replace placeholder images in `assets/images/`:
- `hero/` - Hero section images (1600x900px)
- `portfolio/` - Portfolio images (800x500px) 
- `icons/` - Favicons and icons (SVG preferred)
- `og/` - Social media images (1200x630px)

## 🌐 Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. First time: Settings → Pages → Source: "GitHub Actions"

### Manual Deployment
Upload all files to any static hosting service:
- Netlify
- Vercel
- AWS S3
- Any web server

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/variables.css`:
```css
:root {
  --primary: #0F6F6F;
  --accent: #E0A100;
  /* ... */
}
```

### Content
Update `site.config.json` and `index.html` content sections.

### Features
Toggle features in `assets/js/config.js` or `site.config.json`.

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Progressive enhancement

## 📄 License

Proprietary (all rights reserved) unless stated otherwise.