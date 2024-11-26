export default function decorate(block) {
  // Get the parent element and create a new unordered list
  const { parentElement } = block;
  const ul = document.createElement('ul');

  // Get the title from the first child and prepend it
  const title = block.children[0].innerText;
  const mainHeading = document.createElement('h2');
  mainHeading.classList.add('testimonial-heading');
  mainHeading.textContent = title;
  parentElement.prepend(mainHeading);

  // Get the link from the last child and append it
  const linkDiv = document.createElement('div');
  const link = block.children[block.children.length - 1].innerText;
  const hyperLink = document.createElement('a');
  hyperLink.classList.add('testimonial-link');
  hyperLink.textContent = link;
  linkDiv.append(hyperLink);

  // get the image for the link
  const linkImg = document.createElement('img');
  linkImg.src = '/icons/right-arrow.svg';
  linkImg.setAttribute('data-icon-name', 'right-arrow');
  linkImg.className = 'link-img';
  linkDiv.append(linkImg);
  parentElement.append(linkDiv);

  // Process the remaining children to create list items
  [...block.children].forEach((row, index) => {
    if (index < block.children.length - 1 && index > 0) {
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);

      // Set class for the list item
      li.className = 'testimonial-card';

      // get the image from the icon and append it to the list
      const imgTag = document.createElement('img');
      imgTag.src = '/icons/quote.svg';
      imgTag.setAttribute('data-icon-name', 'quote');

      // setAttribute for the header
      const hTag = li.querySelector('h3');
      hTag.className = 'testimonial-title';

      // setAttribute for the paragraph
      const pTag = li.querySelector('p');
      pTag.className = 'testimonial-description';
      li.prepend(imgTag);
      ul.append(li);
    }
  });

  // Clear the original block content and append the new list
  block.textContent = '';
  block.append(ul);
}
