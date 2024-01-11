/** don't spend 5 minutes, use my code **/
//function prettyFloat(x, nbDec) {
//    if (!nbDec) nbDec = 100;
//    var a = Math.abs(x);
//    var e = Math.floor(a);
//    var d = Math.round((a - e) * nbDec); if (d == nbDec) { d = 0; e++; }
//    var signStr = (x < 0) ? "-" : " ";
//    var decStr = d.toString(); var tmp = 10; while (tmp < nbDec && d * tmp < nbDec) { decStr = "0" + decStr; tmp *= 10; }
//    var eStr = e.toString();
//    return signStr + eStr + "." + decStr;
//}

function cambiarBase()
{
    var base_maxima = $("#base_" + t).attr("data-base");
    var base_porcentaje = $("#base_" + t).attr("data-porcentaje");
    var base_naturaleza = $("#base_" + t).attr("data-naturaleza");

    alert(parseInt(base).toFixed(2));
    if (parseInt(base).toFixed(2) > parseFloat(base_maxima).toFixed(2)) {
        alert("entro");
        if (base_naturaleza == "D") {
            $("#debito_" + t).val((parseInt(base) * base_porcentaje) / 100);
        }
        else {
            $("#credito_" + t).val((parseInt(base) * base_porcentaje) / 100);
        }
    }
}

