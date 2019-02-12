var hostName = 'https://freyart.github.io/campaign-template/'

$(document).ready(function () {
    
    $(document).ready(function () {
        $("#sidebar").load("navbar.html");
    })
    
    /* Pour les galleries de npcs */
    $(".card-img-top").on('click', function (event) {
        $('#viewerModal').css('display','block');
        $('#imgModal').attr('src', this.src);
        $('#modal-caption').text(this.alt);
    })
    $(".close").on('click', function (event) {
        $('#viewerModal').css('display','none');
    })
});
