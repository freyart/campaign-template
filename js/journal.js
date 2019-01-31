$(document).ready(function () {
    LoadJournal();

    $(document).ready(function() {
        // Configure/customize these variables.
        var showChar = 650;  // How many characters are shown by default
        var ellipsestext = " ...";
        var moretext = "<i class='fas fa-angle-double-right'></i> Lire Plus</a>";
        var lesstext = "Fermer";
            
        $('.more').each(function() {
            var content = $(this).html();
     
            if(content.length > showChar) {
     
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);
     
                var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
     
                $(this).html(html);
            }
     
        });
     
        $(".morelink").click(function(){
            if($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    });
});


function LoadJournal() {
    $.getJSON('src/journal.json')
        .fail(function () {
            console.error('Journal non disponible.');
        })
        .done(function (data) {
            $.each(data.journal, function (i, item) {
                $('#container-journal').append(GenererJournal(data.journal[i]));
            });
        });
}

function GenererJournal(entree) {
    $fiche = $('<div>').addClass('card mb-2 shadow');
    if(entree.isnew){ $fiche.addClass('new')};

    $header = $('<div>').addClass('card-header');
    $titre = $('<h5>').addClass('card-title float-left').append(entree.titre);
    $date = $('<h5>').addClass('float-right').append(entree.date);
    $soustitre = $('<h6>').addClass('card-subtitle ml-3 text-muted').append(entree.soustitre);

    $header.append($('<div>').append($titre).append($date));
    $header.append($('<div>').append($soustitre));

    $body = $('<div>').addClass('card-body more').append(entree.contenu);

    $fiche.append($header).append($body);
    return $fiche;
}