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
