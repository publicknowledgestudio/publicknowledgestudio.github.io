---
layout: base
permalink: careers
title: "Careers"
subtitle: "Join the team at Public Knowledge Studio"
---

<div class="container">

<h1 class="section-title mg-top-6xl">Careers</h1>

<div class="careers-intro container-width">
    <p>Public Knowledge is a small design studio that works with startups. We care about doing thoughtful, high-quality work — and we think the best way to do that is with a curious, multi-disciplinary team that treats code, AI, and new tools as design materials, not just outputs.</p>
</div>

{% assign open_jobs = site.jobs | where: 'feed', 'show' | sort: 'order' %}
{% if open_jobs.size > 0 %}
<h2 class="section-title">Open Positions</h2>
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
</div>
{% endif %}

<div class="careers-open-application container-width">
    <p>Don't see a role that fits? We're always interested in hearing from curious people. Send your portfolio and a short note to <a href="mailto:careers@publicknowledge.co">careers@publicknowledge.co</a></p>
</div>

<h2 class="section-title">The Team</h2>

{% assign sorted_team = site.team | where: 'feed', 'show' | sort: 'order' %}
<div class="team-container">
    {% for member in sorted_team %}
    <a href="{{ member.url }}">
        <div class="team-card" style="background-image: url({{ member.image }})">
            <div class="team-card-content">
                <div class="team-name">{{ member.title }}</div>
                <div class="team-description sans secondary">{{ member.role }}</div>
            </div>
        </div>
    </a>
    {% endfor %}
</div>

</div>
