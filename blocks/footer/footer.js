/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  if (fragment.firstElementChild) {
    const footerMain = fragment.firstElementChild.children[0];
    const footerProvider = fragment.firstElementChild.children[1];
    const footerMedAdv = fragment.firstElementChild.children[2];
    if (window.location.pathname.includes('/providers/')) {
      footer.append(footerProvider);
    } else if (window.location.pathname.includes('/shop/')) {
      footer.append(footerMedAdv);
    } else {
      footer.append(footerMain);
    }
  }
  block.append(footer);
}
