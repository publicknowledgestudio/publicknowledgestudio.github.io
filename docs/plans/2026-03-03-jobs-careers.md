# Jobs Collection & Careers Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `_jobs` collection, a `/careers` listing page, a job detail layout, and a first job posting.

**Architecture:** New Jekyll collection with `output: true` following existing patterns. Careers listing page uses `base` layout with Liquid iteration. Job detail layout includes Schema.org JobPosting structured data and reuses existing `.related-content` components.

**Tech Stack:** Jekyll 4, Liquid templates, CSS custom properties, Schema.org JSON-LD

**Design doc:** `docs/plans/2026-03-03-jobs-careers-design.md`

---

### Task 1: Add jobs collection to _config.yml

**Files:**
- Modify: `_config.yml:66-85` (collections block)

**Step 1: Add the jobs collection**

In `_config.yml`, inside the `collections:` block (after the `quotes` collection ending at line 85), add:

```yaml
    jobs:
      output: true
      permalink: /careers/:slug
```

This goes after line 85 (the `permalink: /:slug` under quotes), maintaining the same 4-space indentation as the other collections.

**Step 2: Verify config is valid**

Run: `bundle exec jekyll build 2>&1 | head -5`
Expected: `Generating... done` (no YAML parse errors)

**Step 3: Commit**

```bash
git add _config.yml
git commit -m "Add jobs collection to config

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Create the job detail layout

**Files:**
- Create: `_layouts/job.html`

**Step 1: Create `_layouts/job.html`**

```html
{% include head.html %}

<body>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": {{ page.title | jsonify }},
        "description": {{ page.content | strip_html | strip_newlines | truncate: 500 | jsonify }},
        "datePosted": "{{ page.date | date: '%Y-%m-%d' }}",
        "employmentType": {{ page.type | jsonify }},
        "jobLocation": {
            "@type": "Place",
            "address": {{ page.location | jsonify }}
        },
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Public Knowledge Studio",
            "sameAs": "https://publicknowledge.co",
            "logo": "https://publicknowledge.co/assets/img/pk-og.jpg"
        }
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://publicknowledge.co/"},
            {"@type": "ListItem", "position": 2, "name": "Careers", "item": "https://publicknowledge.co/careers"},
            {"@type": "ListItem", "position": 3, "name": {{ page.title | jsonify }}, "item": "{{ page.url | absolute_url }}"}
        ]
    }
    </script>

    {% include site-nav.html %}

    <div class="job-page container-width">
        <div class="job-header">
            <h1 class="sans uppercase mbs-0">{{ page.title }}</h1>
            <div class="job-meta">
                {% if page.location %}
                <span class="job-badge">{{ page.location }}</span>
                {% endif %}
                {% if page.type %}
                <span class="job-badge">{{ page.type }}</span>
                {% endif %}
            </div>
        </div>

        <div class="job-body blog">
            {{ content }}
        </div>

        <div class="job-cta">
            <a href="mailto:careers@publicknowledge.co?subject=Application: {{ page.title | url_encode }}" class="job-cta-button sans uppercase">
                Apply for this role &rarr;
            </a>
        </div>
    </div>

    {% assign other_jobs = site.jobs | where: "feed", "show" | where_exp: "job", "job.url != page.url" %}
    {% if other_jobs.size > 0 %}
    <div class="related-content container-width">
        <h2 class="sans uppercase related-content-title">Other Open Positions</h2>
        <div class="related-content-grid">
            {% for job in other_jobs limit:2 %}
            <a href="{{ job.url }}" class="related-content-card">
                <h3 class="related-content-card-title">{{ job.title }}</h3>
                <div class="job-meta">
                    {% if job.location %}<span class="job-badge">{{ job.location }}</span>{% endif %}
                    {% if job.type %}<span class="job-badge">{{ job.type }}</span>{% endif %}
                </div>
            </a>
            {% endfor %}
        </div>
    </div>
    {% endif %}

    {% include footer.html %}

</body>

</html>
```

**Key decisions:**
- Reuses `.blog` class on `.job-body` to inherit all existing prose/markdown styles (headings, lists, paragraphs)
- CTA uses `mailto:` with pre-filled subject line
- "Other Open Positions" reuses existing `.related-content` styles — no tag matching needed, just shows other open jobs
- Limited to 2 related jobs (fewer than blog's 3, since job listings are typically smaller)

**Step 2: Commit**

```bash
git add _layouts/job.html
git commit -m "Add job detail layout with Schema.org JobPosting

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Create the careers listing page

**Files:**
- Create: `pages/careers.md`

**Step 1: Create `pages/careers.md`**

Follow the pattern from `pages/blog.md` and `pages/team.md`:

```markdown
---
layout: base
permalink: careers
title: "Careers"
subtitle: "Join the team at Public Knowledge Studio"
---

<div class="container">

<h1 class="section-title mg-top-6xl">Careers</h1>
<div class="section-subtitle">Join the team at Public Knowledge Studio</div>

{% assign open_jobs = site.jobs | where: 'feed', 'show' | sort: 'order' %}
{% if open_jobs.size > 0 %}
<div class="careers-container">
    {% for job in open_jobs %}
    <a href="{{ job.url }}">
        <div class="job-card">
            <div class="job-card-title">{{ job.title }}</div>
            <div class="job-meta">
                {% if job.location %}<span class="job-badge">{{ job.location }}</span>{% endif %}
                {% if job.type %}<span class="job-badge">{{ job.type }}</span>{% endif %}
            </div>
        </div>
    </a>
    {% endfor %}
</div>
{% else %}
<div class="careers-empty">
    <p>No open positions right now.</p>
    <p class="sans secondary">Check back soon, or reach out at <a href="mailto:careers@publicknowledge.co">careers@publicknowledge.co</a></p>
</div>
{% endif %}

</div>
```

**Step 2: Commit**

```bash
git add pages/careers.md
git commit -m "Add careers listing page

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Add CSS for careers and job pages

**Files:**
- Modify: `assets/css/style.css` (append after line 2380, the end of `.blog-nav` responsive styles)

**Step 1: Append careers/job CSS**

Add the following block at the end of `assets/css/style.css`:

```css
/* Careers & Job pages */
.careers-container {
    max-width: var(--max-width);
    width: var(--width-desktop);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--spacing-lg);
}

.job-card {
    min-height: var(--blog-tile-min-height);
    padding: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-md);
    transition: var(--transition-fast);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-sm);
    border-bottom: 1px solid var(--black-5);
}

.job-card:hover {
    padding: calc(var(--spacing-lg) - 2px) 0 calc(var(--spacing-lg) + 2px) var(--spacing-md);
    background-color: var(--black-3);
}

.job-card-title {
    font-size: var(--font-size-lg);
    line-height: 1.15;
}

.job-meta {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.job-badge {
    font-family: var(--font-stack-sans);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    padding: var(--spacing-xs) var(--spacing-md);
    background-color: var(--black-5);
    border-radius: var(--border-radius-sm);
    color: var(--text-reg);
}

.careers-empty {
    max-width: var(--container-width);
    margin: var(--spacing-3xl) auto;
    padding: var(--spacing-3xl);
    text-align: center;
    border: 1px dashed var(--black-10);
    border-radius: var(--border-radius-card);
}

.job-page {
    margin-top: var(--spacing-6xl);
}

.job-header {
    margin-bottom: var(--spacing-3xl);
}

.job-header h1 {
    margin-bottom: var(--spacing-md);
}

.job-body {
    margin-bottom: var(--spacing-3xl);
}

.job-cta {
    margin-bottom: var(--spacing-3xl);
}

.job-cta-button {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    background-color: var(--charcoal);
    color: var(--white);
    text-decoration: none;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    letter-spacing: 0.05em;
    transition: background-color var(--transition-fast);
}

.job-cta-button:hover {
    background-color: var(--black);
}

@media (max-width: 800px) {
    .careers-container {
        grid-template-columns: 1fr;
    }
}
```

**Key decisions:**
- `.careers-container` mirrors `.blog-tile-container` (2-col grid, same gap)
- `.job-card` mirrors `.blog-tile` (same min-height, padding, hover shift)
- `.job-badge` mirrors `.tag` styling (same font-size, padding, bg color, border-radius)
- `.job-cta-button` is a solid dark button — stands out as a clear action
- Mobile: careers grid collapses to single column at 800px (same breakpoint as rest of site)

**Step 2: Commit**

```bash
git add assets/css/style.css
git commit -m "Add CSS for careers listing and job detail pages

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Create first job posting (Designer)

**Files:**
- Create: `_jobs/Designer.md`

**Step 1: Create `_jobs/Designer.md`**

Based on the user's brief: designer good with branding and web design, willing to use code and AI as prototyping materials, work with new tools and create them in-house, 2-4 years experience, flexible for the right candidate.

```markdown
---
title: "Designer"
location: "New Delhi, India"
type: "Full-time"
layout: job
feed: show
order: 1
date: 03-03-2026
---

## The Role

We're looking for a designer to join Public Knowledge Studio. You'll work directly with startup founders — shaping brands, designing websites, and building products from the ground up.

This isn't a typical design role. We believe the best design work comes from understanding the material you're working with. For us, that means code, AI, and whatever new tools help us do better work. We're not looking for someone who only pushes pixels — we want someone who's curious about the full stack of how things get made.

## What You'll Do

- Design brand identities, websites, and digital products for early-stage startups
- Prototype in code — using HTML/CSS, frameworks, or AI-assisted tools as design materials
- Work with founders to translate vision into clear, compelling design
- Explore and adopt new tools, and help build internal ones when existing tools fall short
- Contribute to how we work as a studio — our processes are always evolving

## What We're Looking For

- 2–4 years of experience in branding, web design, or product design (flexible for the right person)
- A strong portfolio that shows both visual thinking and systematic design
- Comfort with code as a creative tool — you don't need to be a developer, but you should be willing to get your hands dirty
- Genuine curiosity about AI, new tools, and non-traditional design workflows
- Clear communication and the ability to work independently with startup clients

## About Us

Public Knowledge Studio is a small design studio in New Delhi that works with startups. We care about doing thoughtful, high-quality work and building a team of people who are always learning.

## How to Apply

Send your portfolio and a short note about yourself to [careers@publicknowledge.co](mailto:careers@publicknowledge.co). Tell us about a project you're proud of and why.
```

**Step 2: Commit**

```bash
git add "_jobs/Designer.md"
git commit -m "Add first job posting: Designer

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Build, verify, and push

**Step 1: Rebuild the site**

Since `_config.yml` was changed, the dev server must be restarted. Build instead:

Run: `bundle exec jekyll build 2>&1`
Expected: `Generating... done` with no errors

**Step 2: Verify the careers page was built**

Run: `ls -la _site/careers/ 2>/dev/null || ls -la _site/careers.html 2>/dev/null`
Expected: File exists

**Step 3: Verify the job detail page was built**

Run: `ls -la _site/careers/designer* 2>/dev/null || find _site/careers -name "*.html" 2>/dev/null`
Expected: `designer.html` or similar exists under `_site/careers/`

**Step 4: Verify Schema.org in built job page**

Run: `grep "JobPosting" _site/careers/designer.html 2>/dev/null || grep "JobPosting" _site/careers/designer/index.html 2>/dev/null`
Expected: Contains `"@type": "JobPosting"`

**Step 5: Verify careers listing renders the job**

Run: `grep "Designer" _site/careers.html 2>/dev/null || grep "Designer" _site/careers/index.html 2>/dev/null`
Expected: Contains the job title "Designer"

**Step 6: Push all commits**

Run: `git push`
Expected: All 5 commits pushed to origin/main
