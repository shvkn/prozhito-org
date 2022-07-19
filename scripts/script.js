const page = document.querySelector('.page');
const header = page.querySelector('.header');
const headerNavMenu = header.querySelector('.nav-menu');
const toggleHeaderMenuButton = headerNavMenu.querySelector('.nav-menu__toggle');
const headerToggleMenu = headerNavMenu.querySelector('.nav-menu__drop-container');

const togglePreventPageScroll = () => {
  page.classList.toggle('no-scroll');
}

const toggleMenu = (e) => {
  togglePreventPageScroll();
  headerToggleMenu.classList.toggle('nav-menu__drop-container_expanded');
  toggleHeaderMenuButton.classList.toggle('nav-menu__toggle_expanded');
}
toggleHeaderMenuButton.addEventListener('click', toggleMenu);


const tocWidget = page.querySelector('.toc');
const tocContent = tocWidget.querySelector('.toc__nav');
const tocOpenButton = tocWidget.querySelector('.toc__open-button');
const tocCloseButton = tocWidget.querySelector('.toc__close-button');

const toggleTableOfContents = () => {
  togglePreventPageScroll();
  tocContent.classList.toggle('toc__nav_expanded');
}

tocOpenButton.addEventListener('click', toggleTableOfContents);
tocCloseButton.addEventListener('click', toggleTableOfContents);
