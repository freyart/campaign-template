$(document).ready(function () {
    $("[data-includeHTML]").each(function () {                
        $(this).load($(this).attr("data-includeHTML"));
    });

    $(document).ready(function () {
        $("[data-goto]").click(function(){
            $("#main").load($(this).attr("data-goto"));
        });
    });

});

