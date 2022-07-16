const toggleMenuBtn = document.querySelector('.nav-menu__toggle');
const dropDownMenu = document.querySelector('.nav-menu__drop-container');

const toggleMenu = (e) => {
  dropDownMenu.classList.toggle('nav-menu__drop-container_expanded');
  toggleMenuBtn.classList.toggle('nav-menu__toggle_expanded');
}

toggleMenuBtn.addEventListener('click', toggleMenu);
