/** 
 * Eksamen IT2 høsten 2019, oppgave 2
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */

// Referanse til DOM-objekt for valg av aktivitet
const selectAktivitet = document.querySelector("#aktivitet");

// Generell klasse for alle typer aktiviteter
class Aktivitet {
    constructor(navn, kcal) {
        this.navn = navn;
        this.kcal = kcal;
    }
}

// Lager en liste av objekter med aktiviteter
const aktiviteter = [
    new Aktivitet('Aerobics', 814),
    new Aktivitet('Bordtennis', 236),
    new Aktivitet('Fotball', 510),
    new Aktivitet('Golf', 244),
    new Aktivitet('Jogging', 666)
];

window.addEventListener('load', init);

/**
 * Funksjonen kjøres en gang ved oppstart av appen
 */
function init() {
    // Legger funksjonalitet på beregn-knappen i brukergrensesnittet
    document.querySelector("#beregn").addEventListener('click', beregn);
    // Lager og skriver ut aktivitetsmenyen
    lagSelectMeny(selectAktivitet);
}

/**
 * Lager select-meny med de ulike aktivitetene
 * 
 * @param {Object} selectElement 
 */
function lagSelectMeny(selectElement) {
    // Legger først inn første element
    let opt = document.createElement("option");
    opt.innerHTML = "Velg aktivitet";
    opt.selected = true;
    opt.disabled = true;
    selectElement.appendChild(opt);
    // Itererer over alle aktivitetene 
    aktiviteter.forEach((a) => {
        opt = document.createElement("option");
        opt.innerHTML = `${a.navn} (${a.kcal} kcal/time)`;
        opt.value = a.navn;
        // Legger aktiviteten til select-lista
        selectElement.appendChild(opt);
    });
}

/**
 * Beregner kaloriforbruk og skriver resultat til nettsiden
 * 
 */
function beregn() {
    const intensitet = parseFloat(document.querySelector('input[name=intensitet]:checked').value);
    const varighet = parseInt(document.querySelector("#varighet").value);
    const aktivitet = aktiviteter.find(a => a.navn === selectAktivitet.value);
    if (aktivitet) {
        const kcal = Math.round(intensitet * (varighet/60) * aktivitet.kcal);
        document.querySelector("#svar").innerHTML = `${kcal} kalorier`;
    } else {
        window.alert("Du må velge aktivitet");
    }
}

