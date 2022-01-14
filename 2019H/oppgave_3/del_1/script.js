/** 
 * Eksamen IT2 høsten 2019, oppgave 3 del 1
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */

// Referanse til DOM-objekt for valg av muskelgruppe
let selectMuskel = document.querySelector("#muskelgrupper");

// Generell klasse for alle muskelgrupper
class Muskelgruppe {
    constructor(navn, ovinger) {
        this.navn = navn;
        this.ovinger = ovinger;
    }
}

// Liste med objekter for alle muskelgrupper
const muskelgrupper = [
    new Muskelgruppe('Armer', ['Bicepscurl med stang', 'Fransk press']),
    new Muskelgruppe('Skuldre', ['Stående militærpress', 'Sidehev']),
    new Muskelgruppe('Ben', ['Knebøy', 'Leg extension', 'Leg curl']),
    new Muskelgruppe('Rygg', ['Nedtrekk', 'Roing']),
    new Muskelgruppe('Bryst', ['Benkpress', 'Flies', 'Push up'])
];

/**
 * Kjøres en gang ved lasting av app
 */
window.addEventListener('load', () => {
    lagSelectMeny(selectMuskel);
});

/**
 * Kjøres hver gang valget i select-menyen endres
 */
 selectMuskel.addEventListener('change', () => {
    finnOvinger(selectMuskel.value);
});

/**
 * Fyller select-menyen opp med de ulike muskelgruppene
 * 
 * @param {object} selectElement 
 */
function lagSelectMeny(selectElement) {
    // Legger først inn første element
    let opt = document.createElement("option");
    opt.innerHTML = "Velg muskelgruppe";
    opt.selected = true;
    opt.disabled = true;
    selectElement.appendChild(opt);
    // Itererer over alle aktivitetene 
    muskelgrupper.forEach((m) => {
        opt = document.createElement("option");
        opt.innerHTML = `${m.navn}`;
        opt.value = m.navn;
        // Legger aktiviteten til select-lista
        selectElement.appendChild(opt);
    });
}

/**
 * Skriver ut aktuelle øvelser for den valgte muskelgruppen
 * 
 * @param {string} muskelvalg 
 */
function finnOvinger(muskelvalg) {
    const listeOvinger = document.querySelector("#ovinger_liste");
    listeOvinger.innerHTML = '';
    const muskel = muskelgrupper.find(m => m.navn === muskelvalg);
    muskel.ovinger.forEach(o => {
        listeOvinger.innerHTML += `<li>${o}</li>\n`;
    });
}

