/** 
 * Eksamen IT2 høsten 2019, oppgave 1
 * 
 * Copyright (C) 2022 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */
const muskelMap = document.querySelectorAll(".muskler");
const muskelNavn = document.querySelector("#muskelnavn");

// Definerer klasse for alle muskler
class Muskel {
    constructor(id, navn) {
        this.id = id;
        this.navn = navn;
        this.lyd = new Audio(`snd/${id}.mp3`);
    }
}

// Lager en liste av objekter med muskler
const muskler = [
    new Muskel('armstrekk', 'Armstrekkeren'),
    new Muskel('rygg', 'Den brede ryggmuskelen')
];

window.addEventListener('load', init);

/**
 * Funksjonen kjøres en gang ved oppstart av app.
 */
function init() {
    muskelMap.forEach( (m) => {
        m.addEventListener('click', muskelInfo);
    });
}

/**
 * Trigges ved klikk på ImageMap, finner valgt muskel og viser info+lyd
 * 
 * @param {Object} e Eventobjekt
 */
function muskelInfo(e) {
    const m = muskler.find(m => m.id === e.target.id);
    if (m) {
        muskelNavn.innerHTML = m.navn;
        m.lyd.play();
    } else {
        window.alert('Fant ikke muskel!');
    }
    animasjon(muskelNavn, 600, 0, 0, 700);
}

/**
 * Kjører en enkel animasjon på et html-element
 * 
 * @param {Element} element 
 * @param {integer} fromX 
 * @param {integer} fromY 
 * @param {integer} toX 
 * @param {integer} toY 
 * @param {integer} time 
 */
function animasjon(element, fromX, fromY, toX, toY, time=2000) {
    element.animate([
                    {left: `${fromX}px`, top: `${fromY}px`, opacity: 0}, // Fra
                    {left: `${toX}px`, top: `${toY}px`, opacity: 1}      // Til
                    ], 
                 time); // Tid
}