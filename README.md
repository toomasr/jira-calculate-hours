# JIRA Calculate Hours

Motivation
----------

When I wander around different JIRA filters then every now and then I would really love to know the total estimation value of that page.

To achieve that I wrote a JavaScript snippet that you can paste into [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or other [equivalent](http://appcrawlr.com/app/uberGrid/652164).


Quick Start
-----------

I didn't bother creating a separate JS file for the snippet but you can rather just copy it from this readme file.

```javascript
// ==UserScript==
// @name                Calculate Hours
// @include     https://your-jira-domain.com/issues/*
// @namespace   http://toomasr.com/
// @version             0.1
// @description Shows the total of hours in the footer
// @copyright   2014+, Toomas Römer
// @author    Toomas Römer
// ==/UserScript==

jQuery(document).ready(calculateHours);

function calculateHours() {
    var totalOriginalEstimate = sumFields(".timeoriginalestimate");
    var totalRemainingEstimate = sumFields(".timeestimate");

    var resultRow = jQuery(".issuerow:last").clone();
    resultRow.find("td").html("");
    resultRow.find(".timeoriginalestimate").html(totalOriginalEstimate + " hours");
    resultRow.find(".timeestimate").html(totalRemainingEstimate + " hours");
    
    jQuery(".issuerow:last").after(resultRow);
}

function sumFields(field) {
    var minutes = 0;
    jQuery(field).each(function(key,val) {
        var time = jQuery(val).text();
        if (time.length > 0) {
            minutes += accum(time);
        }
    });

    var hours = minutes/60;
    return hours;
}

function accum(timeStr) {
    var times = timeStr.split(",") ;
    var rtrn = 0;
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var match;
        if ((match = /([0-9]+)\s*minutes?/.exec(time)) != null) {
            rtrn+=parseInt(match[1], 10);
        }
        else if ((match = /([0-9]+)\s*hours?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*60, 10);
        }
        else if ((match = /([0-9]+)\s*days?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*8*60, 10);
        }
        else if ((match = /([0-9]+)\s*weeks?/.exec(time)) != null) {
            rtrn+=parseInt(match[1]*8*60*5, 10);
        }
        else {
            throw ("The string didn't match" + timeStr);
        }
    }
    return rtrn;
}

```

You Need More Help?
-------------------

1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
2. Open up Tampermonkey and create a new script
3. Copy paste the script from previous section
4. **Modify @include URL in the header to match your JIRA url**
5. Navigate to your JIRA issues and behold, there is a number in the footer

FAQ
--------

* **I've completed the instructions but somestimes the value remains stale in the footer?**

I don't why this happens but once you reload the page it is fine again for me. If you know the reason and fix do let me know and I'll update my script!
