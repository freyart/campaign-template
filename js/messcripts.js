var hostName = 'https://freyart.github.io/campaign-template/'

$(document).ready(function () {
    $("[data-includeHTML]").each(function () {
        $(this).load($(this).attr("data-includeHTML"));
    });

    $(document).ready(function () {
        $("[data-goto]").click(function () {
            $("#main").load($(this).attr("data-goto"));
        });
    });

    $(document).ready(function () {
        $("#sidebar").load("sidebar.html");
    })

    UpdateNews();
});

function UpdateNews() {
    $.getJSON('src/news.json')
        .fail(function () {
            console.error('Fichier de news non disponible.')
        })
        .done(function (data) {
            var $sortie = $('<div>');
            var sortedNews = data.news.sort(comp);
            $.each(sortedNews, function (i, item) {
                if (i < 5) {
                    if (i > 0) {
                        $sortie.append($('<hr>'));
                    }
                    var $nouvelle = $('<p>');
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