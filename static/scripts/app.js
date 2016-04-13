/*global define */

define(['jquery'], function ($) {
    'use strict';

    return {
        connect: function (div1, div2, color, thickness) {
            //console.log("DRAWING");

            thickness = thickness || '1'

            var $div1 = $(div1);
            var div1_offset = $div1.offset();

            color = color || $div1.css('background-color');

            var $div2 = $(div2);
            var div2_offset = $div2.offset();

            var x1 = div1_offset.left + $div1.width();
            var y1 = div1_offset.top + 20;

            var x2 = div2_offset.left;
            var y2 = div2_offset.top + 20;

            // distance
            var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));

            // center
            var cx = ((x1 + x2) / 2) - (length / 2);
            var cy = ((y1 + y2) / 2) - (thickness / 2);

            // angle
            var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);

            // make hr
            var $line = $("<div />");
            $line
                .css({
                    'height': thickness + "px",
                    "background-color": color,
                    "left": cx + "px",
                    "top": cy + "px",
                    "width": length + "px",
                    "-moz-transform": "rotate(" + angle + "deg)",
                    "-webkit-transform": "rotate(" + angle + "deg)",
                    "-o-transform": "rotate(" + angle + "deg)",
                    "-ms-transform": "rotate(" + angle + "deg)",
                    "transform": "rotate(" + angle + "deg)"
                })
                .attr({
                    'class': 'connector'
                })
                .appendTo('body')
        },
        'showToSome': function() {
            if (window.location.search == '?meow'){
                $('.career-history, .connector').show();
            } else {
                $('.career-history, .connector').hide();
            }
        }
    }

});
