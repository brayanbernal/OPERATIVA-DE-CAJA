$(document).ready(function () {
    $(".container #caption").text($(".titulo-caption").text());
    $("#volver_funcion").attr("href",$(".rutavolver").text());
});


function llamar_dialogo(url, classicon, ancho, titulo) {
  //  alert(url);
    $("#dialog").html("");
    $("#dialog").dialog({
        classes: {
            "ui-dialog-titlebar": "modalheadergeneral " + classicon
        },
        autoOpen: true,
        width: ancho,
        resizable: false,
        modal: true,
        title: " " + titulo,
        dialogClass: 'no-close',
        closeText: "",
        draggable: true,
        open: function () {
         
           $(this).load(url);
          //  alert(result.val());
        },

    })
    return false;
}





//////////////////////////////////////////////////////////////////////////////////
// Match to Bootstraps data-toggle for the modal
// and attach an onclick event handler
$('a[data-toggle="modal"]').on('click', function (e) {
    //$('a[data-toggle="modal"]').click(function (e) {
    //  e.preventDefault();

    // From the clicked element, get the data-target arrtibute
    // which BS3 uses to determine the target modal
    var target_modal = $(e.currentTarget).data('target');
    // also get the remote content's URL
    //var remote_content = e.data.remote_content;
//    var remote_content = e.data.url;
    var remote_content = e.currentTarget.href;

    // Find the target modal in the DOM
    var modal = $(target_modal);
    // Find the modal's <div class="modal-body"> so we can populate it
   
    var modalBody ="";
    modalBody= $(target_modal + ' .modal-body');
   // modalBody.html("");

    // Capture BS3's show.bs.modal which is fires
    // immediately when, you guessed it, the show instance method
    // for the modal is called
    modal.on('show.bs.modal', function () {
        // use your remote content URL to load the modal body
        modalBody.load(remote_content);
      
    }).modal();
    // and show the modal

    // Now return a false (negating the link action) to prevent Bootstrap's JS 3.1.1
    // from throwing a 'preventDefault' error due to us overriding the anchor usage.
    return false;
});