import Swiper from "swiper";
import { cards, baseImage, cardsLg } from "./swiperParameters";

const toggleFullScreen = (state) => {
  const { sliderEl, slidesArr } = state;

  const zoomMode = sliderEl.getAttribute("zoom");

  switch (zoomMode) {
    case "0":
      sliderEl.setAttribute("zoom", "1");
      slidesArr.forEach((el) => {
        el.classList.add("w-screen");
        el.classList.remove("max-h-70");
      });

      slidesArr[0].scrollIntoView("alignToTop");
      break;
    case "1":
      sliderEl.setAttribute("zoom", "2");
      slidesArr.forEach((el) => {
        el.classList.add("cursor-zoom-out");
        el.classList.add("w-screen-2xl");
        el.classList.remove("w-screen");
        el.classList.remove("cursor-zoom-in");
      });

      slidesArr[0].scrollIntoView("alignToTop");
      break;

    default:
      sliderEl.setAttribute("zoom", "0");
      slidesArr.forEach((el) => {
        el.classList.add("cursor-zoom-in");
        el.classList.add("max-h-70");
        el.classList.remove("w-screen-2xl");
        el.classList.remove("cursor-zoom-out");
      });

      window.scrollTo(0, 0);
  }
};

const initFullScreen = (sliderEl) => {
  const slidesArr = Array.from(sliderEl.querySelectorAll("img"));

  const state = {
    sliderEl,
    slidesArr,
  };

  slidesArr.forEach((el) =>
    el.addEventListener("click", () => toggleFullScreen(state))
  );
};

export const buildSwiper = (params) => {
  const swiperElements = Array.from(
    document.getElementsByClassName("swiper-container")
  );

  if (swiperElements.length > 0) {
    swiperElements.forEach((el) => {
      const attribute = el.getAttribute("data-swiper");

      switch (attribute) {
        case "cards":
          console.log("cards");
          new Swiper(el, cards);
          break;

        case "cards-lg":
          new Swiper(el, cardsLg);
          break;
        default:
          initFullScreen(el);
          new Swiper(el, baseImage);
      }
    });
  }
};
