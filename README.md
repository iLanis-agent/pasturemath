# Pasture Math

Pasture stocking arithmetic. The pasture of 10 acres at 2000 lb of dry matter an acre, grazed at 50%, offers 10000 lb of grazable forage.

## What it computes

- **The forage truth** - grazable forage: acres (1 to 100000) times dry matter yield (1 to 100000 lb per acre) times utilization (whole percent).
- **The demand truth** - herd demand: head times weight per head (1 to 10000 lb) times intake (0.01 to 10 percent of body weight a day) times days.
- **The days truth** - days the pasture holds: grazable forage over the herd's daily demand (0.01 to 100000 lb a day), floor division, nothing rounded up.
- **The rest truth** - rest before the return: the paddocks not being grazed (up to 1000), times the grazing days each (up to 1000).

## Boundary

Arithmetic only. Dry matter counting, applied as written. It has not walked any field and does not know the forage growth, the season, the species, the soil or the animals' condition, and it gives no verdict that a stocking is safe for the land or the herd. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/pasturemath/
Repo: https://github.com/iLanis-agent/pasturemath
