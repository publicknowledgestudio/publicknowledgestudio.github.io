---
layout: base
permalink: team
title: "Team"
subtitle: "Meet the people behind Public Knowledge Studio"
---

<div class="container">

<div class="section-title mg-top-6xl">The Team</div>

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

</div>