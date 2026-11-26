/* ============================================================
   nav.js — one source of truth for the whole book's navigation.
   Add a chapter here and every page's sidebar + pager updates.
   Each page sets <body data-chapter="N"> (or data-chapter="index").
   Pages with file:"" are placeholders (not yet written).
   ============================================================ */

const BOOK = [
  { unit: "Getting Started", chapters: [
    { n: "GS", title: "Start Here", file: "start-here.html" },
    { n: "DEV", title: "Laptop or iPad?", file: "devices.html" },
    { n: "NB", title: "Your engineering notebook", file: "notebook.html" },
  ]},
  { unit: "Lab Guide", chapters: [
    { n: "LAB", title: "Lab home & licenses", file: "lab.html" },
    { n: "LP", title: "3D printers", file: "lab-printers.html" },
    { n: "LF", title: "Filament", file: "lab-filament.html" },
    { n: "LC", title: "LC40 laser", file: "lab-lc40.html" },
    { n: "LA", title: "Ador laser", file: "lab-ador.html" },
    { n: "LX", title: "X-Carve Pro CNC", file: "lab-xcarve.html" },
  ]},
  { unit: "Unit 1 · Foundations: Measure & Sketch", chapters: [
    { n: 1, title: "Measurement & Calipers", file: "chapter-01.html" },
    { n: 2, title: "Sketching & Dimensioning", file: "chapter-02.html" },
    { n: 3, title: "Fingerboard Display Stand", file: "chapter-03.html" },
  ]},
  { unit: "Unit 2 · CAD in Onshape", chapters: [
    { n: 4, title: "Welcome to Onshape", file: "chapter-04.html" },
    { n: 5, title: "First Print: Calibration Cube", file: "chapter-05.html" },
    { n: 6, title: "Designing a Skateboard", file: "chapter-06.html" },
  ]},
  { unit: "Unit 3 · The Fingerboard", chapters: [
    { n: 7, title: "Design for Printing", file: "chapter-07.html" },
    { n: 8, title: "Print the Deck + Fit the Trucks", file: "chapter-08.html" },
    { n: 9, title: "Now Shred! Customize & Ride-Test", file: "chapter-09.html" },
    { n: 10, title: "Working Drawing of the Deck", file: "chapter-10.html" },
  ]},
  { unit: "Unit 4 · Laser & Rack", chapters: [
    { n: 11, title: "How the Laser Works: Capabilities & Kerf", file: "chapter-11.html" },
    { n: 12, title: "Fingerboard Rack", file: "chapter-12.html" },
  ]},
  { unit: "Unit 5 · Capstone: Skate Park", chapters: [
    { n: 13, title: "Onshape Power Tools: Configurations", file: "chapter-13.html" },
    { n: 14, title: "Teamwork in Onshape", file: "chapter-14.html" },
    { n: 15, title: "Capstone Skate Park", file: "chapter-15.html" },
  ]},
  { unit: "Extension · CAD for Robotics", chapters: [
    { n: "E1", title: "Robot bracket", file: "extension-1.html" },
    { n: "E2", title: "Gear ratios", file: "extension-2.html" },
    { n: "E3", title: "Four-bar lift", file: "extension-3.html" },
  ]},
  { unit: "Extension · CNC Router", chapters: [
    { n: "E4", title: "Carve a park element", file: "extension-4.html" },
  ]},
  { unit: "Reference", chapters: [
    { n: "GL", title: "Glossary", file: "glossary.html" },
  ]},
];

(function () {
  const current = document.body.getAttribute("data-chapter");
  const flat = BOOK.flatMap(u => u.chapters);

  // ----- Sidebar -----
  const toc = document.getElementById("toc");
  if (toc) {
    let html = `<p class="toc__head">Contents</p>`;
    html += `<div class="toc__unit"><a href="index.html"${current === "index" ? ' aria-current="page"' : ""}><span class="num">▣</span><span>Cover &amp; overview</span></a></div>`;
    for (const u of BOOK) {
      html += `<div class="toc__unit"><span class="unit-label">${u.unit}</span>`;
      for (const c of u.chapters) {
        const isCur = String(c.n) === current;
        const numTxt = typeof c.n === "number" ? String(c.n).padStart(2, "0") : c.n;
        if (c.file) {
          html += `<a href="${c.file}"${isCur ? ' aria-current="page"' : ""}><span class="num">${numTxt}</span><span>${c.title}</span></a>`;
        } else {
          html += `<span class="dim"><span class="num">${numTxt}</span><span>${c.title}</span></span>`;
        }
      }
      html += `</div>`;
    }
    toc.innerHTML = html;
  }

  // ----- Prev / next pager -----
  const pager = document.getElementById("pager");
  if (pager && current !== "index") {
    const idx = flat.findIndex(c => String(c.n) === current);
    const prev = idx > 0 ? flat[idx - 1] : null;
    const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
    let html = "";
    if (prev && prev.file) {
      html += `<a class="prev" href="${prev.file}"><span class="dir">← Previous</span><span class="name">${prev.n}. ${prev.title}</span></a>`;
    } else { html += `<span class="ph"></span>`; }
    if (next && next.file) {
      html += `<a class="next" href="${next.file}"><span class="dir">Next →</span><span class="name">${next.n}. ${next.title}</span></a>`;
    } else if (next) {
      html += `<span class="ph"></span>`;
    }
    pager.innerHTML = html;
  }

  // ----- Mobile menu toggle -----
  const btn = document.getElementById("menuBtn");
  if (btn && toc) {
    btn.addEventListener("click", () => toc.classList.toggle("open"));
  }
})();
