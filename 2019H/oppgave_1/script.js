const muskelNavn = document.querySelector("#muskelnavn");

class Muskel {
    constructor(id, navn) {
        this.id = id;
        this.navn = navn;
        this.lyd = new Audio(`snd/${id}.mp3`);
    }
}

const muskler = [
    new Muskel('armstrekk', 'Armstrekkeren'),
    new Muskel('rygg', 'Den brede ryggmuskelen')
];

function muskelInfo(muskel) {
    const m = muskler.find(m => m.id === muskel);
    if (m) {
        muskelNavn.innerHTML = m.navn;
        m.lyd.play();
    } else {
        muskelNavn.innerHTML = muskel;
    }
    animasjon(muskelNavn, 600, 0, 0, 700);
}

function animasjon(element, fromX, fromY, toX, toY, time=2000) {
    element.animate([
                  {left: `${fromX}px`, top: `${fromY}px`, opacity: 0}, // Fra
                  {left: `${toX}px`, top: `${toY}px`, opacity: 1} // Til
                 ], 
                 time); // Tid
}