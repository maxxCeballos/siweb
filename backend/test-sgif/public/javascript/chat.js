//animacion
(function ($) {
    $(document).ready(function () {
        var $chatbox = $('.chatbox'),
            $chatboxTitle = $('.chatbox__title'),
            $chatboxTitleClose = $('.chatbox__title__close'),
            $chatboxCredentials = $('.chatbox__credentials');
        $chatboxTitle.on('click', function () {
            $chatbox.toggleClass('chatbox--tray');
        });
        $chatboxTitleClose.on('click', function (e) {
            e.stopPropagation();
            $chatbox.addClass('chatbox--closed');
        });
        $chatbox.on('transitionend', function () {
            if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
        });

    });

    var input = $("#btn-input");
    input.keydown(function (e) {
        if (e.keyCode === 13) {
            enviarMsj();
        }
    })

})(jQuery);



//mensajes
function enviarMsj() {
    var usr = "Secretaria1";
    var input = $("#btn-input");
    var mensaje = $(input).val();
    $(input).val('');

    if (mensaje === "" || mensaje === null) {
        return false;
    }

    //Agrego el mensaje escrito en el chat    
    agregarMsjChat(mensaje, usr, fechaHora(new Date()));

    console.log("el mensaje ", mensaje);
    fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            mensaje: mensaje,
            usr: usr
        })
    }).then(response => response.json())
        //agregar respuesta en chat 
        .then(data => agregarRespuestaChat(data.response.out, data.response.who, fechaHora(new Date())));
}

function agregarMsjChat(mensaje, usr, fechaHora) {
    //agrega los mjs escritos por el usr
    var contMsj = $('#cuerpoChat');
    const html = '<div class="chatbox__body__message chatbox__body__message--left">' +
        '<div class="chatbox_timing">' +
        '<ul>' +
        '<li><a href="#"><i class="fa fa-calendar"></i>' + `${fechaHora}` + '</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="ul_section_full">' +
        '<ul class="ul_msg">' +
        '<li id="nombreUsr"><strong>' + `${usr}` + '</strong></li>' +
        '<li>' + `${mensaje}` + '</li>' +
        '</ul>' +
        '<div class="clearfix"></div>' +
        '</div>' +
        '</div >'

    contMsj.append(html);
}

function agregarRespuestaChat(mensaje, usr, fechaHora) {
    //agrega los mjs escritos por el bot u otro usr
    var contMsj = $('#cuerpoChat');
    const html = '<div class="chatbox__body__message chatbox__body__message--right">' +
        '<div class="chatbox_timing">' +
        '<ul>' +
        '<li><a href="#"><i class="fa fa-calendar"></i>' + `${fechaHora}` + '</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="ul_section_full">' +
        '<ul class="ul_msg">' +
        '<li id="nombreUsr"><strong>' + `${usr}` + '</strong></li>' +
        '<li>' + `${mensaje}` + '</li>' +
        '</ul>' +
        '<div class="clearfix"></div>'
    '</div>'
    '</div> '

    contMsj.append(html);
}

function fechaHora(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    var strDate;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var strTime;

    //Conversor horario
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    strTime = hours + ':' + minutes + ' ' + ampm;

    //Conversor fecha
    if (month < 10) {
        strDate = `${day}-0${month}-${year}`;
    } else {
        strDate = `${day}-${month}-${year}`;
    }

    console.log(strDate + " " + strTime)

    return strDate + " " + strTime;
}