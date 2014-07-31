// ==UserScript==
// @name                Calculate Hours
// @include     https://your-jira-domain.com/issues/*
// @namespace   http://toomasr.com/
// @version             0.1
// @description Shows the total of hours in the footer
// @copyright   2014+, Toomas Römer
// @author    Toomas Römer
// ==/UserScript==
"use strict";

jQuery(document).ready(calculateHours);

function calculateHours() {
    var minutes = 0;
    jQuery(".timeoriginalestimate").each(function(key,val) {
        var time = jQuery(val).text();
        if (time) {
            minutes += parseToMinutes(time);
        }
    });

    var hours = minutes/60;

    var resultRow = jQuery("#issuetable .issuerow:last").clone();
    resultRow.find("td").html("");
    resultRow.find(".timeoriginalestimate").html(hours + " hours");

    var footer = jQuery("<tfoot></tfoot>").append(resultRow);
    jQuery("#issuetable").append(footer);
}

function parseToMinutes(timeStr) {
    var times = timeStr.split(",") ;
    var rtrn = 0;
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var match;
        if ((match = /([0-9]+)\s*minutes?/.exec(time))) {
            rtrn+=parseInt(match[1], 10);
        }
        else if ((match = /([0-9]+)\s*hours?/.exec(time))) {
            rtrn+=parseInt(match[1]*60);
        }
        else if ((match = /([0-9]+)\s*days?/.exec(time))) {
            rtrn+=parseInt(match[1]*8*60);
        }
        else if ((match = /([0-9]+)\s*weeks?/.exec(time))) {
            rtrn+=parseInt(match[1]*8*60*5);
        }
        else {
            throw ("The string didn't match" + timeStr);
        }
    }
    return rtrn;
}
