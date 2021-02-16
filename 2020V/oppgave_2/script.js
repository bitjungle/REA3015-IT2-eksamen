const lag1Select = document.querySelector("#lag1");
const lag2Select = document.querySelector("#lag2");
const lag1Maal = document.querySelector("#lag1Maal");
const lag2Maal = document.querySelector("#lag2Maal");
const lagreKnapp = document.querySelector("#lagre");

const lag1NavnUtskrift = document.querySelector("#lag1Navn");
const lag1Resultat = document.querySelector("#lag1Resultat");
const lag1Maalforskjell = document.querySelector("#lag1Maalforskjell");
const lag1Poeng = document.querySelector("#lag1Poeng");
const lag2NavnUtskrift = document.querySelector("#lag2Navn");
const lag2Resultat = document.querySelector("#lag2Resultat");
const lag2Maalforskjell = document.querySelector("#lag2Maalforskjell");
const lag2Poeng = document.querySelector("#lag2Poeng");

class Lag {
    constructor(id, navn) {
        this.id = id;
        this.navn = navn;
    }

}

const pulje = [
    new Lag('milan', "AC Milan"),
    new Lag('roma', "AS Roma"),
    new Lag('inter', "FC Inter")
];

function lagSelectMeny(selectElement) {
    // Legger først inn et tomt element, sånn at ingen lag er forhåndsvalgt
    selectElement.appendChild(document.createElement("option"));
    // Itererer over alle lagene som er gitt som input
    pulje.forEach((lag) => {
        let opt = document.createElement("option");
        opt.innerHTML = lag.navn;
        opt.value = lag.id;
        // Legger laget til select-lista
        selectElement.appendChild(opt);
    });
}

function lagre() {
    // Henter resultat fra skjema og starter utskrift av resultat
    if (lag1Select.value === '' || lag2Select.value === '') {
        window.alert('Du må velge lagene som har spilt mot hverandre!');
    } else if (lag1Select.value === lag2Select.value) {
        window.alert('Du må velge to ulike lag!');
    } else {
        console.log('lagre');
        // Midlertidig lagring av mål lag 1 og lag 2
        l1m = parseInt(lag1Maal.value); 
        l2m = parseInt(lag2Maal.value);
        resultatUtskrift(l1m, l2m);
    }
}

function resultatUtskrift(l1m, l2m) {
    // Lager utskrift av resultat, viser på skjerm
    const l1 = pulje.find(lag => lag.id === lag1Select.value);
    const l2 = pulje.find(lag => lag.id === lag2Select.value);
    lag1NavnUtskrift.innerHTML = l1.navn;
    lag2NavnUtskrift.innerHTML = l2.navn;
    if (l1m > l2m) {
        // Lag 1 vant
        lag1Resultat.innerHTML = "Resultat: Seier";
        lag1Poeng.innerHTML = "Poeng: 3";
        lag2Resultat.innerHTML = "Resultat: Tap";
        lag2Poeng.innerHTML = "Poeng: 0";
    } else if (l1m < l2m) {
        // Lag 2 vant
        lag1Resultat.innerHTML = "Resultat: Tap";
        lag1Poeng.innerHTML = "Poeng: 0";
        lag2Resultat.innerHTML = "Resultat: Seier";
        lag2Poeng.innerHTML = "Poeng: 3";
    } else {
        // Det ble uavgjort
        lag1Resultat.innerHTML = "Resultat: Uavgjort";
        lag1Poeng.innerHTML = "Poeng: 1";
        lag2Resultat.innerHTML = "Resultat: Uavgjort";
        lag1Poeng.innerHTML = "Poeng: 1";
    }
    lag1Maalforskjell.innerHTML = "Målforskjell: " + (l1m - l2m);
    lag2Maalforskjell.innerHTML = "Målforskjell: " + (l2m - l1m);
}

function init() {
    // Funksjon kjøres ved lasting av side, genererer select-menyer
    console.log('init');
    lagSelectMeny(lag1Select, pulje);
    lagSelectMeny(lag2Select, pulje);    
}

lagreKnapp.addEventListener('click', lagre);
window.addEventListener('load', init);