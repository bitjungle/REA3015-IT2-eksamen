/** 
 * Eksamen IT2 høsten 2020, firkant-klasse brukt i oppgave 2
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * Koden er lisensiert under en GPLv3-lisens 
 * Se http://www.gnu.org/licenses/gpl-3.0.html 
 */
 export default class Firkant {
    constructor(bunnlinje, topplinje, hoyde, forskyvning) {
        this.bunnlinje = bunnlinje;
        this.topplinje = topplinje;
        this.hoyde = hoyde;
        this.forskyvning = forskyvning;
    }

    /**
     * Areal er en firkant.egenskap som er utledet fra de andre egenskapene
     */
    get areal() {
        return ((this.bunnlinje + this.topplinje) / 2) * this.hoyde;
    }
    
    /**
     * Type er en firkant-egenskap som er utledet fra de andre egenskapene
     */
    get type() {
        if (this.topplinje === this.bunnlinje &&
            this.topplinje === this.hoyde &&
            this.forskyvning === 0) {
                return 'kvadrat';
            } else if (this.topplinje === this.bunnlinje && this.forskyvning === 0) {
                return 'rektangel';
            } else if (this.topplinje === this.bunnlinje && this.forskyvning !== 0) {
                return 'parallellogram';
            } else {
                return 'trapes';
            }
        }
    
    /**
     * Returnerer html-kode til en tabellrad
     * 
     * @param {string} radID 
     * @returns 
     */
    tilHTML(radID) {
        // Skriver ut egenskapene for denne firkanten til en HTML tabellrad
        return `<tr id="${radID}">
        <td>${this.type}</td>
        <td>${this.bunnlinje}</td>
        <td>${this.topplinje}</td>
        <td>${this.hoyde}</td>
        <td>${this.forskyvning}</td>
        <td>${this.areal}</td>
        </tr>`;
    }
    
    /**
     * Tegner firkanten til canvas-objektet gitt som input-parameter
     * 
     * @param {object} canv   Canvas-objekt
     * @param {integer} sf    Skaleringsfaktor
     * @param {string} farge  Fyllfarge
     * @param {integer} linje Linketykkelse
     */
    tegnFirkant(canv, sf = 1, farge = 'green', linje = 1) {
        // Tegner denne firkanten til en canvas gitt som input
        // Konstanten sf er en skaleringsfaktor gitt i oppgava
        canv.fillStyle = farge;
        canv.lineWidth = linje;
        canv.beginPath();
        canv.moveTo(this.forskyvning * sf, 0);
        canv.lineTo((this.forskyvning + this.topplinje) * sf, 0);
        canv.lineTo(this.bunnlinje * sf, this.hoyde * sf);
        canv.lineTo(0, this.hoyde * sf);
        canv.lineTo(this.forskyvning * sf, 0);
        canv.closePath();
        canv.fill();
    }
}
