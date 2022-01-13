/** 
 * Eksamen IT2 høsten 2020, oppgave 1
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */

const can1 = document.querySelector("#can1");
const button = document.querySelector("#submit");
const rectWidth = document.querySelector("#rectwidth");
const tick = document.querySelector("#tick");

let ctx;      // Canvas context
let width;    // Bredde på ferdig rektangel
let widthNow; // Nåværende bredde på rektangel
let height;   // Høyde på ferdig rektangel
let heightNow;// Nåværende høyde på rektangel
let area;     // Areal for ferdig rektangel
let timer;    // Timer for bruk i animasjonen

// Liste for å holde styr på hvilke rektangeler vi har tegnet
let drawn = [false, false, false, false, false, false, false, false, false];

const animTime = 2000; // ms - lengde på animasjon
const animIntTime = 50; // ms - intervall mellom hvert animasjonsbilde
const intervals = animTime / animIntTime; // antall animasjonsintervaller
const sf = 50; // Skaleringsfaktor for omregning mellom cm og piksler

button.addEventListener('click', draw);

function draw() {
    console.log('init');
    width = rectWidth.value;       // Henter ønska bredde fra HTML input
    widthNow = 0;                  // Startverdi for bredde
    height = calcRectHeight(width);// Sluttverdi for høyde
    heightNow = 0;                 // Startverdi for høyde
    area = calcRectArea(width, height);// Beregner areal for ferdig rektangel
    if (drawn.every(a => a === true)) {
        window.alert('Alle rektangeler har blitt tegnet');
    } else if (drawn[width - 1] === true) {
        window.alert('Det rektangelet har blitt tegnet allerede');
    } else {
        drawn[width - 1] = true;
        if (can1 && can1.getContext) { 
            ctx = can1.getContext('2d'); 
        } else {
            window.alert('Sorry, kan ikke tegne figuren');
        }
        blank();    // Blanker ut skjermen
        tick.play();// Spiller tikkelyd
        timer = setInterval(animateRect, animIntTime); // Kjører animasjon
    }
} 

function animateRect() {
    // Animerer tegning av rektangel
    drawRect(widthNow * sf, heightNow * sf);// Tegner rektangel
    widthNow += width / intervals;  // Øker nåværende bredde
    heightNow += height / intervals;// Øker nåværende høyde
    if (widthNow >= width) { // Sjekker om vi er ferdig med animasjon
        clearInterval(timer);// Stopper timeren
        ctx.font = "20px Verdana";
        ctx.fillStyle = "blue";
        ctx.fillText("Areal: " + area, 25, 25);// Skriver ut arealet
    }
}

function drawRect(rectWidth, rectHeight) {
    // Tegner rektangel
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, rectWidth, rectHeight);
    ctx.strokeRect(0, 0, rectWidth, rectHeight);
}

function calcRectHeight(rectWidth) {
    // Regner ut høyde på rektangelet når bredde er gitt
    return 10 - rectWidth;
}

function calcRectArea(rectWidth, rectHeight) {
    // Regner ut areal
    return rectWidth * rectHeight;
}

function blank() {
    // Blanker ut skjermen, gjør klart til et nytt bilde
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

