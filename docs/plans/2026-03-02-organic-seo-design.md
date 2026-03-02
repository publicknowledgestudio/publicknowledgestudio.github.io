# Organic SEO for Startup Founders

**Date:** 2026-03-02
**Goal:** Get startup founders finding Public Knowledge Studio through organic search.
**Strategy:** Blog content optimization + technical SEO template improvements.

## Context

- 446 sessions/month, 73% direct traffic, only 29 organic search sessions
- Branded search ("public knowledge studio") ranks #1
- No non-branded organic discovery — founders searching for design help don't find the site
- 10 substantial blog posts exist, but most lack tags, some lack subtitles
- 3 thin/empty blog posts could hurt rankings
- Blog and case study templates lack related content sections and internal linking

## What We're Building

### 1. Blog Post Frontmatter Cleanup

Tag all blog posts with relevant tags and add missing subtitles. Tags drive related content sections and improve internal linking.

**Files:** All `_blog/*.md` files

### 2. Related Posts Section on Blog Layout

Show 2-3 related posts at the bottom of each blog post, matched by shared tags. Improves engagement and creates internal links between content.

**File:** `_layouts/blog.html`

### 3. Related Projects Section on Case Study Layout

Show 2-3 related projects at the bottom of each case study, matched by shared tags. Keeps visitors exploring the portfolio.

**File:** `_layouts/case-study.html`

### 4. Previous/Next Navigation on Blog

Simple previous/next post navigation at the bottom of blog posts.

**File:** `_layouts/blog.html`

### 5. Thin Content Cleanup

Hide or remove 3 thin blog posts to avoid thin content indexing:
- `Design Process.md` — empty content
- `Collections.md` — just two links
- `Case Studies We Like.md` — just a list of links

**Files:** `_blog/Design Process.md`, `_blog/Collections.md`, `_blog/Case Studies We Like.md`

## What We're NOT Doing

- No new pages or collections
- No sitemap changes (already working via jekyll-sitemap)
- No structured data changes (already comprehensive across all layouts)
- No URL restructuring (clean slugs already in place)
- No visible breadcrumbs (JSON-LD breadcrumbs already present)

## Success Criteria

- All visible blog posts have tags and subtitles
- Blog layout shows related posts section
- Case study layout shows related projects section
- Blog layout has prev/next navigation
- No thin/empty content pages visible to search engines
