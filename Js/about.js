document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

window.addEventListener('load', () => {
  const mapElement = document.getElementById('map');
  if (!mapElement || typeof L === 'undefined') {
    return;
  }

  const JUST_DOGS_LAT = -26.2718016;
  const JUST_DOGS_LNG = 28.0382207;
  const DEFAULT_STREET_ZOOM = 17;

  const map = L.map(mapElement).setView([JUST_DOGS_LAT, JUST_DOGS_LNG], DEFAULT_STREET_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);

  const businessMarker = L.marker([JUST_DOGS_LAT, JUST_DOGS_LNG]).addTo(map);

  const popupContent = `
    <div class="popup-box">
      <div class="popup-title">Just Dogs Grooming Parlour</div>
      <span>Glenanda, Johannesburg</span><br>
      <a href="https://www.google.com/maps/search/?api=1&query=-26.2718016,28.0382207" target="_blank" class="popup-link">View on Google Maps</a>
    </div>
  `;

  businessMarker.bindPopup(popupContent).openPopup();

  setTimeout(() => {
    map.invalidateSize();
  }, 300);
});

const galleryLinks = document.querySelectorAll('.gallery-link');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox ? lightbox.querySelector('img') : null;
const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

if (galleryLinks.length && lightbox && lightboxImage && lightboxCaption && lightboxClose) {
  galleryLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const imgSrc = link.getAttribute('href');
      const imgAlt = link.querySelector('img').getAttribute('alt');
      lightboxImage.src = imgSrc;
      lightboxImage.alt = imgAlt;
      lightboxCaption.textContent = imgAlt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

const carouselTrack = document.querySelector('.carousel-track');
const slides = carouselTrack ? Array.from(carouselTrack.children) : [];
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const carouselNav = document.querySelector('.carousel-nav');

if (carouselTrack && slides.length) {
  const setSlidePosition = (slide, index) => {
    slide.style.left = `${index * 100}%`;
  };

  slides.forEach(setSlidePosition);

  const createNavDots = () => {
    slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.classList.add('carousel-indicator');
      if (index === 0) button.classList.add('active');
      button.type = 'button';
      button.addEventListener('click', () => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        moveToSlide(carouselTrack, currentSlide, slide);
        updateDots(carouselNav.querySelector('.active'), button);
      });
      carouselNav.appendChild(button);
    });
  };

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateDots = (currentDot, targetDot) => {
    if (currentDot) currentDot.classList.remove('active');
    if (targetDot) targetDot.classList.add('active');
  };

  createNavDots();

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const currentSlide = carouselTrack.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
      const currentDot = carouselNav.querySelector('.active');
      const targetIndex = slides.indexOf(prevSlide);
      const targetDot = carouselNav.children[targetIndex];
      moveToSlide(carouselTrack, currentSlide, prevSlide);
      updateDots(currentDot, targetDot);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const currentSlide = carouselTrack.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling || slides[0];
      const currentDot = carouselNav.querySelector('.active');
      const targetIndex = slides.indexOf(nextSlide);
      const targetDot = carouselNav.children[targetIndex];
      moveToSlide(carouselTrack, currentSlide, nextSlide);
      updateDots(currentDot, targetDot);
    });
  }
}
