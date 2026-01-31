# Public Knowledge Studio Website

A Jekyll-powered website for [Public Knowledge Studio](https://publicknowledge.co), a design studio that makes technology work for humans. Live at [work.publicknowledge.co](https://work.publicknowledge.co).

## Collections

- **Projects** (`_projects/`) — 18 portfolio case studies with thumbnails, tags, and team credits
- **Blog** (`_blog/`) — 11 blog posts and articles
- **Team** (`_team/`) — 9 team member profiles with photos, roles, and social links
- **Tags** (`_tags/`) — Tag-based project filtering (UI/UX, Strategy, Branding, Website)
- **Services** (`_services/`) — Service offerings displayed via CSS accordion on the homepage
- **Quotes** (`_quotes/`) — Design quotes shown randomly on the homepage

## Project Structure

```
├── _config.yml                 # Jekyll configuration & site settings
├── Gemfile                     # Ruby dependencies (Jekyll 4.3.0)
├── CNAME                       # Custom domain: work.publicknowledge.co
├── index.html                  # Homepage
│
├── _layouts/                   # Page templates
│   ├── base.html               # Root template (head, nav, content, footer)
│   ├── home.html               # Homepage with video, services, work, team
│   ├── blog.html               # Blog post layout
│   ├── case-study.html         # Project case study layout
│   ├── team-member.html        # Individual team member layout
│   └── tagpage.html            # Tag filter listing layout
│
├── _includes/                  # Reusable components
│   ├── head.html               # HTML head with meta tags, SEO & analytics
│   ├── footer.html             # Footer with interactive asterisk animation
│   ├── site-nav.html           # Top navigation bar
│   ├── work.html               # Project grid (clickable)
│   ├── work-unclickable.html   # Project grid (display only)
│   ├── team.html               # Team grid (clickable)
│   ├── services.html           # CSS-only services accordion
│   ├── quote.html              # Random quote component
│   ├── ContactButton.html      # CTA button component
│   └── StartupCard.html        # Startup pitch card component
│
├── _projects/                  # Portfolio case studies
├── _blog/                      # Blog posts
├── _team/                      # Team member profiles
├── _tags/                      # Tag filter pages
├── _services/                  # Service descriptions
├── _quotes/                    # Design quotes
│
├── pages/                      # Static pages
│   ├── blog.md                 # Blog listing (/blog)
│   ├── team.md                 # Team listing (/team)
│   ├── notes.md                # Notes page
│   └── 404.md                  # 404 error page
│
└── assets/
    ├── css/
    │   ├── style.css           # Main stylesheet (~2100 lines)
    │   ├── blog.css            # Blog-specific styles
    │   ├── case-study.css      # Case study styles
    │   └── slideshow.css       # Slideshow component styles
    ├── js/
    │   ├── animate-asterisk.js # Interactive asterisk footer animation
    │   ├── setup-anime.js      # Anime.js scroll-triggered animations
    │   ├── slideshow.js        # Image carousel for case studies
    │   ├── Search.js           # Site search (Lunr.js)
    │   ├── modeswitcher.js     # Dark/light theme toggle
    │   └── Hamburger.js        # Mobile menu toggle
    ├── img/                    # Images & graphics
    ├── video/                  # Video assets
    ├── fonts/                  # Custom web fonts
    └── favicon/                # Favicon files
```

## Key Features

- Responsive grid layouts for projects and team members
- Interactive footer with animated asterisks (mouse & touch tracking)
- CSS-only accordion for services section
- Tag-based project filtering
- Dark/light mode with session persistence
- Custom web fonts (Copernicus, Tasa Orbiter Deck, Basier Square Mono)
- View Transitions API for smooth page navigation
- Client-side search powered by Lunr.js
- Scroll-triggered entrance animations via Anime.js
- SEO optimized with OG tags, Schema.org structured data, and preloading
- KaTeX math rendering support

## Development

### Prerequisites

```bash
bundle install
```

### Local Development

```bash
# Start dev server with live reload
bundle exec jekyll serve --livereload
```

### Build

```bash
bundle exec jekyll build
```

### Testing on Other Devices

```bash
# Bind to all network interfaces
bundle exec jekyll serve --host 0.0.0.0 --livereload
```

Then access from other devices at `http://[YOUR_LOCAL_IP]:4000`.

## Tech Stack

- **Static site generator**: Jekyll 4.3.0
- **Markdown**: kramdown with GFM, KaTeX math, Rouge syntax highlighting
- **Plugins**: jekyll-feed, jekyll-sitemap, jekyll-tidy
- **Animations**: Anime.js 3.2.1 (CDN), custom CSS transitions
- **Search**: Lunr.js (bundled)
- **Hosting**: GitHub Pages
- **Domain**: work.publicknowledge.co

## License

### Open Source Theme Code
The underlying Jekyll theme, layouts, CSS, JavaScript, and general website functionality are available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

### Proprietary Content
All content including but not limited to project case studies, client testimonials, team member information and photos, service descriptions, and brand assets is proprietary and owned by Public Knowledge Studio. It is not licensed for reuse.

## Credits

Based on the [Jekyll Garden](https://jekyll-garden.github.io/) theme. See [credits](https://jekyll-garden.github.io/credits).
