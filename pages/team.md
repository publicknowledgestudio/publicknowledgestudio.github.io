---
layout: base
permalink: team
---

<div class="container">


<div class="section-title mg-top-6xl">The Team</div>

{% assign sorted_team = site.team | sort: 'order' %}
<div class="team-container">
    {% for member in sorted_team %}
    <a href="{{ member.url }}">
        <div class="team-card" style="background-image: url({{ member.image }})">
            <div class="team-card-content">
                <div class="team-name">{{ member.name }}</div>
                <div class="team-description sans secondary">{{ member.role }}</div>
            </div>
        </div>
    </a>
    {% endfor %}
</div>

<div class="section-title">Previous Collaborators</div>

{% assign sorted_team = site.team | sort: 'order' %}
<div class="team-container">
    {% for member in sorted_team %}
    <a href="{{ member.url }}">
        <div class="team-card" style="background-image: url({{ member.image }})">
            <div class="team-card-content">
                <div class="team-name">{{ member.name }}</div>
                <div class="team-description sans secondary">{{ member.role }}</div>
            </div>
        </div>
    </a>
    {% endfor %}
</div>

</div>