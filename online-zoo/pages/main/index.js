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
const url = 'https://run.mocky.io/v3/0f5862f0-75c2-41a3-8d6f-8a7c4add35cb';
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
        rand = Math.floor(Math.random() * 8);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}

function adaptiveSlider() {
    if (window.matchMedia("(max-width: 990px)").matches) {
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
        setTimeout(() => {
            ITEM_RIGHT.innerHTML = ITEM_LEFT.innerHTML
        }, 300)
    } else {
        SLIDER.classList.remove("transition-left");
        document.querySelector('#active-slides').innerHTML = ITEM_RIGHT.innerHTML;
        getData(url, ITEM_RIGHT);
        setTimeout(() => {
            ITEM_LEFT.innerHTML = ITEM_RIGHT.innerHTML
        }, 300)
    }
})

function getIndexCard(item) {
    const childs = item.children;
    const result = [];
    for (let el of childs) {
        console.log(el.dataset.index)
    }
}

// ==============================================Slider-Range===========================================================
let slider = document.querySelector("div.slider__wrap");
let elem = document.querySelector('input[type="range"]');
const urlUsers = 'https://run.mocky.io/v3/af2a1c18-6c57-43fd-bc4e-99d742394cf9';
const SLIDER__CARD = document.querySelector('.slider__wrap');
let countCard = 11;
let slideNum = randomCard(countCard);
elem.addEventListener("input", function () {
    slider.style.left = -((elem.value * 289) - 1152) + "px";
    if (window.matchMedia("(max-width: 1200px)").matches) {
        elem.max = '12';
    } else {
        elem.max = '11';
    }
});


function randomCard(slides) {
    const numbers = [];
    let rand = 0;
    while (numbers.length < slides) {
        rand = Math.floor(Math.random() * 11);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}


async function getDataCard(url, where) {
    const res = await fetch(url);
    const data = await res.json();

    where.innerHTML = ``;
    for (let i = 0; i < slideNum.length; i++) {
        let card = data[slideNum[i]];
        where.innerHTML += `
                        <div class="slider__item data-index="${slideNum[i]}" data-name = "${data[slideNum[i]].userName}">
                            <div class="slider__slide">
                                <div class="slide__fon">
                                    <div class="slide__info">
                                        <div class="slide__info-img">
                                            <img src="${card.image}" alt="user-icon">
                                        </div>
                                        <div class="slide__info-user">
                                            <div class="info__user-name">
                                                <span>${card.userName}</span>
                                            </div>
                                            <div class="info__user-loc">
                                                <span>${card.location}</span>
                                            </div>
                                        </div>
                                        <div class="slide__info-dat">
                                            <span>${card.date}</span>
                                        </div>
                                    </div>
                                    <div class="slide__text">
                                        <p>${card.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
}
getDataCard(urlUsers, SLIDER__CARD);
// ==================================================POPUP===========================================


const CLOSE_MODAL = document.querySelector('.close-modal');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = document.querySelector('.modal__content');

SLIDER__CARD.addEventListener('click', (event) => {
    let target = event.target.closest('.slider__item');

    if (target.classList.contains('slider__item')) {
        MODAL.classList.add('modal-open');
        document.body.classList.add('lock');

        MODAL_WINDOW.classList.add('modal-transition');
        getDataModal(urlUsers, target.dataset.name);

    }
})

CLOSE_MODAL.addEventListener('click', closeModal)
function closeModal() {
    MODAL.classList.remove('modal-open');
    document.body.classList.remove('lock');
}

async function getDataModal(url, name) {
    const res = await fetch(url);
    const data = await res.json();
    const names = data.map(e => e.userName);

    const modalImage = document.querySelector('.content__info-image');
    const modalTextName = document.querySelector('.text__name');
    const modalTextLoc = document.querySelector('.text__location');
    const modalTextData = document.querySelector('.text__date');
    const modalTextFeed = document.querySelector('.content__feedback');

    const cardIndex = names.findIndex(e => e === name);

    modalImage.src = data[cardIndex].image;
    modalTextName.textContent = data[cardIndex].userName;
    modalTextLoc.textContent = data[cardIndex].location;
    modalTextData.textContent = data[cardIndex].date;
    modalTextFeed.textContent = data[cardIndex].text;
}

window.onclick = function (event) {
    if (event.target == MODAL) {
        MODAL.classList.remove('modal-open');
        document.body.classList.remove('lock');
    }
}









