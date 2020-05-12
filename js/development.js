if ($('.demo-content').length > 0) {
    var text = forcem("episode4", 5);

    for(var i=0; i < 5; i++) {
        $(".demo-content").append("<p>" + text[i] + "</p>");
    }
}

if ($('.demo-ul').length > 0) {
    var text = forcem("characters", 5);

    for(var i=0; i < 5; i++) {
        $(".demo-ul").append("<li><a href='#'>" + text[i] + "</a></li>");
    }
}
