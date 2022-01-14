/** 
 * Eksamen IT2 høsten 2020, oppgave 2
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */

// Klassen Firkant er implementert i en egen fil
import Firkant from './Firkant.js';

const htmlTabell = document.querySelector("#firkantdata");
const lagreKnapp = document.querySelector("#lagreFirkant");
const slettKnapp = document.querySelector("#slettFirkant");
const nyKnapp = document.querySelector("#nyFirkant");
const inputId = document.querySelector("#firkantId");
const inputBunnlinje = document.querySelector("#bunnlinje");
const inputTopplinje = document.querySelector("#topplinje");
const inputHoyde = document.querySelector("#hoyde");
const inputForskyvning = document.querySelector("#forskyvning");
const can1 = document.querySelector("#can1");

let sistValgteRad = null; // Holder styr på valgt rad i HTML-tabellen
let ctx = null; // Canvas kontekst, gir denne en verdi i init()-funksjonen
    
// Standardfirkanter som applikasjonen starter med
// Lagrer disse i en liste, sånn at det blir enkelt å iterere over dem
const firkanter = [
    new Firkant(10, 10, 10, 0),
    new Firkant(20, 20, 5, 0),
    new Firkant(20, 20, 10, 2),
    new Firkant(20, 10, 5, 2),
    new Firkant(5, 3, 10, 5)
];

// Kjøres en gang ved oppstart av app
window.addEventListener('load', () => {
    console.log('init');
    if (can1 && can1.getContext) {
        ctx = can1.getContext('2d');
        skrivUtTabell();
        slettKnapp.setAttribute('disabled', true);
        lagreKnapp.setAttribute('disabled', true);
    } else {
        window.alert('Det har skjedd en feil!');
    }
});

// eventListeners for knappene lagre, slette og legge til
lagreKnapp.addEventListener('click', lagreFirkant);
slettKnapp.addEventListener('click', slettFirkant);
nyKnapp.addEventListener('click', nyFirkant);

// Lytter etter klikk på en rad i HTML-tabellen
htmlTabell.addEventListener('click', (event) => {
    // Skriver ut event-data, kan være interessant å studere nærmere.
    console.log(event);
    // Henter ut id til raden som ble klikket på.
    // Første del av id-en er 'firkant-' (åtte tegn). Fjerner dette.
    const id = parseInt(event.target.parentElement.id.substring(8));
    // Fyller ut skjemaet med egenskapene til den valgte firkanten.
    fyllFirkantSkjema(id);
    // Tegner firkanten
    tegneFirkant(id);
});

/**
 * Skriver ut alle firkant-objektene til en HTML-tabell
 */
function skrivUtTabell() {
    htmlTabell.innerHTML = ""; // Sletter gammelt innhold
    Object.keys(firkanter).forEach((key) => {
        htmlTabell.innerHTML += firkanter[key].tilHTML(`firkant-${key}`);
    });
}

/**
 * Lagrer firkant, henter verdier fra input-skjema
 */
function lagreFirkant() {
    // Lagrer et nytt firkant-objekt med data fra skjema i HTML
    console.log('Lagrer firkant');
    const firkant = new Firkant(parseInt(inputBunnlinje.value),
                                parseInt(inputTopplinje.value),
                                parseInt(inputHoyde.value),
                                parseInt(inputForskyvning.value));
    let id = null;
    if (inputId.value) {
        id = parseInt(inputId.value);
        // Dersom inpudId har en verdi, oppdaterer vi en firkant
        console.log('Oppdaterer eksisterende firkant med id ' + id);
        firkanter[id] = firkant;
    } else {
        // Dersom inpudId ikke har noen verdi, lagrer vi en ny firkant
        console.log('Lagrer ny firkant');
        firkanter.push(firkant);
        id = firkanter.length - 1;
    }
    skrivUtTabell(); // Skriver ut tabellen på nytt
    tegneFirkant(id); // Tegner den nye/oppdaterte firkanten
    merkValgtRad(id); // Merker raden med den nye/oppdaterte firkanten
}

/**
 * Oppretter en ny firkant
 */
function nyFirkant() {
    inputId.value = null; // Settes til null fordi vi lager en ny firkant
    lagreFirkant(); // Lagrer den nye firkanten
}

/**
 * Sletter firkant som bruker har markert i tabellen
 */
function slettFirkant() {
    if (inputId.value) {
        console.log('firkant-id: ', inputId.value);
        firkanter.splice(inputId.value, 1);
        sistValgteRad = null;
        slettKnapp.setAttribute('disabled', true);
        lagreKnapp.setAttribute('disabled', true);
    }
    skrivUtTabell();
}

/**
 * Fyller skjemaet med egenskapene til den valgte firkanten
 * 
 * @param {integer} id 
 */
function fyllFirkantSkjema(id) {
    const firkant = firkanter[id];
    inputId.value = id;
    inputBunnlinje.value = firkant.bunnlinje;
    inputTopplinje.value = firkant.topplinje;
    inputHoyde.value = firkant.hoyde;
    inputForskyvning.value = firkant.forskyvning;
    // Når en firkant er valgt, kan den endres eller slettes
    slettKnapp.removeAttribute('disabled');
    lagreKnapp.removeAttribute('disabled');
    // Markerer den valgte firkanten i tabellen
    merkValgtRad(id);
}

/**
 * Tegner valgte firkant i canvas-området
 * 
 * @param {integer} id 
 */
function tegneFirkant(id) {
    const sf = 50; // Skaleringsfaktor, 1 cm er 50px, gitt i oppgaveteksten
    const firkant = firkanter[id]; // Henter valgt firkant
    // Finner korrekt høyde/bredde til canvasen
    const w = Math.max(firkant.forskyvning + firkant.topplinje, firkant.bunnlinje) * sf;
    const h = firkant.hoyde * sf;
    // Setter høyde/bredde til canvasen
    can1.setAttribute('width', w);
    can1.setAttribute('height', h);
    // Tegner firkanten i canvasen, skalerer med sf
    firkant.tegnFirkant(ctx, sf);
}

/**
 * Markerer rad som bruker har klikket på i tabellen
 * 
 * @param {integer} id 
 */
function merkValgtRad(id) {
    console.log(`Merker rad med id #firkant-${id}`);
    const valgtRad = document.querySelector(`#firkant-${id}`);
    // Merker den valgte raden ved å angi en css-klasse
    valgtRad.classList.add('w3-green');
    if (sistValgteRad != null && sistValgteRad != id) {
        // Dersom det er valgt en rad tidligere, fjerner vi css-klassen på denne
        const lastSelectedRow = document.querySelector(`#firkant-${sistValgteRad}`);
        lastSelectedRow.classList.remove('w3-green');
    }
    sistValgteRad = id;
}
