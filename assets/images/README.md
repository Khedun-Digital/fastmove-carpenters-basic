# Images Directory Structure

This directory contains all images used on the FastMove Carpenters website, organized by purpose and section.

## Directory Structure

```
assets/images/
├── hero/           # Hero section images
├── portfolio/      # Portfolio/gallery images
├── icons/          # Icons, favicons, and small graphics
├── og/            # Open Graph and social media images
└── README.md      # This file
```

## Image Guidelines

### File Naming Convention
- Use lowercase letters and hyphens
- Be descriptive: `kitchen-modern-white.jpg` not `img1.jpg`
- Include dimensions if multiple sizes: `hero-image-1200x600.jpg`

### Recommended Sizes
- **Hero images**: 1600x900px (16:9 ratio)
- **Portfolio images**: 800x500px (16:10 ratio)
- **OG images**: 1200x630px (1.91:1 ratio)
- **Icons**: 96x96px (SVG preferred)

### File Formats
- **Photos**: Use `.jpg` for photographs
- **Graphics/Icons**: Use `.svg` for scalable graphics
- **Transparency needed**: Use `.png`

## Current Images

### Icons
- `favicon.svg` - Site favicon (JFC monogram)

### Open Graph
- `og-cover.svg` - Social media preview image

## Adding New Images

1. **Hero Section**: Add to `hero/` folder
   - Update `index.html` hero section `<img>` src
   - Consider adding multiple sizes for responsive images

2. **Portfolio**: Add to `portfolio/` folder
   - Update portfolio section in `index.html`
   - Ensure consistent aspect ratios

3. **Icons**: Add to `icons/` folder
   - Update relevant HTML references

4. **OG Images**: Add to `og/` folder
   - Update meta tag in HTML `<head>`

## Optimization Tips

- Compress images before uploading
- Use WebP format for better compression (with fallbacks)
- Consider lazy loading for portfolio images
- Use appropriate alt text for accessibility
