$(document).ready(function () {
    UpdateNews();
});

function UpdateNews() {
    var nbNews = 3;
    $.getJSON('src/news.json')
        .fail(function () {
            console.error('Fichier de news non disponible.')
        })
        .done(function (data) {
            var $sortie = $('<div>');
            var sortedNews = data.news.sort(comp);
            $.each(sortedNews, function (i, item) {
                if (i < nbNews) {
                    var $nouvelle = $('<div>').addClass('news-block');
                    $nouvelle.append($('<div>').addClass('news-date').append(PrintDate(data.news[i].date)));
                    $nouvelle.append(data.news[i].message);
                    $sortie.append($nouvelle);
                }
            });
            $('#sortie-nouvelles').append($sortie);
        })
}

function comp(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function PrintDate(d){
    var dt = new Date(d);
    var dateString =  dt.getFullYear() + "/" + ("0"+(dt.getMonth()+1)).slice(-2) + "/" + ("0" + dt.getDate()).slice(-2);
    return dateString;
}
