const buttonColor = "opacity-25";

const setCategory = (btn, state) => {
  state.btnEls.forEach((btn) => {
    btn.classList.add(buttonColor);
  });

  // Remove with meta tag
  state.mainEl.classList.remove(state.value);

  if (state.activeEl === btn) {
    state.btnEls.forEach((btn) => {
      btn.classList.remove(buttonColor);
    });
    state.mainEl.classList.add(state.defaultValue);
    state.activeEl = state.defaultValue;
    state.value = state.defaultValue;
    return;
  }

  const value = btn.getAttribute("data-tag");
  btn.classList.remove(buttonColor);
  state.mainEl.classList.add(value);
  state.value = value;
  state.activeEl = btn;
};

const getUrlVars = () => {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};

export const initTagFilters = (mainEl) => {
  const btnEls = Array.from(mainEl.querySelectorAll(".btn-filter"));

  const state = {
    activeEl: null,
    mainEl,
    btnEls,
    value: "Stavba",
    defaultValue: "Stavba",
  };

  btnEls.forEach((el) => {
    el.addEventListener("click", () => {
      setCategory(el, state);
    });
  });

  // SET CATEGORY AFTER REDIRECT
  const tagsPastInURL = getUrlVars();
  //if (tagsPastInURL.category) state.value = tagsPastInURL.category;

  const passValue = tagsPastInURL.category
    ? tagsPastInURL.category
    : state.value;

  const el = btnEls.find((el) => el.getAttribute("data-tag") === passValue);
  setCategory(el, state);
};

const setOrder = (btn, state) => {
  const { elements, mainEl, containerEl } = state;

  state.btnEls.forEach((btn) => {
    btn.classList.add(buttonColor);
  });

  // Remove with meta tag
  mainEl.classList.remove(state.value);

  if (state.activeEl === btn) {
    state.btnEls.forEach((btn) => {
      btn.classList.remove(buttonColor);
    });
    mainEl.classList.add(state.defaultValue);
    state.activeEl = state.defaultValue;
    state.value = state.defaultValue;
    return;
  }

  const value = btn.getAttribute("data-tag");

  localStorage.setItem("orderMParch", value);

  var virtualElements = document.createDocumentFragment();

  const oderElements =
    value === "date"
      ? elements.sort((a, b) => b.date - a.date)
      : elements.sort((a, b) => a.weight - b.weight);

  btn.classList.remove(buttonColor);
  mainEl.classList.add(value);
  state.value = value;
  state.activeEl = btn;

  oderElements.forEach((obj) => {
    const { el } = obj;
    virtualElements.appendChild(el);
  });

  containerEl.innerHTML = null;
  containerEl.appendChild(virtualElements);
};

export const initOrder = (mainEl, defaultState) => {
  const entriesEl = Array.from(mainEl.getElementsByClassName("entrie"));

  const btnEls = Array.from(mainEl.querySelectorAll(".btn-order"));

  const containerEl = mainEl.querySelector("#entries-container");

  const elements = entriesEl.map((el) => {
    const date = el.getAttribute("date")
      ? Date.parse(el.getAttribute("date"))
      : parseInt(el.getAttribute("year"));

    return {
      el,
      date,
      weight: parseInt(el.getAttribute("weight")),
    };
  });

  const state = {
    activeEl: null,
    containerEl,
    mainEl,
    btnEls,
    elements,
    value: "weight",
    defaultValue: "weight",
  };

  btnEls.forEach((el) => {
    el.addEventListener("click", () => {
      setOrder(el, state);
    });
  });

  const localOrder = localStorage.getItem("orderMParch");

  if (localOrder) state.value = localOrder;
  const el = btnEls.find((el) => el.getAttribute("data-tag") === state.value);
  setOrder(el, state);
};
