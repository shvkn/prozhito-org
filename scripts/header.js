const page = document.querySelector('.page');
const header = page.querySelector('.header');
const headerNavMenu = header.querySelector('.nav-menu');
const headerNavMenuItems = header.querySelector('.nav-menu__items');
const headerDropContainer = headerNavMenu.querySelector('.nav-menu__drop-container');
const toggleHeaderMenuButton = headerNavMenu.querySelector('.nav-menu__toggle');
const subMenus = headerNavMenu.querySelectorAll('.nav-menu__submenu');

const SELECTOR_FOCUSABLE = `
    a[href],
    area[href],
    button:not([disabled]):not([aria-hidden]),
    input:not([disabled]):not([aria-hidden]):not([type="hidden"]),
    select:not([disabled]):not([aria-hidden]),
    textarea:not([disabled]):not([aria-hidden]),
    embed,
    iframe,
    object,
    [contenteditable],
    [tabindex]:not([tabindex^="-"])
`;

function isolateTabsInHeader(e) {
  const focusableEls = header.querySelectorAll(SELECTOR_FOCUSABLE);
  const first = focusableEls[0];
  const last = focusableEls[focusableEls.length - 1];
  const TAB_CODE = 9;
  const isTabPressed = (e.key === 'Tab' || e.keyCode === TAB_CODE);
  if (!isTabPressed) return;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      last.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
}


const collapseMenu = () => {
  headerDropContainer.classList.add('nav-menu__drop-container_collapsed');
  toggleHeaderMenuButton.classList.add('nav-menu__toggle_displayed');
  headerNavMenuItems.querySelectorAll(SELECTOR_FOCUSABLE)
    .forEach(el => el.tabIndex = -1);
}

const expandMenu = () => {
  headerDropContainer.classList.remove('nav-menu__drop-container_collapsed')
  toggleHeaderMenuButton.classList.remove('nav-menu__toggle_displayed');
  header.querySelectorAll(SELECTOR_FOCUSABLE)
    .forEach(el => el.removeAttribute('tabindex'));
}

const togglePreventPageScroll = () => page.classList.toggle('no-scroll')
const isMobileMenuDropped = () => toggleHeaderMenuButton.classList.contains('nav-menu__toggle_expanded');

const toggleMenu = (e) => {
  togglePreventPageScroll();

  headerDropContainer.classList.toggle('nav-menu__drop-container_expanded');
  toggleHeaderMenuButton.classList.toggle('nav-menu__toggle_expanded');

  if (isMobileMenuDropped()) {
    console.log(document.activeElement);
    toggleHeaderMenuButton.setAttribute('aria-expanded', 'true');
    header
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => {
        el.removeAttribute('tabindex');
        el.addEventListener('keydown', isolateTabsInHeader);
      });
  } else {
    toggleHeaderMenuButton.setAttribute('aria-expanded', 'false');
    header
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => el.removeEventListener('keydown', isolateTabsInHeader));

    headerNavMenuItems
      .querySelectorAll(SELECTOR_FOCUSABLE)
      .forEach(el => el.tabIndex = -1);
  }
}

toggleHeaderMenuButton.addEventListener('click', toggleMenu);

// Header
subMenus.forEach((subMenu) => {
  const SUBMENU_EXPANDED_MOD = 'nav-menu__submenu_visible';
  const menuItem = subMenu.closest('.nav-menu__item');
  const menuLink = menuItem.querySelector('.nav-menu__link');

  const submenuExpanded = () => subMenu.classList.contains(SUBMENU_EXPANDED_MOD);

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



