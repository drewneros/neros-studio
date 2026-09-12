# Gates: single-source city detection

OWNS: src/sidebar.jsx src/gallery.jsx index.html

Scope: `sidebar.jsx` and `gallery.jsx` each ran their own `ipapi.co` fetch with
their own city logic. The 12 Sep metro fix landed on ONE of them, so the rail
said ISTANBUL while the Work headline said Ankara on the same page load. Two
fetches also spend the free tier twice per visit. One fetch, one city value,
both consumers read it.

- [x] G1: exactly one ipapi fetch call site in src/
  CHECK: node -e 'const g=require("child_process");const out=g.execSync("grep -rn ipapi.co src/ || true").toString().split("\n").filter(l=>l.includes("fetch("));if(out.length===1)console.log("G1_OK");else console.log("FETCH_SITES="+out.length+"\n"+out.join("\n"))'
  EXPECT: G1_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=G1_OK

- [x] G2: gallery.jsx owns no geo logic of its own
  CHECK: node -e 'const s=require("fs").readFileSync("src/gallery.jsx","utf8");if(!/ipapi\.co/.test(s)&&!/d\.city/.test(s)&&!/setCity/.test(s))console.log("G2_OK");else console.log("gallery still has its own geo logic")'
  EXPECT: G2_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=G2_OK

- [x] G3: shared hook is exposed, and sidebar.jsx loads before gallery.jsx
  CHECK: node -e 'const fs=require("fs");const sb=fs.readFileSync("src/sidebar.jsx","utf8");const idx=fs.readFileSync("index.html","utf8").split("\n");const declared=/window\.useGeoCity\s*=/.test(sb);const consumed=/window\.useGeoCity\(\)/.test(fs.readFileSync("src/gallery.jsx","utf8"));const sbL=idx.findIndex(l=>l.includes("sidebar.jsx"));const glL=idx.findIndex(l=>l.includes("gallery.jsx"));if(declared&&consumed&&sbL>-1&&glL>sbL)console.log("G3_OK");else console.log("declared="+declared+" consumed="+consumed+" sidebar@"+sbL+" gallery@"+glL)'
  EXPECT: G3_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=G3_OK

- [x] G4: metroFromTz maps town to metro and degrades safely
  CHECK: node -e 'const s=require("fs").readFileSync("src/sidebar.jsx","utf8");const m=s.match(/const cityMap = \{[\s\S]*?\n\};/)[0];const f=s.match(/function metroFromTz[\s\S]*?\n\}/)[0];const fn=new Function(m+"\n"+f+"\nreturn metroFromTz;")();const a=require("assert");a.equal(fn("Europe/Istanbul","Adapazari"),"Istanbul");a.equal(fn("Europe/Istanbul","Ankara"),"Istanbul");a.equal(fn("America/New_York","Brooklyn"),"NYC");a.equal(fn("Europe/Madrid","Getafe"),"Madrid");a.equal(fn("America/Argentina/Buenos_Aires","x"),"Buenos Aires");a.equal(fn("","Adapazari"),"Adapazari");console.log("G4_OK 6/6")'
  EXPECT: G4_OK 6/6
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=G4_OK 6/6

- [x] G5: cache-busters bumped on both changed JSX files
  CHECK: node -e 'const idx=require("fs").readFileSync("index.html","utf8");const bad=["sidebar.jsx","gallery.jsx"].filter(f=>!new RegExp(f.replace(".","\\.")+"\\?v=18").test(idx));if(bad.length===0)console.log("G5_OK");else console.log("stale: "+bad.join(","))'
  EXPECT: G5_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=G5_OK

- [x] G6: no regression, verify-type still passes
  CHECK: node tools/verify-type.mjs nohardcoded
  EXPECT: NOHARDCODED_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/drewneros/Drew_Neros_visuals; path=05b8e4f70ea7/45 entries; output=0 hardcoded sizes in page components (7 allowed one-offs) | NOHARDCODED_OK

- [x] G7: rail label and Work headline render the SAME metro in a live browser
  EVIDENCE: localhost:4444, storage cleared, reloaded untouched. ipapi returned town="Ankara" tz="Europe/Istanbul". Rail rendered "ISTANBUL", Work headline rendered "Istanbul", match=true. performance.getEntriesByType counted ipapi requests for the page alone = 1 (was 2 before this change).
