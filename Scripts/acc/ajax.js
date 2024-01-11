
//actualizar cuenta pago
$("#FPago").change(function () {
    
    var fPagoid = $(this).val();
    $.get("/accounting/formaspago/GetFormasPagoById", { id: fPagoid })
    .done(function (data) {
        $("#cta_1").val(data.CodigoCuenta).trigger("change");
    })

})


function VerifyGeneral() {
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: 'Verify',

        success: function (data) {
            return data;
        },
        error: function (data) {
            alert('Error');
        }
    });
    //aca iria llamada verify y retorna data
}

//to check all checkboxes
$(document).on('change', '#check_all', function () {
    $('input[class=case]:checkbox').prop("checked", $(this).is(':checked'));
});


function debito_credito(id) {
    var index = id.split("_")[1];
    if (id.slice(0, 1) == "d") { $("#credito_" + index).val(0); }
    else { $("#debito_" + index).val(0); }
}

$(".addmore").on('click', function () {
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: 'AddEntry',
        success: function (data) {
            // alert(data);
            addNewRow(data);

            //$(".nc_oculto").each(function () {
            //    $(this).prop('disabled', true);
            //})
            //$(".decimal").each(function () {
            //    $(this).autoNumeric('init');
            //})
        },
        error: function (data) {
            alert('Error');
        }
    });
});

$(".verify").on('click', function () {
    // consecutivo += 1; //lo traigo por ajax 

    //NUEVO
    $('#mensajes-error #info-error').empty();
    $('#mensajes-alerta #info-alerta').empty();
    //FIN NUEVO

    $.ajax({
        cache: false,
        type: "GET",
        dataType: "json",
        url: 'Verify',

        success: function (data) {
            if (data.IsOk) {

                $.get("Asentar")
                    .done(function (data) {
                        //  $.get("/Accounting/Movimientos/index");
                        window.open("ImprimirFromSession", '_blank');
                        window.location.replace("/Accounting/Movimientos/nuevo");
                   // alert("OK");
                    }).fail(function (response) {
                        alert("ERROR");
                    })
            }

            if (data.Issues.Errors.length > 0) { $('#mensajes-error').show(); }
            if (data.Issues.Warnings.length > 0) { $('#mensajes-alerta').show(); }
            for (x = 0; x < data.Issues.Errors.length; x++)
            { $('#mensajes-error #info-error').append("<p> -" + data.Issues.Errors[x].Message + "</p>"); }
            for (y = 0; y < data.Issues.Warnings.length; y++)
            { $('#mensajes-alerta #info-alerta').append("<p> -" + data.Issues.Warnings[y].Message + "</p>"); }

        },
        error: function (data) {
            alert('Error');
        }
    });
});

function addNewRow(consecutivo) {

    //  Obtengo la clase segun si es Even o Odd
    var c = "";
    var i2 = consecutivo;

    if ($("table tr").length % 2) { c = "info"; } else { c = "success"; }

    var newTR = $('<tr class="r" id="tr">').attr("data-index", consecutivo).appendTo("#anotaciones");
    //var newTR = $('<tr class="r" id="tr' + consecutivo + '">').attr("data-index", consecutivo).appendTo("#anotaciones");

    newTR.attr("class", c);
    newTR.append('<td style="text-align:center;"><p style="margin:0px;">' + i2 + '</p><input class="case" type="checkbox"/></td>');

    //  //creo el select  en su td
    var tdS2 = $('<td>').appendTo(newTR);
    tdS2.append('<select data-type="auxiliares" class="ctas" id="cta_' + i2 + '" ></select>');


    //el detalle
    //porngo la descripcion de 
    var detalleComprobante = $("#Detalle").val();
    newTR.append('<td class="nc-oculto" ><input type="text" id="detalle_' + i2 + '" value="'+detalleComprobante+'" class="form-control"></td>');
    //el select para terceros
    var tdS2 = $('<td class="nc-oculto">').appendTo(newTR);
    tdS2.append('<select id="terceros_' + i2 + '" data-type="terceros"  class="select2-container.input-mini" ></select>');


    //el select para CC
    var tdS2 = $('<td class="nc-oculto">').appendTo(newTR);
    //tdS2.append('<select id="cc' + i2 + '" data-type="CC"  class="select2-container.input-mini cc" ></select>');
    tdS2.append('<select id="cc_' + i2 + '" data-type="CC"  class="cc" ></select>');
    //epara base
    newTR.append('<td class="nc-oculto" ><input type="text" id="base_' + i2 + '" class="form-control decimal"></td>');

    //epara debito
    newTR.append('<td class="nc-oculto" ><input type="text" id="debito_' + i2 + '" class="form-control decimal" onkeypress="debito_credito(this.id)"></td>');

    //epara credito
    newTR.append('<td class="nc-oculto" ><input type="text" id="credito_' + i2 + '" class="form-control decimal" onkeypress="debito_credito(this.id)"></td>');

    //NUEVO
    newTR.append('<td class="nc-oculto"><i class="fa fa-exclamation-triangle" onclick="vererrores(' + i2 + ');"  style="color:orange; font-size:12px;" aria-hidden="true"></i>');
    //FIN NUEVO


    //$('#base_' + i2 + '').autoNumeric('init');
    //$('#debito_' + i2 + '').autoNumeric('init');
    //$('#credito_' + i2 + '').autoNumeric('init');
}

//cambio en una cuenta, obtiene las caracteristicas de la cuenta
$(document).on('change', '.ctas', function () {

    //NUEVO
    $("#mi_alerta").show();
    $(".nc-oculto").show();
    //FIN NUEVO

    var t = $(this).val();
    var ul = $('<ul>');
    var i = $(this).parent().parent().data("index")
    $.ajax({
        url: "/accounting/plandecuentas/GetCuentas"
        , type: "GET"
        , dataType: 'json'
        , data: { "term": t }
        , success: function (result) {

            var detalle = result[0].NOMBRE;
            var terceroFP = $('#select2-terceros_1-container')[0].innerHTML;
            var item = result[0];
         //   var cc = 
          //  alert(terceroFP);
         //   $(result).each(function (index, item) {

                $("#detalle_" + i).val(detalle);

                if(item.REQTERCERO == true) {
                    $("span[aria-labelledby=select2-terceros_" + i + "-container]").css("background-color", "#f2dede");
                    $("#terceros_" + i).prop('disabled', false);
                 //   alert(terceroFP);
                    //$('#terceros_' + i).val(terceroFP).trigger('change');

                    //setel el valor en el select2
                    //if (i != 0)
                    //    {
                    $("#terceros_" + i).empty().append('<option value="' + terceroFP + '">' + terceroFP + '</option>').val(terceroFP).trigger('change');
                    //}
            

                }
                else {
                    $("#terceros_" + i).removeAttr("style");
                    $("#terceros_" + i).prop('disabled', true);
                }

                if (item.REQCCOSTO == true) {
                    $("span[aria-labelledby='select2-cc" + i + "-container']").css("background-color", "#f2dede");
                    $("#cc" + i).prop('disabled', false);


                }
                else {
                    $("#cc" + i).prop('disabled', true);
                    $("#cc" + i).removeAttr("style");
                }

                if ($("#detalle_" + i).val() == "") {
                    $("#detalle_" + i).focus();
                    $("#detalle_" + i).css("background-color", "#f2dede");

                }
                else {
                    $("#detalle_" + i).removeAttr("style");
                }

                if (item.EsCuentaImpuesto == true) {
                    $("#base_" + i).css("background-color", "#f2dede");
                    $("#base_" + i).prop('disabled', false);
                    $("#base_" + i).attr('data-base', item.Base);
                    $("#base_" + i).attr('data-porcentaje', item.Porcentaje);
                    $("#base_" + i).attr('data-naturaleza', item.NATURALEZA);
                    $("#debito_" + i).prop('disabled', true);
                    $("#credito_" + i).prop('disabled', true);
                }
                else {
                    $("#base_" + i).removeAttr("style");
                    $("#base_" + i).prop('disabled', true);
                    $("#debito_" + i).prop('disabled', false);
                    $("#credito_" + i).prop('disabled', false);
                    $("#base_" + i).removeAttr('data-base');
                    $("#base_" + i).removeAttr('data-porcentaje');
                    $("#base_" + i).removeAttr('data-naturaleza');
                }
               
              
         //   })//fin foreach
        }
    });


});

//cambio en una anotacion
$(document).on('change keyup', "#tr", function () {

    var t = $(this).attr("data-index");
    var items = $(this).find("td");

    var cta = items.find("select[id*='cta']").val();

    if (cta == null) {
        cta = items.find("input[id*='cta']").val();
    }
    var detalle = items.find("input[id*='deta']").val();
    var tercero = items.find("select[id*='terce']").val();
    var cc = items.find("select[id*='cc']").val();
    var base = items.find("input[id*='base']").val();
    var debito = items.find("input[id*='debito']").val();
    var credito = items.find("input[id*='credito']").val();
    
    //Calcular base
    var base_maxima = $("#base_" + t).attr("data-base");
    var base_porcentaje = $("#base_" + t).attr("data-porcentaje");
    var base_naturaleza = $("#base_" + t).attr("data-naturaleza");
   
    var basec = parseFloat(base.split(",").join(""));
    if (basec > parseFloat(base_maxima).toFixed(2))
    {
        if(base_naturaleza=="D")
        {
            var  debitovalor=(parseFloat(basec) * base_porcentaje) / 100;
            $("#debito_" + t).val(debitovalor);
        }
        else
        {
            var  creditovalor=(parseFloat(basec) * base_porcentaje) / 100;
            $("#credito_" + t).val(creditovalor);
        }
    }
    else if (basec < parseFloat(base_maxima).toFixed(2))
    {
        $("#debito_" + t).val(0);
        $("#credito_" + t).val(0);
    }
    //Fin calcular

    var anotacion =
        {
            Cuenta: cta,
            Descripcion: detalle,
            Tercero: tercero,
            CentroDeCosto: cc,
            Base: base,
            Debito: debito,
            Credito: credito,
            Index: t
        };

    $.post("updateEntry", anotacion).
        done(function (data) {

            Verify();

            //$(".decimal").each(function () {
            //    $(this).autoNumeric('init');
            //})

        }).
        fail(function () {
            alert("error");
        });
});

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


function Verify() {
    $.ajax({
        cache: false,
        type: "GET",
        dataType: "json",
        url: 'Verify',

        success: function (data) {

            //actualizo saldos
            var totCredito = data.Saldos.Credito;
            var totDebito = data.Saldos.Debito;
            // alert(totCredito);
            //   $(".credito_ce").val(totDebito);
            $("#totDebito").val(totDebito);
            $("#totCredito").val(totCredito);

            //actualizo FormaDepago saldo

            if (data.Clase != "NC") {
                $("#credito_1").val(data.FP.Credito);
                $("#debito_1").val(data.FP.Debito);
            }


            //alert(data.FP.Credito);
            //alert(data.FP.Debito);

            //   $(".verify").click();

        }
    });
}

$(".cerrar-info").click(function () {
    $(this).parent().hide("slow");
});

///UPDATE COMPROBANTE
$(document).on('change blur', '#encabezado', function () {
    //alert("cambio en el envasdsaabezado")
    var inputs = $("#encabezado :input");

    $.ajax({
        url: "../Movimientos/UpdateComprobante",
        type: "POST",
        data: inputs,
        success: function (response) {
            // alert(response);
        }

    });

});

///DELETE ANOTACION
$(".delete").click(function () {
    //obtengo las anotaciones seleccionada
    var selectedRows = $('input[class=case]:checkbox:checked');

    $.each(selectedRows, function (index, value) {
        var index2BeDeleted = value.parentElement.parentNode.getAttribute("data-index");

        $.ajax({
            cache: true,
            type: "POST",
            dataType: "json",
            data: { "index": index2BeDeleted },
            url: 'RemoveEntry',
            success: function (response) {
                if (response.result) {
                    RemoveRow(index2BeDeleted);
                    Verify();


                }
                else {
                    alert("error");
                }


            }
            ,
            error: function (data) {
                alert('Error');
            }
        });

        //$.post("DeleteEntry", index2BeDeleted)
        //    .done(function (response) {
        //        if (response == true)
        //        {
        //            alert("borrado del servidor");
        //            deleteRow(index2BeDeleted);
        //            //ahora borro la tr

        //            //repinto
        //        }
        //        if (respond == false)
        //        {
        //            alert("ERROR: No se puedo eliminar del servidor");
        //        }


        //    })
        //    .fail(function (response) {
        //        alert(response);
        //    });
        //   alert(value.parentElement.parentNode.getAttribute("data-index"));
        //alert(value.parents("tr").data("index"));
    })
    // alert("Delete");
})

function RemoveRow(index) {

    var row2BeDeleted = $('tr[data-index=' + index + ']')
    //borro desde el id anotaciones

    row2BeDeleted.remove();
    //pintar rows
    repaintRows();

}

function vererrores(ind) {
    $('#mensajes-error #info-error').empty();
    $('#mensajes-alerta #info-alerta').empty();
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: 'Verify',
        success: function (data) {


            if ((data.Issues.Warnings == 0) && (data.Issues.Warnings == 0)) {

                $('#icono_' + ind).removeClass();
                $('#icono_' + ind).addClass('fa fa-check-circle');
                $('#icono_' + ind).css('color', 'green');
            }
            else {
                $('#icono_' + ind).removeClass();
                $('#icono_' + ind).addClass('fa fa-exclamation-triangle');
                $('#icono_' + ind).css('color', 'orange');
            }

            if (data.Issues.Errors.length > 0) { $('#mensajes-error').show(); }
            else { $('#mensajes-error').hide(); }
            for (x = 0; x < data.Issues.Errors.length; x++) {
                if (data.Issues.Errors[x].Index == ind) {
                    $('#mensajes-error #info-error').append("<p> -" + data.Issues.Errors[x].Message + "</p>");
                }
            }

            if (data.Issues.Warnings.length > 0) { $('#mensajes-alerta').show(); }
            else { $('#mensajes-alerta').hide(); }
            for (y = 0; y < data.Issues.Warnings.length; y++) {
                if (data.Issues.Warnings[y].Index == ind) {
                    $('#mensajes-alerta #info-alerta').append("<p> -" + data.Issues.Warnings[y].Message + "</p>");
                }
            }
        },
        error: function (data) {
            alert('Error');
        }
    });
}



////It restrict the non-numbers
//var specialKeys = new Array();
//specialKeys.push(8, 46); //Backspace
//function IsNumeric(e) {
//    var keyCode = e.which ? e.which : e.keyCode;
//    //  console.log(keyCode);
//    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
//    return ret;
//}

/*TODO*/
function repaintRows() {
    //esto sucedee al elminar una row debo repitanr las clases
    var cont = 1;
    $("#anotaciones tbody tr").each(function () {
        $(this).removeClass();
        if (cont % 2) { $(this).addClass("info"); } else { $(this).addClass("info2"); }
        cont++;
    });
}
//NUEVO
$(document).on('click', '.cerrar-info', function () {

    $(this).parent().hide("slow");
});
//FIN NUEVO

$(document).ready(function () {

    repaintRows();
    $("#cta_1").on("click", function () {

        //  alert("cta1 cambio");
    });


        var fPagoid = $("#FPago").val();
        $.get("/accounting/formaspago/GetFormasPagoById", { id: fPagoid })
        .done(function (data) {
            $("#cta_1").val(data.CodigoCuenta).trigger("change");
        })

});