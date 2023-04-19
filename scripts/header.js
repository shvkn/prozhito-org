const page = document.querySelector('.page');
const header = page.querySelector('.header');
const headerNavMenu = header.querySelector('.navbar');
const headerNavMenuItems = header.querySelector('.menu');
const headerDropContainer = headerNavMenu.querySelector('.navbar__drop-container');
const toggleHeaderMenuButton = headerNavMenu.querySelector('.navbar__toggle');
const subMenus = headerNavMenu.querySelectorAll('.menu__submenu');


const collapseMenu = () => {
  headerNavMenuItems.querySelectorAll(SELECTOR_FOCUSABLE)
    .forEach(el => el.tabIndex = -1);
}

const expandMenu = () => {
  header.querySelectorAll(SELECTOR_FOCUSABLE)
    .forEach(el => el.removeAttribute('tabindex'));
}

const togglePreventPageScroll = () =>
  page.classList.toggle('no-scroll')

const isMobileMenuDropped = () =>
  headerDropContainer.classList.contains('navbar__drop-container_expanded');

const closeDropMenu = () => {
  if (isMobileMenuDropped()) {
    toggleMenu();
  }
}

const toggleMenu = (e) => {
  togglePreventPageScroll();

  headerDropContainer.classList.toggle('navbar__drop-container_expanded');
  toggleHeaderMenuButton.classList.toggle('navbar__toggle_expanded');

  if (isMobileMenuDropped()) {

    toggleHeaderMenuButton.setAttribute('aria-expanded', 'true');
    header
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => {
        el.removeAttribute('tabindex');
        el.addEventListener('keydown', function (e) {
          isolateFocusInContext(e, header);
        });
      });
  } else {
    toggleHeaderMenuButton.setAttribute('aria-expanded', 'false');
    header
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => el.removeEventListener('keydown', function (e) {
        isolateFocusInContext(e, header)
      }));

    headerNavMenuItems
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => el.tabIndex = -1);
  }
}

toggleHeaderMenuButton.addEventListener('click', toggleMenu);

subMenus.forEach((subMenu) => {
  const SUBMENU_EXPANDED_MOD = 'menu__submenu_visible';
  const menuItem = subMenu.closest('.menu__item');
  const menuLink = menuItem.querySelector('.menu__link');

  const submenuExpanded = () =>
    subMenu.classList.contains(SUBMENU_EXPANDED_MOD);

  const toggleSubmenu = (e) => {
    menuLink.setAttribute('aria-expanded', `${!submenuExpanded()}`);
    subMenu.classList.toggle(SUBMENU_EXPANDED_MOD);
    e.preventDefault();
  }

  menuLink.addEventListener('click', toggleSubmenu);

  menuItem.addEventListener('mouseover', (e) => {
    if (!submenuExpanded()) toggleSubmenu(e);
  });

  menuItem.addEventListener('mouseout', (e) => {
    if (submenuExpanded()) toggleSubmenu(e);
  });
});


const updateMenu = () => {
  if (tablet.matches) {
    expandMenu();
  } else if (mobile.matches) {
    collapseMenu();
  }
}

window.addEventListener('load', function () {
  updateMenu();
});

window.addEventListener('resize', function () {
  updateMenu();
});

