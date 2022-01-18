const fjellbilder = document.querySelectorAll('.fjellbilder');
const bildeinfoDiv = document.querySelector('#bildeinfo');
const infoboks = document.querySelector("#infoboks");
const lukkKnapp = document.querySelector("#lukkKnapp");

const bildetekster = {
    fjellbilde_1: 'Bilde av fjell til bruk på nettside. Punktgrafikk. Anbefalt filformat er jpg.',
    fjellbilde_2: 'Bilde av fjell med transparent himmel til bruk på nettside. Punktgrafikk. Anbefalt filformat er png.',
    fjellbilde_3: 'Stilisert nærbilde av fjelltopp med transparent himmel som kan brukes som logo. Vektorgrafikk. Anbefalt filformat er svg.'
};

window.addEventListener('load', init);

/**
 * Kjøres en gang ved oppstart av appen
 */
function init() {
    
    fjellbilder.forEach((b) => {
        b.addEventListener('click', bildeinfo);
    });

    lukkKnapp.addEventListener('click', lukkInfoVindu);
}

/**
 * Viser info om det valgte bildet
 * 
 * @param {Object} e Eventobjekt
 */
function bildeinfo(e) {
    infoboks.style.display = "block";
    bildeinfoDiv.innerHTML = bildetekster[e.target.id];
}

/**
 * Lukker info-vinduet
 * 
 */
function lukkInfoVindu(e) {
    infoboks.style.display = "none";
}