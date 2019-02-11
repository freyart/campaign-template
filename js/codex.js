$(document).ready(function () {
    FillLoreList();
});

function FillLoreList() {
    $.getJSON('src/codex.json')
        .fail(function () {
            console.error('Fichier de codex non disponible.');
        })
        .done(function (data) {
            var listeLore = data.codex.sort(function (a, b) { return a.title.localeCompare(b.title); })
            listeLore.forEach(function (article, index) {
                var ligne = $('<tr>');
                ligne.append($('<td>').append($('<a>').css('cursor', 'pointer').css('text-decoration', 'underline').append(article.title).on('click', function () { ShowCodex(index); })));
                ligne.append($('<td>').append(article.category));
                $('#tbArticles tbody').append(ligne);
            });

            $('#tbArticles').DataTable({
                paging: false,
                info: false,
                language: {
                    search: "Chercher",
                    zeroRecords: "Aucun résultat."
                }
            });
        })
}

function ShowCodex(index) {
    $.getJSON('src/codex.json')
        .fail(function () {
            console.error('Fichier de codex non disponible.');
        })
        .done(function (data) {
            var article = data.codex[index];
            if (article != null) {
                $('#articles').html(GenererArticle(article));
            }
        })
}

function GenererArticle(article){
    var bloc = $('<div>').addClass('card').addClass('shadow');
    var header = $('<div>').addClass('card-header').append($('<h2>').addClass("mb-0").append(article.title));
    var body = $('<div>').addClass('card-body').append(article.content);
    return bloc.append(header).append(body);
}