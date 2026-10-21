// Pasture Math engine: grazable forage from acres, yield and utilization, herd dry-matter demand from head, weight, intake and days, the days the pasture holds, and the rest a rotation gives. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the land and the herd.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _ACRE = "the acres must be from 1 to 100000 with no decimal places";
var _YIELD = "the dry matter yield must be from 1 to 100000 lb per acre with no decimal places";
var _UTIL = "the utilization must be a whole number from 1 to 100 percent";
var _HEAD = "the head count must be from 1 to 100000 with no decimal places";
var _WT = "the head weight must be from 1 to 10000 lb with no decimal places";
var _INTAKE = "the intake must be from 0.01 to 10 percent of body weight with at most two decimal places";
var _DAYS = "the days must be from 1 to 10000 with no decimal places";
var _FEED = "the grazable forage must be from 1 to 100000000 lb with no decimal places";
var _RATE = "the herd demand must be from 0.01 to 100000 lb a day with at most two decimal places";
var _PAD = "the paddock count must be from 1 to 1000 with no decimal places";
var _GRAZE = "the grazing days must be from 1 to 1000 with no decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }

function forageTruth(acres, yieldlb, util) {
  var a = _i(acres, _ACRE, 6, 1, 100000), y = _i(yieldlb, _YIELD, 6, 1, 100000), u = _i(util, _UTIL, 3, 1, 100);
  var lb = _hu(a * y * u, 100);
  return "The pasture of " + a + " acres at " + y + " lb of dry matter an acre, grazed at " + u + "%, offers " + lb + " lb of grazable forage.";
}
function demandTruth(head, wt, intake, days) {
  var h = _i(head, _HEAD, 6, 1, 100000), w = _i(wt, _WT, 5, 1, 10000), k = _p(intake, _INTAKE, 2, 2, 1, 1000), d = _i(days, _DAYS, 5, 1, 10000);
  var lb100 = _hu(h * w * k * d, 100); // hundredths of a lb of dry matter
  return "The herd of " + h + " head at " + w + " lb each, eating " + _dec(k, 2) + "% of body weight a day for " + d + (d === 1 ? " day" : " days") + ", demands " + _dec(lb100, 2) + " lb of dry matter.";
}
function daysTruth(feed, rate) {
  var f = _i(feed, _FEED, 9, 1, 100000000), r = _p(rate, _RATE, 6, 2, 1, 10000000);
  var days = Math.floor(f * 100 / r);
  return "The pasture offering " + f + " lb against a herd eating " + _dec(r, 2) + " lb a day holds for " + days + (days === 1 ? " day" : " days") + ".";
}
function restTruth(paddocks, graze) {
  var n = _i(paddocks, _PAD, 4, 1, 1000), g = _i(graze, _GRAZE, 4, 1, 1000);
  var rest = (n - 1) * g;
  return "The rotation of " + n + (n === 1 ? " paddock" : " paddocks") + " at " + g + (g === 1 ? " day" : " days") + " of grazing each gives " + rest + (rest === 1 ? " day" : " days") + " of rest before the return.";
    }
