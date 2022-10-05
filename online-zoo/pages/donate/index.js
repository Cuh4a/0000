const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const link = document.querySelector('.nav__link');
const bodyShadow = document.querySelector('#body-shadow');

function toggleBurger() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    burger.classList.toggle('open');
    nav.classList.toggle('nav-active');
    bodyShadow.classList.toggle('body-shadow');
    document.body.classList.toggle('lock');
    document.querySelector('.header-donate').classList.toggle('header-bg');
  }
}

function closeBurger(event) {
  target = event.target;
  if (target.classList.contains('nav__link')) {
    toggleBurger();
  }
}

document.addEventListener('click', e => {
  let target = e.target;
  let itsNav = target == nav || nav.contains(target);
  let itsBurger = target.closest('.burger') == burger;
  let isActive = nav.classList.contains('nav-active');
  if (!itsNav && !itsBurger && isActive) {
    toggleBurger();
  }
})

burger.addEventListener('click', toggleBurger);
nav.addEventListener('click', closeBurger);