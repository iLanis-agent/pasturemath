import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)

def forage(a, y, u):
    lb = hu(a*y*u, 100)
    return (f"The pasture of {a} acres at {y} lb of dry matter an acre, grazed at {u}%, "
            f"offers {lb} lb of grazable forage.")
def demand(h, w, k, d):
    lb100 = hu(h*w*k*d, 100)
    word = "day" if d == 1 else "days"
    return (f"The herd of {h} head at {w} lb each, eating {dec2(k)}% of body weight a day for {d} {word}, "
            f"demands {dec2(lb100)} lb of dry matter.")
def days(f, r):
    n = (f*100) // r
    word = "day" if n == 1 else "days"
    return f"The pasture offering {f} lb against a herd eating {dec2(r)} lb a day holds for {n} {word}."
def rest(n, g):
    r = (n-1)*g
    pw = "paddock" if n == 1 else "paddocks"
    gw = "day" if g == 1 else "days"
    rw = "day" if r == 1 else "days"
    return f"The rotation of {n} {pw} at {g} {gw} of grazing each gives {r} {rw} of rest before the return."

random.seed(745)
cases = [
  dict(fn="forage", args=["10","2000","50"], expect=forage(10,2000,50)),
  dict(fn="demand", args=["5","1000","3","30"], expect=demand(5,1000,300,30)),
  dict(fn="days", args=["10000","150"], expect=days(10000,15000)),
  dict(fn="rest", args=["5","6"], expect=rest(5,6)),
]
for _ in range(25):
    a = random.randint(1,100000); y = random.randint(1,100000); u = random.randint(1,100)
    cases.append(dict(fn="forage", args=[str(a),str(y),str(u)], expect=forage(a,y,u)))
for _ in range(25):
    h = random.randint(1,100000); w = random.randint(1,10000); k = random.randint(1,1000); d = random.randint(1,10000)
    cases.append(dict(fn="demand", args=[str(h),str(w),dec2(k),str(d)], expect=demand(h,w,k,d)))
for _ in range(20):
    f = random.randint(1,100000000); r = random.randint(1,10000000)
    cases.append(dict(fn="days", args=[str(f),dec2(r)], expect=days(f,r)))
for _ in range(20):
    n = random.randint(1,1000); g = random.randint(1,1000)
    cases.append(dict(fn="rest", args=[str(n),str(g)], expect=rest(n,g)))
errcases = [
  ["forage", ["0","2000","50"]], ["forage", ["10","0","50"]], ["forage", ["10","2000","0"]],
  ["forage", ["10","2000","50.5"]],
  ["demand", ["0","1000","3","30"]], ["demand", ["5","0","3","30"]],
  ["demand", ["5","1000","0","30"]], ["demand", ["5","1000","3","0"]],
  ["days", ["0","150"]], ["days", ["10000","0"]],
  ["rest", ["0","6"]], ["rest", ["5","0"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
