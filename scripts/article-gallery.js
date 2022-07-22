window.addEventListener('load', () => {
  document.querySelectorAll('.article-gallery').forEach((gallery) => {
    initGallery(gallery);
  });
});
const initGallery = (gallery) => {

  const slides = gallery.querySelectorAll('.image');
  if (slides.length === 0) return;

  const nextSlideButton = document.createElement('button')
  nextSlideButton.className = 'arrow-control arrow-control_bg_transparent article-gallery__control';
  nextSlideButton.insertAdjacentHTML('afterbegin', '<span class="arrow"></span>')

  const prevSlideButton = nextSlideButton.cloneNode(true);
  prevSlideButton.querySelector('.arrow').classList.add('arrow_way_left');

  nextSlideButton.classList.add('article-gallery__control_type_right');
  prevSlideButton.classList.add('article-gallery__control_type_left');

  slides.forEach((slide, i) => {
    const counter = document.createElement('span');
    counter.classList.add('article-gallery__counter');
    counter.textContent = `${i + 1} / ${slides.length}`;
    slide.querySelector('figcaption').insertAdjacentElement('beforeend', counter);
  });


  const slideWidth = slides[0].getBoundingClientRect().width;
  const content = gallery.querySelector('.content');

  let currentSlide = 1;

  const checkButton = () => {
    switch (currentSlide) {
      case  slides.length:
        nextSlideButton.style.visibility = 'hidden';
        break;
      case 1:
        prevSlideButton.style.visibility = 'hidden';
        break;
      default:
        nextSlideButton.style.visibility = 'visible';
        prevSlideButton.style.visibility = 'visible';
    }
  }
  const nextSlide = () => {
    if (currentSlide++ < slides.length) {
      content.style.left = `${(parseFloat(content.style.left) || 0) - slideWidth}px`;
      checkButton();
    }
  }

  const prevSlide = () => {
    if (currentSlide-- > 1) {
      content.style.left = `${(parseFloat(content.style.left) || 0) + slideWidth}px`;
      checkButton();
    }
  }

  nextSlideButton.addEventListener('click', () => nextSlide());
  prevSlideButton.addEventListener('click', () => prevSlide());

  gallery.insertAdjacentElement('afterbegin', nextSlideButton);
  gallery.insertAdjacentElement('afterbegin', prevSlideButton);
}
