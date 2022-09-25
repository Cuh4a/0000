const scrollContainer = document.querySelector(".testimonials__slider");
let range = document.querySelector('input');
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    range.value++;
});