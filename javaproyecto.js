/**
 * modifica el monto disponible
 * @method monto
 * @param {number} plata - cantidad que se desea sumar o restar al monto actual (ya sea apuesta, ganacia, plata ingresada o retirada)
 */
var aceptar;
let monto = (plata) => {
    let mont;
    mont = Number(document.montos.montoactual.value);
    plata = Number(plata);
    if ((mont + plata) >= 0) {
        mont += plata;
        aceptar = true;
        document.getElementById("montoactual").value = mont;
        document.montos.nuevomonto.value = "";
    } else {
        alert("El monto disponible no puede quedar en negativo");
        aceptar = false;
    }
}
/**
 * el imput del numero al que se le desea apostar sea un numero entero entre el 0 y el 37
 * @method numruleta
 * */
let numruleta = () => {
    let valor;
    valor = document.getElementById("numeroapuesta").value;
    console.log(valor);
    if (valor % 1 != 0) {
        alert("no se puede ser numero decimal");
        document.getElementById("numeroapuesta").value = "";
    }
    if (valor < 0 || valor > 36) {
        alert("debe ingresar un numero entre 0 y 36");
        document.getElementById("numeroapuesta").value = "";
    }
}
/**
 * Para no permitir ingresar valor negativos o decimales en los imputs
 * @method negativo
 * @param {string} id -Id del imput
 * @param {number} valor - numero ingresado en el imput
 */
let negativo = (id, valor) => {
    if (valor % 1 != 0) {
        alert("no se puede ser numero decimal");
        document.getElementById(id).value = "";
    }
    if (valor.includes("-")) {
        alert("el numero ingresado es negativo");
        document.getElementById(id).value = "";
    }
}
/**
 * Sirve para blanquear todos los campos del sector de apuestas
 * @method blanquear
 */
let blanquear = () => {
    let ccheckbox, ncheckbox, pcheckbox, dcheckbox, ocolor, onumero, opar, odocena, acolor, apar, anumero, adocena;
    ccheckbox = false;
    ncheckbox = false;
    pcheckbox = false;
    dcheckbox = false;
    ocolor = "negro";
    onumero = "";
    opar = "par";
    odocena = "primera";
    acolor = "";
    apar = "";
    anumero = "";
    adocena = "";
    document.getElementById("color").checked = ccheckbox;
    document.getElementById("col").value = ocolor;
    document.getElementById("valorapuestacolor").value = acolor;

    document.getElementById("numero").checked = ncheckbox;
    document.getElementById("numeroapuesta").value = onumero;
    document.getElementById("valorapuestanumero").value = anumero;

    document.getElementById("paroimpar").checked = pcheckbox;
    document.getElementById("par_impar").value = opar;
    document.getElementById("valorapuestapar").value = apar;

    document.getElementById("docena").checked = dcheckbox;
    document.getElementById("doc").value = odocena;
    document.getElementById("valorapuestadocena").value = adocena;


}

var res, rdoce, rpoi, rcol;
/**
 * este funcion sirve para que genere un numero aleatorio entre el 0 y el 36 y poder comprobar  si la apuesta es correcta
 * @method girarula
 */
let girarrula = () => {
    let  doce, numer, poi, col, suma, apnum, apdo, apco, appa, ccheckbox, ncheckbox, pcheckbox, dcheckbox, gan;
    //verificar checkbox y que se haya ingresado la cantidad que se desea apostar a cada uno
    ccheckbox = document.getElementById("color").checked;
    ncheckbox = document.getElementById("numero").checked;
    pcheckbox = document.getElementById("paroimpar").checked;
    dcheckbox = document.getElementById("docena").checked;
    suma = 0;
    if (ccheckbox) {
        apco = Number(document.getElementById("valorapuestacolor").value);
        if (apco == "") {
            alert("Se debe ingresar la cantidad que se desea apostar al color");
        }
        suma += apco;
    }
    if (ncheckbox) {
        apnum = Number(document.getElementById("valorapuestanumero").value);
        if (apnum == "") {
            alert("Se debe ingresar la cantidad que se desea apostar al numero");
        }
        suma += apnum;

    }
    if (pcheckbox) {
        appa = Number(document.getElementById("valorapuestapar").value);
        if (appa == "") {
            alert("Se debe ingresar la cantidad que se desea apostar al par/impar");
        }
        suma += appa;
    }
    if (dcheckbox) {
        apdo = Number(document.getElementById("valorapuestadocena").value);
        if (apdo == "") {
            alert("Se debe ingresar la cantidad que se desea apostar a la docena");
        }
        suma += apdo;

    }
    monto(Number(-suma));
    if (suma == 0) {
        alert("Se debe hacer alguna apuesta");
        aceptar = false;
    }
    if (ncheckbox) {
        numer = document.getElementById("numeroapuesta").value;
        if (numer == "") {
            alert("Se debe ingresar el numero al que quiere apostar al numero");
            aceptar = false;
        }
    }
    //se acepta o rechaza la apuesta y empieza a "girar la ruleta"
    if (aceptar) {
        gan = 0;
        res = Math.round(Math.random() * (36) + parseInt(0));
        /*El resultado en terminos de docena, par, color*/
        if (res > 0 && res < 13) {
            rdoce = "primera";
        } else if (res > 12 && res < 25) {
            rdoce = "segunda";
        } else if (res > 24 && res < 37) {
            rdoce = "tercera";
        }
        if (res == 0) {
            rcol = "verde";
            rpoi = "ninguno";
        } else {
            if (res % 2 == 0) {
                rpoi = "par";
            } else {
                rpoi = "impar";
            }
        }
        if (res == 1 || res == 3 || res == 5 || res == 7 || res == 9 || res == 12 || res == 14 || res == 18 || res == 20 || res == 21 || res == 23 || res == 25 || res == 27 || res == 30 || res == 32 || res == 34 || res == 36) {
            rcol = "rojo";
        } else {
            rcol = "negro";
        }
        console.log(res);
        console.log(rcol);
        console.log(rdoce);
        console.log(rpoi);

        comenzaranimacion();
        //Verificar que el resultado es el mismo valor que el que fue apostado

        if (ncheckbox) {
            if (res == numer) {
                gan = Number(gan + (apnum * 36));
            }
        }
        if (dcheckbox) {
            doce = document.getElementById("doc").value;
            if (rdoce == doce) {
                gan = Number(gan + (apdo * 3));
            }
        }
        if (pcheckbox) {
            poi = document.getElementById("par_impar").value;
            if (rpoi == poi) {
                gan = Number(gan + (appa * 2));
            }
        }
        if (ccheckbox) {
            col = document.getElementById("col").value;
            if (rcol == "verde") {
                gan = Number(gan + (apco * 36));
            } else if (rcol == col) {
                gan = Number(gan + (apco * 2));
            }
        }
        document.getElementById("ganacias").value = gan;
        document.getElementById("numresultado").value = res;
        document.getElementById("cantapostada").value = suma;
        monto(gan);
    }
}
/**
*   Sirve para generar el delta grado que se usa para graficar la pelota en el resultado
*   @method gradosimg
 *   @return tita
*/
let gradosimg =()=>{
    let tita;
    switch (res){
        case 34: tita=2*(Math.PI)*(0/37);
            break;
        case 6: tita=2*(Math.PI)*(1/37);
            break;
        case 27: tita=2*(Math.PI)*(2/37);
            break;
        case 13: tita=2*(Math.PI)*(3/37);
            break;
        case 36: tita=2*(Math.PI)*(4/37);
            break;
        case 11: tita=2*(Math.PI)*(5/37);
            break;
        case 30: tita=2*(Math.PI)*(6/37);
            break;
        case 8: tita=2*(Math.PI)*(7/37);
            break;
        case 23: tita=2*(Math.PI)*(8/37);
            break;
        case 10: tita=2*(Math.PI)*(9/37);
            break;
        case 5: tita=2*(Math.PI)*(10/37);
            break;
        case 24: tita=2*(Math.PI)*(11/37);
            break;
        case 16: tita=2*(Math.PI)*(12/37);
            break;
        case 33: tita=2*(Math.PI)*(13/37);
            break;
        case 1: tita=2*(Math.PI)*(14/37);
            break;
        case 20: tita=2*(Math.PI)*(15/37);
            break;
        case 14: tita=2*(Math.PI)*(16/37);
            break;
        case 31: tita=2*(Math.PI)*(17/37);
            break;
        case 9: tita=2*(Math.PI)*(18/37);
            break;
        case 22: tita=2*(Math.PI)*(19/37);
            break;
        case 18: tita=2*(Math.PI)*(20/37);
            break;
        case 29: tita=2*(Math.PI)*(21/37);
            break;
        case 7: tita=2*(Math.PI)*(22/37);
            break;
        case 28: tita=2*(Math.PI)*(23/37);
            break;
        case 12: tita=2*(Math.PI)*(24/37);
            break;
        case 35: tita=2*(Math.PI)*(25/37);
            break;
        case 3: tita=2*(Math.PI)*(26/37);
            break;
        case 26: tita=2*(Math.PI)*(27/37);
            break;
        case 0: tita=2*(Math.PI)*(28/37);
            break;
        case 32: tita=2*(Math.PI)*(29/37);
            break;
        case 15: tita=2*(Math.PI)*(30/37);
            break;
        case 19: tita=2*(Math.PI)*(31/37);
            break;
        case 4: tita=2*(Math.PI)*(32/37);
            break;
        case 21: tita=2*(Math.PI)*(33/37);
            break;
        case 2: tita=2*(Math.PI)*(34/37);
            break;
        case 25: tita=2*(Math.PI)*(35/37);
            break;
        case 17: tita=2*(Math.PI)*(36/37);
            break;
    }

    console.log(tita);
    return tita;
}
var intervalid;
/**
*   Sirve para empezar la animacion
*   @method comenzarAnimacion
*/
let comenzaranimacion =()=>{
    console.log ("Se llamo a comenzar animacion");
    intervalid= setInterval(girarpelota,10);
}

var angulo = 0;
var vuelta =0;
/**
 * Sirve para girar la pelota de la ruleta
 * @method pelotaruleta
 */
let girarpelota =()=>{
    var canvas = document.getElementById("ruletamov");
    var ctx = canvas.getContext("2d");
    var centroX = canvas.width/2;
    var centroY = canvas.height / 2;
    console.log(centroY);
    console.log(centroX);
    var radio = 69;
    var dmov = 0.02;
    var dtita= gradosimg();


        canvas.width=canvas.width;


        var x = centroX + Math.cos(angulo) * radio;
        var y = centroY + (Math.sin(angulo) * radio)/2;


        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        angulo+=dmov;

        if (angulo >= (Math.PI * 4)+dtita) {
            vuelta++;
            if (vuelta >= 2) {
                clearInterval(intervalid);
                angulo=0;
                x = centroX + Math.cos(dtita) * radio;
                y = centroY + (Math.sin(dtita) * radio)/2;

                canvas.width=canvas.width;
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fillStyle = "white";
                ctx.fill();
                return;
            }
        }
    }
