$(document).ready(function(){
    FillListOfNpcs();
});

function FillListOfNpcs()
{
    $.getJSON('src/npcs.json')
    .fail(function() {
        console.error('Fichier de npcs non disponible.');
    })
    .done(function (data) {
        var listeNPCs = data.npcs.sort(function (a, b) { return a.title.localeCompare(b.title); })
        listeNPCs.forEach(function (npc, index) {
            var ligne = $('<tr>');
            ligne.append($('<td>').append($('<a>').css('cursor', 'pointer').css('text-decoration', 'underline').append(npc.name).on('click', function () { ShowNPC(index); })));
            ligne.append($('<td>').append(npc.desc));
            ligne.append($('<td>').append(npc.role));
            ligne.append($('<td>').append(npc.intro));
            $('#tbListeNPCs tbody').append(ligne);
        });

        $('#tbListeNPCs').DataTable({
            paging: false,
            info: false,
            language: {
                search: "Chercher",
                zeroRecords: "Aucun résultat."
            }
        });
    })

}
function ShowNPC(index) {
    $.getJSON('src/npcs.json')
        .fail(function () {
            console.error('Fichier de npc non disponible.');
        })
        .done(function (data) {
            var npc = data.npcs[index];
            if (npc != null) {
                $('#fichenpc').append(GenererFicheNPC(npc));
            }
            ReconnaissancePortraits();
        })
}

function GenererFicheNPC(npc){
    var bloc = $('<div>').addClass('card').addClass('shadow');
    var header = $('<div>').addClass('card-header');
    header.append($('<h5>').addClass("card-title").append(npc.name));
    if(npc.quote !== ""){
        header.append($('<blockquote>').append(npc.quote));
    }
    var body = $('<div>').addClass('card-body');
    if(npc.portraiturl !== ""){
        body.append($('<div>').addClass('card-picture').append($('<img>').addClass('card-img-top').prop('src',npc.portraiturl).prop('alt',npc.portraitdesc)));
    }
    body.append($('<p>').addClass('card-text').append(npc.description));
    return bloc.append(header).append(body);
}