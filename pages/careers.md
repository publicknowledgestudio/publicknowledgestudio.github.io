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
