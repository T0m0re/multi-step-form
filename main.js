const buttonContainer = document.querySelector(".button-container");
const steps = document.querySelectorAll(".step");
const submit = document.querySelectorAll(".submit");
const buttonLeft = buttonContainer.querySelector(".btn-left");
const buttonRIght = buttonContainer.querySelector(".btn-right");
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");

const package = document.querySelector(".plan");
const choosenAdds = document.querySelector(".adds");
const totalCalc = document.querySelector(".total-price");

const removeLeftButton = function () {
  if (!page1.classList.contains("display-none")) {
    buttonLeft.classList.add("display-none");
  }
};

removeLeftButton();

// ---------

const topnav = document.querySelector(".top-navigation");

// Form
// Name and Number validation

const inputValidation = function () {
  const nameInput = document.getElementById("Name");

  if (nameInput.value === "") {
    nameError.textContent = "Enter a valid name";
    nameInput.focus();
    nameInput.style.borderColor = "hsl(354, 84%, 57%)";
    return false;
  } else {
    nameInput.style.borderColor = "hsl(228, 100%, 84%)";
    nameError.textContent = "";
    return true;
  }
};

const numberValidation = function () {
  const numberInput = document.getElementById("phone");
  if (numberInput.value === "") {
    numberError.textContent = "Field can't be empty";
    numberInput.focus();
    numberInput.style.borderColor = "hsl(354, 84%, 57%)";
    return false;
  } else {
    numberInput.style.borderColor = "hsl(228, 100%, 84%)";
    numberError.textContent = "";
    return true;
  }
};

// Email validation
const mailValidation = function () {
  const emailForm = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email input is empty or does not match the email pattern
  if (emailForm.value === "" || !emailRegex.test(emailForm.value)) {
    emailError.textContent = "Please enter a valid email address.";
    emailForm.style.borderColor = "hsl(354, 84%, 57%)";
    emailForm.focus();
    console.log(`work`);
  } else {
    // Clear any previous error messages
    emailError.textContent = "";
    emailForm.style.borderColor = "hsl(228, 100%, 84%)";
    return true;
  }
};

// Temp
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("Name");
const numberInput = document.getElementById("phone");
emailInput.addEventListener("input", mailValidation);
numberInput.addEventListener("input", numberValidation);
nameInput.addEventListener("input", inputValidation);

// TOP NAVIGATION

topnav.addEventListener("click", function (e) {
  const divs = e.target;

  let targetPage;
  let displayNumber;
  if (divs.classList.contains("step") || divs.classList.contains("indic")) {
    if (divs.classList.contains("indic")) {
      const sides = divs.closest(".step");
      targetPage = sides.getAttribute("data-target");
      displayNumber = divs;
    } else {
      targetPage = divs.getAttribute("data-target");
      displayNumber = divs.querySelector("div");
    }
    const pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {
      page.classList.add("display-none");
    });
    const currentPage = document.getElementById(targetPage);

    buttonContainer.classList.remove("display-none");

    // Add and Remove Left Button
    if (+currentPage.dataset.page === 1) {
      buttonLeft.classList.add("display-none");
    } else {
      buttonLeft.classList.remove("display-none");
    }

    if (+currentPage.dataset.page === 4 && monthValue) {
      renderSelection();
      calcTotal();
    }

    if (
      +currentPage.dataset.page === 2 &&
      inputValidation() &&
      mailValidation() &&
      numberValidation()
    ) {
      currentPage.classList.remove("display-none");
      console.log(`done`);
    }
    currentPage.classList.remove("display-none");

    // -----------
    const clcikElement = document.querySelectorAll(".step");
    clcikElement.forEach(function (div) {
      const each = div.querySelector("div");

      if (each !== divs) {
        each.classList.remove("sidebar-active");
      }

      displayNumber.classList.add("sidebar-active");
    });
  }
});

// SELECT PLAN
let monthValue;
let yearValue;
let planName;
const plans = document.querySelector(".cards");
const choosenPlan = function () {
  plans.addEventListener("click", function (event) {
    const box = event.target;
    if (box.classList.contains("card-body")) {
      const allBox = document.querySelectorAll(".card-body");
      allBox.forEach((boxes) => {
        if (boxes !== allBox) {
          boxes.classList.remove("card-focus");
        }
        box.classList.add("card-focus");
      });
      monthValue = box.querySelector(".monthly-price").innerHTML;
      yearValue = box.querySelector(".yearly-price").innerHTML;
      planName = box.querySelector("h4").innerHTML;
    }
  });
};

choosenPlan();
let state = "monthly";

const selectPlan = function () {
  const monthly = document.querySelector(".monthly");
  const yearly = document.querySelector(".yearly");
  const toggle = document.querySelector(".plan-toggle");
  const monthlyPrice = document.querySelectorAll(".monthly-price");
  const yearlyPrice = document.querySelectorAll(".yearly-price");
  const yearlyInfo = document.querySelectorAll(".yearly-info");

  const yearlyAds = document.querySelectorAll(".yearly-add-ons-price");
  const monsthlyAdds = document.querySelectorAll(".monthly-add-ons-price");
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      yearly.classList.toggle("fade");
      monthly.classList.add("fade");
      yearlyPrice.forEach((each) => each.classList.remove("display-none"));
      monthlyPrice.forEach((each) => each.classList.add("display-none"));
      yearlyInfo.forEach((each) => each.classList.remove("display-none"));

      monsthlyAdds.forEach((each) => each.classList.add("display-none"));
      yearlyAds.forEach((each) => each.classList.remove("display-none"));

      //   Dynamic content
      state = "yearly";
    } else {
      monthly.classList.remove("fade");
      yearly.classList.add("fade");
      monthlyPrice.forEach((each) => each.classList.remove("display-none"));
      yearlyPrice.forEach((each) => each.classList.add("display-none"));
      yearlyInfo.forEach((each) => each.classList.add("display-none"));

      monsthlyAdds.forEach((each) => each.classList.remove("display-none"));
      yearlyAds.forEach((each) => each.classList.add("display-none"));
      state = "monthly";
      console.log(`no`, state);
    }
  });
};

selectPlan();
let picks = {};
let addsPriceMonthly;
let addsPriceYearly;

let totalAddsMonth = 0;
let totalAddsYear = 0;
const addOnSelection = function (i) {
  const otherMarkup = `
    <div class="flex add-ons" id = "p-${i}">
        <p>${picks[i]}</p>
        <p class="price">${
          state === "monthly" ? addsPriceMonthly : addsPriceYearly
        }</p>
    </div>
    `;
  choosenAdds.insertAdjacentHTML("afterbegin", otherMarkup);
};

const removeAddsSelection = function (i) {
  document.getElementById(`p-${i}`).classList.add("display-none");
};

// PICK ADD ONS

const addOnsClick = document.querySelectorAll("#add-on");
addOnsClick.forEach(function (each, i) {
  each.addEventListener("change", function () {
    let container = each.closest(".options-container");
    addsPriceMonthly = container.querySelector(
      ".monthly-add-ons-price"
    ).textContent;
    addsPriceYearly = container.querySelector(
      ".yearly-add-ons-price"
    ).textContent;

    if (each.checked) {
      picks[i] = container.querySelector("h4").textContent;

      addOnSelection(i);

      totalAddsYear += +addsPriceYearly.replace(/\D/g, "");

      container.classList.add("active-add-ons");
    } else {
      container.classList.remove("active-add-ons");
      delete picks[i];
      console.log(
        +addsPriceMonthly.replace(/\D/g, ""),
        "minus",
        (totalAddsMonth -= +addsPriceMonthly.replace(/\D/g, ""))
      );
      totalAddsYear -= +addsPriceYearly.replace(/\D/g, "");
      removeAddsSelection(i);
    }
  });
});

// Pagination Button

const pagination = function () {
  buttonContainer.addEventListener("click", function (event) {
    const aim = event.target;
    const leftButton = aim.classList.contains("btn-left");
    const rightButton = aim.classList.contains("btn-right");
    const btnLeft = aim.querySelector(".btn-left");
    const btnright = aim.querySelector(".right-button");
    const planerror = document.getElementById("plan-error");
    const addserror = document.getElementById("adds-error");
    const finisherror = document.getElementById("finish-error");

    if (leftButton) {
      if (!page2.classList.contains("display-none")) {
        page2.classList.add("display-none");
        page1.classList.remove("display-none");

        buttonLeft.classList.add("display-none");
        steps.forEach((step1) => {
          if (step1.dataset.target === "page1") {
            step1.querySelector(".indic").classList.add("sidebar-active");
          } else {
            step1.querySelector(".indic").classList.remove("sidebar-active");
          }
        });
        return;
      }

      if (!page3.classList.contains("display-none")) {
        page3.classList.add("display-none");
        page2.classList.remove("display-none");

        steps.forEach((step1) => {
          if (step1.dataset.target === "page2") {
            step1.querySelector(".indic").classList.add("sidebar-active");
          } else {
            step1.querySelector(".indic").classList.remove("sidebar-active");
          }
        });
        return;
      }

      if (!page4.classList.contains("display-none")) {
        page4.classList.add("display-none");
        page3.classList.remove("display-none");

        steps.forEach((step1) => {
          if (step1.dataset.target === "page3") {
            step1.querySelector(".indic").classList.add("sidebar-active");
          } else {
            step1.querySelector(".indic").classList.remove("sidebar-active");
          }
        });
        return;
      }
    }

    if (rightButton) {
      if (!page1.classList.contains("display-none")) {
        if (inputValidation() && mailValidation() && numberValidation()) {
          page1.classList.add("display-none");
          page2.classList.remove("display-none");
          buttonLeft.classList.remove("display-none");

          steps.forEach((step1) => {
            if (step1.dataset.target === "page2") {
              step1.querySelector(".indic").classList.add("sidebar-active");
            } else {
              step1.querySelector(".indic").classList.remove("sidebar-active");
            }
          });
        }

        return;
      }

      if (!page2.classList.contains("display-none"))
        if (monthValue) {
          page2.classList.add("display-none");
          page3.classList.remove("display-none");
          planerror.textContent = "";
          addserror.textContent = "";

          steps.forEach((step1) => {
            if (step1.dataset.target === "page3") {
              step1.querySelector(".indic").classList.add("sidebar-active");
            } else {
              step1.querySelector(".indic").classList.remove("sidebar-active");
            }
          });
          return;
        } else {
          planerror.style.color = "hsl(354, 84%, 57%)";
          planerror.textContent = "Make a selection";
        }

      if (!page3.classList.contains("display-none")) {
        if (monthValue) {
          page3.classList.add("display-none");
          page4.classList.remove("display-none");
          addserror.textContent = "";
          renderSelection();
          calcTotal();

          steps.forEach((step1) => {
            if (step1.dataset.target === "page4") {
              step1.querySelector(".indic").classList.add("sidebar-active");
            } else {
              step1.querySelector(".indic").classList.remove("sidebar-active");
            }
          });
          return;
        } else {
          addserror.textContent = "Go back and choose a plan";
          addserror.style.color = "hsl(354, 84%, 57%)";
        }
      }

      if (!page4.classList.contains("display-none")) {
        if (monthValue) {
          buttonContainer.classList.add("display-none");
          page4.classList.add("display-none");
          page5.classList.remove("display-none");

          return;
        } else {
          finisherror.style.color = "hsl(354, 84%, 57%)";
          finisherror.textContent = "Fill Form";
        }
      }
    }
  });
};

pagination();

const renderSelection = function () {
  const markup = `
    <div class="choose-plan flex">
    <div>
      <h4>${planName} (${state === "monthly" ? "Monthly" : "Yearly"})</h4>
      <a href="#">change</a>
    </div>
    <p class="price">${state === "monthly" ? monthValue : yearValue}</p>
  </div>
    `;

  package.innerHTML = "";
  package.insertAdjacentHTML("afterbegin", markup);
};

const calcTotal = function () {
  const monthlyTotal = totalAddsMonth + +monthValue.replace(/\D/g, "");
  const yearlyTotal = totalAddsYear + +yearValue.replace(/\D/g, "");
  const totalMarkup = `
    <p>Total (per ${state === "monthly" ? "Month" : "Year"})</p>
    <p class="price">$${state === "monthly" ? monthlyTotal : yearlyTotal}/${
    state === "monthly" ? "mo" : "yr"
  }</p>
`;
  totalCalc.innerHTML = "";
  totalCalc.insertAdjacentHTML("afterbegin", totalMarkup);
};
