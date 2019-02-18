$(document).ready(function () {
    FillLoreList();
    var searchContent = findGetParameter('s');
    if(searchContent != null){
        GenererArticleParNom(searchContent);
    }
});

function FillLoreList() {
    var table = $('#tbArticles').DataTable({
        ajax: {
            "url": "src/codex.json",
            "dataSrc": "codex"
        },
        columns: [
            { data: 'title' },
            { data: 'category' }
        ],
        paging: false,
        info: false,        
        language: {
            search: "Chercher",
            zeroRecords: "Aucun résultat."
        }        
    });

    $('#tbArticles tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        $('#articles').html(GenererArticle(data));
    });
}

function GenererArticle(article){
    var bloc = $('<div>').addClass('card').addClass('shadow');
    var header = $('<div>').addClass('card-header').append($('<h2>').addClass("mb-0").append(article.title));
    var body = $('<div>').addClass('card-body').append(article.content);
    return bloc.append(header).append(body);
}

function GenererArticleParNom(nom){
    $.getJSON('src/codex.json')
        .fail(function () {
            console.error('Fichier de codex non disponible.')
        })
        .done(function (data) {
            var codexTrouve = data.codex.find(codex => codex.title.toLowerCase() === nom.toLowerCase());
            $('#articles').html(GenererArticle(codexTrouve));
        })
}