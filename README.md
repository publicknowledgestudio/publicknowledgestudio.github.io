

# Public Knowledge Studio Website

A Jekyll-powered website for Public Knowledge Studio, showcasing projects, team members, and blog content with custom animations and interactive features.

This Jekyll site uses the following collections:

- **Projects** (`_projects/`) - Portfolio case studies with layouts, thumbnails, and tags
- **Blog** (`_blog/`) - Blog posts and articles
- **Team** (`_team/`) - Team member profiles with photos and roles
- **Tags** (`_tags/`) - Tag-based filtering pages (UI/UX, Strategy, Branding, Website)
- **Services** (`_services/`) - Service offerings (non-published, used via includes for services listed on home page)
- **Quotes** (`_quotes/`) - Client testimonials (non-published, used via includes for random quotes)

## Project Structure

```
publicknowledge.github.io/
├── _config.yml                 # Jekyll configuration & site settings
├── index.html                  # Homepage
├── Gemfile                     # Ruby dependencies
├── docker-compose.yml          # Docker setup for development
│
├── _layouts/                   # Jekyll layout templates
│   ├── base.html              # Base layout template
│   ├── home.html              # Homepage layout
│   ├── post.html              # Blog post layout
│   ├── blog.html              # Blog listing layout
│   ├── case-study.html        # Project case study layout
│   ├── team-member.html       # Individual team member layout
│   ├── tagpage.html           # Tag listing layout
│   └── notes.html             # Notes/wiki layout
│
├── _includes/                  # Reusable Jekyll components
│   ├── head.html              # HTML head with meta tags & preloads
│   ├── footer.html            # Footer with interactive asterisk effect
│   ├── logo.html              # Site logo component
│   ├── work.html              # Project grid (clickable)
│   ├── work-unclickable.html  # Project grid (display only)
│   ├── team.html              # Team grid (clickable)
│   ├── team-unclickable.html  # Team grid (display only)
│   ├── services.html          # Services accordion
│   ├── quote.html             # Quote component
│   ├── blog-recent.html       # Recent blog posts
│   └── Nav.html               # Navigation component
│
├── _collections/              # Jekyll content collections
│   ├── _projects/             # Project case studies
│   ├── _blog/                 # Blog posts
│   ├── _team/                 # Team member profiles
│   ├── _tags/                 # Tag pages (UI/UX, Strategy, etc.)
│   ├── _services/             # Service descriptions
│   └── _quotes/               # Client testimonials
│
├── assets/                    # Static assets
│   ├── css/
│   │   ├── style.css          # Main stylesheet (46KB)
│   │   ├── blog.css           # Blog-specific styles
│   │   └── slideshow.css      # Slideshow component styles
│   ├── js/
│   │   ├── animate-asterisk.js # Interactive asterisk animations
│   │   ├── setup-anime.js     # Anime.js setup & configurations
│   │   ├── slideshow.js       # Image slideshow functionality
│   │   └── Search.js          # Site search functionality
│   ├── img/                   # Images & graphics
│   ├── video/                 # Video assets
│   ├── fonts/                 # Custom web fonts
│   └── favicon/               # Favicon files
│
├── pages/                     # Static pages
│   ├── 404.md                 # 404 error page
│   └── notes.md               # Notes/wiki page
│
└── utilities/                 # Development utilities & scripts
```

## Key Features

- Responsive grid layouts for projects and team
- Interactive footer with animated asterisks (mouse & touch support)
- CSS-only accordion for services
- Tag-based project filtering
- Custom web fonts (Copernicus, Tasa Orbiter Deck)
- View transitions for smooth navigation
- Docker development environment
- SEO optimized with preloading and meta tags



## Development

Your theme is set up just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme.

```bash
# Local development
bundle install
bundle exec jekyll serve
```

### Testing on Local Network Devices

To test your Jekyll site on other devices (phones, tablets, other computers) on the same network:

#### Jekyll with Host Binding
```bash
# Bind to all network interfaces
bundle exec jekyll serve --host 0.0.0.0

# Optional: specify port and enable live reload
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
```

#### Finding Your Local IP Address

**macOS:**
```bash
# Get Wi-Fi IP
ipconfig getifaddr en0

# Get all network interfaces
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Linux:**
```bash
# Get primary IP
hostname -I | cut -d' ' -f1

# Or use ip command
ip route get 1.2.3.4 | awk '{print $7}'

# Or check all interfaces
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```cmd
# Get IP address
ipconfig | findstr IPv4

# Or use PowerShell
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*"}).IPAddress
```

#### Access from Other Devices
Once Jekyll is running with `--host 0.0.0.0`, access your site from other devices using:
```
http://[YOUR_LOCAL_IP]:4000
# Example: http://192.168.1.100:4000
```

## License

This project contains two types of content with different licensing:

### Open Source Theme Code
The underlying Jekyll theme, layouts, CSS, JavaScript, and general website functionality are available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT). You are free to use, modify, and distribute the theme code.

### Proprietary Content
All content including but not limited to:
- Project case studies and portfolio work
- Client testimonials and quotes  
- Team member information and photos
- Service descriptions and business content
- Brand assets and custom graphics

This content is proprietary and owned by Public Knowledge Studio. It is not licensed for reuse and remains the intellectual property of Public Knowledge Studio and/or our clients. 


## Credits & Thanks
This website is based on the Jekyll Garden Jekyll theme. 
-  See [Credits page](https://jekyll-garden.github.io/credits)

# Jekyll Garden v 0.4!
![Slide 4_3 - 1 (1)](https://user-images.githubusercontent.com/1788677/169704768-65c32d93-7884-47fa-b98c-bc8329acc6a7.png)


Jekyll Garden theme lets you publish your [Obsidian](https://obsidian.md/) vault (or a subset of it) as a Jekyll static website. The theme is markdown and Obsidian setup friendly. You can use your own server or Github page to set up your SSG. Check out the demo.

<a href="https://www.buymeacoffee.com/hiran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height= "48" width="173"></a>

## Documents and links
-  [Demo website](https://jekyll-garden.github.io/)
-  [Personal Website](https://hiran.in/)
-  [Feature List](https://jekyll-garden.github.io/post/features)
-  [How to Setup](https://jekyll-garden.github.io/post/how-to)

