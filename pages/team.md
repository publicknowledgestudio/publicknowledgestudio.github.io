---
layout: team-page
permalink: team
title: "Team"
subtitle: "Meet the people behind Public Knowledge Studio"
banner: /assets/img/team-bkk.jpg
---

<div class="container">

<div class="team-intro">
    <p>We're a small studio working closely with founders to build brands, websites, and product launches that earn attention. We care about craft, clarity, and the long road of getting the details right.</p>
</div>

<h1 class="section-title">The Team</h1>

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

<div class="section-title mg-top-6xl">Previous Members</div>

{% assign older_team = site.team | where: 'feed', 'hide' | sort: 'order' %}
<div class="team-container">
    {% for member in older_team %}
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

<a href="/careers" class="team-careers-cta">
    <div class="team-careers-cta-title">Join the team &rarr;</div>
    <div class="team-careers-cta-subtitle sans">See our open roles and how to get in touch.</div>
</a>

</div>