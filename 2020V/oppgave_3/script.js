const lag1Select = document.querySelector("#lag1");
const lag2Select = document.querySelector("#lag2");
const lag1Maal = document.querySelector("#lag1Maal");
const lag2Maal = document.querySelector("#lag2Maal");
const lagreKnapp = document.querySelector("#lagre");
const htmlTabell = document.querySelector("#tabelldata");

class Lag {
    constructor(navn) {
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

    get dataArray() {
        return [this.navn, this.antallkamper, this.vunnet, this.uavgjort, 
                this.tapt, this.scoret, this.sluppetInn, this.maalforskjell,
                this.poeng];
    }

    leggTilSpiltMot(lag) {
        if (this.harSpiltMot(lag) === false) {
            this.spiltMot.push(lag);
        }
    }

    harSpiltMot(lag) {
        return this.spiltMot.includes(lag);
    }

}

const pulje = {
    milan: new Lag("AC Milan"),
    roma: new Lag("AS Roma"),
    inter: new Lag("FC Inter")
};

function sorterLag() {
    // Hack for å få sortert lagene etter poeng.
    // Kopierer ut innholdet i objektene til en flerdimensjonal array.
    let arr = [];
    Object.keys(pulje).forEach((lag) => {
        arr.push(pulje[lag].dataArray);
    });
    return arr.sort((a, b) => {return b[8] - a[8];});
}

function lagSelectMeny(selectElement) {
    // Legger først inn et tomt element, sånn at ingen lag er forhåndsvalgt
    selectElement.appendChild(document.createElement("option"));
    // Itererer over alle lagene som er gitt som input
    Object.keys(pulje).forEach((lag) => {
        let opt = document.createElement("option");
        opt.innerHTML = pulje[lag].navn;
        opt.value = lag;
        // Legger laget til select-lista
        selectElement.appendChild(opt);
    });
}

function lagre() {
    // Lager et kampresultat til lag-objektene, og skriver ut oppdatert tabell
    if (lag1Select.value === '' || lag2Select.value === '') {
        window.alert('Du må velge lagene som har spilt mot hverandre!');
    } else if (lag1Select.value === lag2Select.value) {
        window.alert('Du må velge to ulike lag!');
    } else if (pulje[lag1Select.value].harSpiltMot(lag2Select.value)) {
        window.alert('Disse laga har allerede spilt mot hverandre!');
    } else {
        console.log('lagre');
        // Midlertidig lagring av mål lag 1 og lag 2
        l1m = parseInt(lag1Maal.value); 
        l2m = parseInt(lag2Maal.value);
        oppdaterLagObjekter(l1m, l2m);
        skrivUtTabell();
    }
}

function oppdaterLagObjekter(l1m, l2m) {
    // Legger nye mål til tidligere scorede mål
    pulje[lag1Select.value].scoret += l1m; 
    pulje[lag1Select.value].sluppetInn += l2m;
    pulje[lag2Select.value].scoret += l2m;
    pulje[lag2Select.value].sluppetInn += l1m;
    pulje[lag1Select.value].leggTilSpiltMot(lag2Select.value); 
    pulje[lag2Select.value].leggTilSpiltMot(lag1Select.value); 
    if (l1m > l2m) {
        // Lag 1 vant
        pulje[lag1Select.value].vunnet += 1;
        pulje[lag2Select.value].tapt += 1;
    } else if (l1m < l2m) {
        // Lag 2 vant
        pulje[lag2Select.value].vunnet += 1;
        pulje[lag1Select.value].tapt += 1;
    } else {
        // Det ble uavgjort
        pulje[lag1Select.value].uavgjort += 1;
        pulje[lag2Select.value].uavgjort += 1;
    }
}

function skrivUtTabell() {
    // Sletter gammelt innhold
    htmlTabell.innerHTML = ""; 

    // Får ikke til å sortere objektene, må lage en hacke-løsning.
    // Object.keys(pulje).forEach((lag) => {
    //     htmlTabell.innerHTML += 
    //         `<tr id="${lag}">
    //             <td>${lag}</td>
    //             <td>${pulje[lag].navn}</td>
    //             <td>${pulje[lag].antallkamper}</td>
    //             <td>${pulje[lag].vunnet}</td>
    //             <td>${pulje[lag].uavgjort}</td>
    //             <td>${pulje[lag].tapt}</td>
    //             <td>${pulje[lag].scoret}</td>
    //             <td>${pulje[lag].sluppetInn}</td>
    //             <td>${pulje[lag].maalforskjell}</td>
    //             <td>${pulje[lag].poeng}</td>
    //         </tr>`;
    // });

    let lagSortert = sorterLag();
    for (let i = 0; i < lagSortert.length; i++) {
        htmlTabell.innerHTML += 
        `<tr id="${lagSortert[i][0]}">
            <td>${i+1}</td>
            <td>${lagSortert[i][0]}</td>
            <td>${lagSortert[i][1]}</td>
            <td>${lagSortert[i][2]}</td>
            <td>${lagSortert[i][3]}</td>
            <td>${lagSortert[i][4]}</td>
            <td>${lagSortert[i][5]}</td>
            <td>${lagSortert[i][6]}</td>
            <td>${lagSortert[i][7]}</td>
            <td>${lagSortert[i][8]}</td>
        </tr>`;
    }
}

function init() {
    // Kjøres ved oppstart av programmet
    lagSelectMeny(lag1Select, pulje);
    lagSelectMeny(lag2Select, pulje);  
    skrivUtTabell();  
}

lagreKnapp.addEventListener('click', lagre);
window.addEventListener('load', init);