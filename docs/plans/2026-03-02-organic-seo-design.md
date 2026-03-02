# Organic SEO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve organic search discovery for startup founders by optimizing blog content and adding internal linking to templates.

**Architecture:** Update blog post frontmatter (tags, subtitles), add related content sections to blog and case study layouts using Liquid tag matching, add prev/next blog navigation, and hide thin content.

**Tech Stack:** Jekyll 4, Liquid templates, CSS custom properties

---

### Task 1: Hide Thin Blog Posts

Set `feed: hide` on 3 thin blog posts so they don't appear in listings or get indexed as low-quality content.

**Files:**
- Modify: `_blog/Design Process.md` (frontmatter only)
- Modify: `_blog/Collections.md` (frontmatter only)
- Modify: `_blog/Case Studies We Like.md` (frontmatter only)

**Step 1: Update Design Process.md frontmatter**

Change `feed: show` to `feed: hide` in `_blog/Design Process.md`. This post has no content body.

**Step 2: Update Collections.md frontmatter**

Change `feed: show` to `feed: hide` in `_blog/Collections.md`. This post is just two links.

**Step 3: Update Case Studies We Like.md frontmatter**

Change `feed: show` to `feed: hide` in `_blog/Case Studies We Like.md`. This post is just a link list.

**Step 4: Commit**

```bash
git add "_blog/Design Process.md" "_blog/Collections.md" "_blog/Case Studies We Like.md"
git commit -m "Hide thin blog posts from feed and indexing"
```

---

### Task 2: Add Tags to Untagged Blog Posts

Add relevant tags from the existing tag set (Branding, Strategy, UI/UX, Website) to blog posts that currently have empty tag arrays. This drives the related content sections added later.

**Files:**
- Modify: `_blog/FAQs.md`
- Modify: `_blog/Internship.md`
- Modify: `_blog/New Employee Checklist.md`
- Modify: `_blog/Ways of Working.md`
- Modify: `_blog/Keep the Web Weird - Design Degree Showcase, IIT Delhi.md`
- Modify: `_blog/Vibe Code Your Portfolio.md`

**Step 1: Update FAQs.md**

Change `tags:` to `tags: [Strategy]` — covers working process, pricing, timelines.

**Step 2: Update Internship.md**

Change `tags:` to `tags: [Strategy]` — covers design process and learning.

**Step 3: Update New Employee Checklist.md**

Change `tags:` to `tags: [Strategy]` — covers team operations and tools.

**Step 4: Update Ways of Working.md**

Change `tags:` (empty) to `tags: [Strategy]` — covers design principles and practices.

**Step 5: Update Keep the Web Weird.md**

Tags already has `talks` and `website`. Add Strategy: change to `tags: [Website, Strategy]` (drop `talks` which has no tag page).

**Step 6: Update Vibe Code Your Portfolio.md**

Tags has `talks`. Change to `tags: [Website]` (drop `talks` which has no tag page).

**Step 7: Commit**

```bash
git add _blog/
git commit -m "Add tags to blog posts for internal linking"
```

---

### Task 3: Add Related Posts Section to Blog Layout

Add a "Related Posts" section below blog content that shows up to 3 other blog posts sharing the same tags.

**Files:**
- Modify: `_layouts/blog.html` (insert between line 87 `</div>` closing `.blog-container` and line 90 `{% include footer.html %}`)

**Step 1: Add related posts Liquid + HTML**

Insert the following block after the closing `</div>` of `.blog-container` (after line 88) and before `{% include footer.html %}` (currently line 90):

```html
{% if page.tags.size > 0 %}
{% assign related_posts = site.blog | where: "feed", "show" | where_exp: "post", "post.url != page.url" %}
{% assign matching_posts = "" | split: "" %}
{% for post in related_posts %}
    {% for tag in page.tags %}
        {% if post.tags contains tag %}
            {% unless matching_posts contains post %}
                {% assign matching_posts = matching_posts | push: post %}
            {% endunless %}
            {% break %}
        {% endif %}
    {% endfor %}
{% endfor %}
{% if matching_posts.size > 0 %}
<div class="related-content container-width">
    <h2 class="sans uppercase related-content-title">Related Posts</h2>
    <div class="related-content-grid">
        {% for post in matching_posts limit:3 %}
        <a href="{{ post.url }}" class="related-content-card">
            <h3 class="related-content-card-title">{{ post.title }}</h3>
            <p class="related-content-card-description">{{ post.subtitle }}</p>
            <div class="tag-container">
                {% for tag in post.tags %}
                <span class="tag">{{ tag }}</span>
                {% endfor %}
            </div>
        </a>
        {% endfor %}
    </div>
</div>
{% endif %}
{% endif %}
```

**Step 2: Add CSS for related content**

Add to `assets/css/style.css` after the existing `.blog` styles (around line 620):

```css
/* Related content sections */
.related-content {
    margin: var(--spacing-6xl) auto;
    padding: 0 var(--spacing-md);
}

.related-content-title {
    font-size: var(--font-size-sm);
    color: var(--text-reg);
    margin-bottom: var(--spacing-lg);
    letter-spacing: 0.05em;
}

.related-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
}

.related-content-card {
    display: block;
    padding: var(--spacing-lg);
    border: 1px solid var(--black-10);
    border-radius: var(--border-radius-card);
    text-decoration: none;
    color: var(--text-reg);
    transition: background-color var(--transition-normal);
}

.related-content-card:hover {
    background-color: var(--slightly-warm-gray);
}

.related-content-card-title {
    font-family: var(--font-stack-sans);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
}

.related-content-card-description {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
}
```

**Step 3: Verify locally**

Run `bundle exec jekyll serve` and visit a blog post with tags (e.g., `/blog/design-process-for-startups`). Confirm related posts appear at the bottom.

**Step 4: Commit**

```bash
git add _layouts/blog.html assets/css/style.css
git commit -m "Add related posts section to blog layout"
```

---

### Task 4: Add Related Projects Section to Case Study Layout

Add a "More Projects" section below case study content showing up to 3 other projects with shared tags.

**Files:**
- Modify: `_layouts/case-study.html` (insert between line 75 `</div>` closing `.case-study-container` and line 77 `{% include footer.html %}`)

**Step 1: Add related projects Liquid + HTML**

Insert after the closing `</div>` of `.case-study-container` (after line 75) and before `{% include footer.html %}` (line 77):

```html
{% if page.tags.size > 0 %}
{% assign related_projects = site.projects | where: "feed", "show" | where_exp: "project", "project.url != page.url" %}
{% assign matching_projects = "" | split: "" %}
{% for project in related_projects %}
    {% for tag in page.tags %}
        {% if project.tags contains tag %}
            {% unless matching_projects contains project %}
                {% assign matching_projects = matching_projects | push: project %}
            {% endunless %}
            {% break %}
        {% endif %}
    {% endfor %}
{% endfor %}
{% if matching_projects.size > 0 %}
<div class="related-content container-width">
    <h2 class="sans uppercase related-content-title">More Projects</h2>
    <div class="related-content-grid">
        {% for project in matching_projects limit:3 %}
        <a href="{{ project.url }}" class="related-content-card">
            <img class="related-content-card-image" src="{{ project.thumbnail }}" alt="{{ project.title }}">
            <h3 class="related-content-card-title">{{ project.title }}</h3>
            <p class="related-content-card-description">{{ project.subtitle }}</p>
        </a>
        {% endfor %}
    </div>
</div>
{% endif %}
{% endif %}
```

**Step 2: Add CSS for card images**

Add to `assets/css/style.css` after the related content styles added in Task 3:

```css
.related-content-card-image {
    width: 100%;
    border-radius: var(--border-radius-md);
    margin-bottom: var(--spacing-sm);
}
```

**Step 3: Verify locally**

Visit a case study with tags (e.g., `/projects/amie`). Confirm "More Projects" appears at the bottom with related tagged projects.

**Step 4: Commit**

```bash
git add _layouts/case-study.html assets/css/style.css
git commit -m "Add related projects section to case study layout"
```

---

### Task 5: Add Previous/Next Navigation to Blog Layout

Add simple previous/next post links at the bottom of blog posts, after the related posts section.

**Files:**
- Modify: `_layouts/blog.html` (insert after the related posts block, before `{% include footer.html %}`)

**Step 1: Add prev/next navigation**

Insert before `{% include footer.html %}` in `_layouts/blog.html`:

```html
{% assign blog_posts = site.blog | where: "feed", "show" | sort: "date" | reverse %}
{% assign prev_post = nil %}
{% assign next_post = nil %}
{% assign found = false %}
{% for post in blog_posts %}
    {% if found and next_post == nil %}
        {% assign next_post = post %}
    {% endif %}
    {% if post.url == page.url %}
        {% assign found = true %}
    {% endif %}
    {% unless found %}
        {% assign prev_post = post %}
    {% endunless %}
{% endfor %}
{% if prev_post or next_post %}
<nav class="blog-nav container-width" aria-label="Blog post navigation">
    <div class="blog-nav-prev">
        {% if next_post %}
        <a href="{{ next_post.url }}">
            <span class="blog-nav-label sans uppercase">&larr; Older</span>
            <span class="blog-nav-title">{{ next_post.title }}</span>
        </a>
        {% endif %}
    </div>
    <div class="blog-nav-next">
        {% if prev_post %}
        <a href="{{ prev_post.url }}">
            <span class="blog-nav-label sans uppercase">Newer &rarr;</span>
            <span class="blog-nav-title">{{ prev_post.title }}</span>
        </a>
        {% endif %}
    </div>
</nav>
{% endif %}
```

**Step 2: Add CSS for blog navigation**

Add to `assets/css/style.css`:

```css
/* Blog prev/next navigation */
.blog-nav {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-lg);
    margin: var(--spacing-4xl) auto;
    padding: 0 var(--spacing-md);
}

.blog-nav a {
    text-decoration: none;
    color: var(--text-reg);
}

.blog-nav a:hover {
    color: var(--black);
}

.blog-nav-label {
    font-size: var(--font-size-sm);
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: var(--spacing-xs);
}

.blog-nav-title {
    font-family: var(--font-stack-sans);
    font-size: var(--font-size-md);
}

.blog-nav-next {
    text-align: right;
}

@media (max-width: 800px) {
    .blog-nav {
        flex-direction: column;
    }
    .blog-nav-next {
        text-align: left;
    }
}
```

**Step 3: Verify locally**

Visit any blog post. Confirm prev/next navigation appears at the bottom. Check that the first and last posts correctly show only one direction.

**Step 4: Commit**

```bash
git add _layouts/blog.html assets/css/style.css
git commit -m "Add previous/next navigation to blog layout"
```

---

### Task 6: Final Verification

**Step 1: Build the full site**

```bash
bundle exec jekyll build
```

Verify no build errors.

**Step 2: Check thin posts are hidden**

Verify `Design Process`, `Collections`, and `Case Studies We Like` do NOT appear in the blog listing at `/blog`.

**Step 3: Check related content renders**

- Visit a blog post with tags — related posts should appear
- Visit a case study with tags — related projects should appear

**Step 4: Push all changes**

```bash
git push origin main
```
