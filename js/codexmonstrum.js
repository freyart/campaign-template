$(document).ready(function(){
    FillListForCodex();
});

function FillListForCodex()
{
    $.getJSON('src/stats.json')
    .fail(function() {
        console.error('Fichier de stats non disponible.');
    })
    .done(function(data) {
        var listeMonstres = data.monsters.sort(function(a,b) { return a.name.localeCompare(b.name); })
        listeMonstres.forEach(element => {
            var ligne = $('<tr>');
            ligne.append($('<td>').append($('<a>').css('cursor','pointer').css('text-decoration','underline').append(element.name).on('click', function(){ ShowMonster(this.text);} )));
            ligne.append($('<td>').append(element.category));
            ligne.append($('<td>').append(element.challenge));
            $('#tbListeMonstres tbody').append(ligne); 
        });

        $('#tbListeMonstres').DataTable( {

        });
    })
}

function ShowMonster(name){
    $.getJSON('src/stats.json')
    .fail(function() {
        console.error('Fichier de stats non disponible.');
    })
    .done(function(data) {
        var leMonstre = PopMonster(name, data.monsters);
        if (leMonstre != null ){
            $('#monsterblock').html(GenererFiche(leMonstre));
        }
    })
}

function PopMonster(name, dataset){
    for (var i = 0; i < dataset.length; i++){
        if (dataset[i].name === name){
            return dataset[i];
        }
    }
    return null;
}
