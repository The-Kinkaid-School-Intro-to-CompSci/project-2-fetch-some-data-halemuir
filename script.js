let firstQuote;
let quoteText;
let authorText;
let charecterText;
let missTypes = 0;
let timer;

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
        // typing.style.background = 'rgb(52, 52, 52)'
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

function runProgram(){
    console.log('runProgram');
    getQuote()
}
document.addEventListener('DOMContentLoaded', runProgram);