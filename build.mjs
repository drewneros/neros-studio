// Precompiles the site so the browser never runs Babel or React's dev build.
//
//   npm run build   ->  dist/app.js  (minified, React included)
//
// Commit dist/app.js with every source change. GitHub Pages serves it as is.
// The files are joined in the same order index.html used to load them, in one
// shared scope, exactly as the old <script type="text/babel"> tags behaved.
// admin.jsx is not part of the public bundle (console.html loads it itself).
import { build } from "esbuild";
import { readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";

const ORDER = [
  "tweaks-panel", "data", "placeholder", "sidebar", "intro", "about",
  "gallery", "guides", "contact", "tweaks", "app",
];

const head = `
import * as React from "react";
import * as ReactDOMBase from "react-dom";
import * as ReactDOMClient from "react-dom/client";
window.React = React;
window.ReactDOM = Object.assign({}, ReactDOMBase, ReactDOMClient);
`;

// tweaks.jsx re-declares names that tweaks-panel.jsx already declares in the
// shared scope; as separate scripts it was legal, joined it is a clash.
const DUP = /^const \{ TweaksPanel, useTweaks[^\n]*\} = window;\s*$/m;
const body = ORDER.map((n) => {
  let src = readFileSync(`src/${n}.jsx`, "utf8");
  if (n === "tweaks") {
    if (!DUP.test(src)) throw new Error("tweaks.jsx: expected destructure line not found");
    src = src.replace(DUP, "");
  }
  return `\n// ---- src/${n}.jsx ----\n` + src;
}).join("\n");

mkdirSync(".build", { recursive: true });
mkdirSync("dist", { recursive: true });
writeFileSync(".build/entry.jsx", head + body);

await build({
  entryPoints: [".build/entry.jsx"],
  outfile: "dist/app.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  loader: { ".jsx": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' },
  legalComments: "none",
  absWorkingDir: process.cwd(),
});
rmSync(".build", { recursive: true, force: true });
console.log("built dist/app.js");
