$(document).ready(function(){
	FillCodex();
});


function FillCodex(){
    $.getJSON('src/stats.json')
    .fail(function() {
        console.error('Fichier de stats non disponible.');
    })
    .done(function(data) {
        var sortedCategories = data.categories.sort(function(a,b) {return a.label.localeCompare(b.label)})
        var sortedMonsters = data.monsters.sort(function(a,b) { return a.name.localeCompare(b.name); });

        $.each(sortedCategories, function(i, item){
            $('#main').append('<h2 id="' + sortedCategories[i].name + '">' + sortedCategories[i].label + '</h2>');
            $('#main').append('<div id="row-' + sortedCategories[i].name + '" class="row"></div>');
            $('#list-categories').append('<li><a href="#' + sortedCategories[i].name + '">' + sortedCategories[i].label + '</a></li>');
        });

        $.each(sortedMonsters, function(i, item)
        {
            $('#row-'+sortedMonsters[i].category).append(GenererFiche(data.monsters[i]));   
        });
    })
}
