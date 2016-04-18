    'use strict';

    function drawTheLines() {
        $(".connector").remove();
        var eras = ["opensky-era", "flavors-interlude", "meetup-era", "dark-ages", "schwa-era", "pre-history" ]
        _.each( eras, function(era) {
            app.connect(".time-span."+era, ".era."+era);
        });
    }

    $(function(){
        drawTheLines();
        var redrawLines = _.debounce(drawTheLines, 100);
        $(window).resize(redrawLines);
    });
