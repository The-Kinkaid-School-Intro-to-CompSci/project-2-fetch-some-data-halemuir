let firstQuote;
let quoteText;
let authorText;
let charecterText;
let missTypes = 0;
let timer;

async function getUsersName(){
    let userName = document.querySelector(`#userName`);
    
    let name = null;
    if(localStorage.getItem(`name`) !== null) {
        name = localStorage.getItem(`name`);
    }
    else{
        name = prompt(`What is your name?`);
    }
    userName.textContent = name;
    localStorage.setItem(`name`, name);
}

async function getQuote(){
    const api_url ="https://zenquotes.io/api/quotes/";
    let data = null
    try{
        const response = await fetch(api_url);
        data = await response.json();
        console.log(data);
        displayQuote(data);
    }
    catch(error){
        alert("there has been an error");
        console.log(error)
    }
    
}

function displayQuote(data){
    quoteText = document.querySelector('#quote');
    authorText = document.querySelector('#author');
    charecterText = document.querySelector('#charecters');

    firstQuote = data[0];
    console.log(firstQuote)
    if(firstQuote.c < 116){
        quoteText.textContent = firstQuote.q;
        authorText.textContent = firstQuote.a;
        charecterText.textContent = firstQuote.c;
    }
    else{
        getQuote()
    }

    document.addEventListener('keyup', typing)
    let switchColorBtn = document.querySelector('#switchTextColor');
    switchColorBtn.addEventListener('click', switchTextColor);
    let reloadBtn = document.querySelector('#reload');
    reloadBtn.addEventListener('click', reloadSite);
}

function reloadSite(){
    location.reload();
}

function typing(event){
    const typing = document.querySelector('#typing');
    missTypes = 0;
    typingCorrect = true
    
    for (let i = 0; i < typing.textContent.length; i++) {
        if(typing.textContent[i] === firstQuote.q[i]){
            console.log("You typed this correctly");
        }
        else if(typing.textContent[i] !== firstQuote.q[i]){
            typingCorrect = false
            missTypes += 1;
            console.log("You made a miss type! # of misstypes: " + missTypes);
        }
    }
    if (typingCorrect){
        typing.style.background = 'transparent'
    }
    else{
        typing.style.background = 'red';
    }

    // START A TIMER:
    if(typing.textContent.length === 1){
        console.log("Time started")
        timer = Date.now();
    }

    if(typing.textContent === firstQuote.q){
        // END A TIMER:
        const elapsedTime = Date.now() - timer;
        console.log('Elapsed Time:', elapsedTime + 'ms');
        wordsPerMinuteCalc(elapsedTime);
    }
}

function wordsPerMinuteCalc(elapsedTime){
    let charecters = firstQuote.c;
    let timeTaken = (elapsedTime / 1000) / 60
    console.log("charecters: ", charecters, "misstypes: ", missTypes, "time Taken:", timeTaken);
    let WPM = ((charecters / 5) - missTypes) / timeTaken;
    WPM = Math.round(WPM);
    if (WPM <= 0){
        WPM = 0;
    }
    console.log(`Words per minute: ` + WPM);


    WPMText = document.querySelector('#WPM');
    WPMText.textContent = `Words Per Minute: ` + WPM;
}

function switchTextColor(){
    // let switchColorBtn = document.querySelector('#switchTextColor');
    console.log('switchTextColor is being run!')

    const typing = document.querySelector('#typing'); 
    const p1 = document.querySelector('#quote');
    const p2 = document.querySelector('#author');
    const p3 = document.querySelector('#charecters');
    const p4 = document.querySelector('#WPM');
    const p5 = document.querySelector('#userName');
    const p6 = document.querySelector('#title');
    const p7 = document.querySelector('#clear-local-storage');
    const p8 = document.querySelector('#switchTextColor');
    const p9 = document.querySelector('#reload');

    localStorage.getItem('typing');
    localStorage.getItem('p1');
    localStorage.getItem('p2');
    localStorage.getItem('p3');
    localStorage.getItem('p4');
    localStorage.getItem('p5');
    localStorage.getItem('p6');
    localStorage.getItem('p7');
    localStorage.getItem('p8');
    localStorage.getItem('p9');

    if(typing.style.color === 'white'){
        typing.style.color = 'black';
        typing.style.borderColor = 'black';
        p1.style.color = 'black';
        p2.style.color = 'black';
        p3.style.color = 'black';
        p4.style.color = 'black';
        p5.style.color = 'black';
        p6.style.color = 'black';
        p7.style.color = 'black';
        p7.style.borderColor = 'black';
        p8.style.color = 'black';
        p8.style.borderColor = 'black';
        p9.style.color = 'black';
        p9.style.borderColor = 'black';
    }
    else{
        typing.style.color = 'white';
        typing.style.borderColor = 'white';
        p1.style.color = 'white';
        p2.style.color = 'white';
        p3.style.color = 'white';
        p4.style.color = 'white';
        p5.style.color = 'white';
        p6.style.color = 'white';
        p7.style.color = 'white';
        p7.style.borderColor = 'white';
        p8.style.color = 'white';
        p8.style.borderColor = 'white';
        p9.style.color = 'white';
        p9.style.borderColor = 'white';
    }
}

function updateColor() {
    //getting the value of each slider
    const redSlider  = document.querySelector(`#red`)
    const red = redSlider.value;
    const greenSlider = document.querySelector(`#green`);
    const green = greenSlider.value;
    const blueSlider = document.querySelector(`#blue`);
    const blue = blueSlider.value;

    const body = document.querySelector(`body`);
    //changing the background color of the body using the values of the sliders
    body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    localStorage.setItem(`red`, red);
    localStorage.setItem(`blue`, blue);
    localStorage.setItem(`green`, green);
}

function makeColorSlidersWork() {
    //getting the <input> elements (a.k.a sliders)
    const redSlider = document.querySelector(`#red`);
    const greenSlider = document.querySelector(`#green`);
    const blueSlider = document.querySelector(`#blue`);

    let sliders = [redSlider, greenSlider, blueSlider];
    //adding the same event listener to all sliders
    for(let slider of sliders) {
        slider.addEventListener(`input`, updateColor);
    }

    const red = localStorage.getItem(`red`);
    const blue = localStorage.getItem(`blue`);
    const green = localStorage.getItem(`green`);
    
    if(red !== null){
        redSlider.value = red;
    }
    if(blue !== null){
        blueSlider.value = blue;
    }
    if(green !== null){
        greenSlider.value = green;
    }
    if(red !== null && blue !== null && green !== null){
        const body = document.querySelector(`body`);
        body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

function clearLocalStorage() {
    localStorage.clear();
    console.log(`Local storage cleared`);
    console.log(localStorage);
}
function makeLocalStorageWork() {
    let localStorageButton = document.querySelector(`#clear-local-storage`);
    localStorageButton.addEventListener(`click`, clearLocalStorage);
}

function runProgram(){
    getUsersName()
    console.log('runProgram');
    getQuote()
    makeColorSlidersWork();
    makeLocalStorageWork();
}
document.addEventListener('DOMContentLoaded', runProgram);