/* ============================================================
   labguide.js — Lab Guide practice tools (Model & Make).
     <div class="sim partsim" data-machine="p2s|lc40|ador|xcarve"></div>  name the parts (explore + quiz)
     <div class="sim depthsim"></div>     CNC: zero, depth, and tabs
     <div class="sim filsim"></div>       which filament?
   Diagrams are simplified schematics, not product drawings.
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const C = { navy: "#1F3864", orange: "#C55A11", blue: "#2E75B6", green: "#3F6B2A", red: "#B42318", ink: "#1A1A1A", gray: "#5B6470", steel: "#C9D1DB", steel2: "#9AA6B4", tan: "#E7B98F", glass: "#DCEBF7", wood: "#D9B38C", purple: "#6B3FA0" };
  if (!document.getElementById("labguide-css")) {
    const st = document.createElement("style"); st.id = "labguide-css";
    st.textContent = `.lg-svg{width:100%;height:auto;touch-action:manipulation;background:#fff;border:1px solid #d6dbe3;border-radius:12px}
.lg-row{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin:8px 0;font-size:14.5px}.lg-row label{display:flex;align-items:center;gap:6px}
.lg-row select,.lg-row input[type=number]{font:inherit;font-size:14.5px;padding:4px 8px;border:1.5px solid #d6dbe3;border-radius:8px;background:#fff}.lg-row input[type=number]{max-width:90px}
.lg-tabs{display:flex;gap:6px;margin:8px 0}.lg-tabs button{font:inherit;font-size:14px;font-weight:700;padding:6px 12px;border-radius:999px;border:1.5px solid ${C.navy};background:#fff;color:${C.navy};cursor:pointer}
.lg-tabs button[aria-pressed=true]{background:${C.navy};color:#fff}.lg-card{background:#fff;border:1px solid #d6dbe3;border-left:5px solid ${C.orange};border-radius:10px;padding:10px 12px;margin:8px 0;min-height:64px}
.lg-card h4{margin:0 0 4px;font-size:16px;color:${C.navy}}.lg-card p{margin:0;font-size:15px}.lg-hot{cursor:pointer}.lg-hot circle{transition:r .15s}.lg-hot:hover circle,.lg-hot:focus circle{r:15}
.lg-legend{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:4px 12px;font-size:14px;margin:6px 0;padding:0;list-style:none}.lg-legend li{cursor:pointer;padding:3px 6px;border-radius:6px}
.lg-legend li:hover,.lg-legend li[aria-current=true]{background:#eef3fa}.lg-legend b{display:inline-block;min-width:24px;color:${C.orange}}.lg-score{font-weight:800;color:${C.navy}}
.lg-out{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:8px 0}.lg-out div{background:#fff;border:1px solid #d6dbe3;border-radius:10px;padding:8px 10px}
.lg-out b{display:block;font-size:12px;color:${C.gray};text-transform:uppercase;letter-spacing:.04em}.lg-out span{font-size:17px;font-weight:800;color:${C.navy}}
.tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch}.signoff .checks{margin:6px 0}
.lg-say{font-size:15px;margin:6px 0;padding:8px 10px;border-radius:8px;background:#f5f7fa}.lg-say.ok{background:#e8f3e3}.lg-say.bad{background:#fdecea}`;
    document.head.appendChild(st);
  }
  const R = (x, y, w, h, f, s = C.ink, sw = 2, rx = 4, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="${sw}" ${extra}/>`;
  const L = (x1, y1, x2, y2, s = C.ink, sw = 2, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${sw}" ${extra}/>`;
  const T = (x, y, t, sz = 12, f = C.gray, a = "middle", w = 600) => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" font-weight="${w}" font-family="system-ui,sans-serif">${t}</text>`;

  // ---------- machine schematics: drawing + parts [x, y, name, what it does] ----------
  const M = {
    p2s: { title: "Bambu Lab P2S 3D printer (front view, with an AMS on top)",
      draw: () => R(150, 22, 260, 46, "#EEF1F5", C.ink, 2, 6) + [0, 1, 2, 3].map(i => `<circle cx="${185 + i * 63}" cy="45" r="16" fill="${["#E57373", "#64B5F6", "#FFF176", "#81C784"][i]}" stroke="${C.ink}" stroke-width="1.5"/>`).join("") +
        `<path d="M300 68 C300 90 290 95 285 112" fill="none" stroke="${C.gray}" stroke-width="4"/>` +
        R(90, 70, 380, 330, "#F7F9FB", C.ink, 3, 10) + R(104, 84, 352, 268, C.glass, C.steel2, 2, 6, 'opacity=".55"') + L(104, 110, 456, 110, C.steel2, 6) +
        R(255, 104, 60, 52, "#CFD8E3", C.ink, 2, 6) + `<path d="M278 156 L292 156 L285 170 Z" fill="${C.orange}" stroke="${C.ink}" stroke-width="1.5"/>` + R(318, 118, 16, 26, "#B0BEC5", C.ink, 1.5, 3) +
        R(140, 286, 280, 9, "#B8893F", C.ink, 1.5, 2) + R(140, 295, 280, 16, "#90A4AE", C.ink, 1.5, 2) + L(150, 311, 150, 350, C.steel2, 4) + L(410, 311, 410, 350, C.steel2, 4) +
        R(240, 250, 80, 36, "#81C784", C.ink, 1.5, 2) + `<circle cx="124" cy="100" r="7" fill="#263238"/>` + R(420, 270, 24, 40, "#ECEFF1", C.ink, 1.5, 3) +
        R(360, 362, 80, 30, "#263238", C.ink, 1.5, 4) + L(98, 356, 462, 356, C.ink, 2) + `<circle cx="460" cy="220" r="5" fill="${C.steel2}"/>` + R(472, 120, 20, 150, "#CFD8DC", C.ink, 1.5, 3, 'stroke-dasharray="5 4"') + T(482, 290, "rear", 11),
      parts: [[300, 45, "AMS (filament box)", "Holds up to 4 spools and feeds filament to the printer automatically. If your printer has no AMS, the spool hangs on a holder on the back. TPU can’t go through the AMS."],
        [300, 92, "PTFE tube", "A slippery tube that guides the filament to the toolhead without snagging."],
        [262, 128, "Toolhead", "The extruder (a motor and hardened-steel gears that push filament), the hotend that melts it, the filament cutter, and the fans. It moves left, right, forward, and back."],
        [285, 172, "Nozzle", "A 0.4 mm hole where melted plastic comes out, up to 300 °C. Never touch it, even after a print."],
        [326, 131, "Part-cooling fan", "Blows on the plastic right after it comes out so it hardens fast. That’s what lets overhangs and bridges work."],
        [180, 289, "Build plate", "A removable, flexible steel sheet with a textured PEI surface. Let it cool, then lift it out and flex it to pop the print off."],
        [380, 304, "Heatbed", "Heats the plate (up to 110 °C) so the first layer sticks. On the P2S it moves down a tiny bit after each layer."],
        [124, 100, "Camera", "A 1080p camera. The printer’s AI watches for failures like “spaghetti” and pauses the print, and it records timelapses."],
        [460, 220, "Door and door sensor", "Closing the door keeps heat in. The printer knows when it’s open."],
        [400, 377, "Touchscreen", "Start, pause, and stop prints, load filament, and read error messages."],
        [482, 190, "Carbon filter and exhaust fan (back)", "Cleans fumes and controls the temperature inside the printer."],
        [432, 290, "Purge chute", "Where waste plastic from color or filament changes drops out."]] },
    lc40: { title: "Dremel LC40 laser cutter (cutaway, lid open)",
      draw: () => R(60, 120, 470, 260, "#F7F9FB", C.ink, 3, 10) + `<path d="M60 120 L110 30 L480 30 L530 120" fill="${C.glass}" fill-opacity=".5" stroke="${C.ink}" stroke-width="2.5"/>` +
        R(90, 138, 410, 26, "#EEE", C.steel2, 1.5, 12) + R(110, 143, 300, 16, "#B3E5FC", C.ink, 1.5, 8) + T(260, 155, "CO₂ tube", 10, C.navy) +
        R(470, 140, 16, 20, "#B0BEC5", C.ink, 1.5, 2) + L(410, 151, 478, 151, C.red, 2.5, 'stroke-dasharray="6 4"') + L(478, 151, 478, 210, C.red, 2.5, 'stroke-dasharray="6 4"') +
        R(470, 202, 16, 16, "#B0BEC5", C.ink, 1.5, 2) + L(100, 210, 490, 210, C.steel2, 7) + L(478, 210, 322, 210, C.red, 2.5, 'stroke-dasharray="6 4"') +
        R(300, 196, 44, 50, "#CFD8E3", C.ink, 2, 4) + `<path d="M314 246 L330 246 L322 262 Z" fill="${C.orange}" stroke="${C.ink}" stroke-width="1.5"/>` + L(322, 262, 322, 300, C.red, 2.5) + `<circle cx="352" cy="230" r="5" fill="#263238"/>` +
        R(110, 300, 380, 20, "#ECEFF1", C.ink, 1.5, 2) + Array.from({ length: 19 }, (_, i) => L(120 + i * 20, 302, 120 + i * 20, 318, C.steel2, 1)).join("") + R(250, 290, 140, 10, C.wood, C.ink, 1.5, 1) +
        R(420, 335, 70, 34, "#263238", C.ink, 1.5, 4) + `<circle cx="505" cy="352" r="9" fill="${C.green}" stroke="${C.ink}" stroke-width="1.5"/>` + R(70, 330, 34, 26, "#B0BEC5", C.ink, 1.5, 3) +
        R(545, 260, 70, 110, "#ECEFF1", C.ink, 2, 6) + T(580, 385, "Hex Box", 11) + `<path d="M545 300 C 520 300 520 250 500 240" fill="none" stroke="${C.blue}" stroke-width="3"/>`,
      parts: [[150, 151, "Laser tube", "A sealed glass tube of CO₂ gas. Electricity makes it give off a powerful infrared beam you can’t see (40 W). It’s cooled by water."],
        [478, 150, "Mirrors", "Three mirrors bounce the beam from the tube to the laser head. If they’re out of line, cuts get weak. Only your teacher adjusts them."],
        [300, 205, "Laser head", "Holds the focus lens, the air-assist nozzle, the red dot pointer, and a camera. It rides on the gantry."],
        [322, 254, "Focus lens and air nozzle", "The lens squeezes the beam to a tiny hot point at the focus height, set with the focus puck. The nozzle blows air at the cut for cleaner edges and fewer flames."],
        [352, 230, "Camera", "Shows your material so you can place the design on it."],
        [140, 210, "Gantry and rails", "Move the head left and right (X) and front and back (Y)."],
        [140, 310, "Honeycomb bed", "Holds the material up so smoke and the beam pass underneath."],
        [140, 60, "Lid and lid sensor", "The laser won’t start with the lid open. The window blocks the beam, so you can watch safely."],
        [87, 343, "Exhaust port and vent fan", "Pull smoke out of the machine. Leave it running 10 minutes after a job."],
        [455, 352, "Touchscreen and Start button", "Shows status icons (water, fan, air, lid). You press Start twice quickly to begin a job."],
        [580, 315, "Hex Box", "Holds the cooling water tank and pump, and the air pump for air assist."]] },
    ador: { title: "Flux Ador diode laser (cutaway, door open)",
      draw: () => R(80, 130, 450, 240, "#F7F9FB", C.ink, 3, 10) + `<path d="M80 130 L120 40 L490 40 L530 130" fill="#FFCC80" fill-opacity=".45" stroke="${C.ink}" stroke-width="2.5"/>` + `<circle cx="305" cy="62" r="7" fill="#263238"/>` +
        L(110, 190, 500, 190, C.steel2, 7) + R(250, 172, 56, 64, "#455A64", C.ink, 2, 6) + Array.from({ length: 4 }, (_, i) => L(258, 180 + i * 6, 298, 180 + i * 6, "#90A4AE", 2)).join("") +
        R(312, 214, 8, 30, "#B0BEC5", C.ink, 1.5, 2) + `<path d="M268 236 L288 236 L278 250 Z" fill="${C.orange}" stroke="${C.ink}" stroke-width="1.5"/>` + `<path d="M230 200 C 200 200 200 170 180 160" fill="none" stroke="${C.blue}" stroke-width="3"/>` +
        L(278, 250, 278, 296, "#5C6BC0", 3) + R(110, 316, 390, 14, "#CFD8DC", C.ink, 1.5, 2) + [0, 1, 2].map(i => `<path d="M${170 + i * 110} 316 l12 -16 l12 16 Z" fill="#B0BEC5" stroke="${C.ink}" stroke-width="1"/>`).join("") +
        R(200, 293, 200, 8, C.wood, C.ink, 1.5, 1) + `<circle cx="545" cy="210" r="13" fill="${C.red}" stroke="${C.ink}" stroke-width="2"/>` + R(420, 336, 80, 26, "#263238", C.ink, 1.5, 4) +
        R(100, 340, 40, 24, "#B0BEC5", C.ink, 1.5, 3) + `<path d="M100 352 C 70 352 60 380 40 390" fill="none" stroke="${C.gray}" stroke-width="6"/>`,
      parts: [[255, 178, "Laser module (20 W diode)", "Makes a bright blue laser beam and has its own focus lens and cooling fan. It can be swapped for the printing module."],
        [316, 240, "Autofocus probe", "Touches the material to find the right focus height. Long-press AF on the panel (or double-click the side focus button)."],
        [190, 170, "Air assist", "Built in. Blows air at the cut to clear smoke and reduce flames."],
        [332, 74, "Camera (8 MP)", "Takes a photo of the work area so you can see where the design will land on your material."],
        [130, 85, "Door and door sensor", "The tinted window is laser-safe. If the door is open, the machine shows error #901 and won’t fire."],
        [150, 323, "Work area", "Aluminum foil on the bottom protects the case. Triangular prisms or a honeycomb lift the material so the beam doesn’t scorch under it."],
        [560, 186, "Emergency stop", "The red button on the right side. Press it to cut the power right away."],
        [460, 349, "Touch panel", "Status, autofocus (AF), and settings."],
        [120, 352, "Exhaust vent and hose", "Must be attached so fumes go outside or into a filter."],
        [450, 190, "Rails and belts", "Move the laser module left, right, front, and back."]] },
    xcarve: { title: "X-Carve Pro CNC router (front view)",
      draw: () => R(60, 300, 460, 22, C.tan, C.ink, 2, 3) + Array.from({ length: 6 }, (_, i) => L(90 + i * 75, 302, 90 + i * 75, 320, "#8D6E63", 2)).join("") + R(60, 322, 460, 30, "#B0BEC5", C.ink, 2, 3) +
        L(80, 352, 80, 400, C.ink, 5) + L(500, 352, 500, 400, C.ink, 5) + R(50, 120, 26, 180, "#90A4AE", C.ink, 2, 4) + R(504, 120, 26, 180, "#90A4AE", C.ink, 2, 4) + R(40, 100, 500, 34, "#CFD8DC", C.ink, 2.5, 4) +
        R(240, 64, 70, 130, "#ECEFF1", C.ink, 2, 6) + R(252, 120, 46, 110, "#455A64", C.ink, 2, 6) + R(262, 230, 26, 14, "#B0BEC5", C.ink, 1.5, 2) + L(275, 244, 275, 278, C.ink, 4) +
        `<path d="M238 252 L312 252 L320 286 L230 286 Z" fill="${C.glass}" fill-opacity=".7" stroke="${C.ink}" stroke-width="1.5"/>` + `<path d="M312 258 C 360 250 380 200 420 170" fill="none" stroke="${C.gray}" stroke-width="7"/>` +
        R(150, 286, 260, 14, C.wood, C.ink, 1.5, 1) + R(150, 278, 22, 10, "#546E7A", C.ink, 1.5, 2) + R(388, 278, 22, 10, "#546E7A", C.ink, 1.5, 2) +
        R(540, 230, 70, 60, "#263238", C.ink, 2, 6) + `<circle cx="575" cy="248" r="11" fill="${C.red}" stroke="#fff" stroke-width="2"/>` + `<circle cx="200" cy="280" r="7" fill="#B0BEC5" stroke="${C.ink}" stroke-width="1.5"/>` +
        R(200, 360, 140, 40, "#37474F", C.ink, 2, 4) + R(420, 140, 70, 40, "#78909C", C.ink, 2, 6) + T(455, 195, "vacuum", 11),
      parts: [[275, 170, "Spindle", "A 1.5 kW motor that spins the bit at 8,000 to 24,000 RPM. It’s air-cooled."],
        [275, 262, "Collet and bit", "The ER16 collet grips the bit (1/8 in or 1/4 in shank). The bit’s sharp flutes cut the material."],
        [230, 268, "Dust shoe", "A brush skirt around the bit. The hose sucks chips away so you can see and breathe."],
        [110, 117, "Gantry (X axis)", "The bridge that carries the spindle left and right."],
        [275, 80, "Z axis", "Raises and lowers the spindle (up to 6.5 in of travel)."],
        [63, 210, "Ball screws and linear guides", "Precise screws and rails that move the machine smoothly and accurately (to 0.001 in)."],
        [110, 311, "Wasteboard", "The sacrificial table under your material. It’s OK for a through-cut to just touch it."],
        [399, 266, "Clamps", "Hold the material down. Place them where the bit and dust shoe can’t hit them."],
        [575, 248, "Control box (HMI) and E-stop", "Pause, Resume, and Reset buttons, the Z-probe jack, and the red emergency stop."],
        [200, 280, "Z-probe", "A metal puck. The bit touches it so Easel knows exactly where the top of your material is (Z zero)."],
        [270, 380, "Controller", "The machine’s brain and spindle drive. Turn it off at the back when you’re done."],
        [455, 160, "Dust collector", "A shop vacuum connected to the dust shoe. Turn it on before you carve."]] },
  };

  $$(".partsim").forEach(el => {
    const m = M[el.dataset.machine]; if (!m) return;
    el.innerHTML = `<div class="lg-tabs" role="group" aria-label="Mode"><button type="button" class="ps-ex" aria-pressed="true">Explore</button><button type="button" class="ps-qz" aria-pressed="false">Quiz me</button></div>
      <svg class="lg-svg" viewBox="0 0 640 410" role="img" aria-label="${m.title}. Numbered parts you can tap."></svg>
      <div class="lg-card" aria-live="polite"><h4 class="ps-h">Tap a number</h4><p class="ps-p">Each number is a part. Tap it to learn its name and what it does.</p></div>
      <ul class="lg-legend"></ul>`;
    const svg = $("svg", el), h = $(".ps-h", el), p = $(".ps-p", el), card = $(".lg-card", el), leg = $(".lg-legend", el);
    let mode = "ex", order = [], qi = 0, right = 0, tries = 0;
    svg.innerHTML = m.draw() + m.parts.map(([x, y], i) => `<g class="lg-hot" data-i="${i}" tabindex="0" role="button" aria-label="Part ${i + 1}"><circle cx="${x}" cy="${y}" r="12" fill="${C.orange}" stroke="#fff" stroke-width="2.5"/>${T(x, y + 4.5, i + 1, 13, "#fff", "middle", 800)}</g>`).join("");
    const show = i => { h.textContent = `${i + 1}. ${m.parts[i][2]}`; p.textContent = m.parts[i][3]; $$("li", leg).forEach((li, k) => li.setAttribute("aria-current", k === i)); };
    function ask() { if (qi >= order.length) { h.textContent = `Done: ${right} of ${order.length} on the first try`; p.textContent = right === order.length ? "You know this machine. Try the license check below." : "Switch to Explore to review the ones you missed, then try again."; return; }
      h.textContent = `Find: ${m.parts[order[qi]][2]}`; p.innerHTML = `<span class="lg-score">${qi + 1} of ${order.length}</span> · Tap its number.`; tries = 0; }
    function pick(i) {
      if (mode === "ex") return show(i);
      if (qi >= order.length) return;
      if (i === order[qi]) { if (!tries) right++; card.style.borderLeftColor = C.green; qi++; setTimeout(() => { card.style.borderLeftColor = C.orange; ask(); }, 500); }
      else { tries++; card.style.borderLeftColor = C.red; p.innerHTML = `Not that one: #${i + 1} is: ${m.parts[i][2]}. Try again.`; }
    }
    $$(".lg-hot", svg).forEach(g => { g.addEventListener("click", () => pick(+g.dataset.i)); g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(+g.dataset.i); } }); });
    leg.innerHTML = m.parts.map(([, , n], i) => `<li data-i="${i}"><b>${i + 1}</b>${n}</li>`).join("");
    $$("li", leg).forEach(li => li.addEventListener("click", () => { if (mode === "ex") show(+li.dataset.i); }));
    $(".ps-ex", el).addEventListener("click", () => { mode = "ex"; $(".ps-ex", el).setAttribute("aria-pressed", true); $(".ps-qz", el).setAttribute("aria-pressed", false); leg.hidden = false; h.textContent = "Tap a number"; p.textContent = "Each number is a part. Tap it to learn its name and what it does."; });
    $(".ps-qz", el).addEventListener("click", () => { mode = "qz"; $(".ps-qz", el).setAttribute("aria-pressed", true); $(".ps-ex", el).setAttribute("aria-pressed", false); leg.hidden = true;
      order = m.parts.map((_, i) => i).sort(() => Math.random() - .5); qi = 0; right = 0; ask(); });
  });

  // ---------- CNC: zero, depth, and tabs ----------
  $$(".depthsim").forEach(el => {
    el.innerHTML = `<div class="lg-row"><label>Material thickness (in) <input type="number" class="ds-t" value="0.50" step="0.05" min="0.1" max="1"></label>
      <label>Cut depth (in) <input type="number" class="ds-d" value="0.50" step="0.05" min="0" max="1.2"></label>
      <label>Z zero set on <select class="ds-z"><option value="top">top of the material</option><option value="board">the wasteboard</option></select></label>
      <label><input type="checkbox" class="ds-tab" checked> Tabs</label></div>
      <svg class="lg-svg" viewBox="0 0 640 230" role="img" aria-label="Side view of a bit cutting into material on a wasteboard"></svg>
      <p class="lg-say ds-say" aria-live="polite"></p>`;
    const svg = $("svg", el), say = $(".ds-say", el);
    function draw() {
      const t = Math.max(.1, +$(".ds-t", el).value || .5), d = Math.max(0, +$(".ds-d", el).value || 0), z = $(".ds-z", el).value, tabs = $(".ds-tab", el).checked;
      const k = 160, top = 70, bot = top + t * k, board = bot;
      // zeroed on top: depth measured from the material's top. Zeroed on the wasteboard: depth is measured from the board, so the bit plunges into it.
      const tip = z === "top" ? top + d * k : board + d * k;
      let s = R(40, board, 560, 60, C.tan, C.ink, 2, 2) + T(320, board + 40, "wasteboard", 13, "#6D4C41") + R(40, top, 560, t * k, C.wood, C.ink, 2, 2) + T(110, top + t * k / 2 + 5, `material ${t.toFixed(2)} in`, 13, "#5D4037");
      const cutL = 300, cutR = 340, depthPx = Math.min(tip, board + 55) - top;
      s += `<rect x="${cutL}" y="${top}" width="${cutR - cutL}" height="${Math.max(0, Math.min(depthPx, t * k + 55))}" fill="#fff" stroke="${C.gray}" stroke-dasharray="4 3"/>`;
      if (tabs && z === "top" && d >= t) s += R(cutL, bot - 16, cutR - cutL, 16, C.wood, C.ink, 1, 0) + T(cutR + 40, bot - 4, "tab", 12, C.orange, "start", 800);
      s += R(cutL + 6, 10, cutR - cutL - 12, Math.max(10, Math.min(tip, board + 55) - 10), "#78909C", C.ink, 1.5, 2) + L(20, z === "top" ? top : board, 620, z === "top" ? top : board, C.blue, 2, 'stroke-dasharray="7 5"') + T(600, (z === "top" ? top : board) - 6, "Z zero", 12, C.blue, "end", 800);
      svg.innerHTML = s;
      let msg, cls;
      if (z === "board") { msg = d > 0 ? `Danger: Easel thinks the top is down at the wasteboard, so it will plunge ${d.toFixed(2)} in into the board, crashing through your material first. Always zero on top of the material with the Z-probe.` : "With zero on the wasteboard, Easel’s idea of “top” is wrong. Zero on top of the material."; cls = "bad"; }
      else if (d < t - .001) { msg = `The bit stops ${(t - d).toFixed(2)} in short. Good for a pocket or engraving, but it won’t cut the part free.`; cls = ""; }
      else if (d > t + .03) { msg = `It goes ${(d - t).toFixed(2)} in into the wasteboard. A tiny bit (0.01 in) is fine. This much wears the wasteboard and can loosen the part.`; cls = "bad"; }
      else { msg = tabs ? "Clean through-cut. The tabs hold the part so it can’t spin loose and hit the bit. Snip and sand them after." : "Cuts through, but with no tabs the part can break free near the end and fly or get chewed. Add tabs."; cls = tabs ? "ok" : "bad"; }
      say.textContent = msg; say.className = "lg-say ds-say " + cls;
    }
    $$("input,select", el).forEach(x => x.addEventListener("input", draw)); draw();
  });

  // ---------- which filament? ----------
  $$(".filsim").forEach(el => {
    const F = { PLA: { n: "PLA", nz: "190–240 °C", bed: "45–65 °C on Textured PEI", ams: "Yes", good: "Easiest to print, crisp detail, stiff. Our default.", bad: "Softens around 50 °C, like a hot car." },
      PETG: { n: "PETG", nz: "240–270 °C", bed: "60–80 °C on Textured PEI", ams: "Yes", good: "Tougher and more heat-resistant than PLA. Bends before it breaks.", bad: "Strings more, and likes to be dry." },
      TPU: { n: "TPU (flexible)", nz: "200–250 °C", bed: "35–45 °C on Textured PEI", ams: "No: use the spool holder", good: "Rubbery and grippy. Great for bushings, wheels, bumpers.", bad: "Prints slowly, and must be dry. Can’t go through the AMS." } };
    el.innerHTML = `<p style="margin:4px 0 6px">What does your part need? Pick everything that matters.</p><div class="lg-row">
      <label><input type="checkbox" value="flex"> Bend or squish</label><label><input type="checkbox" value="heat"> Survive heat (a hot car)</label>
      <label><input type="checkbox" value="tough"> Take hits without cracking</label><label><input type="checkbox" value="detail"> Fine detail, easy print</label></div>
      <div class="lg-out"><div><b>Pick</b><span class="fs-n">PLA</span></div><div><b>Nozzle</b><span class="fs-nz"></span></div><div><b>Bed</b><span class="fs-bed"></span></div><div><b>AMS?</b><span class="fs-ams"></span></div></div>
      <p class="lg-say fs-say"></p>`;
    function upd() {
      const v = $$("input:checked", el).map(i => i.value); const k = v.includes("flex") ? "TPU" : (v.includes("heat") || v.includes("tough")) ? "PETG" : "PLA"; const f = F[k];
      $(".fs-n", el).textContent = f.n; $(".fs-nz", el).textContent = f.nz; $(".fs-bed", el).textContent = f.bed; $(".fs-ams", el).textContent = f.ams;
      $(".fs-say", el).textContent = `${f.good} Watch out: ${f.bad}` + (v.includes("flex") && (v.includes("heat") || v.includes("detail")) ? " (Flexible wins here. No one filament does everything.)" : "");
    }
    $$("input", el).forEach(i => i.addEventListener("change", upd)); upd();
  });

  // ---------- practice sign-off checklist (practice only; your teacher signs the real one) ----------
  $$(".signoff").forEach(el => {
    const boxes = $$("input[type=checkbox]", el), bar = $(".checks__bar span", el), say = $(".signoff__say", el);
    const upd = () => { const n = boxes.filter(b => b.checked).length; if (bar) bar.style.width = (100 * n / boxes.length) + "%";
      if (say) say.textContent = n === boxes.length ? "You can do every step. Ask your teacher for the real sign-off." : `${n} of ${boxes.length} steps you can show without help.`; };
    boxes.forEach(b => b.addEventListener("change", upd)); upd();
  });
})();
