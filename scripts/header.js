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
  // e.target.tabIndex = (e.target.tabIndex === 0) ? -1 : 0;
  e.target.closest('header').setAttribute('aria-modal', 'true');
  headerToggleMenu.classList.toggle('nav-menu__drop-container_expanded');
  toggleHeaderMenuButton.classList.toggle('nav-menu__toggle_expanded');
}
toggleHeaderMenuButton.addEventListener('click', toggleMenu);

// Header
const subMenus = document.querySelectorAll('.nav-menu .nav-menu__submenu');
subMenus.forEach((subMenu) => {
  const submenuExpandedModifier = 'nav-menu__submenu_visible';
  const menuItem = subMenu.closest('.nav-menu__item');
  const menuLink = menuItem.querySelector('.nav-menu__link');

  const submenuExpanded = () => subMenu.classList.contains(submenuExpandedModifier);

  const toggleSubmenu = (e) => {
    e.preventDefault();
    menuLink.setAttribute('aria-expanded', `${!submenuExpanded()}`);
    subMenu.classList.toggle(submenuExpandedModifier);
  }

  menuLink.addEventListener('click', toggleSubmenu);

  menuItem.addEventListener('mouseover', (e) => {
    if(!submenuExpanded()) toggleSubmenu(e);
  });

  menuItem.addEventListener('mouseout', (e) => {
    if(submenuExpanded()) toggleSubmenu(e);
  } );
});
