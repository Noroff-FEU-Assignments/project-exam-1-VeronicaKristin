const slides = document.querySelectorAll(".slide");
const prevSlide = document.querySelector(".btn-prev");
const nextSlide = document.querySelector(".btn-next");

let curSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((slide, indx) => {
	slide.style.transform = `translateX(${indx * 100}%)`;
});

nextSlide.addEventListener("click", function () {
	curSlide = curSlide === maxSlide ? 0 : curSlide + 1;

	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});

prevSlide.addEventListener("click", function () {
	curSlide = curSlide === 0 ? maxSlide : curSlide - 1;

	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});
