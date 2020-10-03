gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".image-container");

let numbers = document.querySelectorAll(".number-item");
let dates = document.querySelectorAll(".date-item");
let titles = document.querySelectorAll(".title-item");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".images-wrapper",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () =>
      "+=" + (document.querySelector(".images-wrapper").offsetWidth - 5)
  }
});

sections.forEach((e, i) => {
  ScrollTrigger.create({
    trigger: e,
    start: i * e.offsetWidth,
    end: i * e.offsetWidth + e.offsetWidth,
    onEnter: () => showItem(i),
    onEnterBack: () => {
      hideItem(i + 1);
      showItem(i);
    },
    onLeave: () => hideItem(i)
  });
});

function hideItem(index) {
  if (index > sections.length - 1 || index < 0) return;

  // add class to new sections
  numbers[index].classList.remove("active");
  titles[index].classList.remove("active");
  dates[index].classList.remove("active");
}

function showItem(index) {
  if (index > sections.length - 1 || index < 0) return;

  // add class to new sections
  numbers[index].classList.add("active");
  titles[index].classList.add("active");
  dates[index].classList.add("active");
}