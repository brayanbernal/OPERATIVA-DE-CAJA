//Theme y Language por defecto para select2
$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("language", "es");

//variable global  para el app
app = {};

/* Mroserov
* app.isNullOrEmpty : Funcion para identificar si un valor es null, vacio ó undefined
* @params val(string): valor a evaluar
* @return (bool): resultado
*/
app.isNullOrEmpty = function (val) {
    return val == null || val == undefined || val == "";
}

/* Mroserov
* app.loader : Funciones para mostrar u ocultar el loader
*/
app.loader = {
    show: function () {
        $("#preloader").show();
    },
    hide: function () {
        $("#preloader").hide();
    }
}

//Variable para enumeraciones
app.enums = {};

//Enumeraciones para opciones
app.enums.opcion = {
    editar: "Editar",
    nuevo: "Nuevo",
    detalle: "Detalle",
    eliminar: "Eliminar",
}

/* Mroserov
* ajaxStart,ajaxStop : Funcion para mostrar loader en todos los llamados ajjax que demoren mas de 300ms
*/
var timerAjax;
$(document).ajaxStart(function () {
    timerAjax && clearTimeout(timerAjax);
    timerAjax = setTimeout(function () {
        app.loader.show();
    }, 500);
}).ajaxStop(function () {
    clearTimeout(timerAjax);
    app.loader.hide();
});