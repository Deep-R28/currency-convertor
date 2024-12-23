const url = "https://v6.exchangerate-api.com/v6/93972db9d96d0d6e10bb67b9/pair"
const dropdowns = document.querySelectorAll(".dropdown select"); 
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let message = document.querySelector(".message");
for (let select of dropdowns) { 
    for (let Currcode in countryList) { 
        let newOpt = document.createElement("option");
        newOpt.innerText = `${Currcode}`;
        newOpt.value = Currcode; 
        if(select.name == "from" && Currcode == "USD"){
            newOpt.selected = "selected";
        }
        else if(select.name == "to" && Currcode == "INR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt); 
    }

    select.addEventListener("change",(evt) => {
        upFlag(evt.target);
    })
}
 
const upFlag = (ele) => {
    let Currcode = ele.value;
    let countryC = countryList[Currcode];
    let newFlag = `https://flagsapi.com/${countryC}/shiny/64.png`
    let img = ele.parentElement.querySelector("img");
    img.src = newFlag;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    ExRate();
});

const ExRate = async () => {
    let amount = document.querySelector(".amount input");
let val = amount.value;

if(val === "" || val < 1){
    val = 1;
    amount.value = "1"
}

console.log(fromCurr.value + " to " + toCurr.value);
const URL = `${url}/${fromCurr.value}/${toCurr.value}`;
try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate; // Access the correct key from API response
    console.log(`Exchange Rate: ${rate}`);
    let conVal = (rate * val).toFixed(2); // Calculate the converted amount
    message.innerText = `${val} ${fromCurr.value} = ${conVal} ${toCurr.value}`; 
} 
catch (error) {
    console.error("Error fetching exchange rate:", error);
}
}

window.addEventListener("load", () =>{
    ExRate();
});

btn.addEventListener("click", (e) => {
            const x = e.clientX - btn.offsetLeft;
            const y = e.clientY - btn.offsetTop;

            // Create ripple span element
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Append the ripple to the button
            btn.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
});

let symbol = document.querySelector("i");
symbol.addEventListener("click", () => {

})

const action = () => {
    let temp1;
    let temp2;
    temp1 = newFlag();
    img.src[0] = temp1;
    img.src[1] = img.src[0];
}