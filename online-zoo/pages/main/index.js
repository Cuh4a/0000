const scrollContainer = document.querySelector(".testimonials__slider");
let range = document.querySelector('input');
scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
  // range.value++;
});

// =====================================================Burger==================================================================
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
    document.querySelector('.header-pets').classList.toggle('header-bg');
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

// ==================================================Carusel=====================================================================
const url = 'https://run.mocky.io/v3/0ab92b4e-4b8c-4440-8ee9-042f57613851';
const SLIDER = document.querySelector('.pets__wrapper');
const ITEM_LEFT = document.querySelector("#left-slides");
const ITEM_RIGHT = document.querySelector("#right-slides");
const ITEM_ACTIVE = document.querySelector("#active-slides");
let countSlide = 6;

let prevNumbers = randomPets(countSlide);
let slideNumbers = randomPets(countSlide);

async function getData(url, where) {
    const res = await fetch(url);
    const data = await res.json();
    changeSlide();
    where.innerHTML = ``;
    for (let i = 0; i < slideNumbers.length; i++) {
        let pet = data[slideNumbers[i]];
        where.innerHTML += `
                    <div class="item__card data-index="${slideNumbers[i]}">
                        <div class="card__img">
                            <img src="${pet.image}" alt="animal">
                        </div>
                        <div class="card__info">
                            <div class="info">
                                <div class="card__subtitle">
                                    <p>${pet.name}</p>
                                </div>
                                <div class="card__text">
                                    <p>${pet.location}</p>
                                </div>
                            </div>
                            <div class="card__icon">
                                <img src="${pet.icon}" alt="fruit">
                            </div>
                        </div>
                        <div class="card__hover">
                            <h4 class="hover__subtitle">${pet.name}</h4>
                            <p class="hover__text">${pet.location}</p>
                        </div>
                    </div>`;
    }
}

adaptiveSlider();

getData(url, ITEM_LEFT);
getData(url, ITEM_ACTIVE);
getData(url, ITEM_RIGHT);

function randomPets(slides) {
    const numbers = [];
    let rand = 0;
    while (numbers.length < slides) {
        rand = Math.floor(Math.random() * 6);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}

function adaptiveSlider() {
    if (window.matchMedia("(max-width: 940px)").matches) {
        countSlide = 4;
    }
}

const btnLeft = document.querySelector('.button__arrow-left');
const btnRight = document.querySelector('.button__arrow-right');

function changeSlide() {
    let isChange = true;
    while (isChange) {
        const nextNumbers = randomPets(countSlide);
            isChange = false;
            prevNumbers = slideNumbers;
            slideNumbers = nextNumbers;
    }
}

btnRight.addEventListener('click', moveRightSlide);
btnLeft.addEventListener('click', moveLeftSlide);

function moveLeftSlide() {
    SLIDER.classList.add('transition-right');
}

function moveRightSlide() {
    SLIDER.classList.add('transition-left');
}

SLIDER.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === "move-right") {
        SLIDER.classList.remove("transition-right");
        document.querySelector('#active-slides').innerHTML = ITEM_LEFT.innerHTML;
        getData(url, ITEM_LEFT);
        setTimeout(() => { ITEM_RIGHT.innerHTML = ITEM_LEFT.innerHTML }, 300)
    } else {
        SLIDER.classList.remove("transition-left");
        document.querySelector('#active-slides').innerHTML = ITEM_RIGHT.innerHTML;
        getData(url, ITEM_RIGHT);
        setTimeout(() => { ITEM_LEFT.innerHTML = ITEM_RIGHT.innerHTML }, 300)
    }
})

function getIndexCard(item) {
    const childs = item.children;
    const result = [];
    for (let el of childs) {
        console.log(el.dataset.index)
    }
}



















// (function () {
//   "use strict";

//   function Carousel(setting) {
//     if (document.querySelector(setting.wrap) === null) {
//       console.error(`Carousel not fount selector ${setting.wrap}`);
//       return;
//     }

//     /* Scope privates methods and properties */
//     let privates = {};


//     /* Public methods */
//     // Prev slide
//     this.prev_slide = () => {
//       --privates.opt.position;

//       if (privates.opt.position < 0) {
//         privates.sel.wrap.classList.add('s-notransition');
//         privates.opt.position = privates.opt.max_position - 1;
//       }

//       privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
//     };


//     // Next slide
//     this.next_slide = () => {
//       ++privates.opt.position;

//       if (privates.opt.position >= privates.opt.max_position) {
//         privates.opt.position = 0;
//       }

//       privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
//     };



//     /* Privates properties */
//     privates.setting = setting;

//     privates.sel = {
//       "main": document.querySelector(privates.setting.main),
//       "wrap": document.querySelector(privates.setting.wrap),
//       "children": document.querySelector(privates.setting.wrap).children,
//       "prev": document.querySelector(privates.setting.prev),
//       "next": document.querySelector(privates.setting.next)
//     };

//     privates.opt = {
//       "position": 0,
//       "max_position": document.querySelector(privates.setting.wrap).children.length
//     };

//     // Control
//     if (privates.sel.prev !== null) {
//       privates.sel.prev.addEventListener('click', () => {
//         this.prev_slide();
//       });
//     }

//     if (privates.sel.next !== null) {
//       privates.sel.next.addEventListener('click', () => {
//         this.next_slide();
//       });
//     }

//   }


//   let a = new Carousel({
//     "main": ".js-carousel",
//     "wrap": ".js-carousel__wrap",
//     "prev": ".js-carousel__prev",
//     "next": ".js-carousel__next"
//   });

// })();