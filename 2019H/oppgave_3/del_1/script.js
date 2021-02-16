const listeOvinger = document.querySelector("#ovinger_liste");
let selectMuskel = document.querySelector("#muskelgrupper");
class Muskelgruppe {
    constructor(navn, ovinger) {
        this.navn = navn;
        this.ovinger = ovinger;
    }
}

muskelgrupper = [
    new Muskelgruppe('Armer', ['Bicepscurl med stang', 'Fransk press']),
    new Muskelgruppe('Skuldre', ['Stående militærpress', 'Sidehev']),
    new Muskelgruppe('Ben', ['Knebøy', 'Leg extension', 'Leg curl']),
    new Muskelgruppe('Rygg', ['Nedtrekk', 'Roing']),
    new Muskelgruppe('Bryst', ['Benkpress', 'Flies', 'Push up'])
];

function lagSelectMeny(selectElement) {
    // Legger først inn første element
    let opt = document.createElement("option");
    opt.innerHTML = "Velg muskelgruppe";
    opt.selected = true;
    opt.disabled = true;
    selectElement.appendChild(opt);
    // Itererer over alle aktivitetene 
    muskelgrupper.forEach((m) => {
        console.log(m);
        opt = document.createElement("option");
        opt.innerHTML = `${m.navn}`;
        opt.value = m.navn;
        // Legger aktiviteten til select-lista
        selectElement.appendChild(opt);
    });
}

function finnOvinger(muskelvalg) {
    listeOvinger.innerHTML = '';
    const muskel = muskelgrupper.find(m => m.navn === muskelvalg);
    muskel.ovinger.forEach(o => {
        listeOvinger.innerHTML += `<li>${o}</li>\n`;
    });
}

function init() {
    lagSelectMeny(selectMuskel);
}

window.addEventListener('load', init);
selectMuskel.addEventListener('change', () => {
    //Event change fungerer ikke i Safari, vet ikke hvorfor
    finnOvinger(selectMuskel.value);
});

