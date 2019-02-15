$(document).ready(function(){
    FillListForCodex();
});

function FillListForCodex()
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
