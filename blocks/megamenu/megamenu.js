import { loadFragment } from '../fragment/fragment.js';

const navmenu = JSON.stringify([
  {
    title: 'Home', path: 'home', href: '#',
  },
  {
    title: 'Shop',
    path: 'shop',
    href: '#',
    children: [
      {
        title: 'Shop plans',
        subChildren: [
          { title: 'Medicare Advantage', href: '#', description: '' },
          { title: 'Medicare Supplement', href: '#', description: '' },
          { title: 'Individual and Family', href: '#', description: '' },
          { title: 'Explore all plans', href: '#', description: '' },
        ],
      },
      {
        title: 'Business plans',
        subChildren: [
          { title: 'Small group employer', href: '#', description: '' },
          { title: 'Mid-size employer', href: '#', description: '' },
          { title: 'Large employer', href: '#', description: '' },
        ],
      },
      {
        title: 'Understanding plans',
        subChildren: [
          { title: 'Be well 24/7', href: '#', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
          { title: 'Preventative services', href: '#', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        ],
      },
    ],
  },
  {
    title: 'Find care',
    path: 'find-care',
    href: '#',
    children: [
      {
        title: 'Find Care',
        subChildren: [
          { title: 'Overview', href: '#', description: '' },
          { title: 'Medicare', href: '#', description: '' },
          { title: 'Affordable Care Act', href: '#', description: '' },
        ],
      },
      {
        title: 'Member Find care',
        subChildren: [
          { title: 'Member care options', href: '#', description: '' },
          { title: 'Mental health solutions', href: '#', description: '' },
          { title: 'Virtual care', href: '#', description: '' },
        ],
      },
      {
        title: 'Additional Resources',
        subChildren: [
          { title: 'Be well 24/7', href: '#', description: '' },
          { title: 'Case Management', href: '#', description: '' },
          { title: 'Preventative services', href: '#', description: '' },
        ],
      },
    ],
  },
  {
    title: 'Members', path: 'member', href: '#',
  },
  {
    title: 'Employer', path: 'employer', href: '#',
  },
  {
    title: 'Providers', path: 'providers', href: '#',
  },
  {
    title: 'Producers',
    path: 'producers',
    href: '#',
  },
]);

// Menu bar onclick event
function toggleMenu(e) {
  const menuBarlist = e.target.closest('.collapse-bar');
  menuBarlist.classList.toggle('active');
  const mymenu = document.querySelector('.main-header-menu');
  mymenu.classList.toggle('active');
}
function toggleMegaMenu() {
  const menuBar = document.querySelector('.collapse-bar');
  menuBar.addEventListener('click', toggleMenu);
}

// Search bar onclick event
function toggleSearch(e) {
  const menuBarlist = e.target.closest('.search-bar');
  menuBarlist.classList.toggle('active');
}
function toggleSearchBar() {
  const menuBar = document.querySelector('.search-bar');
  menuBar.addEventListener('click', toggleSearch);
}

// render header content fargment
async function renderheaderfargment(loadheaderdata) {
  const fragmentcontent = `/content-fragment/header/${loadheaderdata}`;
  const headerpath = await loadFragment(fragmentcontent);
  const headerviewcontent = headerpath?.firstElementChild;
  return headerviewcontent;
}

function renderMegaMenu(nav) {
  const mainheadersection = document.createElement('div');
  mainheadersection.className = 'main-header-section';
  const mainheadernav = document.createElement('div');
  mainheadernav.className = 'main-header-nav';
  const mainheadermenu = document.createElement('div');
  mainheadermenu.className = 'main-header-menu';
  const headermenublock = document.createElement('div');
  headermenublock.className = 'header-menu-block';
  const headermenuul = document.createElement('ul');
  headermenuul.className = 'header-menu-ul';
  const menuItems = JSON.parse(navmenu);
  // Menu bar view
  menuItems.forEach((item) => {
    const headermenuli = document.createElement('li');
    headermenuli.className = 'header-menu-li';
    const headermenulink = document.createElement('div');
    headermenulink.className = 'header-menu-link';
    headermenuli.prepend(headermenulink);
    const navbaranchor = document.createElement('a');
    navbaranchor.setAttribute('href', item.href);
    navbaranchor.innerText = item.title;
    // Active menu
    headermenuli.addEventListener('click', (e) => {
      const navbarselect = e.target?.closest('.header-menu-link');
      if (navbarselect?.classList.contains('menu-active')) {
        navbarselect?.classList.remove('menu-active');
      } else {
        const anchoractive = document.querySelectorAll('.header-menu-link');
        anchoractive.forEach((anchor) => {
          anchor.classList.remove('menu-active');
        });
        navbarselect?.classList.add('menu-active');
      }
    });
    headermenulink.append(navbaranchor);

    // View menu list
    if (item.children) {
      const headermenuicon = document.createElement('span');
      headermenuicon.className = 'header-menu-icon';
      const menuuparrow = document.createElement('img');
      menuuparrow.className = 'menu-up-arrow';
      menuuparrow.src = '../../icons/up-arrow.svg';
      menuuparrow.setAttribute('title', 'image');
      const menudownarrow = document.createElement('img');
      menudownarrow.className = 'menu-down-arrow';
      menudownarrow.src = '../../icons/down-arrow.svg';
      menudownarrow.setAttribute('title', 'image');

      headermenuicon.appendChild(menuuparrow);
      headermenuicon.appendChild(menudownarrow);
      headermenulink.appendChild(headermenuicon);
      // View submenu list
      const headermenuitem = document.createElement('div');
      headermenuitem.className = 'header-menu-item';
      const headersubmenuul = document.createElement('div');
      headersubmenuul.className = 'header-submenu-ul';
      navbaranchor.appendChild(headermenuitem);

      const headersubmenulist = document.createElement('div');
      headersubmenulist.className = 'header-submenu-list';
      const menusubmenucontent = document.createElement('div');
      menusubmenucontent.className = 'menu-submenu-content';
      // renderheaderfargment().then((res)=>{console.log('test', res)});
      // menusubmenucontent.append(renderheaderfargment());
      headermenuitem.appendChild(headersubmenulist);
      headersubmenulist.appendChild(headersubmenuul);
      headermenuitem.appendChild(menusubmenucontent);
      headermenuli.appendChild(headermenuitem);

      item.children.forEach((child) => {
        const submenuul = document.createElement('ul');
        const title = document.createElement('h4');
        title.append(child.title);
        submenuul.append(title);
        headersubmenuul.append(submenuul);
        if (child.subChildren) {
          child.subChildren.forEach((subchild) => {
            const submenuchild = document.createElement('li');
            const submenuanchor = document.createElement('a');
            const desc = document.createElement('p');
            submenuanchor.setAttribute('href', subchild.href);
            submenuanchor.append(subchild.title);
            if (subchild.description) {
              desc.append(subchild.description);
              submenuchild.append(desc);
            }
            submenuul.append(submenuchild);
            submenuchild.append(submenuanchor);
            submenuchild.append(desc);
          });
        }
      });
      try {
        renderheaderfargment(item?.path).then((res) => {
          menusubmenucontent.append(res);
        });
      } catch (error) {
        console.log('error', error);
      }
    }
    headermenuul.appendChild(headermenuli);
  });
  // Append main header menu
  nav.append(mainheadersection);
  mainheadermenu.appendChild(headermenublock);
  nav.append(mainheadermenu);
  mainheadersection.append(mainheadernav);
  headermenublock.append(headermenuul);

  // Logo path
  const logoImg = document.createElement('img');
  logoImg.src = '../../images/global/header-logo.png';
  logoImg.setAttribute('title', 'image');
  logoImg.className = 'navbar-logo';
  mainheadernav.append(logoImg);

  // Search path
  const mainheaderright = document.createElement('div');
  mainheaderright.className = 'main-header-right';
  const headersearch = document.createElement('div');
  headersearch.classList.add('main-header-search');
  const headersearchbox = document.createElement('div');
  headersearchbox.className = 'main-header-search-box';
  const headersearchicon = document.createElement('span');
  headersearchicon.classList.add('main-header-search-icon');
  const searchanchor = document.createElement('a');
  searchanchor.classList.add('search-anchor');
  searchanchor.setAttribute('href', '#');
  searchanchor.setAttribute('title', 'search');
  const iconImg = document.createElement('img');
  iconImg.src = '../../icons/search-icon.svg';
  iconImg.setAttribute('title', 'image');
  const searchinput = document.createElement('input');
  searchinput.setAttribute('type', 'search');
  searchinput.className = 'search-input';
  searchinput.setAttribute('placeholder', 'Search Wellmark');
  // Button path
  const btnicon = document.createElement('img');
  btnicon.classList.add('main-header-login-icon');
  btnicon.src = '../../icons/login-btn.svg';
  btnicon.setAttribute('title', 'image');
  const anchor = document.createElement('a');
  anchor.textContent = 'Log in / Register';
  anchor.setAttribute('href', '#');
  anchor.setAttribute('title', 'button');
  anchor.classList.add('button', 'primary');

  // Append elements
  mainheadernav.append(mainheaderright);
  mainheaderright.append(headersearch);
  anchor.prepend(btnicon);
  mainheaderright.append(anchor);
  headersearch.append(headersearchbox);
  headersearchbox.append(headersearchicon);
  headersearchicon.append(searchanchor);
  searchanchor.append(iconImg);
  headersearchbox.append(searchinput);

  // Mobile code start
  const collapsediv = document.createElement('div');
  collapsediv.classList.add('collapse-bar');
  mainheadernav.prepend(collapsediv);
  setTimeout(() => {
    toggleMegaMenu();
  }, 500);
  const searchdiv = document.createElement('div');
  searchdiv.classList.add('search-bar');
  mainheadernav.append(searchdiv);
  setTimeout(() => {
    toggleSearchBar();
  }, 500);
  const breadcrumbsicon = document.createElement('img');
  breadcrumbsicon.classList.add('collapse-btn');
  breadcrumbsicon.src = '../../icons/breadcrumbs-icon.svg';
  const collapsemenu = document.createElement('p');
  collapsemenu.classList.add('collapse-menu');
  collapsemenu.innerHTML = ('Menu');
  const collapseclose = document.createElement('img');
  collapseclose.src = '../../icons/close-icon.svg';
  collapseclose.classList.add('close-btn');
  const colclose = document.createElement('p');
  colclose.classList.add('collapse-close');
  colclose.innerHTML = ('Close');
  collapsediv.prepend(breadcrumbsicon);
  collapsediv.append(collapsemenu);
  collapsediv.append(collapseclose);
  collapsediv.append(colclose);

  const searchicon = document.createElement('img');
  searchicon.classList.add('search-btn');
  searchicon.src = '../../icons/search-icon.svg';
  const searchmenu = document.createElement('p');
  searchmenu.classList.add('search-menu');
  searchmenu.innerHTML = ('Search');
  searchdiv.append(searchicon);
  searchdiv.append(searchmenu);

  // Login & Register division
  const sectionblock = document.createElement('div');
  sectionblock.classList.add('section-block', 'blue-550');
  const sectionlogin = document.createElement('div');
  sectionlogin.classList.add('section-login', 'button-container');
  const sectionregister = document.createElement('div');
  sectionregister.classList.add('section-register', 'button-container');
  const loginheading = document.createElement('h4');
  loginheading.classList.add('login-heading');
  loginheading.innerHTML = ('Log in to your account');
  const emaillabel = document.createElement('p');
  emaillabel.classList.add('email-label');
  emaillabel.innerHTML = ('User ID or Email (required)');
  const logininput = document.createElement('input');
  logininput.className = 'input-login';
  logininput.setAttribute('type', 'text');
  logininput.setAttribute('name', 'username');
  const passwordlabel = document.createElement('p');
  passwordlabel.classList.add('password-label');
  passwordlabel.innerHTML = ('Password (required)');
  const passwordinput = document.createElement('input');
  passwordinput.className = 'input-password';
  passwordinput.setAttribute('type', 'password');
  passwordinput.setAttribute('name', 'password');
  const loginbtn = document.createElement('a');
  loginbtn.textContent = 'Log in';
  loginbtn.setAttribute('href', '#');
  loginbtn.setAttribute('title', 'button');
  loginbtn.classList.add('button', 'primary');
  const registerbtn = document.createElement('a');
  registerbtn.textContent = 'Register';
  registerbtn.setAttribute('href', '#');
  registerbtn.setAttribute('title', 'button');
  registerbtn.classList.add('button', 'secondary');
  const forgetuser = document.createElement('p');
  forgetuser.classList.add('forget-user');
  forgetuser.innerHTML = ('Forgot User ID or Email?');
  const forgetpassword = document.createElement('p');
  forgetpassword.classList.add('forget-password');
  forgetpassword.innerHTML = ('Forgot Password?');
  // Section login append
  headermenublock.appendChild(sectionblock);
  sectionblock.appendChild(sectionlogin);
  sectionlogin.appendChild(loginheading);
  sectionlogin.appendChild(emaillabel);
  sectionlogin.appendChild(logininput);
  sectionlogin.appendChild(passwordlabel);
  sectionlogin.appendChild(passwordinput);
  sectionlogin.appendChild(loginbtn);
  // Section Register append
  sectionblock.appendChild(sectionregister);
  sectionregister.appendChild(registerbtn);
  sectionregister.appendChild(forgetuser);
  sectionregister.appendChild(forgetpassword);
}

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';
  const nav = document.createElement('div');
  nav.className = 'main-header';
  renderMegaMenu(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'main-header-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
