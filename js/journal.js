$(document).ready(function () {
    LoadJournal();
});


function LoadJournal() {
    $.getJSON('src/journal.json')
        .fail(function () {
            console.error('Journal non disponible.');
        })
        .done(function (data) {
            var sortedJournal = data.journal.sort((a,b) => parseInt(b.no) - parseInt(a.no));
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