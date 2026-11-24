/* ============================================================
   learn.js — shared learning tools for Model & Make.
   1) Listen bars:   <div class="listen" data-src="media/x.mp3" data-min="4"></div>
   2) Self-checks:   <div class="quiz"><script type="application/json">[...]</script></div>
      item = { q, options:[...], answer: index, why, hint? }
   3) Dial caliper:  <div class="dialsim"></div>
   Nothing is saved or sent anywhere; it all runs in the page.
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- 1. Listen bar ----------
  $$(".listen").forEach(el => {
    const src = el.dataset.src, min = el.dataset.min;
    el.innerHTML = `<div class="listen__head"><span class="listen__ic" aria-hidden="true">🔊</span>
      <strong>Listen to this chapter</strong>${min ? `<span class="listen__len">about ${esc(min)} min</span>` : ""}</div>
      <audio controls preload="none" src="${esc(src)}"></audio>
      <div class="listen__speed" role="group" aria-label="Playback speed">
        <span>Speed:</span>
        <button type="button" data-r="0.85">Slower</button>
        <button type="button" data-r="1" aria-pressed="true">Normal</button>
        <button type="button" data-r="1.2">Faster</button>
      </div>`;
    const a = $("audio", el);
    $$(".listen__speed button", el).forEach(b => b.addEventListener("click", () => {
      a.playbackRate = +b.dataset.r;
      $$(".listen__speed button", el).forEach(x => x.setAttribute("aria-pressed", x === b));
    }));
  });

  // ---------- 2. Self-check quiz ----------
  $$(".quiz").forEach((el, qi) => {
    let items;
    try { items = JSON.parse($("script", el).textContent); } catch (e) { return; }
    const first = new Array(items.length).fill(null);
    let html = `<p class="quiz__intro">Tap an answer. You'll see right away if it's right, and why. Wrong answers are OK — try again.</p>`;
    items.forEach((it, i) => {
      html += `<fieldset class="quiz__q" data-i="${i}"><legend><span class="quiz__n">${i + 1}</span> ${it.q}</legend>
        <div class="quiz__opts">${it.options.map((o, j) =>
          `<button type="button" class="quiz__opt" data-j="${j}"><span class="quiz__l">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}</div>
        <p class="quiz__fb" aria-live="polite"></p></fieldset>`;
    });
    html += `<div class="quiz__foot"><span class="quiz__score" aria-live="polite"></span>
      <button type="button" class="sim__btn quiz__reset">Start over</button></div>`;
    const box = document.createElement("div"); box.innerHTML = html; el.appendChild(box);

    const score = () => {
      const done = first.filter(x => x !== null).length;
      const right = first.filter(x => x === true).length;
      $(".quiz__score", el).textContent = done === items.length
        ? `You got ${right} of ${items.length} right on the first try. ${right === items.length ? "Nice work!" : "Reread the parts you missed, then try again."}`
        : `${done} of ${items.length} answered`;
    };
    $$(".quiz__q", el).forEach(fs => {
      const i = +fs.dataset.i, it = items[i];
      $$(".quiz__opt", fs).forEach(b => b.addEventListener("click", () => {
        if (fs.classList.contains("is-done")) return;
        const j = +b.dataset.j, ok = j === it.answer;
        if (first[i] === null) first[i] = ok;
        const fb = $(".quiz__fb", fs);
        if (ok) {
          b.classList.add("is-right"); fs.classList.add("is-done");
          $$(".quiz__opt", fs).forEach(x => x.disabled = true);
          fb.className = "quiz__fb is-right"; fb.innerHTML = `<strong>Yes!</strong> ${it.why}`;
        } else {
          b.classList.add("is-wrong"); b.disabled = true;
          fb.className = "quiz__fb is-wrong"; fb.innerHTML = `<strong>Not quite.</strong> ${it.hint || "Look again and try another answer."}`;
        }
        score();
      }));
    });
    $(".quiz__reset", el).addEventListener("click", () => {
      first.fill(null);
      $$(".quiz__q", el).forEach(fs => {
        fs.classList.remove("is-done");
        $$(".quiz__opt", fs).forEach(x => { x.disabled = false; x.classList.remove("is-right", "is-wrong"); });
        const fb = $(".quiz__fb", fs); fb.className = "quiz__fb"; fb.textContent = "";
      });
      score();
    });
    score();
  });

  // ---------- 3. Dial caliper practice ----------
  $$(".dialsim").forEach(el => {
    const W = 720, H = 250, x0 = 70, ppi = 230, y = 120, MAX = 2.5;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="A dial caliper. The bar shows inches and tenths; the dial shows thousandths."></svg>
      <div class="sim__bar">
        <label class="dialsim__lab" for="ds${el.id}">Slide the jaw</label>
        <input type="range" id="ds${el.id}" min="0" max="2500" step="1" value="1237" class="dialsim__range">
        <label class="sim__toggle"><input type="checkbox" class="dialsim__show" checked> Show the reading</label>
      </div>
      <div class="sim__bar dialsim__practice">
        <button type="button" class="sim__btn sim__btn--go dialsim__new">New challenge</button>
        <label>Your reading: <input type="text" inputmode="decimal" class="dialsim__in" placeholder="0.000" size="7"> in</label>
        <button type="button" class="sim__btn dialsim__check">Check</button>
      </div>
      <p class="sim__say dialsim__say" aria-live="polite"></p>`;
    const svg = $("svg", el), range = $(".dialsim__range", el), show = $(".dialsim__show", el), say = $(".dialsim__say", el);
    let target = null;
    const parts = v => { const thou = Math.round(v * 1000); return { bar: Math.floor(thou / 100) / 10, dial: thou % 100, total: thou / 1000 }; };
    function draw(v) {
      const xs = x0 + v * ppi; let s = "";
      s += `<rect x="20" y="${y - 22}" width="${W - 40}" height="44" rx="5" fill="#C9D1DB" stroke="#9AA6B4" stroke-width="2"/>`;
      for (let i = 0; i <= MAX * 10; i++) {
        const x = x0 + i * ppi / 10, big = i % 10 === 0;
        s += `<line x1="${x}" y1="${y - 22}" x2="${x}" y2="${y - 22 + (big ? 18 : i % 5 === 0 ? 13 : 9)}" stroke="#1A1A1A" stroke-width="${big ? 2 : 1.1}"/>`;
        s += big ? `<text x="${x + 3}" y="${y + 12}" font-size="15" font-weight="700" fill="#1A1A1A">${i / 10}</text>`
                 : `<text x="${x + 2}" y="${y + 9}" font-size="10" fill="#5B6470">${i % 10}</text>`;
      }
      // fixed jaw
      s += `<path d="M${x0 - 50},${y + 22} L${x0},${y + 22} L${x0},${y + 110} L${x0 - 10},${y + 124} L${x0 - 50},${y + 50}Z" fill="#C9D1DB" stroke="#9AA6B4" stroke-width="2"/>`;
      // slider body + jaw
      s += `<path d="M${xs},${y + 22} L${xs + 50},${y + 22} L${xs + 50},${y + 50} L${xs + 10},${y + 124} L${xs},${y + 110}Z" fill="#C9D1DB" stroke="#9AA6B4" stroke-width="2"/>`;
      s += `<rect x="${xs}" y="${y - 32}" width="150" height="64" rx="8" fill="#E6EAF0" stroke="#9AA6B4" stroke-width="2"/>`;
      s += `<line x1="${xs}" y1="${y - 40}" x2="${xs}" y2="${y + 22}" stroke="#C55A11" stroke-width="3"/>`;
      const cx = xs + 85, cy = y - 50, r = 56, p = parts(v);
      s += `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="#fff" stroke="#1A1A1A" stroke-width="2"/>`;
      for (let i = 0; i < 100; i++) {
        const a = (i * 3.6 - 90) * Math.PI / 180, l = i % 10 === 0 ? 10 : i % 5 === 0 ? 7 : 4;
        s += `<line x1="${cx + Math.cos(a) * r}" y1="${cy + Math.sin(a) * r}" x2="${cx + Math.cos(a) * (r - l)}" y2="${cy + Math.sin(a) * (r - l)}" stroke="#1A1A1A" stroke-width="${i % 10 === 0 ? 1.6 : .7}"/>`;
        if (i % 10 === 0) s += `<text x="${cx + Math.cos(a) * (r - 19)}" y="${cy + Math.sin(a) * (r - 19) + 4}" text-anchor="middle" font-size="10" fill="#1A1A1A">${i}</text>`;
      }
      const na = (p.dial * 3.6 - 90) * Math.PI / 180;
      s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(na) * (r - 4)}" y2="${cy + Math.sin(na) * (r - 4)}" stroke="#C55A11" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="4" fill="#C55A11"/>`;
      svg.innerHTML = s;
      if (target === null) {
        say.innerHTML = show.checked
          ? `<strong>Bar:</strong> ${p.bar.toFixed(1)} &nbsp;+&nbsp; <strong>Dial:</strong> ${p.dial} → 0.${String(p.dial).padStart(3, "0")} &nbsp;=&nbsp; <strong>${p.total.toFixed(3)} in</strong>`
          : `Read the bar at the orange line, then the dial. Turn on “Show the reading” to check.`;
      }
    }
    range.addEventListener("input", () => { target = null; draw(range.value / 1000); });
    show.addEventListener("change", () => draw(range.value / 1000));
    $(".dialsim__new", el).addEventListener("click", () => {
      target = (50 + Math.floor(Math.random() * 2400)) / 1000;
      show.checked = false; range.value = Math.round(target * 1000); draw(target);
      $(".dialsim__in", el).value = ""; $(".dialsim__in", el).focus();
      say.innerHTML = `What does this caliper read? Type it to three decimal places, like 1.237.`;
    });
    $(".dialsim__check", el).addEventListener("click", () => {
      if (target === null) { say.textContent = "Press New challenge first."; return; }
      const g = parseFloat($(".dialsim__in", el).value), p = parts(target);
      if (isNaN(g)) { say.textContent = "Type a number like 1.237."; return; }
      if (Math.abs(g - target) < 0.0005) say.innerHTML = `<strong>Correct!</strong> ${p.bar.toFixed(1)} + 0.${String(p.dial).padStart(3, "0")} = ${p.total.toFixed(3)} in. Press New challenge for another.`;
      else if (Math.abs(g - p.bar) < 0.0005 || Math.floor(g * 10) / 10 === p.bar) say.innerHTML = `<strong>Close.</strong> Your bar reading looks right. Now check the dial: which number is the needle pointing to?`;
      else say.innerHTML = `<strong>Not yet.</strong> Start with the bar: find the last mark to the left of the orange line. Then add the dial.`;
    });
    draw(1.237);
  });
})();
