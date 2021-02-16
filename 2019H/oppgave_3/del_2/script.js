const knappLeggTil = document.querySelector("#leggtil");
const inputReps = document.querySelector("#reps");
const inputMotstand = document.querySelector("#motstand");
const loggdata = document.querySelector("#loggdata");
const outputVolum = document.querySelector("#volum");

class Sett {
    constructor(reps, motstand) {
        this.reps = reps;
        this.motstand = motstand;
    }

    htmlTabellRad(id) {
        return `<tr><td>${id}. sett</td><td>${this.reps}</td><td>${this.motstand}</td></tr>`;
    }
}

// Lagringsplass for nye sett, etter hvert som de legges til
const alleSett = [];

function skrivUtTabell() {
    // Skriver ut html-tabell med alle lagrede sett
    let html = "";
    let volum = 0;
    alleSett.forEach((s, i) => {
        html += s.htmlTabellRad(i + 1);
        volum += s.reps * s.motstand;
    });
    loggdata.innerHTML = html;
    outputVolum.innerHTML = `Treningsvolum ${volum} kg`;
}

function leggTil() {
    // Lagrer nytt sett
    if (inputReps.value && inputMotstand.value) {
        alleSett.push(new Sett(parseInt(inputReps.value), 
                               parseInt(inputMotstand.value))
                     );
    } else {
        window.alert("Kunne ikke lagre sett");
    }
    skrivUtTabell();
}

function init() {
    // Kjøres ved oppstart av appen
    inputReps.focus();
}

window.addEventListener('load', init);

knappLeggTil.addEventListener('click', leggTil);

inputReps.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        inputMotstand.focus();//Plasserer markør i neste input-element
    }
});

inputMotstand.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        leggTil();//Tar innholdet i input-feltene og lager et nytt sett
        inputReps.focus();
    }
});