$(document).ready(function () {
    FillListOfNpcs();
    var searchContent = findGetParameter('s');
    if(searchContent != null){
        GenererFicheNPCParNom(searchContent);
    }
});

function FillListOfNpcs()
{
    var table = $('#tbListeNPCs').DataTable({
        ajax: {
            "url": "src/npcs.json",
            "dataSrc": "npcs-mineurs"
        },
        columns: [
            { data: 'name' },
            { data: 'desc' },
            { data: 'role' },
            { data: 'intro' }
        ],
        paging: false,
        info: false,        
        language: {
            search: "Chercher",
            zeroRecords: "Aucun résultat."
        }        
    });
 
    $('#tbListeNPCs tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        $('#fichenpc').html(GenererFicheNPC(data));
        ReconnaissancePortraits();
    });
}

function GenererFicheNPCParNom(nomNPC){
    $.getJSON('src/npcs.json')
        .fail(function () {
            console.error('Fichier de npcs non disponible.')
        })
        .done(function (data) {
            var npcTrouve = data["npcs-mineurs"].find(npc => npc.name.toLowerCase() === nomNPC.toLowerCase());
            $('#fichenpc').html(GenererFicheNPC(npcTrouve));
        })
}

function GenererFicheNPC(npc)
{
    if (typeof npc !== "undefined")
    {
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
}