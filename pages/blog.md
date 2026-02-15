---
layout: base
permalink: blog
title: "Blog"
subtitle: "Thoughts, resources and news from the Public Knowledge team"
---

<div class="container">

<div>
<h1 class="section-title mg-top-6xl">The Journal</h1>
<div class="section-subtitle">Thoughts, resources and news from the Public Knowledge team</div>
</div>

<div class="blog-tile-container">
    {% assign sorted_blog = site.blog | where: 'feed', 'show' | sort: 'date' | reverse %}
    {% for post in sorted_blog %}
        <a href="{{ post.url }}">
            <div class="blog-tile">
                <div class="blog-tile-title">{{ post.title }}</div>
                <div class="blog-tile-description sans secondary">{{ post.subtitle }}</div>
            </div>
        </a>
    {% endfor %}
</div>

</div>