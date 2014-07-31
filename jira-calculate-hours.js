// ==UserScript==
// @name                Calculate Hours
// @include     https://your-jira-domain.com/issues/*
// @namespace   http://toomasr.com/
// @version             0.1
// @description Shows the total of hours in the footer
// @copyright   2014+, Toomas Römer
// @author    Toomas Römer
// ==/UserScript==

jQuery(document).ready(
        calculateHours
        )

function calculateHours() {
    var minutes = 0;
    jQuery(".timeoriginalestimate").each(function(key,val) {
        var time = jQuery(val).text();
        if (time.length>0)
                minutes += accum(time);
    });

    var hours = 0;
    if (minutes != 0)
        hours = minutes/60;
    var result = jQuery(".footer-body ul li:last").after("<li>Estimate: "+(hours)+" hours</li>");
}

function accum(timeStr) {
    var times = timeStr.split(",") ;
    var rtrn = 0;
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var match = new Array();
        if ((match = /([0-9]+)\s*minutes?/.exec(time)) != null) {
            rtrn+=parseInt(match[1], 10);
        }
        else if ((match = /([0-9]+)\s*hours?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*60);
        }
        else if ((match = /([0-9]+)\s*days?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*8*60);
        }
        else if ((match = /([0-9]+)\s*weeks?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*8*60*5);
        }
        else {
            throw ("The string didn't match" + timeStr);
        }
    }
    return rtrn;
}
