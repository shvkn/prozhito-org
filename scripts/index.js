let mobile = window.matchMedia('(min-width: 320px)');
let tablet = window.matchMedia('(min-width: 768px)');

const updateSlidersByMQ = () => {
  if (tablet.matches) {
    console.log('tablet');
    if (magazineSliderMobile.swiper instanceof Swiper) magazineSliderMobile.destroy()
    if (materialsSlider.swiper instanceof Swiper) materialsSlider.destroy()
    if (magazineSliderTablet.swiper === undefined) magazineSliderTablet.init();
    if (newsSlider.swiper === undefined) newsSlider.init();
  } else if (mobile.matches) {
    console.log('mobile');
    if (magazineSliderTablet.swiper instanceof Swiper) magazineSliderTablet.destroy();
    if (newsSlider.swiper instanceof Swiper) newsSlider.destroy();
    if (magazineSliderMobile.swiper === undefined) magazineSliderMobile.init();
    if (materialsSlider.swiper === undefined) materialsSlider.init();
  }
}

const newsSlider = {
  swiper: undefined,
  init: function () {
    this.swiper = new Swiper(".news .swiper", {
      breakpoints: {
        320: {
          enabled: false
        },
        768: {
          enabled: true,
          slidesPerView: 'auto',
          scrollbar: {
            el: ".news .carousel__scroll",
            dragClass: "carousel__scroll-drag",
          },
          navigation: {
            nextEl: '.news .carousel__slider-navigation-next',
            prevEl: '.news .carousel__slider-navigation-prev',
          }
        }
      },
      on: {
        snapGridLengthChange: function () {
          if (this.snapGrid.length != this.slidesGrid.length) {
            this.snapGrid = this.slidesGrid.slice(0);
          }
        }

      }

    });
  },
  destroy: function () {
    if (this.swiper instanceof Swiper) this.swiper.destroy(true, true);
    this.swiper = undefined;
  }

};

const magazineSliderMobile = {
  swiper: undefined,
  init: function () {
    this.swiper = new Swiper(".magazine .swiper", {
      scrollbar: false,
      slidesPerView: 'auto',
      // autoHeight: true,
      grabCursor: true,
      effect: 'cards',
      centeredSlides: true,
      // centeredSlidesBounds: true,
      cardsEffect: {
        rotate: false,
      }
    });
  },
  destroy: function () {
    if (this.swiper instanceof Swiper) this.swiper.destroy(true, true);
    this.swiper = undefined;
  }

};

const magazineSliderTablet = {
  swiper: undefined,
  init: function () {
    this.swiper = new Swiper(".magazine .swiper", {
      slidesPerView: 'auto',
      // autoHeight: true,
      scrollbar: {
        el: ".magazine .carousel__scroll",
        dragClass: "carousel__scroll-drag",
        draggable: true,
      },
      navigation: {
        nextEl: '.magazine .carousel__slider-navigation-next',
        prevEl: '.magazine .carousel__slider-navigation-prev',
      },

      on: {
        snapGridLengthChange: function () {
          if (this.snapGrid.length != this.slidesGrid.length) {
            this.snapGrid = this.slidesGrid.slice(0);
          }
        }
      }
    });
  },
  destroy: function () {
    if (this.swiper instanceof Swiper) this.swiper.destroy(true, true);
    this.swiper = undefined;
  }
};

const materialsSlider = {
  swiper: undefined,
  init: function () {
    this.swiper = new Swiper(".swiper.materials", {
      slidesPerView: 'auto',
      centeredSlides: true,
      // centeredSlidesBounds: true,
      pagination: {
        el: '.materials .materials__slider-dots',
        click: true,
        bulletClass: 'materials__slider-dot',
        bulletActiveClass: 'materials__slider-dot_type_active',
      }
    });
  },
  destroy: function () {
    if (this.swiper instanceof Swiper) this.swiper.destroy(true, true);
    this.swiper = undefined;
  }
}

window.addEventListener('load', function () {
  updateSlidersByMQ();
  materialsSlider();
});

window.addEventListener('resize', function () {
  updateSlidersByMQ();
});
