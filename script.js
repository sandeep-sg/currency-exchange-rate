let allSelect = document.querySelectorAll(".row select");
let button = document.querySelector("button");
let input = document.querySelector("input");
let finalOutput = document.querySelector("#message");
let from = document.querySelector("#from");
let to = document.querySelector("#to");

const baseURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

let selectValue = "";
allSelect.forEach((select) => {
  for (const country in countryList) {
    let currencyOption = document.createElement("option");
    currencyOption.value = country;
    currencyOption.innerText = country;
    if (select.id == "from" && currencyOption.value == "USD") {
      currencyOption.selected = "selected";
    } else if (select.id == "to" && currencyOption.value == "INR") {
      currencyOption.selected = "selected";
    }

    select.appendChild(currencyOption);
  }
  select.addEventListener("change", function (event) {
    setFlag(event.target);
  });
});

function setFlag(element) {
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  // console.log("click");
  if (input.value == "" && input.value < 1) {
    input.value = 1;
  }
  exchangeRate();
});

async function exchangeRate() {
  let fetching = await fetch(
    `${baseURL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
  );
  let res = await fetching.json();
  console.log();
  let exRate = res[to.value.toLowerCase()];
  let calculate = input.value * exRate;
  finalOutput.innerHTML = `${input.value} ${from.value} = ${calculate} ${to.value}`;
}

window.addEventListener("load", exchangeRate());
