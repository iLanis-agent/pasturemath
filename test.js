const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { forage: forageTruth, demand: demandTruth, days: daysTruth, rest: restTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the acres must be from 1 to 100000 with no decimal places",
  "the dry matter yield must be from 1 to 100000 lb per acre with no decimal places",
  "the utilization must be a whole number from 1 to 100 percent",
  "the head count must be from 1 to 100000 with no decimal places",
  "the head weight must be from 1 to 10000 lb with no decimal places",
  "the intake must be from 0.01 to 10 percent of body weight with at most two decimal places",
  "the days must be from 1 to 10000 with no decimal places",
  "the grazable forage must be from 1 to 100000000 lb with no decimal places",
  "the herd demand must be from 0.01 to 100000 lb a day with at most two decimal places",
  "the paddock count must be from 1 to 1000 with no decimal places",
  "the grazing days must be from 1 to 1000 with no decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
