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

jQuery(document).ready(function() {
    // Perform initial calculation on page load.
    addEstimatesFooter();

    // Monitor .navigator-content for changes.
    // When #issuetable is rewritten, recalculate estimates footer.
    var oldTable = jQuery("#issuetable").get(0);
    jQuery(".navigator-content").bind('DOMSubtreeModified', function(e) {
        var newTable = jQuery("#issuetable").get(0);
        if (newTable !== oldTable) {
            oldTable = newTable;
            addEstimatesFooter();
        }
    });
});

function addEstimatesFooter() {
    // Clone last row and clean it from content
    var resultRow = jQuery("#issuetable .issuerow:last").clone();
    resultRow.find("td").html("");
    // Calculate sums for the estimate columns
    resultRow.find(".timeoriginalestimate").html(formatEstimate(sumMinutes(".timeoriginalestimate")));
    resultRow.find(".timeestimate").html(formatEstimate(sumMinutes(".timeestimate")));

    var footer = jQuery("<tfoot></tfoot>").append(resultRow);
    jQuery("#issuetable").append(footer);
}

function formatEstimate(minutes) {
    if (minutes < 60) {
        return minutes + " minutes";
    }

    var hours = minutes / 60;
    if (hours < 8) {
        return roundTo(hours, 1) + " hours";
    }

    var days = hours / 8;
    return roundTo(days, 1) + " days";
}

function roundTo(number, decimals) {
    var pow = Math.pow(10, decimals);
    return Math.round(number*pow) / pow;
}

function sumMinutes(field) {
    var minutes = 0;
    jQuery(field).each(function(key,val) {
        var time = jQuery(val).text();
        if (time) {
            minutes += parseToMinutes(time);
        }
    });

    return minutes;
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
