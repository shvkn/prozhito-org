const mobile = window.matchMedia('(min-width: 320px)');
const tablet = window.matchMedia('(min-width: 768px)');
const desktop = window.matchMedia('(min-width: 1200px)');

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
  if(tablet.matches) closeDropMenu();
});
