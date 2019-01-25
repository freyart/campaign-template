$(document).ready(function () {
    $("[data-includeHTML]").each(function () {                
        $(this).load($(this).attr("data-includeHTML"));
    });

    $(document).ready(function () {
        $("[data-goto]").click(function(){
            $("#main").load($(this).attr("data-goto"));
        });
    });

    $(document).ready(function () {
        $("#sidebar").load("sidebar.html");
    })

    UpdateNews();
});

function UpdateNews(){
    $.getJSON('news.json')
    .fail(function() {
        console.error('Fichier de news non disponible.')
    })
    .done(function(data) {
        var $sortie = $('<ol>');

        data.forEach(function(element) {
            var $nouvelle = $('<li>');
            $nouvelle.append(element.message);
            $sortie.append($nouvelle);
        });

        $('#sortie-nouvelles').html($sortie);
    })
}


/*
function updateResultsNumber(resultsNumber) {
  $.getJSON('https://www.devmcgill.com/wp-json/wp/v2/units/?per_page=' + resultsNumber)
    .fail(function() {
      console.error('Chargement non effectué');
    })
    .done(function(data) {
      var $units = $('<ol>');

      data.forEach(function(element) {
        var $unit = $('<li>');
        var $link = $('<a>');

        $link.attr('href', element.link).html(element.title.rendered);
        $unit.append($link);
        $units.append($unit);
      });

      $('#results-content').html($units);
    });
}

$(document).ready(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    updateResultsNumber($('#results-number').val());
  });

  updateResultsNumber($('#results-number').val());

});

*/