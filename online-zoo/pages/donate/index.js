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


// ======================================INPUT=====================================
let costs = document.querySelectorAll('.progress-label');
let circles = document.querySelectorAll('.progress-count')
const INPUT = document.querySelector('input[type=number]');
let steps = document.querySelectorAll('.step-wizard-item');
let activeCost = document.querySelector('.active-item');

INPUT.value = activeCost.textContent.slice(1);

steps.forEach(ul => {
  ul.addEventListener('click', (event) => {
    let data = ul.getAttribute('data-index');
    let target = event.target.closest('.progress-count');

    if (target.classList.contains('progress-count')) {
      costs.forEach(cost => cost.classList.remove('active-item'));
      circles.forEach(cost => cost.classList.remove('active-count'));

      let dropCost = document.querySelector(`.progress-label[data-index = "${data}"]`);
      let dropCircle = document.querySelector(`.progress-count[data-index = "${data}"]`);

      dropCircle.classList.add('active-count');
      dropCost.classList.add('active-item');

      let activeCost = document.querySelector('.active-item');
      INPUT.value = activeCost.textContent.slice(1);
    }
  })
})

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  }
}

INPUT.addEventListener('change', (e) => {
  let change = INPUT.value;
  let arrCosts = ['5000', '2000', '1000', '500', '250', '100', '50', '25'];

  if (arrCosts.includes(change)) {
    costs.forEach(cost => cost.classList.remove('active-item'));
    circles.forEach(cost => cost.classList.remove('active-count'));

    let dropCost = document.querySelector(`.progress-label[data-cost = "${change}"]`);
    let dropCircle = document.querySelector(`.progress-count[data-cost = "${change}"]`);

    dropCircle.classList.add('active-count');
    dropCost.classList.add('active-item');

  } else {
    costs.forEach(cost => cost.classList.remove('active-item'));
    circles.forEach(cost => cost.classList.remove('active-count'));
  }

})