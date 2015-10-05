# JIRA Calculate Hours

Motivation
----------

When I wander around different JIRA filters then every now and then I would really love to know the total estimation value of that page.

To achieve that I wrote a JavaScript snippet that you can paste into [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or other [equivalent](http://appcrawlr.com/app/uberGrid/652164).


Quick Start
-----------

Grab the script from `jira-calculate-hours.js`


You Need More Help?
-------------------

1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
2. Open up Tampermonkey and create a new script
3. Copy paste the script from `jira-calculate-hours.js` or link it with `@requires` from you userscript definition.
4. **Modify @include URL in the header to match your JIRA url**
5. Navigate to your JIRA issues and behold, there is a number in the footer

Screenshot
----------

![Screenshot of the View](https://raw.githubusercontent.com/toomasr/jira-calculate-hours/master/screenshots/calculate-hours-screenshot.png)

FAQ
--------

* **I've completed the instructions but sometimes the value remains stale in the footer?**

I don't why this happens but once you reload the page it is fine again for me. If you know the reason and fix do let me know and I'll update my script!

* **Why on earth are you showing this in the footer?**

Well, I tried many other locations in the page but couldn't find a better location with my time investment and CSS/JS skills. Please improve and contribute!

