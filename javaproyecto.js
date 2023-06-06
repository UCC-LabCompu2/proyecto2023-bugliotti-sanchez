/**
 * modifica el monto disponible
 * @method monto
 */
var aceptar;
let monto =(plata)=>{
    let mont;
    mont = Number(document.montos.montoactual.value) ;
    plata = Number(plata);
    if ((mont+plata)>=0){
        mont+=plata;
        aceptar= true;
        document.getElementById("montoactual").value=mont;
        document.montos.nuevomonto.value="";
    }else{
        alert("El monto disponible no puede quedar en negativo");
        aceptar=false;
    }
}
/**
 * el imput del numero al que se le desea apostar sea un numero entero entre el 0 y el 37
 * @method numruleta
 * */
let numruleta =()=> {
    let valor;
    valor= document.getElementById("numeroapuesta").value;
    console.log(valor);
    if (valor%1!=0){
        alert("no se puede ser numero decimal");
        document.getElementById("numeroapuesta").value= "";
    }
    if (valor<0 || valor>36){
        alert("debe ingresar un numero entre 0 y 36");
        document.getElementById("numeroapuesta").value= "";
    }
}
/**
 * Para no permitir ingresar valor negativos o decimales en los imputs
 * @method negativo
 * @param {string} id -Id del imput
 * @param {number} valor - numero ingresado en el imput
 */
let negativo =(id, valor)=> {
    if (valor%1!=0){
        alert("no se puede ser numero decimal");
        document.getElementById(id).value= "";
    }
    if (valor.includes("-")){
        alert("el numero ingresado es negativo");
        document.getElementById(id).value="";
    }
}
/**
 * Sirve para blanquear todos los campos del sector de apuestas
 * @method blanquear
 */
let blanquear =()=>{
    let ccheckbox, ncheckbox,pcheckbox,dcheckbox, ocolor, onumero, opar, odocena, acolor, apar, anumero, adocena;
    ccheckbox= false;
    ncheckbox= false;
    pcheckbox= false;
    dcheckbox= false;
    ocolor="negro";
    onumero="";
    opar="par";
    odocena="primera";
    acolor="";
    apar="";
    anumero="";
    adocena="";
    document.getElementById("color").checked =ccheckbox;
    document.getElementById("col").value=ocolor;
    document.getElementById("valorapuestacolor").value=acolor;

    document.getElementById("numero").checked =ncheckbox;
    document.getElementById("numeroapuesta").value=onumero;
    document.getElementById("valorapuestanumero").value= anumero;

    document.getElementById("paroimpar").checked =pcheckbox;
    document.getElementById("par_impar").value=opar;
    document.getElementById("valorapuestapar").value= apar;

    document.getElementById("docena").checked =dcheckbox;
    document.getElementById("doc").value=odocena;
    document.getElementById("valorapuestadocena").value= adocena;


}

var rdoce, rpoi, rcol;
/**
 * este funcion sirve para que genere un numero aleatorio entre el 0 y el 36 y poder comprobar  si la apuesta es correcta
 * @method girarula
 */
let girarrula =()=> {
    let res, doce, numer, poi, col, suma, apnum, apdo, apco, appa, ccheckbox, ncheckbox,pcheckbox,dcheckbox,gan;
    //verificar checkbox y que se haya ingresado la cantidad que se desea apostar a cada uno
    ccheckbox = document.getElementById("color").checked;
    ncheckbox = document.getElementById("numero").checked;
    pcheckbox = document.getElementById("paroimpar").checked;
    dcheckbox = document.getElementById("docena").checked;
    suma =0;
    if (ccheckbox){
        apco = Number(document.getElementById("valorapuestacolor").value);
        if (apco==""){
            alert("Se debe ingresar la cantidad que se desea apostar al color");
        }
        suma += apco;
    }
    if (ncheckbox){
        apnum = Number(document.getElementById("valorapuestanumero").value);
        if (apnum==""){
            alert("Se debe ingresar la cantidad que se desea apostar al numero");
        }
        suma += apnum;

    }
    if (pcheckbox){
        appa = Number(document.getElementById("valorapuestapar").value);
        if (appa==""){
            alert("Se debe ingresar la cantidad que se desea apostar al par/impar");
        }
        suma += appa;
    }
    if (dcheckbox){
        apdo = Number(document.getElementById("valorapuestadocena").value);
        if (apdo==""){
            alert("Se debe ingresar la cantidad que se desea apostar a la docena");
        }
        suma += apdo;

    }
    monto(Number(-suma));
    if (suma ==0){
        alert("Se debe hacer alguna apuesta");
        aceptar=false;
    }
    if (ncheckbox) {
        numer =document.getElementById("numeroapuesta").value;
        if (numer == "") {
            alert("Se debe ingresar el numero al que quiere apostar al numero");
            aceptar=false;
        }
    }
    //se acepta o rechaza la apuesta y empieza a "girar la ruleta"
    if (aceptar) {
        gan =0;
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
        if (res==1 || res ==3 || res ==5 || res == 7 || res ==9 || res ==12 || res ==14 || res ==18 || res ==20 || res ==21 || res ==23 || res == 25 || res ==27 || res ==30 || res ==32 || res ==34 || res ==36){
            rcol = "rojo";
        }else {
            rcol = "negro";
        }
        console.log( res);
        console.log( rcol);
        console.log( rdoce);
        console.log( rpoi);

        //Verificar que el resultado es el mismo valor que el que fue apostado

        if (ncheckbox) {
            if (res == numer) {
                gan= Number(gan + (apnum *36));
            }
        }
        if (dcheckbox) {
            doce = document.getElementById("doc").value;
            if (rdoce == doce) {
                gan= Number(gan +(apdo *3));
            }
        }
        if (pcheckbox){
            poi = document.getElementById("par_impar").value;
        if (rpoi == poi) {
            gan= Number(gan +(appa *2));
        }
    }
    if (ccheckbox) {
        col = document.getElementById("col").value;
        if (rcol=="verde"){
            gan=Number(gan +(apco*36));
        }else if (rcol == col) {
                gan=Number(gan +(apco*2));
        }
    }
        document.getElementById("ganacias").value= gan;
        document.getElementById("numresultado").value=res;
        document.getElementById("cantapostada").value=suma;
        monto(gan);
    }
}
/**
 * Sirve para generar la pelota de la ruleta
 * @method pelotaruleta
 */
let pelotaruleta =()=>{
    const canvas =document.getElementById("ruletamov");
    const ctx = canvas.getContext("2d");
   // canvas.width=canvas.width;
    ctx.fillStyle="#FFFFFFFF";
    ctx.arc(200, 79, 3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}
