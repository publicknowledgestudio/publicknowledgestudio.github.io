// slideshow.js
// Automatically converts all <div class="img-carousel"> into interactive carousels

(function () {
    function createCarousel(container) {
      const images = Array.from(container.getElementsByTagName("img"));
      
      if (images.length < 2) {
        return;
      }
  
      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
  
      const track = document.createElement("div");
      track.className = "carousel-track";
      track.style.scrollSnapType = 'x mandatory';
      track.style.overflowX = 'scroll';
      track.style.display = 'flex';
      track.style.scrollBehavior = 'smooth';
      track.style.WebkitOverflowScrolling = 'touch'; // For iOS momentum scrolling
  
      images.forEach((img, index) => {
        const slide = document.createElement("div");
        slide.className = "carousel-slide";
        slide.style.scrollSnapAlign = 'start';
        slide.style.flex = '0 0 100%';
        slide.appendChild(img);
        track.appendChild(slide);
      });
  
      wrapper.appendChild(track);
      container.appendChild(wrapper);
  
      // Create navigation container
      const navContainer = document.createElement("div");
      navContainer.className = "carousel-nav-container";
  
      // Add dot indicators
      const dots = document.createElement("div");
      dots.className = "carousel-dots";
      images.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (idx === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          const slideWidth = track.offsetWidth;
          track.scrollTo({
            left: slideWidth * idx,
            behavior: 'smooth'
          });
        });
        dots.appendChild(dot);
      });
      navContainer.appendChild(dots);
  
      // Create button container
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "carousel-button-container";
  
      // Add navigation buttons
      const prevButton = document.createElement("button");
      prevButton.className = "carousel-nav square-button prev";
      prevButton.innerText = "←";
  
      const nextButton = document.createElement("button");
      nextButton.className = "carousel-nav square-button next";
      nextButton.innerText = "→";
  
      buttonContainer.appendChild(prevButton);
      buttonContainer.appendChild(nextButton);
      navContainer.appendChild(buttonContainer);
      container.insertBefore(navContainer, wrapper);
  
      let currentIndex = 0;
  
      function updateCarousel() {
        const dotElems = container.querySelectorAll(".dot");
        
        // Update dots
        dotElems.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
        });
  
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
      }
  
      function goToSlide(index) {
        const slideWidth = track.offsetWidth;
        track.scrollTo({
          left: slideWidth * index,
          behavior: 'smooth'
        });
        currentIndex = index;
        updateCarousel();
      }
  
      function nextSlide() {
        if (currentIndex < images.length - 1) {
          goToSlide(currentIndex + 1);
        }
      }
  
      function prevSlide() {
        if (currentIndex > 0) {
          goToSlide(currentIndex - 1);
        }
      }
  
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
  
      // Update current index when scrolling
      let scrollTimeout;
      track.addEventListener('scroll', () => {
        // Clear the previous timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout to update after scrolling stops
        scrollTimeout = setTimeout(() => {
          const slideWidth = track.offsetWidth;
          currentIndex = Math.round(track.scrollLeft / slideWidth);
          updateCarousel();
        }, 10); // Small delay to ensure smooth updates
      });
  
      // Initialize the carousel
      updateCarousel();
      
      // Ensure carousel starts at first image
      track.scrollLeft = 0;
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      const carousels = document.querySelectorAll(".img-carousel");
      carousels.forEach(createCarousel);
    });
  })();
  