# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Public Knowledge Studio website — a Jekyll 4 static site deployed to GitHub Pages at `work.publicknowledge.co`. The site showcases portfolio projects, team members, blog content, and services. Originally based on the Jekyll Garden theme, it has been heavily customized with interactive animations, CSS design tokens, and custom layouts.

## Development Commands

### Prerequisites
```bash
bundle install
```

### Local Development
```bash
# Start dev server with live reload
bundle exec jekyll serve --livereload

# Bind to all interfaces for device testing
bundle exec jekyll serve --host 0.0.0.0 --livereload
```

### Build
```bash
bundle exec jekyll build
```

Output goes to `_site/`. The `_config.yml` is NOT hot-reloaded — restart the server after editing it.

### Network Testing
Find your local IP, then access `http://[IP]:4000`:
- **macOS**: `ipconfig getifaddr en0`
- **Linux**: `hostname -I | cut -d' ' -f1`

## Architecture

### Directory Structure
```
├── _config.yml          # Jekyll config, collections, site metadata
├── Gemfile              # Ruby deps (Jekyll 4.3.0, plugins)
├── CNAME                # Custom domain: work.publicknowledge.co
├── index.html           # Homepage (uses home layout)
├── SearchData.json      # Generated Lunr.js search index
│
├── _layouts/            # Page templates
│   ├── base.html        # Root template (head, nav, content, footer)
│   ├── home.html        # Homepage (video, services, work, team, quote)
│   ├── blog.html        # Blog post with header parallax
│   ├── case-study.html  # Project case study with image galleries
│   ├── team-member.html # Individual team profile
│   └── tagpage.html     # Tag-filtered project listing
│
├── _includes/           # Reusable components
│   ├── head.html        # <head> with SEO meta, OG tags, Schema.org, analytics
│   ├── footer.html      # Footer with location, links, asterisk animation
│   ├── site-nav.html    # Top nav: "Public Knowledge" + "Schedule Call"
│   ├── work.html        # Clickable project grid (sorted by order)
│   ├── work-unclickable.html
│   ├── team.html        # Team cards (filtered by feed: show)
│   ├── services.html    # CSS-only accordion (details/summary)
│   ├── quote.html       # Random quote (JS picks from _quotes)
│   ├── ContactButton.html  # CTA → Google Calendar booking
│   └── StartupCard.html    # Large card component
│
├── _projects/           # 18 portfolio case studies (output: true)
├── _blog/               # 11 blog posts (output: true)
├── _team/               # 9 team members (output: true)
├── _tags/               # 4 tag filter pages (output: true)
├── _services/           # 4 services (output: false, used in includes)
├── _quotes/             # 4 quotes (output: false, used in includes)
│
├── pages/
│   ├── blog.md          # /blog listing
│   ├── team.md          # /team listing (current + previous)
│   ├── notes.md         # /notes page
│   └── 404.md           # 404 error page
│
├── assets/
│   ├── css/
│   │   ├── style.css    # Main stylesheet (~2100 lines, CSS custom properties)
│   │   ├── blog.css     # Blog-specific styles
│   │   ├── case-study.css  # Case study styles
│   │   └── slideshow.css   # Carousel styles
│   ├── js/
│   │   ├── animate-asterisk.js  # Footer asterisk animation + video masking
│   │   ├── Search.js            # Lunr.js site search
│   │   ├── slideshow.js         # Image carousel for case studies
│   │   ├── modeswitcher.js      # Dark/light theme toggle (sessionStorage)
│   │   ├── setup-anime.js       # Anime.js scroll-triggered animations
│   │   ├── Hamburger.js         # Mobile menu toggle
│   │   └── vendor/lunr.min.js   # Search library
│   ├── fonts/           # Copernicus, Tasa Orbiter, Basier Square Mono
│   ├── img/             # Project/team images (~140MB)
│   ├── video/           # Header animation, thumbnails (~61MB)
│   └── favicon/         # All favicon variants + site.webmanifest
```

### Collections & URLs
| Collection | Output | URL Pattern | Sort |
|---|---|---|---|
| `_projects/` | Yes | `/projects/:slug` | `order` frontmatter |
| `_blog/` | Yes | `/blog/:slug` | date |
| `_team/` | Yes | `/team/:slug` | `order` frontmatter |
| `_tags/` | Yes | `/tag/:slug` | — |
| `_services/` | No | — | `order` frontmatter |
| `_quotes/` | No | — | random (JS) |

### Frontmatter Conventions

**Projects** (`_projects/*.md`):
```yaml
---
title: "Project Name"
subtitle: "Short description"
layout: case-study
thumbnail: assets/img/project-thumbnail.jpg  # relative path, no leading /
banner: /assets/img/project-header.jpg        # absolute path with leading /
tags: [branding, website]                     # matches _tags/ slugs
team: [Team Member Name]                      # links to _team/ entries
order: 1                                      # sort order in grids
feed: show
date: DD-MM-YYYY
---
```

**Blog posts** (`_blog/*.md`):
```yaml
---
title: "Post Title"
subtitle: ""
layout: blog
author: [Author Name]
thumbnail: /assets/thumbs/default.png
tags: []
feed: show
date: DD-MM-YYYY
---
```

**Team members** (`_team/*.md`):
```yaml
---
title: "Full Name"
role: "Job Title"
layout: team-member
image: /assets/img/name.jpg
email: name@publicknowledge.co
linkedin: https://linkedin.com/in/...
instagram: https://instagram.com/...
twitter: https://x.com/...
portfolio: https://...
order: 1
feed: show          # "show" = current team, "hide" = previous
date: DD-MM-YYYY
---
```

**Services** (`_services/*.md`):
```yaml
---
name: "Service Display Name"
title: "slug"
layout: service
order: 1
feed: show
---
```

**Quotes** (`_quotes/*.md`):
```yaml
---
author: "Attribution"
title: "slug"
feed: show
---
```

**Tags** (`_tags/*.md`):
```yaml
---
layout: tagpage
title: "Display Name"
description: "Tag description"
tag: "tag-slug"
---
```

### Key Conventions
- **`feed` property**: Controls visibility. `show` displays in listings; `hide` or omission hides it. For team members, `show` = current, anything else = previous/alumni.
- **`order` property**: Integer for manual sort order in grids. Lower numbers appear first.
- **Date format**: `DD-MM-YYYY` in frontmatter (non-standard for Jekyll, but handled by the site).
- **Image paths**: Thumbnails use relative paths (no leading `/`); banners and team images use absolute paths (with leading `/`).
- **Markdown**: kramdown with GFM input, KaTeX math, Rouge syntax highlighting.

## CSS Architecture

### Design Tokens
The main stylesheet (`assets/css/style.css`) uses extensive CSS custom properties. Key token groups:

- **Colors**: `--accent-color`, `--text-reg`, `--background-color`, `--tag-bg`, etc. HSL-based.
- **Spacing**: `--spacing-xs` (4px) through `--spacing-6xl` (100px).
- **Typography**: `--font-body` (Copernicus), `--font-heading` (Tasa Orbiter Deck), `--font-mono` (Basier Square Mono). Sizes from `--font-size-sm` to `--font-size-4xl`.
- **Animations**: `--transition-fast` (0.2s), `--transition-normal` (0.3s), `--transition-slow` (1s).

### Z-Index Scale
```
9    - video backgrounds
10   - content overlays
15   - scroll-tip
20   - footer
22   - footer asterisk
100  - navigation
1000 - controls/modals
```

### Theme Switching
Dark/light mode via `data-theme` attribute on `<html>`. Toggled by `modeswitcher.js`, persisted in `sessionStorage`.

### Style Guidelines
- No vendor prefixes in source — target modern browsers only.
- `style.css` has Jekyll front matter (`---\n---`) for Liquid processing.
- Mobile breakpoint at 800px.
- View Transitions API for page navigation animations.

## JavaScript

| Script | Loaded | Purpose |
|---|---|---|
| `animate-asterisk.js` | Footer | Mouse-tracking asterisk animation, video mask effects |
| `Search.js` | Global | Client-side search with Lunr.js against `SearchData.json` |
| `slideshow.js` | Case studies | Touch/scroll carousel for image galleries |
| `modeswitcher.js` | Global | Dark/light theme toggle |
| `setup-anime.js` | Homepage | Anime.js scroll-triggered entrance animations |
| `Hamburger.js` | Global | Mobile nav menu toggle |

### External Libraries (CDN)
- **Anime.js 3.2.1** — animation library loaded from CDN
- **Lunr.js** — search library bundled as `vendor/lunr.min.js`

## Deployment

- **Platform**: GitHub Pages
- **Domain**: `work.publicknowledge.co` (set via `CNAME` file)
- **Base URL**: Site root (no subpath)
- **Build**: Jekyll 4.3.0 with `jekyll-feed`, `jekyll-sitemap`, `jekyll-tidy` plugins
- **Analytics**: Ahrefs and Google Analytics 4 (tags in `_includes/head.html`)
- No GitHub Actions — uses default GitHub Pages Jekyll build

## Common Tasks

### Adding a new project
1. Create `_projects/Project Name.md` with case-study frontmatter (see conventions above).
2. Add thumbnail image to `assets/img/` and banner image.
3. Set `order` to position it in the grid. Set `feed: show`.
4. Add relevant tags that match existing `_tags/` slugs.

### Adding a team member
1. Create `_team/Full Name.md` with team-member frontmatter.
2. Add profile photo to `assets/img/`.
3. Set `feed: show` for current members, omit or set other value for alumni.
4. Set `order` for grid position.

### Adding a blog post
1. Create `_blog/Post Title.md` with blog frontmatter.
2. Set `feed: show` and provide a thumbnail.

### Adding a new tag
1. Create `_tags/tag-slug.md` with tagpage layout and `tag: "tag-slug"`.
2. Use the same slug string in project `tags` arrays.

### Adding a service
1. Create `_services/slug.md` with service frontmatter.
2. Set `order` for accordion position. Content renders via `_includes/services.html`.

## Important Files
| File | Purpose |
|---|---|
| `_config.yml` | Jekyll configuration, collections, site metadata |
| `Gemfile` | Ruby dependencies |
| `assets/css/style.css` | Main stylesheet (~2100 lines) |
| `_includes/head.html` | SEO, OG tags, Schema.org, analytics, preloads |
| `_includes/footer.html` | Footer with asterisk animation |
| `_layouts/home.html` | Homepage layout with all sections |
| `SearchData.json` | Lunr.js search index template |
| `CNAME` | Custom domain configuration |
