# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-powered website for Public Knowledge Studio, a design studio showcasing projects, team members, and blog content. Built on the Jekyll Garden theme with custom animations and interactive features.

## Development Commands

### Prerequisites
```bash
# Install Ruby dependencies
bundle install
```

### Local Development
```bash
# Start development server with live reload
bundle exec jekyll serve --livereload

# Start with network access (for testing on other devices)
bundle exec jekyll serve --host 0.0.0.0 --livereload
```

### Building for Production
```bash
# Build site
bundle exec jekyll build
```

### CSS Architecture
The CSS uses modern design tokens and optimized animations. The file `assets/css/style.css` has Jekyll front matter for asset processing. All vendor prefixes have been removed from source code for cleaner maintainability.

### Network Testing
To test on other devices, find your local IP address:
- **macOS**: `ipconfig getifaddr en0`
- **Linux**: `hostname -I | cut -d' ' -f1`
- Then access via `http://[YOUR_IP]:4000`

## Architecture

### Jekyll Collections Structure
The site uses Jekyll collections for content organization:

- **`_projects/`** - Portfolio case studies with layouts, thumbnails, and tags
- **`_blog/`** - Blog posts and articles  
- **`_team/`** - Team member profiles with photos and roles
- **`_tags/`** - Tag-based filtering pages (UI/UX, Strategy, Branding, Website)
- **`_services/`** - Service offerings (non-published, used via includes)
- **`_quotes/`** - Client testimonials (non-published, used via includes)

### Layout System
- **`base.html`** - Base template with head, navigation, content, footer
- **`home.html`** - Homepage layout with custom animations
- **`case-study.html`** - Project case study layout with image galleries
- **`post.html`** - Blog post layout
- **`team-member.html`** - Individual team member pages

### Key Components (`_includes/`)
- **`work.html`** / **`work-unclickable.html`** - Project grids (clickable/display-only)
- **`team.html`** / **`team-unclickable.html`** - Team grids (clickable/display-only) 
- **`services.html`** - CSS-only accordion for services section
- **`footer.html`** - Interactive footer with animated asterisk effects
- **`quote.html`** - Random quote display component

### Interactive Features
- **Asterisk Animation** (`assets/js/animate-asterisk.js`) - Interactive footer animation with mouse/touch support, video masking effects
- **Search** (`assets/js/Search.js`) - Site-wide search functionality using Jekyll Garden's search implementation
- **Slideshow** (`assets/js/slideshow.js`) - Image carousel for case studies

### Styling Architecture
- **CSS Custom Properties** - Extensive use of CSS variables for theming (colors, spacing, typography)
- **Custom Web Fonts** - Copernicus (body text), Tasa Orbiter Deck (headings), Basier Square Mono (code)
- **Dark/Light Mode** - Theme switching with CSS variables and local storage
- **View Transitions** - Smooth navigation animations

### Content Types
- Projects have **thumbnail**, **layout**, **tags** frontmatter for filtering/display
- Team members have **role**, **image**, **bio** fields
- Blog posts use standard Jekyll post conventions
- All content supports markdown with kramdown parser and math rendering (KaTeX)

## Important Files
- **`_config.yml`** - Jekyll configuration, collections setup, site metadata
- **`Gemfile`** - Ruby dependencies including Jekyll 4.3.0, jekyll-feed, jekyll-sitemap
- **`assets/css/style.css`** - Main stylesheet (46KB) with extensive CSS custom properties
- **`SearchData.json`** - Generated search index for site search functionality