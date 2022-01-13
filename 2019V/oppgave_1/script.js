const fjellbilder = document.querySelectorAll('.fjellbilder');
const bildeinfoDiv = document.querySelector('#bildeinfo');

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
    console.log(bildetekster);
    fjellbilder.forEach((b) => {
        b.addEventListener('click', bildeinfo);
    });
}

/**
 * Viser info om det valgte bildet
 * 
 * @param {Object} e Eventobjekt
 */
function bildeinfo(e) {
    bildeinfoDiv.innerHTML = bildetekster[e.target.id];
}