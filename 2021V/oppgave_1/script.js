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
let marker = 0; // Endrer markørfarge, flipper mellom 0 og 1 når det spilles

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
    // Veksler mellom disse fargene i hver runde, sånn at brukeren
    // tydelig skal se at det er en ny runde.
    const valgFarger = ["goldenrod", "orange"];
    const kastFarger = ["green", "limegreen"];

    // Her brukes en syntaks som kalles "conditional (ternary) operator".
    // I dette tilfellet flipper den verdien til marker mellom 0 og 1.
    marker = (marker === 0) ? 1 : 0;

    const valgtSide = e.target.id;
    console.log(valgtSide);
    
    spillRundeTeller++;
    runderSpiltDiv.innerHTML = "Runder spilt: " + spillRundeTeller;

    if (valgtSide === 'kronBilde') {
        kronBilde.style.backgroundColor = valgFarger[marker];
        myntBilde.style.backgroundColor = "";
    } else {
        kronBilde.style.backgroundColor = "";
        myntBilde.style.backgroundColor = valgFarger[marker];
    }

    kast = myntkast();
    if (kast === 'kronBilde') {
        kronBilde.style.borderColor = kastFarger[marker];
        myntBilde.style.borderColor = "";
    } else {
        kronBilde.style.borderColor = "";
        myntBilde.style.borderColor = kastFarger[marker];
    }

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
