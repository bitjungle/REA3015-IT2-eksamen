const beregnKnapp = document.querySelector("#beregn");
const selectAktivitet = document.querySelector("#aktivitet");

class Aktivitet {
    constructor(navn, kcal) {
        this.navn = navn;
        this.kcal = kcal;
    }
}

aktiviteter = [
    new Aktivitet('Aerobics', 814),
    new Aktivitet('Bordtennis', 236),
    new Aktivitet('Fotball', 510),
    new Aktivitet('Golf', 244),
    new Aktivitet('Jogging', 666)
];

function lagSelectMeny(selectElement) {
    // Legger først inn første element
    let opt = document.createElement("option");
    opt.innerHTML = "Velg aktivitet";
    opt.selected = true;
    opt.disabled = true;
    selectElement.appendChild(opt);
    // Itererer over alle aktivitetene 
    aktiviteter.forEach((a) => {
        console.log(a);
        opt = document.createElement("option");
        opt.innerHTML = `${a.navn} (${a.kcal} kcal/time)`;
        opt.value = a.navn;
        // Legger laget til select-lista
        selectElement.appendChild(opt);
    });
}

function init() {
    lagSelectMeny(selectAktivitet);
}

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

window.addEventListener('load', init);
beregnKnapp.addEventListener('click', beregn);