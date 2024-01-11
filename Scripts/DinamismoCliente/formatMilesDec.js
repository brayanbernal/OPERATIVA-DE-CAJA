/**
 * @author: MALDRU
 * @fileoverview: Funciones para dar formato a un numero en miles y decimales y para limpiar el formato a su estado original.
 * @license: MIT
 */

const separadorMiles = ',';
const separadorDecimal = '.';

/**
 * Da formato al numero pasado por parametro, separando en miles.
 * @param {string} numero Numero a dar formato, el numero solo puede contener un separador decimal y 0 separadores de miles.
 * @return {string} Retorna el numero formateado (separado por miles).
 */
function formatearNumero(numero) {
    if (numero == null || numero == "") return 0;
    //numero de elementos
    var numElementos = numero.length;
    //enteros
    var parteEntera = "E";
    //decimales
    var parteDecimal = "D";
    //bandera para capturar
    var capturarDecimal = false;

    //separar decimales y enteros
    for (var c = 0; c < numElementos; c++) {
        if (numero[c] == separadorDecimal) {
            capturarDecimal = true;
            continue;
        }
        if (capturarDecimal) {
            parteDecimal += numero[c];
        } else {
            parteEntera += numero[c];
        }
    }

    //quito el indicador 'E'
    parteEntera = parteEntera.substr(1);
    //numero de enteros
    numElementos = parteEntera.length;
    //bandera miles
    var tresNumeros = "";
    //var para guardar num formateado
    var numFormateado = "";

    //agregar miles a parte entera
    for (var c = numElementos - 1; c >= 0; c--) {
        tresNumeros = parteEntera[c] + tresNumeros;
        numFormateado = parteEntera[c] + numFormateado;
        if (tresNumeros.length == 3 && c > 0) {
            numFormateado = separadorMiles + numFormateado;
            tresNumeros = "";
        }
    }
    //agregar parte decimal
    if (parteDecimal != "D") {
        numFormateado += separadorDecimal + parteDecimal.substr(1);
    }
    // devolver numero formateado
    return numFormateado;
}

/**
 * Quita el formato, obtenido con la funcion "formatearNumero"
 * @param {string} numero cadena a limpiar formato
 * @return {string} numero sin formato
 */
function quitarFormato(numero) {
    if (separadorMiles == ',') {
        return numero.replace(/,/g, "");
    } else {
        return numero.replace(/./g, "");
    }
}