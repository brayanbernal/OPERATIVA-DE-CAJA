var table;
var dtTable;
var dtTable2;

//desactivar tecla enter
$('form').keypress(function (e) {
    if (e == 13) {
        return false;
    }
});

$('input').keypress(function (e) {
    if (e.which == 13) {
        return false;
    }
});
//desactivar tecla enter

function agregarDataTable3(tabla, columnas, urlDatos, botones, scroll, buscador, seleccion) {
    var TraduccionDatatable = {
        "sProcessing": "Procesando...", "sLengthMenu": "Mostrar _MENU_ registros", "sZeroRecords": "No se encontraron resultados", "sEmptyTable": "No hay registros", "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros", "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros", "sInfoFiltered": "(filtrado de un total de _MAX_ registros)", "sInfoPostFix": "", "sSearch": "Buscar:", "sUrl": "", "sInfoThousands": ",", "sLoadingRecords": "Cargando...", "select": { "rows": { _: "Has seleccionado %d filas", 0: "", 1: "1 fila seleccionada" } }, "oPaginate": { "sFirst": "<<", "sLast": ">>", "sNext": ">", "sPrevious": "<" }, "oAria": { "sSortAscending": ": Activar para ordenar la columna de manera ascendente", "sSortDescending": ": Activar para ordenar la columna de manera descendente" }
    };
    dtTable2 = $(tabla).DataTable({
        dom: 'Bfrtip',
        ajax: {
            type: "POST",
            url: urlDatos,
            contentType: 'application/json; charset=utf-8',
            data: function (data) { return data = JSON.stringify(data); }
        },
        searching: buscador,
        lengthChange: false,
        autoWidth: false,
        scrollX: scroll,
        columns: columnas,
        buttons: botones,
        deferRender: true,
        select: seleccion,
        language: TraduccionDatatable
    });
    dtTable2.buttons().container().appendTo('.col-sm-6:eq(0)');
}


function agregarDataTable2(tabla, columnas, urlDatos, botones, scroll, buscador, seleccion) {
    var TraduccionDatatable = {
        "sProcessing": "Procesando...", "sLengthMenu": "Mostrar _MENU_ registros", "sZeroRecords": "No se encontraron resultados", "sEmptyTable": "No hay registros", "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros", "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros", "sInfoFiltered": "(filtrado de un total de _MAX_ registros)", "sInfoPostFix": "", "sSearch": "Buscar:", "sUrl": "", "sInfoThousands": ",", "sLoadingRecords": "Cargando...", "select": { "rows": { _: "Has seleccionado %d filas", 0: "", 1: "1 fila seleccionada" } }, "oPaginate": { "sFirst": "<<", "sLast": ">>", "sNext": ">", "sPrevious": "<" }, "oAria": { "sSortAscending": ": Activar para ordenar la columna de manera ascendente", "sSortDescending": ": Activar para ordenar la columna de manera descendente" }
    };
    dtTable = $(tabla).DataTable({
        dom: 'Bfrtip',
        ajax: {
            type: "POST",
            url: urlDatos,
            contentType: 'application/json; charset=utf-8',
            data: function (data) { return data = JSON.stringify(data); }
        },
        searching: buscador,
        lengthChange: false,
        autoWidth: false,
        scrollX: scroll,
        columns: columnas,
        buttons: botones,
        deferRender: true,
        select: seleccion,
        language: TraduccionDatatable
    });
    dtTable.buttons().container().appendTo('.col-sm-6:eq(0)');    
}

function agregarDataTable(tabla, columnas, urlDatos, botones, scroll, buscador, seleccion) {
    var TraduccionDatatable = {
        "sProcessing": "Procesando...", "sLengthMenu": "Mostrar _MENU_ registros", "sZeroRecords": "No se encontraron resultados", "sEmptyTable": "No hay registros", "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros", "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros", "sInfoFiltered": "(filtrado de un total de _MAX_ registros)", "sInfoPostFix": "", "sSearch": "Buscar:", "sUrl": "", "sInfoThousands": ",", "sLoadingRecords": "Cargando...", "select": { "rows": { _: "Has seleccionado %d filas", 0: "", 1: "1 fila seleccionada" } }, "oPaginate": { "sFirst": "<<", "sLast": ">>", "sNext": ">", "sPrevious": "<" }, "oAria": { "sSortAscending": ": Activar para ordenar la columna de manera ascendente", "sSortDescending": ": Activar para ordenar la columna de manera descendente" }
    };
    table = $(tabla).DataTable({
        dom: 'Bfrtip',
        ajax: {
            type: "POST",
            url: urlDatos,
            contentType: 'application/json; charset=utf-8',
            data: function (data) { return data = JSON.stringify(data); }
        },
        searching: buscador,
        lengthChange: false,
        autoWidth: false,
        scrollX: scroll,
        columns: columnas,
        buttons: botones,
        deferRender: true,        
        select: seleccion,
        language: TraduccionDatatable
    });
    table.buttons().container().appendTo('.col-sm-6:eq(0)');
}

//formato fecha
function FormatoFecha(Jsonfecha) {
    var value = new Date
    (
         parseInt(Jsonfecha.replace(/(^.*\()|([+-].*$)/g, ''))
    );
    var dat =  value.getDate() +
                           "/" +
        (value.getMonth() + 1) +                                            
                           "/" +
           value.getFullYear() +
                           " " +
              value.getHours() +
                           ":" +
            value.getMinutes() +
                           ":" +
           value.getSeconds();
    return dat;
}//formato fecha

function AportesIndex() {
    //DATATABLES
    var columnas = [
        { data: "numeroCuenta" },
        { data: "nit" },
        { data: "nombres" },            
        { data: "tipoPago" },
        { data: "porcentaje" },
        { data: "valor", render: function (data) { return formatearNumero(data); } },
        { data: "valorCuota", render: function (data) { return formatearNumero(data); } },
        { data: "totalAportes", render: function (data) { return formatearNumero(data); } },
        { data: "fechaApertura", render: function (data) { return FormatoFecha(data); } },
        { data: "empresa" },
        { data: "dependencia" },
        { data: "activa", render: function (data) {return data ? "Si" : "No" } }
    ];

    var botones = [
        {
            text: "Nueva Afiliacion",
            action: function () {
                $("#AfiliarAporte").modal("show");
            }
        },
        {
            text: "Editar",
            action: function () {
                if (table.rows({ selected: true }).count() == 1) {
                    $("#AfiliarAporte").modal("show");
                    $("#formAfiliacion").attr("action", "/Aportes/Aportes/EditarFichaAporte");
                    $("#idPersona").val(table.rows({ selected: true }).data()[0]["nit"]).prop("readonly",true);
                    $("#nomPersona").text(table.rows({ selected: true }).data()[0]["nombres"]);
                    $("#empresa").val(table.rows({ selected: true }).data()[0]["empresa"]);
                    $("#agencia").val(table.rows({ selected: true }).data()[0]["oficina"]);
                    $("#tipoPago").val(table.rows({ selected: true }).data()[0]["tipoPago"]);
                    $("#porcentaje").val(table.rows({ selected: true }).data()[0]["porcentaje"]);
                    $("#valor").val(table.rows({ selected: true }).data()[0]["valor"]);
                    $("#activa").val(table.rows({ selected: true }).data()[0]["activa"].toString());
                } else {
                    swal({ title: "Recuerda", text: "Primero selecciona un registro", confirmButtonText: "Lo recordare" });
                }
            }
        },
        {
            text: "Ver Detalles",
            action: function () {
                if (table.rows({ selected: true }).count() == 1) {                    
                    var numeroFicha = table.rows({ selected: true }).data()[0]["numeroCuenta"];
                    var totalAportes = table.rows({ selected: true }).data()[0]["totalAportes"] == null ? "0" : table.rows({ selected: true }).data()[0]["totalAportes"] == null;
                    var columnas =
                        [
                            { data: "numeroFicha" },
                            { data: "valorPagado", render: function (data) { return formatearNumero(data); } },
                            { data: "fechaPago", render: function (data) { return FormatoFecha(data); } }
                        ];
                    var botones =
                        [
                            {
                                extend: 'collection',
                                text: 'Exportar A',
                                autoClose: true,
                                buttons: [
                                    {
                                        extend: 'excel',
                                        text: "Excel",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        text: "PDF",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        extend: 'print',
                                        text: "Imprimir",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    }
                                ]
                            },
                            {
                                text: "Ocultar",
                                action: function () {
                                    $("#detallesFichas").hide();
                                }
                            }
                        ];
                    $("#tablaADetallesAportes").dataTable().fnDestroy();
                    agregarDataTable2("#tablaADetallesAportes", columnas, "/Aportes/Aportes/ObtenerDetallesFichasAportes?numeroFicha=" + numeroFicha, botones, false, true, false);
                    $("#total").text("$"+totalAportes);
                    $("#detallesFichas").show();
                    $('html,body').animate({
                        scrollTop: $("#tablaADetallesAportes").offset().top
                    }, 1000);
                } else {
                    swal({ title: "Recuerda", text: "Primero selecciona un registro", confirmButtonText: "Lo recordare" });
                }
            }
        },
        {
            extend: 'collection',
            text: 'Exportar A',
            autoClose: true,
            buttons: [
                {
                    extend: 'excel',
                    text: "Excel",
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'pdf',
                    text: "PDF",
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'print',
                    text: "Imprimir",
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ]
        }
    ];

    agregarDataTable("#tablaAfiliadosAportes", columnas, '/Aportes/Aportes/ObtenerAfiliadosAportes', botones, false, true, true);
    table.columns(9).visible(false); table.columns(10).visible(false);
    //FIN DATATABLES

    //mascara valor
    
    //$("#valor").val(formatearNumero($("#valor").val()));
    
    //mascaras valor

    //autocomplete Persona
    $("#idPersona").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Aportes/Aportes/BuscarAsociados",
                type: "POST",
                dataType: "json",
                data: {
                    busqueda: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.nombres, value: item.id, empresa: item.empresa, dependencia: item.dependencia, salario: item.salario };
                    }));
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $('#nomPersona').text(ui.item.label);
            $('#empresa').val(ui.item.empresa);
            $('#agencia').val(ui.item.dependencia);
            $('#salarioAsociado').val(formatearNumero(ui.item.salario));            
            seleccionado();
            return false;
        }, change: function (event, ui) {
            if (!ui.item) {
                $(this).val("");
                $('#nomPersona').text("");
                desseleccionado();
            }
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        },
        focus: function (event, ui) {
            $('#idPersona').val(ui.item.value);
            return false;
        }
    });//autocomplete Persona
}

function AportesConfiguracion()
{
    //mascaras valor
    $("#SaldoMinimo").val(formatearNumero($("#SaldoMinimo").val()));        
    //$("#valor").val(formatearNumero($("#valor").val()));    
    $("#valorCuota").val(formatearNumero($("#valorCuota").val()));
    //mascaras valor
    
    //calculo cuota 
    $("#valor").on("keyup", function () {
        if ($("#idTipoCuotaCalculo").val() == 3) {            
            var cuota = parseFloat(quitarFormato($(this).val())) * parseFloat($("#porcentaje").val()) / 100;
            $("#valorCuota").val(cuota);            
        }
        if ($("#idTipoCuotaCalculo").val() == 4) {
            $("#valorCuota").val($("#valor").val());            
        }
        $("#valorCuota").val(formatearNumero($("#valorCuota").val()));
    });
    $("#porcentaje").on("keyup", function () {
        if ($("#idTipoCuotaCalculo").val() == 3) {
            var cuota = parseFloat(quitarFormato($("#valor").val())) * parseFloat($(this).val()) / 100;
            $("#valorCuota").val(cuota);
            $("#valorCuota").val(formatearNumero($("#valorCuota").val()));
        }
    });
    //calculo cuota 

    //autocomplete cuenta Contable #CAMBIOS JUN/2017
    $("#idCuenta").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/accounting/plandecuentas/GetCuentasAA",
                //url: "/accounting/plandecuentas/GetCuentas4Selects",
                type: "POST",
                dataType: "json",
                data: {
                    term: request.term                    
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.NOMBRE, value: item.CODIGO };
                    }));
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $('#nomCuenta').text(ui.item.label);            
            return false;
        }, change: function (event, ui) {
            if (!ui.item) {
                $(this).val("");
                $('#nomCuenta').text("");                
            }
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        },
        focus: function (event, ui) {
            $('#idCuenta').val(ui.item.value);
            return false;
        }
    });//autocomplete cuenta Contable

    //validacion antes del submit
    $("#guardarConfiguracion").on("click", function (e) 
    {
        e.preventDefault();
        if ($("#idTipoCuotaCalculo").val() == 0) {            
            swal({ title: "Revisa", text: "Todos los campos son obligatorios", type: "warning" });
        }
        else 
        {
            if (!$("#valor").prop("disabled")) {
                if (parseFloat(quitarFormato($("#valorCuota").val())) < parseFloat(quitarFormato($("#SaldoMinimo").val()))) {
                    swal({ title: "Revisa", text: "El valor de la cuota debe ser mayor al saldo minimo", type: "warning" });
                } else {                    
                    swal({ title: "Estas Seguro?", text: "Las fichas de aportes se modificaran, esta seguro de continuar con la operacion?", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Si, Continuar", cancelButtonText: "No, Cancelar", closeOnConfirm: true, closeOnCancel: true }, function (isConfirm) {
                        if (isConfirm) {
                            $("#formConfiguracionAportes").submit();
                        }
                    });
                }
            }
            else
            {
                var texto = "Las fichas de aportes se modificaran, esta seguro de continuar con la operacion?";
                if ($("#idTipoCuotaCalculo").val() == 1 || $("#idTipoCuotaCalculo").val() == 2) texto = "Las fichas de ahorros y aportes se modificaran, esta seguro de continuar con la operacion?";
                swal({ title: "Estas Seguro?", text: texto, type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Si, Continuar", cancelButtonText: "No, Cancelar", closeOnConfirm: true, closeOnCancel: true }, function (isConfirm) {
                    if (isConfirm) {
                        $("#formConfiguracionAportes").submit();
                    }
                });
            }
        }
    });//validacion antes del submit
}

function AhorrosPermanentes() {
    //DATATABLES
    var columnas = [
        { data: "numeroCuenta" },
        { data: "nit" },
        { data: "nombres" },
        { data: "tipoPago" },
        { data: "porcentaje" },
        { data: "valor", render: function (data) { return formatearNumero(data); } },
        { data: "valorCuota", render: function (data) { return formatearNumero(data); } },
        { data: "totalAhorros", render: function (data) { return formatearNumero(data); } },
        { data: "fechaApertura", render: function (data) { return FormatoFecha(data); } },
        { data: "empresa" },
        { data: "dependencia" },
        { data: "activo", render: function (data) { return data ? "Si" : "No" } }
    ];

    var botones = [
        {
            text: "Nueva Afiliacion",
            action: function () {
                $("#AfiliarAhorros").modal("show");
            }
        },
        {
            text: "Editar",
            action: function () {
                if (table.rows({ selected: true }).count() == 1) {
                    $("#AfiliarAhorros").modal("show");
                    $("#formAfiliacion").attr("action", "/Ahorros/Ahorros/EditarFAP");
                    $("#idPersona").val(table.rows({ selected: true }).data()[0]["nit"]).prop("readonly", true);
                    $("#nomPersona").text(table.rows({ selected: true }).data()[0]["nombres"]);
                    $("#empresa").val(table.rows({ selected: true }).data()[0]["empresa"]);
                    $("#agencia").val(table.rows({ selected: true }).data()[0]["oficina"]);
                    $("#tipoPago").val(table.rows({ selected: true }).data()[0]["tipoPago"]);
                    $("#porcentaje").val(table.rows({ selected: true }).data()[0]["porcentaje"]);
                    $("#valor").val(table.rows({ selected: true }).data()[0]["valor"]);
                    $("#activo").val(table.rows({ selected: true }).data()[0]["activo"].toString());
                } else {
                    swal({ title: "Recuerda", text: "Primero selecciona un registro", confirmButtonText: "Lo recordare" });
                }
            }
        },
        {
            text: "Configurar",
            action: function () {
                location.href = "/Ahorros/Ahorros/ConfiguracionFAP"
            }
        },
        {
            text: "Ver Detalles",
            action: function () {
                if (table.rows({ selected: true }).count() == 1) {
                    var numeroFicha = table.rows({ selected: true }).data()[0]["numeroCuenta"];
                    var totalAhorros = table.rows({ selected: true }).data()[0]["totalAhorros"] == null ? "0" : table.rows({ selected: true }).data()[0]["totalAhorros"];
                    var columnas =
                        [
                            { data: "numeroFicha" },
                            { data: "valorPagado", render: function (data) { return formatearNumero(data); } },
                            { data: "fechaPago", render: function (data) { return FormatoFecha(data); } }
                        ];
                    var botones =
                        [
                            {
                                extend: 'collection',
                                text: 'Exportar A',
                                autoClose: true,
                                buttons: [
                                    {
                                        extend: 'excel',
                                        text: "Excel",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        text: "PDF",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        extend: 'print',
                                        text: "Imprimir",
                                        exportOptions: {
                                            columns: ':visible'
                                        }
                                    }
                                ]
                            },
                            {
                                text: "Ocultar",
                                action: function () {
                                    $("#detallesFichas").hide();
                                }
                            }
                        ];
                    $("#tablaADetallesAhorros").dataTable().fnDestroy();
                    agregarDataTable2("#tablaADetallesAhorros", columnas, "/Aportes/Aportes/ObtenerDetallesFichasAportes?numeroFicha=" + numeroFicha, botones, false, true, false);
                    $("#total").text(formatearNumero(totalAhorros));
                    $("#detallesFichas").show();
                    $('html,body').animate({
                        scrollTop: $("#tablaADetallesAhorros").offset().top
                    }, 1000);
                } else {
                    swal({ title: "Recuerda", text: "Primero selecciona un registro", confirmButtonText: "Lo recordare" });
                }
            }
        },
        {
            extend: 'collection',
            text: 'Exportar A',
            autoClose: true,
            buttons: [
                {
                    extend: 'excel',
                    text: "Excel",
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'pdf',
                    text: "PDF",
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'print',
                    text: "Imprimir",
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ]
        }
    ];

    agregarDataTable("#tablaAfiliadosFAP", columnas, '/Ahorros/Ahorros/ObtenerFichasAhorroPermanente', botones, false, true, true);
    table.columns(9).visible(false); table.columns(10).visible(false);
    //FIN DATATABLES

    //mascaras jqPrice        
    $("#valorCuota").val(formatearNumero($("#valorCuota").val()));    
    //mascaras jqPrice

    //autocomplete Persona
    $("#idPersona").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Ahorros/Ahorros/BuscarAsociadosNoAfiliados",
                type: "POST",
                dataType: "json",
                data: {
                    busqueda: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.nombres, value: item.id, empresa: item.empresa, dependencia: item.dependencia,salario: item.salario };
                    }));
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $('#nomPersona').text(ui.item.label);
            $('#empresa').val(ui.item.empresa);
            $('#agencia').val(ui.item.dependencia);            
            $('#salarioAsociado').val(formatearNumero(ui.item.salario));
            seleccionado();
            return false;
        }, change: function (event, ui) {            
            if (!ui.item) {
                $(this).val("");
                $('#nomPersona').text("");
                desseleccionado();
            }
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        },
        focus: function (event, ui) {
            $('#idPersona').val(ui.item.value);
            return false;
        }
    });//autocomplete Persona
}