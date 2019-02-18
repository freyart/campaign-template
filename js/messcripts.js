$(document).ready(function () {
    $("#navbar").load("navbar.html");
    ReconnaissancePortraits();
});

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

function ReconnaissancePortraits(){
    /* Pour les galleries de npcs */
    $(".card-img-top").on('click', function (event) {
        $('#viewerModal').css('display','block');
        $('#imgModal').attr('src', this.src);
        $('#modal-caption').html(this.alt);
    })
    $("#viewerModal").on('click', function (event) {
        $('#viewerModal').css('display','none');
    });
}