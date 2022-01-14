/** 
 * Eksamen IT2 høsten 2019, oppgave 3 del 2
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */

const inputReps = document.querySelector("#reps");
const inputMotstand = document.querySelector("#motstand");

// Klasse for lagring av et sett
class Sett {
    constructor(reps, motstand) {
        this.reps = reps;
        this.motstand = motstand;
    }

    htmlTabellRad(id) {
        return `<tr><td>${id}. sett</td><td>${this.reps}</td><td>${this.motstand}</td></tr>`;
    }
}

// Lagringsplass for nye sett (objekter)
const alleSett = [];

/**
 * Kjøres en gang ved lasting av app
 */
window.addEventListener('load', () => {
    document.querySelector("#leggtil").addEventListener('click', leggTil);
    inputReps.focus();
});

/**
 * Kjøres når markør står i repetisjon-felt og bruker trykker <enter>
 */
inputReps.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        inputMotstand.focus();//Plasserer markør i neste input-element
    }
});

/**
 * Kjøres når markør står i motstand-felt og bruker trykker <enter>
 */
 inputMotstand.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        leggTil();
        inputReps.focus();
    }
});

/**
 * Skriver ut html-tabell med alle lagrede sett
 * 
 */
function skrivUtTabell() {
    let html = "";
    let volum = 0;
    alleSett.forEach((s, i) => {
        html += s.htmlTabellRad(i + 1);
        volum += s.reps * s.motstand;
    });
    document.querySelector("#loggdata").innerHTML = html;
    document.querySelector("#volum").innerHTML = `Treningsvolum ${volum} kg`;
}

/**
 * Tar innholdet i input-feltene og lager et nytt sett
 * 
 */
function leggTil() {
    if (inputReps.value && inputMotstand.value) {
        alleSett.push(new Sett(parseInt(inputReps.value), 
                               parseInt(inputMotstand.value))
                     );
    } else {
        window.alert("Kunne ikke lagre sett");
    }
    skrivUtTabell();
}
