require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        lodash: '../bower_components/lodash/lodash',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'lodash'], function (app, $, _) {
    'use strict';
    // use app here
    //console.log('Running jQuery %s', $().jquery);

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

    /*
    $(function(){
        app.showToSome();
        drawTheLines();
    });
   */
});
