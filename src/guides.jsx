// Guides: the three Gumroad PDFs plus the bundle. Bundle leads, singles follow.

const GUIDES_BUNDLE = {
  name: "Model Starter Pack",
  line: "All three guides in one place. Read the Digitals Guide first, send with No Reply, walk in with the Casting Kit.",
  price: "$24",
  was: "$30",
  img: "images/guides/starter-pack.webp",
  href: "https://drewneros.gumroad.com/l/Model_Starter_Pack",
};

const GUIDES = [
  {
    id: "digitals",
    name: "Model Digitals Guide",
    line: "Shoot clean, agency-ready digitals at home with window light.",
    pages: 13, price: "$9",
    img: "images/guides/digitals-guide.webp",
    href: "https://drewneros.gumroad.com/l/Model_Digitals_Guide",
  },
  {
    id: "no-reply",
    name: "No Reply",
    line: "Why agencies go silent, a 12-point scorecard, and three emails ready to send.",
    pages: 10, price: "$12",
    img: "images/guides/no-reply.webp",
    href: "https://drewneros.gumroad.com/l/no-reply",
  },
  {
    id: "casting",
    name: "Casting Survival Kit",
    line: "What happens on the other side of the table, and why someone else gets picked.",
    pages: 12, price: "$9",
    img: "images/guides/casting-kit.webp",
    href: "https://drewneros.gumroad.com/l/Casting_kit",
  },
];

const GUIDE_READS = [
  { href: "/model-digitals-at-home/", title: "How to take model digitals at home" },
  { href: "/how-long-do-modeling-agencies-take-to-respond/", title: "How long do modeling agencies take to respond?" },
  { href: "/what-to-wear-to-a-model-casting/", title: "What to wear to a model casting" },
];

function Guides() {
  const b = GUIDES_BUNDLE;
  return (
    <section id="guides" data-screen-label="04 Guides" className="section">
      <div className="guides-head">
        <h2 className="display t-title" style={{ margin: 0 }}>
          Guides for models.<br />
          <span className="italic" style={{ opacity: .7, fontWeight: 400 }}>From behind the camera.</span>
        </h2>
        <span className="meta guides-count">PDF · Instant download</span>
      </div>

      <a href={b.href} target="_blank" rel="noopener noreferrer" className="guide-bundle grid-2col">
        <div className="guide-img">
          <img src={b.img} alt="Model Starter Pack cover" loading="lazy" decoding="async" width="900" height="900" />
        </div>
        <div className="guide-bundle-body">
          <span className="meta" style={{ color: "var(--film-red)" }}>Bundle · 3 guides</span>
          <h3 className="display t-sub guide-name" style={{ margin: "var(--s-2) 0 var(--s-2)" }}>{b.name}</h3>
          <p className="t-body measure" style={{ color: "var(--fg-soft)", margin: "0 0 var(--s-4)" }}>{b.line}</p>
          <div className="guide-buy-row">
            <span className="display t-sub" style={{ fontWeight: 500 }}>{b.price}</span>
            <span className="meta" style={{ color: "var(--fg-faint)" }}><s>{b.was}</s> separately</span>
          </div>
          <span className="guide-cta">Get the pack <span aria-hidden="true">→</span></span>
        </div>
      </a>

      <div className="guides-grid">
        {GUIDES.map(g => <GuideCard key={g.id} {...g} />)}
      </div>

      <div className="guides-reads">
        <span className="meta" style={{ color: "var(--fg-faint)" }}>Free to read</span>
        {GUIDE_READS.map(r => (
          <a key={r.href} href={r.href} className="service-row guide-read">
            <span className="display t-sub service-name">{r.title}</span>
            <span className="meta service-row-desc" style={{ justifySelf: "end" }}>Read <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GuideCard({ name, line, pages, price, img, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="guide-card">
      <div className="guide-img">
        <img src={img} alt={`${name} cover`} loading="lazy" decoding="async" width="900" height="900" />
      </div>
      <div className="guide-card-meta meta">
        <span>{pages} pages</span>
        <span style={{ color: "var(--fg)" }}>{price}</span>
      </div>
      <h3 className="display t-sub guide-name" style={{ margin: "var(--s-1) 0 var(--s-1)" }}>{name}</h3>
      <p className="t-body" style={{ color: "var(--fg-soft)", margin: "0 0 var(--s-2)" }}>{line}</p>
      <span className="meta guide-link">Get the guide <span aria-hidden="true">→</span></span>
    </a>
  );
}

Object.assign(window, { Guides });
