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
  console.log(value);
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

export const initTagFilters = (mainEl, defaultState) => {
  const btnEls = Array.from(mainEl.querySelectorAll(".btn-filter"));

  const state = {
    activeEl: null,
    mainEl,
    btnEls,
    value: defaultState,
    defaultValue: defaultState,
  };

  const articleOrderState = state;
  articleOrderState.default = "priority";

  btnEls.forEach((el) => {
    el.addEventListener("click", () => {
      setCategory(el, state);
    });
  });

  // SET CATEGORY AFTER REDIRECT
  const tagsPastInURL = getUrlVars();

  console.log(tagsPastInURL);
  if (tagsPastInURL.category) {
    const el = btnEls.find(
      (el) => el.getAttribute("data-tag") == tagsPastInURL.category
    );
    setCategory(el, state);
  }
};
