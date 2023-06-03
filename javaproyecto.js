
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


}
var rdoce, rpoi, rcol;
let girarrula =()=> {
    let res, doce, numer, poi, col, suma, apnum, apdo, apco, appa, ccheckbox, ncheckbox,pcheckbox,dcheckbox,gan;
    apnum = Number(document.getElementById("valorapuestanumero").value);
    appa = Number(document.getElementById("valorapuestapar").value);
    apco = Number(document.getElementById("valorapuestacolor").value);
    apdo = Number(document.getElementById("valorapuestadocena").value);
    ccheckbox = document.getElementById("color").checked;
    ncheckbox = document.getElementById("numero").checked;
    pcheckbox = document.getElementById("paroimpar").checked;
    dcheckbox = document.getElementById("docena").checked;
    suma =0;
    if (ccheckbox){
        suma += apco;
        console.log(suma);
    }
    if (ncheckbox){
        suma += apnum;
        console.log(suma);
    }
    if (pcheckbox){
        suma += appa;
        console.log(suma);
    }
    if (dcheckbox){
        suma += apdo;
        console.log(suma);
    }
    document.getElementById("cantapostada").value=suma;
    monto(Number(-suma));
    if (suma ==0){
        alert("Se debe hacer alguna apuesta");
        aceptar=false;
    }
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
        document.getElementById("numresultado").value=res;
        console.log( res);
        console.log( rcol);
        console.log( rdoce);
        console.log( rpoi);

        //Verificar que el resultado es el mismo valor que el que fue apostado
        doce = document.getElementById("doc").value;
        numer =document.getElementById("numeroapuesta").value;
        poi = document.getElementById("par_impar").value;
        col = document.getElementById("col").value;
        if (ncheckbox) {
            if (res == numer) {
                gan= Number(gan + (apnum *36));
                console.log(gan);
            }
        }
        console.log(gan);
        if (dcheckbox) {
            if (rdoce == doce) {
                gan= Number(gan +(apdo *3));
                console.log(gan);
            }
        }
        if (pcheckbox){
        if (rpoi == poi) {
            gan= Number(gan +(appa *2));
            console.log(gan);
        }
    }
    if (ccheckbox) {
        if (rcol == col) {
            if (col == "verde"){
                gan=Number(gan +(apco*36));
                console.log(gan);
            }else {
                gan=Number(gan +(apco*2));
                console.log(gan);
            }
        }
    }
        document.getElementById("ganacias").value= gan;
        monto(gan);
        alert("Resultados:  " +
            "   Color: "+ rcol +
            "   Numero:   "+ res +
            "   Par o impar:  "+ rpoi+
            "   Docena: "+ rdoce);
    }
}
