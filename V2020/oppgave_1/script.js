const meny = {
    milan: document.querySelector("#milan"),
    roma: document.querySelector("#roma"),
    inter: document.querySelector("#inter")
};

const lagNavn = document.querySelector("#lagnavn");
const draktBilde = document.querySelector("#draktbilde");
let ctx = draktBilde.getContext('2d');
let bildeX = 0;
let bildeY = 0;
let valgtLag = null;
let forrigeValgteLag = null;

class Lag {
    constructor(navn, drakt, kamprop) {
        this.navn = navn;
        this.drakt = new Image();
        this.drakt.src = drakt;
        this.kamprop = new Audio(kamprop);
    }

    spillKamprop() {
        this.kamprop.play();
    }
}

const pulje = {
    milan: new Lag('AC Milan', './img/milan.jpg', './snd/milan.mp3'),
    roma: new Lag('AS Roma', './img/roma.jpg', './snd/roma.mp3'),
    inter: new Lag('FC Inter', './img/inter.jpg', './snd/inter.mp3')
};

function visValgtLag() {
    if (forrigeValgteLag) meny[forrigeValgteLag].classList.toggle('w3-light-gray');
    meny[valgtLag].classList.toggle('w3-light-gray');
    lagNavn.innerHTML = pulje[valgtLag].navn;
    requestAnimationFrame(anim);
    pulje[valgtLag].spillKamprop();
    forrigeValgteLag = valgtLag;
}

function blankCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function anim() {
    bildeX += 4;
    bildeY += 3;
    if (bildeX < ctx.canvas.width) {
        blankCanvas();
        ctx.drawImage(pulje[valgtLag].drakt, 0, 0, bildeX, bildeY);
        requestAnimationFrame(anim);
    } else if (bildeY < ctx.canvas.height) {
        blankCanvas();
        ctx.drawImage(pulje[valgtLag].drakt, 0, 0, ctx.canvas.width, bildeY);
        requestAnimationFrame(anim);
    } else {
        ctx.drawImage(pulje[valgtLag].drakt, 0, 0, ctx.canvas.width, ctx.canvas.height);
        bildeX = 0;
        bildeY = 0;
    }
}


Object.keys(meny).forEach((key) => {
    meny[key].addEventListener('click', () => {
        valgtLag = key;
        visValgtLag(key);
    });
});
