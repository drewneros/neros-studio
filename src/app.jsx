const { useEffect: _aue, useState: _aus, useCallback: _auc } = React;

function App(){
  const [tweaks, setTweak] = window.useTweaks(window.__TWEAK_DEFAULTS__);
  const [current, setCurrent] = _aus("work");
  const [introDone, setIntroDone] = _aus(false);

  // Apply theme + accent + grain to :root
  _aue(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    const accents = {
      ochre: "oklch(0.74 0.08 75)",
      red:   "oklch(0.58 0.10 28)",
      teal:  "oklch(0.55 0.05 205)",
    };
    document.documentElement.style.setProperty("--film-ochre", accents[tweaks.accent] || accents.ochre);
    document.documentElement.style.setProperty("--grain-opacity", tweaks.grain ? ".045" : "0");
  }, [tweaks.theme, tweaks.accent, tweaks.grain]);

  // Lock page scroll while the intro overlay is up; release on enter.
  _aue(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    if (introDone) window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, [introDone]);


  // scroll-spy for nav highlight: active section is the last one whose
  // top has crossed a fixed line near the top of the viewport. Ratio-based
  // IntersectionObserver thresholds never fire for sections shorter than
  // the threshold fraction of the viewport (e.g. "about"), so this uses
  // position instead of visible area.
  _aue(() => {
    const ids = ["work","about","services","contact"];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if(!sections.length) return;
    const LINE = 140; // px from top of viewport
    const onScroll = () => {
      let active = sections[0].id;
      for(const s of sections){
        if(s.getBoundingClientRect().top <= LINE) active = s.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // run reveal observer
  window.useReveal();

  const onNav = _auc((id) => {
    if(id === "top"){ window.scrollTo({top:0, behavior:"smooth"}); return; }
    const el = document.getElementById(id);
    if(el){
      const y = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({top: y, behavior:"smooth"});
    }
  }, []);

  const side = tweaks.menuSide === "right" ? "right" : "left";

  return (
    <>
      {/* Cinematic intro — full-screen until user scrolls/clicks */}
      {!introDone && <Intro tweaks={tweaks} onDone={() => setIntroDone(true)}/>}

      <Sidebar tweaks={tweaks} setTweak={setTweak} onNav={onNav} current={current} slideIn={introDone}/>

      {/* Main scroll area, offset by sidebar. The intro overlay above acts as
          the hero — once it slides up, the site begins at the work gallery. */}
      <main style={{
        marginLeft: side === "left" ? "var(--rail-w)" : 0,
        marginRight: side === "right" ? "var(--rail-w)" : 0,
      }}>
        <GallerySection tweaks={tweaks}/>
        <About/>
        <Contact/>
      </main>

      <Tweaks tweaks={tweaks} setTweak={setTweak}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

Object.assign(window, { App });
