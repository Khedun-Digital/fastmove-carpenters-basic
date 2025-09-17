# FastMove Carpenters - Project Structure

This document outlines the modular architecture of the FastMove Carpenters website.

## 📁 Directory Structure

```
fastmove-carpenters-basic/
├── index.html                    # Main HTML file
├── site.config.json             # Site configuration
├── PROJECT_STRUCTURE.md         # This file
├── README.md                     # Project documentation
│
├── assets/
│   ├── css/                      # Modular stylesheets
│   │   ├── main.css             # Main CSS file (imports all others)
│   │   ├── variables.css        # CSS custom properties
│   │   ├── base.css             # Base styles and resets
│   │   ├── components.css       # Reusable components
│   │   ├── layout.css           # Layout and sections
│   │   ├── sections.css         # Section-specific styles
│   │   ├── forms.css            # Form styles
│   │   └── responsive.css       # Media queries
│   │
│   ├── js/                       # Modular JavaScript
│   │   ├── main.js              # Main app entry point
│   │   ├── config.js            # Configuration and constants
│   │   ├── utils.js             # Utility functions
│   │   ├── contact.js           # Contact info management
│   │   ├── navigation.js        # Navigation and mobile menu
│   │   ├── forms.js             # Form handling
│   │   ├── testimonials.js      # Testimonials rotator
│   │   └── analytics.js         # Analytics and tracking
│   │
│   ├── images/                   # Organized image assets
│   │   ├── hero/                # Hero section images
│   │   ├── portfolio/           # Portfolio/gallery images
│   │   ├── icons/               # Icons and favicons
│   │   ├── og/                  # Open Graph images
│   │   └── README.md            # Image guidelines
│   │
│   └── fonts/                    # Custom fonts (if needed)
│
├── seo/                          # SEO files
│   ├── robots.txt               # Search engine directives
│   └── sitemap.xml              # Site structure for search engines
│
└── .github/
    └── workflows/
        └── pages.yml            # GitHub Pages deployment
```

## 🎨 CSS Architecture

### Modular Approach
The CSS is split into logical modules following the **ITCSS** (Inverted Triangle CSS) methodology:

1. **variables.css** - CSS custom properties and design tokens
2. **base.css** - Base styles, resets, and typography
3. **components.css** - Reusable UI components (buttons, cards, etc.)
4. **layout.css** - Layout and structural styles
5. **sections.css** - Section-specific styles
6. **forms.css** - Form-specific styles
7. **responsive.css** - Media queries and responsive design

### Benefits
- ✅ Easy maintenance and debugging
- ✅ Better code organization
- ✅ Reusable components
- ✅ Consistent design tokens
- ✅ Easier customization

## 🚀 JavaScript Architecture

### Modular Approach
JavaScript is split into focused modules using the **Module Pattern**:

1. **config.js** - Configuration, constants, and settings
2. **utils.js** - Utility functions and helpers
3. **contact.js** - Contact information management
4. **navigation.js** - Navigation and mobile menu logic
5. **forms.js** - Form handling and validation
6. **testimonials.js** - Testimonials carousel
7. **analytics.js** - Analytics and event tracking
8. **main.js** - Application initialization

### Benefits
- ✅ Separation of concerns
- ✅ Easy testing and debugging
- ✅ Reusable code
- ✅ Better error isolation
- ✅ Easier feature additions

## 🖼️ Image Management

### Organized Structure
Images are organized by purpose:

- **hero/** - Hero section images (1600x900px recommended)
- **portfolio/** - Portfolio/gallery images (800x500px recommended)
- **icons/** - Icons, favicons, and small graphics (SVG preferred)
- **og/** - Open Graph and social media images (1200x630px)

### Benefits
- ✅ Easy to find and manage images
- ✅ Clear naming conventions
- ✅ Consistent sizing guidelines
- ✅ Optimized for different use cases

## ⚙️ Configuration

### site.config.json
Central configuration file for easy customization:

- Site information and metadata
- Business details and contact info
- Theme colors and design tokens
- Feature toggles
- Service definitions

### Benefits
- ✅ Single source of truth for site data
- ✅ Easy customization without code changes
- ✅ Consistent data across components
- ✅ Environment-specific configurations

## 🔧 Development Workflow

### Adding New Features

1. **CSS**: Add styles to appropriate module or create new one
2. **JavaScript**: Create new module or extend existing one
3. **Images**: Add to appropriate folder with proper naming
4. **Configuration**: Update site.config.json if needed

### Customization

1. **Colors**: Update CSS variables in `variables.css`
2. **Content**: Modify `site.config.json`
3. **Images**: Replace files in `assets/images/`
4. **Features**: Toggle in config or modify relevant JS modules

### Deployment

The site uses GitHub Pages with automated deployment via GitHub Actions.

## 📚 Best Practices

### CSS
- Use CSS custom properties for consistency
- Follow BEM methodology for class naming
- Keep specificity low
- Use meaningful component names

### JavaScript
- Use modern ES6+ features
- Keep functions small and focused
- Handle errors gracefully
- Use semantic variable names

### Images
- Optimize for web (compress, resize)
- Use appropriate formats (SVG for icons, JPG for photos)
- Include descriptive alt text
- Consider lazy loading for performance

### Performance
- Minimize HTTP requests
- Use efficient selectors
- Optimize images
- Enable compression
- Leverage browser caching

This modular architecture makes the codebase maintainable, scalable, and easy to customize while following modern web development best practices.
