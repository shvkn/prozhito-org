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
