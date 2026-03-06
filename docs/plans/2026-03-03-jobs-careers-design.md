# Jobs Collection & Careers Page Design

**Date:** 2026-03-03
**Status:** Approved

## Overview

Add a `_jobs` collection and a `/careers` listing page to the Public Knowledge Studio site so the team can post open positions. Each job gets its own detail page with structured data for search engines.

## Data Model

New collection: `_jobs` (output: true, permalink: `/careers/:slug`).

### Job Frontmatter

```yaml
---
title: "Product Designer"
location: "New Delhi, India"
type: "Full-time"            # Full-time, Part-time, Contract, Internship
layout: job
feed: show                   # show = open position, hide = closed/filled
order: 1
date: 03-03-2026
---
```

Markdown body contains the full job description (responsibilities, requirements, how to apply, etc.).

### Conventions

- `feed: show` = open position visible on /careers; `feed: hide` = closed/filled (still builds but hidden from listing)
- `order` = integer sort order in the listing (lower first)
- `date` = DD-MM-YYYY format (matches existing site convention)
- `type` = free text string displayed as a badge (Full-time, Part-time, Contract, Internship)
- `location` = free text string displayed as a badge

## Careers Listing Page

**File:** `pages/careers.md`
**Layout:** `base`
**URL:** `/careers`

- Heading: "Careers" with optional subtitle
- Filters `site.jobs | where: "feed", "show"` sorted by `order`
- Each job renders as a card linking to the detail page, showing title, location, and type
- Empty state: friendly message when no positions are open ("No open positions right now. Check back soon or reach out at [email].")

## Job Detail Layout

**File:** `_layouts/job.html`
**Extends:** `base` (via `layout: base` in frontmatter)

### Structure

1. Schema.org `JobPosting` JSON-LD (title, description, datePosted, employmentType, jobLocation, hiringOrganization)
2. BreadcrumbList JSON-LD (Home > Careers > Job Title)
3. Header: job title (h1), location badge, type badge
4. Content: `{{ content }}` (markdown body)
5. CTA: "Apply for this role" linking to email (mailto:careers@publicknowledge.co) or the existing Schedule Call booking link
6. Related jobs: up to 2 other open positions using the existing `.related-content` pattern

### Schema.org JobPosting

```json
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "{{ page.title }}",
  "description": "{{ page.content | strip_html | truncate: 500 }}",
  "datePosted": "{{ page.date | date: '%Y-%m-%d' }}",
  "employmentType": "{{ page.type }}",
  "jobLocation": {
    "@type": "Place",
    "address": "{{ page.location }}"
  },
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Public Knowledge Studio",
    "sameAs": "https://work.publicknowledge.co"
  }
}
```

## Styling

All styles go in `assets/css/style.css` (no separate CSS file). Uses existing design tokens.

### Careers Page

- `.careers-container` grid for job cards
- `.job-card` with border, padding, hover state (following team/blog card patterns)
- `.job-card-title` for the job name
- `.job-meta` flex container for location and type badges
- `.job-badge` small pill/badge for location and type

### Job Detail Page

- Reuses `.container-width` for content width
- `.job-header` for title + meta section
- `.job-body` for markdown content (inherits existing prose styles)
- `.job-cta` for the apply button/link
- Reuses `.related-content`, `.related-content-grid`, `.related-content-card` for related jobs section

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `_config.yml` | Modify | Add `jobs` collection |
| `_layouts/job.html` | Create | Job detail page layout |
| `pages/careers.md` | Create | Careers listing page |
| `_jobs/` | Create dir | Job posting files go here |
| `assets/css/style.css` | Modify | Add careers/job styles |

## Example Job Posting

**File:** `_jobs/Product Designer.md`

```markdown
---
title: "Product Designer"
location: "New Delhi, India"
type: "Full-time"
layout: job
feed: show
order: 1
date: 03-03-2026
---

## About the Role

We're looking for a Product Designer to join our team and work directly with startup founders on branding, UI/UX, and web design projects.

## What You'll Do

- Lead design projects from concept to delivery
- Work closely with founders to understand their vision
- Create brand identities, websites, and product interfaces

## Requirements

- 2+ years of experience in product or visual design
- Strong portfolio showing branding and/or UI work
- Comfortable working in a small, fast-moving team

## How to Apply

Send your portfolio and a brief intro to careers@publicknowledge.co
```
