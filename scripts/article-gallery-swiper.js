const initGallery = (gallery) => {

  function createEl (tag, classList='') {
    const el = document.createElement(tag);
    el.className = classList;
    return el;
  }

  const content = gallery.querySelector('.content')
  const slides = content.querySelectorAll('.image');
  if (slides.length === 0) return;
  gallery.classList.add('swiper');
  gallery.querySelector('.content').classList.add('swiper-wrapper');
  gallery.querySelectorAll('.image').forEach(image => image.classList.add('swiper-slide'));

  const nextSlideButton = createEl('button', 'arrow-control arrow-control_bg_transparent article-gallery__control article-gallery__control_type_right')
  nextSlideButton.insertAdjacentElement('afterbegin',createEl('span', 'arrow'));

  const prevSlideButton = createEl('button', 'arrow-control arrow-control_bg_transparent article-gallery__control article-gallery__control_type_left')
  prevSlideButton.insertAdjacentElement('afterbegin',createEl('span', 'arrow arrow_way_left'));

  gallery.insertAdjacentElement('afterbegin', nextSlideButton);
  gallery.insertAdjacentElement('afterbegin', prevSlideButton);

  new Swiper(gallery, {
    slidesPerView: 1,
    navigation: {
      nextEl: gallery.querySelector('.article-gallery__control_type_right'),
      prevEl: gallery.querySelector('.article-gallery__control_type_left'),
    },
  });

}


window.addEventListener('load', () => {
  document.querySelectorAll('.article-gallery').forEach((gallery) => {
    initGallery(gallery);
  });
});
