'use strict';

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
const sf = 50; // Skaleringsfaktor, 1 cm er 50px, gitt i oppgaveteksten

class Firkant {
    constructor(bunnlinje, topplinje, hoyde, forskyvning) {
        this.bunnlinje = bunnlinje;
        this.topplinje = topplinje;
        this.hoyde = hoyde;
        this.forskyvning = forskyvning;
    }
    
    get areal() {
        // Areal er en egenskap som er utledet fra de andre egenskapene
        return ((this.bunnlinje + this.topplinje) / 2) * this.hoyde;
    }
    
    get type() {
        // Type er en egenskap som er utledet fra de andre egenskapene
        if (this.topplinje === this.bunnlinje &&
            this.topplinje === this.hoyde &&
            this.forskyvning === 0) {
                return 'kvadrat';
            } else if (this.topplinje === this.bunnlinje && this.forskyvning === 0) {
                return 'rektangel';
            } else if (this.topplinje === this.bunnlinje && this.forskyvning !== 0) {
                return 'parallellogram';
            } else {
                return 'trapes';
            }
        }
        
    tilHTML(radID) {
        // Skriver ut egenskapene for denne firkanten til en HTML tabellrad
        return `<tr id="${radID}">
        <td>${this.type}</td>
        <td>${this.bunnlinje}</td>
        <td>${this.topplinje}</td>
        <td>${this.hoyde}</td>
        <td>${this.forskyvning}</td>
        <td>${this.areal}</td>
        </tr>`;
    }
    
    tegnFirkant(canv, farge = 'green', linje = 1) {
        // Tegner denne firkanten til en canvas gitt som input
        // Konstanten sf er en skaleringsfaktor gitt i oppgava
        canv.fillStyle = farge;
        canv.lineWidth = linje;
        canv.beginPath();
        canv.moveTo(this.forskyvning * sf, 0);
        canv.lineTo((this.forskyvning + this.topplinje) * sf, 0);
        canv.lineTo(this.bunnlinje * sf, this.hoyde * sf);
        canv.lineTo(0, this.hoyde * sf);
        canv.lineTo(this.forskyvning * sf, 0);
        canv.closePath();
        canv.fill();
    }
}
    
// Standardfirkanter som applikasjonen starter med
// Lagrer disse i en liste, sånn at det blir enkelt å iterere over dem
const firkanter = [
    new Firkant(10, 10, 10, 0),
    new Firkant(20, 20, 5, 0),
    new Firkant(20, 20, 10, 2),
    new Firkant(20, 10, 5, 2),
    new Firkant(5, 3, 10, 5)
];

function init() {
    // Funksjon som kjøres ved oppstart av programmet
    console.log('init');
    if (can1 && can1.getContext) {
        ctx = can1.getContext('2d');
        skrivUtTabell();
        slettKnapp.setAttribute('disabled', true);
        lagreKnapp.setAttribute('disabled', true);
    } else {
        window.alert('Det har skjedd en feil!');
    }
}

function skrivUtTabell() {
    // Skriver ut alle firkant-objektene til en HTML-tabell
    htmlTabell.innerHTML = ""; // Sletter gammelt innhold
    Object.keys(firkanter).forEach((key) => {
        htmlTabell.innerHTML += firkanter[key].tilHTML(`firkant-${key}`);
    });
}

function lagreFirkant() {
    // Lagrer et nytt firkant-objekt med data fra skjema i HTML
    console.log('Lagrer firkant')
    const firkant = new Firkant(parseInt(inputBunnlinje.value),
                                parseInt(inputTopplinje.value),
                                parseInt(inputHoyde.value),
                                parseInt(inputForskyvning.value));
    
    if (inputId.value) {
        // Dersom inpudId har en verdi, oppdaterer vi en firkant
        console.log('Oppdaterer eksisterende firkant');
        firkanter[parseInt(inputId.value)] = firkant;
    } else {
        // Dersom inpudId ikke har noen verdi, lagrer vi en ny firkant
        console.log('Lagrer ny firkant');
        firkanter.push(firkant);
    }
}

function nyFirkant() {
    inputId.value = null; // Settes til null fordi vi lager en ny firkant
    lagreFirkant(); // Lagrer den nye firkanten
    skrivUtTabell(); // Skriver ut tabellen på nytt
    tegneFirkant(firkanter.length - 1); // Tegner den nye firkanten
    merkValgtRad(firkanter.length - 1); // Merker raden med den nye firkanten
}

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

function fyllFirkantSkjema(id) {
    // Fyller skjemaet med egenskapene til den valgte firkanten
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

function tegneFirkant(id) {
    const firkant = firkanter[id];
    // Finner korrekt høyde/bredde til canvasen
    const w = Math.max(firkant.forskyvning + firkant.topplinje, firkant.bunnlinje) * sf;
    const h = firkant.hoyde * sf;
    // Setter høyde/bredde til canvasen
    can1.setAttribute('width', w);
    can1.setAttribute('height', h);
    // Tegner firkanten i canvasen
    firkant.tegnFirkant(ctx);
}

function merkValgtRad(id) {
    const valgtRad = document.querySelector(`#firkant-${id}`);
    // Merker den valgte raden ved å angi en css-klasse
    valgtRad.classList.add('w3-green');
    if (sistValgteRad) {
        // Dersom det er valgt en rad tidligere, fjerner vi css-klassen på denne
        const lastSelectedRow = document.querySelector(`#firkant-${sistValgteRad}`);
        lastSelectedRow.classList.remove('w3-green');
    }
    sistValgteRad = id;
}

window.addEventListener('load', init);
lagreKnapp.addEventListener('click', lagreFirkant);
slettKnapp.addEventListener('click', slettFirkant);
nyKnapp.addEventListener('click', nyFirkant);
htmlTabell.addEventListener('click', (event) => {
    // Lytter etter klikk på en rad i HTML-tabellen.
    // Skriver ut event-data, kan være interessant å studere nærmere.
    console.log(event);
    // Henter ut id til raden som ble klikket på.
    // Første del av id-en er 'firkant-' (åtte tegn). Fjerner dette.
    const id = event.target.parentElement.id.substring(8);
    // Fyller ut skjemaet med egenskapene til den valgte firkanten.
    fyllFirkantSkjema(id);
    // Tegner firkanten
    tegneFirkant(id);
});