$(document).ready(function(){
    fillBestiary();
    var searchContent = findGetParameter('s');
    if(searchContent != null){
        showMonster(searchContent, "#monsterblock");
    }
});

function fillBestiary()
{
    var table = $('#tbListeMonstres').DataTable({
        ajax: {
            "url": "src/stats.json",
            "dataSrc": "monsters"
        },
        columns: [
            { data: 'name' },
            { data: 'category' },
            { data: 'challenge' }
        ],
        language: {
            search: "Chercher",
            zeroRecords: "Aucun résultat."
        }        
    });
 
    $('#tbListeMonstres tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        $('#monsterblock').html(GenererFiche(data));
    });
}

function showMonster(name, cible){
    $.getJSON('src/stats.json')
    .fail(function () {
        console.error('Fichier de monstres non disponible.')
    })
    .done(function (data) {
        var monstreTrouve = data["monsters"].find(stat => stat.name.toLowerCase() === name.toLowerCase());
        $(cible).html(GenererFiche(monstreTrouve));
    })
}