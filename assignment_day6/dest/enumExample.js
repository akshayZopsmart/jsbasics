"use strict";
var MONTHS;
(function (MONTHS) {
    MONTHS[MONTHS["JAN"] = 31] = "JAN";
    MONTHS[MONTHS["FEB"] = 28] = "FEB";
    MONTHS[MONTHS["MAR"] = 31] = "MAR";
    MONTHS[MONTHS["APR"] = 30] = "APR";
    MONTHS[MONTHS["MAY"] = 31] = "MAY";
    MONTHS[MONTHS["JUN"] = 30] = "JUN";
    MONTHS[MONTHS["JUL"] = 31] = "JUL";
    MONTHS[MONTHS["AUG"] = 31] = "AUG";
    MONTHS[MONTHS["SEP"] = 30] = "SEP";
    MONTHS[MONTHS["OCT"] = 31] = "OCT";
    MONTHS[MONTHS["NOV"] = 30] = "NOV";
    MONTHS[MONTHS["DEC"] = 31] = "DEC";
})(MONTHS || (MONTHS = {}));
;
console.log(MONTHS);
for (let month in MONTHS) {
    console.log(month, MONTHS[month]);
}
