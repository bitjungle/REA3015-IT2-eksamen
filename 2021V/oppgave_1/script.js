const oppstartDiv = document.querySelector("#oppstart");
const spillDiv = document.querySelector("#spill");
const runderSpiltDiv = document.querySelector("#runderSpilt");
const startKnapp = document.querySelector('#startKnapp');
const antallSpillInput = document.querySelector("#antallSpill");
const antallRiktigDiv = document.querySelector("#antallRiktig");
const antallFeilDiv = document.querySelector("#antallFeil");
const oppstartMelding = document.querySelector('#oppstartMelding');
const spillMelding = document.querySelector('#spillMelding');
const kronBilde = document.querySelector("#kronBilde");
const myntBilde = document.querySelector("#myntBilde");
const spillIgjenDiv = document.querySelector("#spillIgjen");

let antallSpill = 1;    // Bruker velger antall spill ved oppstart
let antallRiktig;       // Teller antall riktige gjettinger
let spillRundeTeller;   // Teller hvor mange ganger det er spilt
let fargeValg = 0; // Endrer markørfarge, flipper mellom 0 og 1 når det spilles

window.addEventListener('load', init);

/**
 * Kjøres en gang ved oppstart av app
 */
function init() {
    antallRiktig = 0;
    spillRundeTeller = 0;
    startKnapp.addEventListener('click', startSpill);
    spillIgjenDiv.addEventListener('click', init);
    visStartOmraade();
}

/**
 * Kjøres en gang ved oppstart av spill, trigges av startknapp.
 * Antall spill må være et positivt oddetall.
 */
function startSpill() {
    const n = parseInt(antallSpillInput.value);
    if (n > 0 && n % 2 != 0) {
        // Spiller har valgt et positivt oddetall, alt er ok
        antallSpill = n;
        startKnapp.removeEventListener('click', startSpill);
        kronBilde.addEventListener('click', spillRunde);
        myntBilde.addEventListener('click', spillRunde);
        runderSpiltDiv.innerHTML = "Her vises antall riktig/feil";
        antallRiktigDiv.style.width = "0%";
        antallFeilDiv.style.width = "0%";
        visSpillOmraade();
    } else {
        // Feil brukerinput, gir tilbakemelding om det
        oppstartMelding.innerHTML = 'Antall spill må være et positivt oddetall';
    }
}

/**
 * Kjøres en gang når alle runder er spilt
 */
function avsluttSpill() {
    kronBilde.removeEventListener('click', spillRunde);
    myntBilde.removeEventListener('click', spillRunde);
    kronBilde.style.borderColor = "";
    myntBilde.style.borderColor = "";
    kronBilde.style.backgroundColor = "";
    myntBilde.style.backgroundColor = "";
    spillMelding.innerHTML = 'Game over!';
    spillIgjenDiv.style.display = "block";
}

/**
 * Kaster en mynt med 50 % sjanse for hver side av mynten
 * 
 * @returns {string} kronBilde/myntBilde
 */
function myntkast() {
    if (Math.random() < 0.5) {
        return 'kronBilde';
    } else {
        return 'myntBilde';
    }
}

/**
 * Viser spillområdet (<div>), skjuler andre områder av appen
 */
function visSpillOmraade() {
    oppstartDiv.style.display = "none";
    spillDiv.style.display = "block";
    spillIgjenDiv.style.display = "none";
}

/**
 * Viser startområdet (<div>), skjuler andre områder av appen
 */
 function visStartOmraade() {
    oppstartDiv.style.display = "block";
    spillDiv.style.display = "none";
    spillIgjenDiv.style.display = "none";
}

/**
 * Hovedfunksjonen i spillet, kjøres for hver nye runde som spilles
 * 
 * @param {Object} e EventObjekt
 */
function spillRunde(e) {
    // Appen veksler mellom to farger sånn at brukeren tydelig skal se 
    // at det er en ny runde. Her brukes en syntaks som kalles 
    // "conditional (ternary) operator". I dette tilfellet flipper den 
    // verdien til fargeValg mellom 0 og 1.
    fargeValg = (fargeValg === 0) ? 1 : 0;

    spillRundeTeller++;
    runderSpiltDiv.innerHTML = "Runder spilt: " + spillRundeTeller;

    const valgtSide = e.target.id;
    markerValgt(valgtSide, fargeValg);
    const kast = myntkast();
    markerUtfall(kast, fargeValg);

    if (valgtSide === kast) {
        antallRiktig++;
        spillMelding.innerHTML = 'Du vant! Velg en gang til:';
        console.log(100*(antallRiktig/antallSpill));
        antallRiktigDiv.style.width = 100*(antallRiktig/antallSpill) + '%';
        antallRiktigDiv.innerHTML = antallRiktig;
    } else {
        spillMelding.innerHTML = 'Du tapte! Prøv igjen:';
        const antallFeil = spillRundeTeller - antallRiktig;
        antallFeilDiv.style.width = 100*(antallFeil/antallSpill) + '%';
        antallFeilDiv.innerHTML = antallFeil;
    }

    if (spillRundeTeller >= antallSpill) {
        avsluttSpill();
    }
}

/**
 * Markerer den siden av mynten som spilleren har valgt
 * 
 * @param {string} side Kan ha verdiene kronBilde eller myntBilde
 * @param {integer} farge Kan ha verdiene 0 eller 1
 */
function markerValgt(side, farge) {
    const valgFarger = ["goldenrod", "orange"];
    if (side === 'kronBilde') {
        kronBilde.style.backgroundColor = valgFarger[farge];
        myntBilde.style.backgroundColor = "";
    } else {
        kronBilde.style.backgroundColor = "";
        myntBilde.style.backgroundColor = valgFarger[farge];
    }    
}

/**
 * Markerer den siden av mynten som den landet på etter et kast
 * 
 * @param {string} side Kan ha verdiene kronBilde eller myntBilde
 * @param {integer} farge Kan ha verdiene 0 eller 1
 */
function markerUtfall(side, farge) {
    const kastFarger = ["green", "limegreen"];
    if (side === 'kronBilde') {
        kronBilde.style.borderColor = kastFarger[farge];
        myntBilde.style.borderColor = "";
    } else {
        kronBilde.style.borderColor = "";
        myntBilde.style.borderColor = kastFarger[farge];
    }
}

