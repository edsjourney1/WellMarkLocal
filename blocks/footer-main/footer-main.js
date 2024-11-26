export default function decorate(block) {
  block.children[1].classList.add('contact-div');
  block.children[2].classList.add('adobe-div');
  block.children[3].classList.add('language-div');
  block.children[4].classList.add('attention-div');
  block.children[5].classList.add('copyright-div');
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/WellmarkLogo.png';
  logoImg.className = 'logo-img';
  const logoDiv = block.children[0];
  const imgDiv = document.createElement('div');
  imgDiv.append(logoImg);
  logoDiv.prepend(imgDiv);
  logoDiv.classList.add('logo-social-div');
  const socialDiv = block.children[0].children[1];
  socialDiv.classList.add('social-div');
  const socialDiv2 = socialDiv.cloneNode(true);
  const attentionDiv = block.children[4];
  attentionDiv.append(socialDiv2);
}
