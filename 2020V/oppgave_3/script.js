const lag1Select = document.querySelector("#lag1");
const lag2Select = document.querySelector("#lag2");
const lag1Maal = document.querySelector("#lag1Maal");
const lag2Maal = document.querySelector("#lag2Maal");
const lagreKnapp = document.querySelector("#lagre");
const htmlTabell = document.querySelector("#tabelldata");

class Lag {
    constructor(id, navn) {
        this.id = id;
        this.navn = navn;
        this.scoret = 0;
        this.sluppetInn = 0;
        this.vunnet = 0;
        this.uavgjort = 0;
        this.tapt = 0;
        this.spiltMot = [];
    }

    get poeng() {
        return this.vunnet * 3 + this.uavgjort;
    }

    get maalforskjell() {
        return this.scoret - this.sluppetInn;
    }

    get antallkamper() {
        return this.vunnet + this.uavgjort + this.tapt;
    }

    leggTilSpiltMot(lag) {
        if (this.harSpiltMot(lag.id) === false) {
            this.spiltMot.push(lag.id);
        }
    }

    harSpiltMot(lag) {
        return this.spiltMot.includes(lag.id);
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
    // Lager et kampresultat til lag-objektene, og skriver ut oppdatert tabell
    const l1 = pulje.find(lag => lag.id === lag1Select.value);
    const l2 = pulje.find(lag => lag.id === lag2Select.value);
    if (lag1Select.value === '' || lag2Select.value === '') {
        window.alert('Du må velge lagene som har spilt mot hverandre!');
    } else if (lag1Select.value === lag2Select.value) {
        window.alert('Du må velge to ulike lag!');
    } else if (l1.harSpiltMot(l2)) {
        window.alert('Disse laga har allerede spilt mot hverandre!');
    } else {
        console.log('lagre');
        // Midlertidig lagring av mål lag 1 og lag 2
        l1m = parseInt(lag1Maal.value); 
        l2m = parseInt(lag2Maal.value);
        oppdaterLagObjekter(l1, l1m, l2, l2m);
        skrivUtTabell();
    }
}

function oppdaterLagObjekter(l1, l1m, l2, l2m) {
    // Legger nye mål til tidligere scorede mål
    l1.scoret += l1m; 
    l1.sluppetInn += l2m;
    l2.scoret += l2m;
    l2.sluppetInn += l1m;
    l1.leggTilSpiltMot(l2); 
    l2.leggTilSpiltMot(l1); 
    if (l1m > l2m) {
        // Lag 1 vant
        l1.vunnet += 1;
        l2.tapt += 1;
    } else if (l1m < l2m) {
        // Lag 2 vant
        l2.vunnet += 1;
        l1.tapt += 1;
    } else {
        // Det ble uavgjort
        l1.uavgjort += 1;
        l2.uavgjort += 1;
    }
}

function skrivUtTabell() {
    // Sletter gammelt innhold
    htmlTabell.innerHTML = ""; 

    // Sorterer først pulja etter lagenes poeng
    pulje.sort((a, b) => b.poeng - a.poeng);
    
    // Skriver ut til html-tabellen
    pulje.forEach((lag) => {
        htmlTabell.innerHTML += 
            `<tr id="${lag.id}">
                <td>${lag.id}</td>
                <td>${lag.navn}</td>
                <td>${lag.antallkamper}</td>
                <td>${lag.vunnet}</td>
                <td>${lag.uavgjort}</td>
                <td>${lag.tapt}</td>
                <td>${lag.scoret}</td>
                <td>${lag.sluppetInn}</td>
                <td>${lag.maalforskjell}</td>
                <td>${lag.poeng}</td>
            </tr>`;
    });
}

function init() {
    // Kjøres ved oppstart av programmet
    lagSelectMeny(lag1Select, pulje);
    lagSelectMeny(lag2Select, pulje);  
    skrivUtTabell();  
}

lagreKnapp.addEventListener('click', lagre);
window.addEventListener('load', init);