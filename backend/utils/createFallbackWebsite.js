const createFallbackWebsite = (prompt = "") => {
  const intent = getIntent(prompt)

  if (intent === "snake-game") {
    return createSnakeGame()
  }

  if (intent === "mobile-store") {
    return createMobileStore()
  }

  return createBusinessPage(prompt)
}

const getIntent = (prompt = "") => {
  const text = prompt.toLowerCase()

  if (/\bsnake\b/.test(text) && /\b(game|play|canvas)\b/.test(text)) {
    return "snake-game"
  }

  if (/\b(mobile|phone|smartphone|iphone|android)\b/.test(text)) {
    return "mobile-store"
  }

  return "business"
}

const createSnakeGame = () => ({
  message: "Playable snake game created successfully.",
  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A responsive playable Snake game with score tracking, keyboard controls, touch buttons, pause, and restart.">
  <title>Snake Rush</title>
  <style>
    :root { --bg:#0b1020; --panel:#111936; --line:#24304f; --text:#f8fafc; --muted:#9aa7bd; --green:#22c55e; --red:#fb7185; --yellow:#facc15; }
    * { box-sizing:border-box; }
    body { margin:0; min-height:100vh; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:radial-gradient(circle at top,#1e2a4d 0,#0b1020 44%,#070a13 100%); color:var(--text); display:grid; place-items:center; padding:24px; }
    main { width:min(980px,100%); display:grid; grid-template-columns:minmax(300px,420px) minmax(280px,1fr); gap:24px; align-items:center; }
    .game-shell { background:rgba(17,25,54,.9); border:1px solid var(--line); border-radius:8px; padding:18px; box-shadow:0 24px 80px rgba(0,0,0,.35); }
    canvas { width:100%; aspect-ratio:1; display:block; background:#050816; border:1px solid #2e3b61; border-radius:8px; }
    .hud { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:14px; }
    .stat { background:#0c1329; border:1px solid var(--line); border-radius:8px; padding:12px; text-align:center; }
    .stat span { display:block; color:var(--muted); font-size:.78rem; }
    .stat strong { font-size:1.35rem; }
    h1 { font-size:clamp(2.5rem,7vw,5.2rem); line-height:1; margin:0 0 16px; letter-spacing:0; }
    p { color:var(--muted); font-size:1.05rem; line-height:1.7; margin:0 0 22px; }
    .buttons, .mobile-pad { display:flex; flex-wrap:wrap; gap:10px; }
    button { min-height:46px; padding:0 18px; border:0; border-radius:8px; font-weight:800; cursor:pointer; color:#07101f; background:var(--green); }
    button.secondary { background:#e2e8f0; }
    .mobile-pad { margin-top:16px; justify-content:center; }
    .mobile-pad button { width:58px; padding:0; background:#1f2a48; color:var(--text); border:1px solid var(--line); }
    .pad-row { width:100%; display:flex; justify-content:center; gap:10px; }
    .status { margin-top:14px; min-height:24px; color:var(--yellow); font-weight:750; text-align:center; }
    @media (max-width:820px) { body { padding:14px; } main { grid-template-columns:1fr; } .copy { order:-1; } }
  </style>
</head>
<body>
  <main>
    <section class="game-shell" aria-label="Snake game">
      <div class="hud">
        <div class="stat"><span>Score</span><strong id="score">0</strong></div>
        <div class="stat"><span>Best</span><strong id="best">0</strong></div>
        <div class="stat"><span>Speed</span><strong id="speed">1x</strong></div>
      </div>
      <canvas id="board" width="420" height="420" aria-label="Snake game board"></canvas>
      <div class="status" id="status">Press Start or use arrow keys.</div>
      <div class="mobile-pad" aria-label="Touch controls">
        <div class="pad-row"><button data-dir="up">Up</button></div>
        <div class="pad-row"><button data-dir="left">Left</button><button data-dir="down">Down</button><button data-dir="right">Right</button></div>
      </div>
    </section>
    <section class="copy">
      <h1>Snake Rush</h1>
      <p>Eat the glowing food, grow longer, and avoid the walls and your own tail. Play with arrow keys, WASD, or the touch controls on mobile.</p>
      <div class="buttons">
        <button id="start">Start Game</button>
        <button class="secondary" id="pause">Pause</button>
        <button class="secondary" id="restart">Restart</button>
      </div>
    </section>
  </main>
  <script>
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    const scoreEl = document.getElementById("score");
    const bestEl = document.getElementById("best");
    const speedEl = document.getElementById("speed");
    const statusEl = document.getElementById("status");
    const size = 21;
    const cells = canvas.width / size;
    let snake, food, dir, nextDir, score, best, timer, running, paused, delay;

    function reset() {
      snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      food = placeFood();
      dir = { x: 1, y: 0 };
      nextDir = dir;
      score = 0;
      delay = 135;
      running = false;
      paused = false;
      updateHud();
      draw();
      statusEl.textContent = "Press Start or use arrow keys.";
    }

    function placeFood() {
      let spot;
      do {
        spot = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
      } while (snake && snake.some((part) => part.x === spot.x && part.y === spot.y));
      return spot;
    }

    function updateHud() {
      best = Math.max(best || Number(localStorage.getItem("snakeBest") || 0), score || 0);
      localStorage.setItem("snakeBest", best);
      scoreEl.textContent = score;
      bestEl.textContent = best;
      speedEl.textContent = Math.max(1, Math.round((150 / delay) * 10) / 10) + "x";
    }

    function draw() {
      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(148,163,184,.08)";
      for (let i = 0; i <= size; i++) {
        ctx.beginPath(); ctx.moveTo(i * cells, 0); ctx.lineTo(i * cells, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * cells); ctx.lineTo(canvas.width, i * cells); ctx.stroke();
      }
      ctx.fillStyle = "#fb7185";
      roundCell(food.x, food.y, 7);
      snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#86efac" : "#22c55e";
        roundCell(part.x, part.y, index === 0 ? 8 : 6);
      });
    }

    function roundCell(x, y, radius) {
      const gap = 2;
      const px = x * cells + gap;
      const py = y * cells + gap;
      const w = cells - gap * 2;
      ctx.beginPath();
      ctx.roundRect(px, py, w, w, radius);
      ctx.fill();
    }

    function tick() {
      if (!running || paused) return;
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= size || head.y >= size;
      const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);
      if (hitWall || hitSelf) {
        running = false;
        clearInterval(timer);
        statusEl.textContent = "Game over. Press Restart to play again.";
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        delay = Math.max(70, delay - 4);
        food = placeFood();
        clearInterval(timer);
        timer = setInterval(tick, delay);
      } else {
        snake.pop();
      }
      updateHud();
      draw();
    }

    function start() {
      if (running) return;
      running = true;
      paused = false;
      statusEl.textContent = "Game running.";
      clearInterval(timer);
      timer = setInterval(tick, delay);
    }

    function setDirection(name) {
      const map = { up:{x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0} };
      const next = map[name];
      if (!next || (next.x + dir.x === 0 && next.y + dir.y === 0)) return;
      nextDir = next;
      if (!running) start();
    }

    document.getElementById("start").addEventListener("click", start);
    document.getElementById("restart").addEventListener("click", () => { reset(); start(); });
    document.getElementById("pause").addEventListener("click", () => { paused = !paused; statusEl.textContent = paused ? "Paused." : "Game running."; });
    document.querySelectorAll("[data-dir]").forEach((button) => button.addEventListener("click", () => setDirection(button.dataset.dir)));
    window.addEventListener("keydown", (event) => {
      const keys = { ArrowUp:"up", w:"up", W:"up", ArrowDown:"down", s:"down", S:"down", ArrowLeft:"left", a:"left", A:"left", ArrowRight:"right", d:"right", D:"right" };
      if (keys[event.key]) { event.preventDefault(); setDirection(keys[event.key]); }
    });
    reset();
  </script>
</body>
</html>`
})

const createMobileStore = () => ({
  message: "Mobile catalog website created successfully.",
  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A premium mobile selling website with phone models, specifications, pricing, comparison cards, offers, and contact form.">
  <title>Mobix Store | Mobile Deals</title>
  <style>
    :root { --ink:#111827; --muted:#5d6678; --paper:#f7f9fc; --white:#fff; --line:#dce3ee; --brand:#2563eb; --green:#0f9f6e; --dark:#101827; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--paper); line-height:1.6; }
    header { position:sticky; top:0; z-index:10; background:rgba(255,255,255,.94); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); }
    nav { width:min(1160px,calc(100% - 32px)); margin:auto; min-height:72px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
    .brand { font-weight:900; font-size:1.15rem; }
    .links { display:flex; gap:22px; }
    .links a { color:var(--muted); text-decoration:none; font-weight:700; }
    .btn { display:inline-flex; min-height:44px; align-items:center; justify-content:center; padding:0 18px; border-radius:8px; background:var(--brand); color:white; text-decoration:none; font-weight:850; border:1px solid transparent; cursor:pointer; }
    .btn.secondary { background:white; color:var(--ink); border-color:var(--line); }
    .section { width:min(1160px,calc(100% - 32px)); margin:auto; padding:74px 0; }
    .hero { display:grid; grid-template-columns:1fr .85fr; gap:42px; align-items:center; }
    .eyebrow { color:var(--brand); font-weight:900; margin:0 0 12px; }
    h1 { font-size:clamp(2.4rem,5vw,4.7rem); line-height:1.02; margin:0 0 20px; }
    h2 { font-size:clamp(1.8rem,3vw,2.7rem); line-height:1.1; margin:0 0 14px; }
    p { color:var(--muted); margin:0; }
    .hero p { font-size:1.08rem; max-width:660px; }
    .actions { display:flex; gap:14px; flex-wrap:wrap; margin-top:28px; }
    .hero-card { background:white; border:1px solid var(--line); border-radius:8px; padding:18px; box-shadow:0 20px 60px rgba(17,24,39,.12); }
    .hero-card img { width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:6px; display:block; }
    .products { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:32px; }
    .product { background:white; border:1px solid var(--line); border-radius:8px; padding:22px; box-shadow:0 10px 32px rgba(17,24,39,.07); }
    .product img { width:100%; aspect-ratio:1.15; object-fit:cover; border-radius:6px; background:#eef2f7; }
    .price { font-size:1.9rem; font-weight:950; margin:12px 0 6px; color:var(--ink); }
    .tag { display:inline-flex; color:var(--green); background:#e8fbf3; padding:4px 9px; border-radius:999px; font-weight:850; font-size:.82rem; }
    ul { list-style:none; padding:0; margin:18px 0; display:grid; gap:8px; color:var(--muted); }
    li::before { content:"+"; color:var(--brand); font-weight:900; margin-right:8px; }
    .compare { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:28px; }
    .metric { background:white; border:1px solid var(--line); border-radius:8px; padding:18px; }
    .cta { background:var(--dark); color:white; border-radius:8px; padding:38px; display:grid; grid-template-columns:1fr auto; gap:22px; align-items:center; }
    .cta p { color:#cbd5e1; }
    form { display:flex; gap:10px; flex-wrap:wrap; }
    input { min-height:44px; border:1px solid var(--line); border-radius:8px; padding:0 14px; font:inherit; min-width:220px; }
    footer { text-align:center; padding:30px 16px; border-top:1px solid var(--line); color:var(--muted); }
    @media (max-width:900px) { .hero,.products,.cta { grid-template-columns:1fr; } .compare { grid-template-columns:repeat(2,1fr); } .links { display:none; } }
    @media (max-width:560px) { .compare { grid-template-columns:1fr; } input,.btn { width:100%; } }
  </style>
</head>
<body>
  <header>
    <nav>
      <div class="brand">Mobix Store</div>
      <div class="links"><a href="#phones">Phones</a><a href="#compare">Compare</a><a href="#contact">Contact</a></div>
      <a class="btn" href="#phones">Shop Now</a>
    </nav>
  </header>
  <main>
    <section class="section hero">
      <div>
        <p class="eyebrow">Latest mobile deals</p>
        <h1>Find the right smartphone for your budget.</h1>
        <p>Compare camera quality, battery life, storage, processor, and price across popular mobile models before you buy.</p>
        <div class="actions"><a class="btn" href="#phones">View Mobiles</a><a class="btn secondary" href="#compare">Compare Specs</a></div>
      </div>
      <div class="hero-card"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80" alt="Modern smartphones"></div>
    </section>
    <section id="phones" class="section">
      <p class="eyebrow">Featured phones</p>
      <h2>Different mobile options with clear details.</h2>
      <div class="products">
        <article class="product"><img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80" alt="Android phone"><span class="tag">Best Value</span><h3>Nova X5 5G</h3><div class="price">Rs 24,999</div><ul><li>8GB RAM, 128GB storage</li><li>64MP triple camera</li><li>5000mAh battery</li></ul><a class="btn secondary" href="#contact">Enquire</a></article>
        <article class="product"><img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80" alt="Premium phone"><span class="tag">Pro Camera</span><h3>PixelPro Z</h3><div class="price">Rs 54,999</div><ul><li>12GB RAM, 256GB storage</li><li>OIS night camera</li><li>120Hz AMOLED display</li></ul><a class="btn" href="#contact">Buy Now</a></article>
        <article class="product"><img src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80" alt="Foldable phone"><span class="tag">Premium</span><h3>Flex Fold Air</h3><div class="price">Rs 89,999</div><ul><li>Foldable OLED screen</li><li>512GB storage</li><li>Fast wireless charging</li></ul><a class="btn secondary" href="#contact">Enquire</a></article>
      </div>
    </section>
    <section id="compare" class="section">
      <p class="eyebrow">Quick compare</p>
      <h2>Choose by what matters most.</h2>
      <div class="compare">
        <div class="metric"><h3>Camera</h3><p>Up to 108MP with night mode and optical stabilization.</p></div>
        <div class="metric"><h3>Battery</h3><p>All-day 5000mAh options with fast charging support.</p></div>
        <div class="metric"><h3>Display</h3><p>AMOLED and high refresh-rate screens for smooth use.</p></div>
        <div class="metric"><h3>Storage</h3><p>128GB to 512GB choices for apps, games, and videos.</p></div>
      </div>
    </section>
    <section id="contact" class="section">
      <div class="cta">
        <div><h2>Need help choosing?</h2><p>Share your budget and preferred brand. Our team will recommend the best mobile.</p></div>
        <form><input aria-label="Phone number" placeholder="Enter phone number"><button class="btn" type="submit">Request Call</button></form>
      </div>
    </section>
  </main>
  <footer>Mobix Store. Genuine mobiles, clear pricing, trusted support.</footer>
</body>
</html>`
})

const createBusinessPage = (prompt = "") => {
  const topic = escapeHtml(getTopic(prompt))
  const business = escapeHtml(getBusinessName(prompt))

  return {
    message: `${business} website created successfully.`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${business} offers professional ${topic} services with clear information and simple contact options.">
  <title>${business}</title>
  <style>
    *{box-sizing:border-box} body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f7f9fc;color:#111827;line-height:1.6} .section{width:min(1100px,calc(100% - 32px));margin:auto;padding:72px 0} header{background:white;border-bottom:1px solid #dce3ee} nav{min-height:72px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:900}.btn{display:inline-flex;min-height:44px;align-items:center;padding:0 18px;border-radius:8px;background:#2563eb;color:white;text-decoration:none;font-weight:800} h1{font-size:clamp(2.4rem,5vw,4.5rem);line-height:1.05;margin:0 0 18px} h2{font-size:clamp(1.7rem,3vw,2.5rem)} p{color:#5d6678}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card{background:white;border:1px solid #dce3ee;border-radius:8px;padding:24px}@media(max-width:800px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header><nav class="section"><div class="brand">${business}</div><a class="btn" href="#contact">Contact</a></nav></header>
  <main>
    <section class="section"><h1>Premium ${titleCase(topic)} website.</h1><p>${business} presents services, pricing, benefits, and contact details in a clean responsive layout.</p><p><a class="btn" href="#services">Explore Services</a></p></section>
    <section id="services" class="section"><h2>Services</h2><div class="grid"><div class="card"><h3>Consulting</h3><p>Clear guidance for every customer.</p></div><div class="card"><h3>Delivery</h3><p>Fast and reliable service experience.</p></div><div class="card"><h3>Support</h3><p>Helpful after-sales support.</p></div></div></section>
    <section id="contact" class="section"><h2>Contact</h2><p>Email hello@example.com to get started.</p></section>
  </main>
</body>
</html>`
  }
}

const getTopic = (prompt = "") => {
  return prompt
    .toLowerCase()
    .replace(/\b(create|build|make|website|site|page|selling|pricing|for|a|an|the)\b/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "business"
}

const getBusinessName = (prompt = "") => {
  const topic = getTopic(prompt)
  return `${titleCase(topic.split(" ")[0] || "Zion")} Studio`
}

const titleCase = (value = "") => {
  return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
}

const escapeHtml = (value = "") => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export default createFallbackWebsite
