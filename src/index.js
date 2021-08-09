import { buildToggleMenu } from "./js/fullscreen-menu.js";
import { buildSwiper } from "./js/swiper.js";
import { buildMap } from "./js/map.js";
import { initEntries } from "./js/entries.js";
import { initTagFilters, initOrder } from "./js/tag-filter.js";

import "./index.scss";

buildToggleMenu();

// Init js for swiper
buildSwiper();

// Init entries
const entriesELs = Array.from(document.querySelectorAll(".entries"));
if (entriesELs.length > 0) {
  entriesELs.forEach((el) => {
    initTagFilters(el);
  });
}

const entriesOrderELs = Array.from(document.querySelectorAll(".entries-order"));
if (entriesOrderELs.length > 0) {
  entriesOrderELs.forEach((el) => {
    initOrder(el);
  });
}

// Init js for mapbox map
const mapEl = document.getElementById("map");

if (mapEl) {
  buildMap();
}

// Init js for project entries view switcher
const entriesEL = document.getElementById("entries");

if (entriesEL) initEntries(entriesEL);
const newsEl = document.getElementById("news");

if (newsEl) {
  const actuals = Array.from(document.getElementsByClassName("actual-entry"));
  const now = new Date();
  const nowInMs = now.getTime() / 1000;

  const justActiual = actuals.filter(
    (actual) => parseInt(actual.getAttribute("data-date")) > nowInMs
  );

  if (justActiual.length === 0) {
    newsEl.remove();
  }

  actuals.forEach((actual) => {
    const time = parseInt(actual.getAttribute("data-date"));
    if (nowInMs > time) {
      actual.remove();
    }
  });
}

// const initGalleryModes = params => {
//   const menuBtn = document.getElementById("main-nav__button");
//   const bodyEl = document.querySelector("body");
//   const navEL = document.getElementById("navmenu");

//   // Evet listenere for menu button to active menu Layer
//   if (menuBtn) {
//     menuBtn.addEventListener("click", e => {
//       console.log("test");
//       toggleLayer(
//         { el: menuBtn, class: "active" },
//         { el: navEL, class: "hidden" },
//         { el: bodyEl, class: "menu-is-open" }
//       );
//     });
//   }
// };
