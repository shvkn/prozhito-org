const mobile = window.matchMedia('(min-width: 320px)');
const tablet = window.matchMedia('(min-width: 768px)');
const desktop = window.matchMedia('(min-width: 1200px)');


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

function isolateFocusInContext(e, context) {
  const focusableEls = context.querySelectorAll(SELECTOR_FOCUSABLE);
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
