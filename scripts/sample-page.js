const tocWidget = page.querySelector('.toc');
const tocContent = tocWidget.querySelector('.toc__nav');
const tocOpenButton = tocWidget.querySelector('.toc__open-button');
const tocCloseButton = tocWidget.querySelector('.toc__close-button');
const stickers = document.querySelectorAll('.sticker');

const toggleTableOfContents = () => {
  togglePreventPageScroll();
  tocContent.classList.toggle('toc__nav_expanded');
  if (tocContent.classList.contains('toc__nav_expanded')) {
    tocContent.querySelectorAll(SELECTOR_FOCUSABLE).forEach(el => {
      el.addEventListener('keydown', function (e) {
        isolateFocusInContext(e, tocContent);
      });
      el.removeAttribute('tabindex');
    });
  } else {
    tocContent.querySelectorAll(SELECTOR_FOCUSABLE).forEach(el => el.tabIndex = -1);
  }
}

tocOpenButton.addEventListener('click', toggleTableOfContents);
tocCloseButton.addEventListener('click', toggleTableOfContents);

const closeSticker = (e) => {
  e.target.closest('.sticker').classList.remove('sticker_visible');
  prevActiveEl.focus();
}

let prevActiveEl = null;

const openSticker = (e) => {
  e.preventDefault();
  const stickerId = e.target.dataset.sticker;
  const sticker = Array.from(stickers)
    .find(sticker =>
      sticker.dataset.sticker &&
      (sticker.dataset.sticker === stickerId));

  sticker.style.top = `${window.scrollY + e.target.getBoundingClientRect().top}px`;
  sticker.style.transform = 'translateY(-50%)';
  sticker.classList.add('sticker_visible');
  prevActiveEl = document.activeElement;
  sticker.querySelector('.sticker__close-button').focus();
}


const initSticker = (sticker) =>
  sticker
    .querySelector('.sticker__close-button')
    .addEventListener('click', closeSticker);

const initStickerLink = (link) => {
  if (link.dataset.sticker)
    link.addEventListener('click', openSticker);
}

window.addEventListener('load', () => {
  document.querySelectorAll('.sticker')
    .forEach(sticker => initSticker(sticker));

  document.querySelectorAll('a')
    .forEach(a => initStickerLink(a));
});
