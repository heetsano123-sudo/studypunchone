(() => {
  const DATA = () => window.NCERT_FULL_DIAGRAMS || [];
  const UNITS = () => window.NCERT_UNITS || [];

  let currentView = "index"; // "index" | "viewer"
  let renderMode = "3d";     // "3d" | "2d"
  let showLabels = true;
  let autoRotate = true;
  let explode3d = false;
  let idxFilterCls = "ALL";
  let idxFilterUnit = "ALL";
  let activeDiag = null;

  // Test State
  let testTab = "label"; // "label" | "identify"
  let testScore = 0, testAttempts = 0, testStreak = 0;
  let quizLabelIdx = 0, quizAnswered = false;
  let idTargetDiag = null, idOptions = [], idAnswered = false;

  // Three.js State
  let scene = null, camera = null, renderer = null, group = null, animId = null;
  let rotX = 0.25, rotY = 0.35, zoomZ = 5.4, dragging = false, lx = 0, ly = 0;

  // ================= 1. INJECT HEADER PORTAL BUTTON & FULL-SCREEN PAGE =================
  function injectHubUI() {
    const anchor = document.getElementById("openNcertReaderBtn") || document.getElementById("openBio3dBtn") || document.getElementById("openSettingsBtn");
    if (anchor && !document.getElementById("ndh_openBtn")) {
      const btn = document.createElement("button");
      btn.id = "ndh_openBtn";
      btn.type = "button";
      btn.className = "clicky px-3 py-2 rounded-xl text-xs font-extrabold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 flex items-center gap-1.5 shadow-sm";
      btn.innerHTML = `<span>🔬</span><span class="hidden sm:inline">2D/3D Atlas</span>`;
      btn.title = "Open Complete NCERT Biology 2D & 3D Diagram Index + Quick Test";
      anchor.parentNode.insertBefore(btn, anchor);
      btn.addEventListener("click", openHubToIndex);
    }

    if (document.getElementById("ndh_page")) return;
    const page = document.createElement("div");
    page.id = "ndh_page";
    page.className = "hidden fixed inset-0 z-[128] flex flex-col overflow-hidden";
    page.style.background = "var(--bg-base)";
    page.innerHTML = `
      <!-- Top Bar -->
      <header class="bg-black/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-2.5">
          <button type="button" id="ndh_closeBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15">← Exit</button>
          <button type="button" id="ndh_backToIndexBtn" class="hidden clicky px-3 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30">📑 Diagram Index</button>
          <div>
            <h2 class="font-serif-luxury text-base sm:text-lg font-bold theme-gradient-text leading-tight">🔬 NCERT Biology 2D &amp; 3D Diagram Atlas</h2>
            <p id="ndh_subTitle" class="text-[10px] text-zinc-400">Complete Class 11 &amp; 12 Index • 10 Units • 32 Chapters</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span id="ndh_scorePill" class="px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold mono-nums">🏆 Test: 0/0</span>
        </div>
      </header>

      <!-- VIEW A: COMPLETE DIAGRAM INDEX (OPENS FIRST) -->
      <div id="ndh_indexView" class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="max-w-7xl mx-auto space-y-5">
          <div class="luxury-card rounded-3xl p-4 sm:p-5 space-y-3">
            <div class="flex flex-col md:flex-row gap-2.5">
              <input id="ndh_searchInput" type="text" placeholder="🔍 Search any NCERT diagram, organism, label, or chapter (e.g. Heart, Nostoc, Lac Operon, ECG, pBR322)..." class="flex-1 px-4 py-2.5 rounded-2xl bg-black border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400" />
              <select id="ndh_unitSelect" class="px-3.5 py-2.5 rounded-2xl bg-black border border-white/15 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"></select>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <button type="button" data-fcls="ALL" class="ndh-cls-btn clicky px-3 py-1.5 rounded-xl text-xs font-bold theme-btn-primary">All Classes</button>
                <button type="button" data-fcls="11" class="ndh-cls-btn clicky px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">Class 11 (Units I–V)</button>
                <button type="button" data-fcls="12" class="ndh-cls-btn clicky px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">Class 12 (Units VI–X)</button>
              </div>
              <span id="ndh_indexCount" class="text-xs font-bold text-zinc-400 mono-nums"></span>
            </div>
          </div>

          <div id="ndh_indexList" class="space-y-6"></div>

          <!-- Bottom Index Quick Test Launcher -->
          <div class="luxury-card rounded-3xl p-6 text-center space-y-3 border border-emerald-500/30">
            <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Rapid NEET Revision</span>
            <h3 class="font-serif-luxury text-xl font-bold text-white">Ready to Test Your Diagram Memory?</h3>
            <p class="text-xs text-zinc-400 max-w-lg mx-auto">Jump directly into a random NCERT diagram Identification &amp; Label Quiz across all 32 chapters.</p>
            <button type="button" id="ndh_launchRandomTestBtn" class="clicky px-6 py-3 rounded-2xl text-xs font-extrabold theme-btn-primary uppercase tracking-wider">🧠 Start Random Diagram Quick Test →</button>
          </div>
        </div>
      </div>

      <!-- VIEW B: 3D & 2D DIAGRAM STUDIO + BOTTOM QUICK TEST -->
      <div id="ndh_viewerView" class="hidden flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- Diagram Header & Mode Controls -->
          <div class="luxury-card rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span id="ndh_vUnitBadge" class="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold theme-btn-primary">Class 11</span>
                <span id="ndh_vChText" class="text-xs font-semibold text-zinc-400"></span>
              </div>
              <h3 id="ndh_vTitle" class="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1"></h3>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <!-- 3D / 2D Switcher -->
              <div class="inline-flex bg-black p-1 rounded-xl border border-white/15">
                <button type="button" id="ndh_mode3dBtn" class="clicky px-3 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary">🧊 3D View</button>
                <button type="button" id="ndh_mode2dBtn" class="clicky px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white">📐 2D View</button>
              </div>
              <button type="button" id="ndh_toggleLabelsBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-zinc-200 border border-white/15">🏷️ Labels: ON</button>
              <button type="button" id="ndh_explodeBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-zinc-200 border border-white/15">💥 Explode: OFF</button>
              <button type="button" id="ndh_prevDiagBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white">‹ Prev</button>
              <button type="button" id="ndh_nextDiagBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white">Next ›</button>
              <button type="button" id="ndh_jumpTestBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">📝 Quick Test ↓</button>
            </div>
          </div>

          <!-- Interactive Stage (3D WebGL OR 2D Vector Schematic) + Label Key -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div id="ndh_stageWrap" class="lg:col-span-2 bg-black/90 rounded-3xl border border-white/15 relative overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
              <!-- 3D Canvas -->
              <canvas id="ndh_canvas3d" class="w-full h-full block cursor-grab active:cursor-grabbing" style="touch-action:none;"></canvas>
              <div id="ndh_labels3d" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
              <!-- 2D SVG Container -->
              <div id="ndh_svg2dWrap" class="hidden w-full h-full flex items-center justify-center p-3"></div>
              <div id="ndh_stageHint" class="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/80 border border-white/10 text-[10px] text-zinc-400 pointer-events-none">
                🖱️ Drag 360° to Rotate • Scroll to Zoom
              </div>
            </div>

            <!-- NCERT Labels & High-Yield Exam Box -->
            <div class="luxury-card rounded-3xl p-5 flex flex-col justify-between gap-4">
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] theme-gradient-text">📌 Official NCERT Labels</span>
                <div id="ndh_labelKeyList" class="mt-3 space-y-2"></div>
              </div>
              <div class="p-4 rounded-2xl bg-black/80 border border-amber-500/30">
                <p class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 mb-1">💡 High-Yield NEET Point</p>
                <p id="ndh_vTip" class="text-xs text-zinc-200 leading-relaxed"></p>
              </div>
            </div>
          </div>

          <!-- ================= BOTTOM QUICK TEST SECTION (LABELS + IDENTIFICATION) ================= -->
          <div id="ndh_quickTestSection" class="luxury-card rounded-3xl p-5 sm:p-7 border border-emerald-500/35 space-y-5">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Instant Recall Check</span>
                <h3 class="font-serif-luxury text-xl font-bold text-white mt-1">📝 Quick Test: Labels &amp; Diagram Identification</h3>
              </div>
              <div class="inline-flex bg-black p-1 rounded-xl border border-white/15">
                <button type="button" id="ndh_tabLabelQuiz" class="clicky px-3.5 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary">🏷️ Label Test</button>
                <button type="button" id="ndh_tabIdentifyQuiz" class="clicky px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white">🔍 Diagram Identification</button>
              </div>
            </div>

            <!-- Mode 1: Label Quiz -->
            <div id="ndh_labelQuizPanel" class="space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 bg-black/70 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-wider text-amber-300">Active Diagram Label Challenge</p>
                  <p id="ndh_lqPrompt" class="text-sm sm:text-base font-bold text-white mt-0.5"></p>
                </div>
                <button type="button" id="ndh_lqNextBtn" class="clicky px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/15">Next Pin →</button>
              </div>
              <div id="ndh_lqOptions" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"></div>
              <p id="ndh_lqFeedback" class="text-xs font-bold min-h-[18px]"></p>
            </div>

            <!-- Mode 2: Diagram Identification Quiz -->
            <div id="ndh_identifyQuizPanel" class="hidden space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-black/75 p-4 rounded-2xl border border-zinc-800">
                <div id="ndh_idPreviewBox" class="bg-zinc-950 rounded-2xl border border-white/10 h-56 flex items-center justify-center p-2 overflow-hidden"></div>
                <div class="space-y-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase">Identify This NCERT Diagram</span>
                  <p id="ndh_idClueText" class="text-xs text-zinc-300 leading-relaxed"></p>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" id="ndh_idNextBtn" class="clicky px-4 py-2 rounded-xl text-xs font-extrabold theme-btn-primary">🎲 New Mystery Diagram</button>
                    <button type="button" id="ndh_idStudyBtn" class="hidden clicky px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-emerald-300 border border-emerald-500/30">Open in 3D/2D Studio →</button>
                  </div>
                </div>
              </div>
              <div id="ndh_idOptions" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"></div>
              <p id="ndh_idFeedback" class="text-xs font-bold min-h-[18px]"></p>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(page);

    // Populate Unit Select Dropdown
    const uSel = document.getElementById("ndh_unitSelect");
    uSel.innerHTML = `<option value="ALL">All 10 NCERT Units</option>` + UNITS().map(u => `<option value="${u.id}">Class ${u.cls} • ${u.name}</option>`).join("");

    // Bind Events
    document.getElementById("ndh_closeBtn").addEventListener("click", closeHub);
    document.getElementById("ndh_backToIndexBtn").addEventListener("click", showIndexView);
    document.getElementById("ndh_searchInput").addEventListener("input", renderIndexList);
    uSel.addEventListener("change", () => { idxFilterUnit = uSel.value; renderIndexList(); });

    document.querySelectorAll(".ndh-cls-btn").forEach(b => {
      b.addEventListener("click", () => {
        idxFilterCls = b.getAttribute("data-fcls");
        document.querySelectorAll(".ndh-cls-btn").forEach(x => {
          x.className = x.getAttribute("data-fcls") === idxFilterCls
            ? "ndh-cls-btn clicky px-3 py-1.5 rounded-xl text-xs font-bold theme-btn-primary"
            : "ndh-cls-btn clicky px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800";
        });
        renderIndexList();
      });
    });

    document.getElementById("ndh_launchRandomTestBtn").addEventListener("click", () => {
      const all = DATA();
      if (!all.length) return;
      openDiagramViewer(all[Math.floor(Math.random() * all.length)]);
      switchTestTab("identify");
      setTimeout(() => document.getElementById("ndh_quickTestSection").scrollIntoView({ behavior: "smooth" }), 120);
    });

    document.getElementById("ndh_mode3dBtn").addEventListener("click", () => setRenderMode("3d"));
    document.getElementById("ndh_mode2dBtn").addEventListener("click", () => setRenderMode("2d"));
    document.getElementById("ndh_toggleLabelsBtn").addEventListener("click", () => {
      showLabels = !showLabels;
      document.getElementById("ndh_toggleLabelsBtn").textContent = showLabels ? "🏷️ Labels: ON" : "🏷️ Labels: OFF";
      syncLabelsDisplay();
    });
    document.getElementById("ndh_explodeBtn").addEventListener("click", () => {
      explode3d = !explode3d;
      document.getElementById("ndh_explodeBtn").textContent = explode3d ? "💥 Explode: ON" : "💥 Explode: OFF";
    });
    document.getElementById("ndh_prevDiagBtn").addEventListener("click", () => stepDiagram(-1));
    document.getElementById("ndh_nextDiagBtn").addEventListener("click", () => stepDiagram(1));
    document.getElementById("ndh_jumpTestBtn").addEventListener("click", () => {
      document.getElementById("ndh_quickTestSection").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("ndh_tabLabelQuiz").addEventListener("click", () => switchTestTab("label"));
    document.getElementById("ndh_tabIdentifyQuiz").addEventListener("click", () => switchTestTab("identify"));
    document.getElementById("ndh_lqNextBtn").addEventListener("click", () => loadLabelQuizQuestion((quizLabelIdx + 1) % (activeDiag?.labels.length || 1)));
    document.getElementById("ndh_idNextBtn").addEventListener("click", loadIdentifyQuestion);
    document.getElementById("ndh_idStudyBtn").addEventListener("click", () => { if (idTargetDiag) openDiagramViewer(idTargetDiag); });
  }

  // ================= 2. NAVIGATION (INDEX FIRST → VIEWER) =================
  function openHubToIndex() {
    document.getElementById("ndh_page").classList.remove("hidden");
    showIndexView();
  }

  function closeHub() {
    document.getElementById("ndh_page").classList.add("hidden");
    if (animId) { cancelAnimationFrame(animId); animId = null; }
  }

  function showIndexView() {
    currentView = "index";
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    document.getElementById("ndh_indexView").classList.remove("hidden");
    document.getElementById("ndh_viewerView").classList.add("hidden");
    document.getElementById("ndh_backToIndexBtn").classList.add("hidden");
    document.getElementById("ndh_subTitle").textContent = `Complete Class 11 & 12 Index • ${DATA().length} NCERT Diagrams`;
    renderIndexList();
  }

  function renderIndexList() {
    const q = (document.getElementById("ndh_searchInput")?.value || "").toLowerCase().trim();
    const list = DATA().filter(d => {
      const cOk = idxFilterCls === "ALL" || String(d.cls) === idxFilterCls;
      const uOk = idxFilterUnit === "ALL" || d.unit === idxFilterUnit;
      const qOk = !q || d.title.toLowerCase().includes(q) || d.ch.toLowerCase().includes(q) || d.labels.some(l => l.toLowerCase().includes(q));
      return cOk && uOk && qOk;
    });

    document.getElementById("ndh_indexCount").textContent = `Showing ${list.length} of ${DATA().length} NCERT Diagrams`;
    const cont = document.getElementById("ndh_indexList");
    if (!list.length) {
      cont.innerHTML = `<div class="luxury-card rounded-3xl p-8 text-center text-xs text-zinc-400">No NCERT diagrams matched your search.</div>`;
      return;
    }

    // Group by Unit → Chapter
    const byUnit = {};
    list.forEach(d => {
      if (!byUnit[d.unit]) byUnit[d.unit] = {};
      if (!byUnit[d.unit][d.ch]) byUnit[d.unit][d.ch] = [];
      byUnit[d.unit][d.ch].push(d);
    });

    cont.innerHTML = UNITS().filter(u => byUnit[u.id]).map(u => {
      const chMap = byUnit[u.id];
      const chaptersHtml = Object.keys(chMap).map(chName => `
        <div class="bg-black/65 rounded-2xl p-4 border border-zinc-800/90 space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <h4 class="text-xs sm:text-sm font-extrabold text-white">${chName}</h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 font-bold mono-nums">${chMap[chName].length} diagrams</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            ${chMap[chName].map(d => `
              <button type="button" data-open-id="${d.id}" class="ndh-open-diag clicky text-left p-3 rounded-xl bg-zinc-950/90 hover:bg-white/10 border border-zinc-800 hover:border-amber-400/50 transition flex flex-col justify-between gap-1.5">
                <p class="text-xs font-bold text-zinc-100 leading-snug">${d.title}</p>
                <div class="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>🏷️ ${d.labels.length} labels</span>
                  <span class="theme-gradient-text font-bold">3D / 2D →</span>
                </div>
              </button>`).join("")}
          </div>
        </div>`).join("");

      return `
        <section class="luxury-card rounded-3xl p-5 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <h3 class="font-serif-luxury text-lg sm:text-xl font-bold theme-gradient-text">${u.name}</h3>
            <span class="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-200 text-[10px] font-bold">Class ${u.cls}</span>
          </div>
          <div class="space-y-3">${chaptersHtml}</div>
        </section>`;
    }).join("");

    cont.querySelectorAll(".ndh-open-diag").forEach(btn => {
      btn.addEventListener("click", () => {
        const found = DATA().find(x => x.id === btn.getAttribute("data-open-id"));
        if (found) openDiagramViewer(found);
      });
    });
  }

  function openDiagramViewer(diag) {
    activeDiag = diag;
    currentView = "viewer";
    document.getElementById("ndh_indexView").classList.add("hidden");
    document.getElementById("ndh_viewerView").classList.remove("hidden");
    document.getElementById("ndh_backToIndexBtn").classList.remove("hidden");
    document.getElementById("ndh_viewerView").scrollTop = 0;

    const unitObj = UNITS().find(u => u.id === diag.unit);
    document.getElementById("ndh_vUnitBadge").textContent = `Class ${diag.cls} • ${diag.unit}`;
    document.getElementById("ndh_vChText").textContent = `${unitObj ? unitObj.name + " • " : ""}${diag.ch}`;
    document.getElementById("ndh_vTitle").textContent = diag.title;
    document.getElementById("ndh_vTip").textContent = diag.tip;
    document.getElementById("ndh_subTitle").textContent = `Viewing: ${diag.title}`;

    setRenderMode(renderMode);
    renderLabelKeyList();
    if (testTab === "label") loadLabelQuizQuestion(0);
    else loadIdentifyQuestion();
  }

  function stepDiagram(delta) {
    const all = DATA();
    if (!all.length || !activeDiag) return;
    const idx = all.findIndex(x => x.id === activeDiag.id);
    const next = (idx + delta + all.length) % all.length;
    openDiagramViewer(all[next]);
  }

  function setRenderMode(mode) {
    renderMode = mode;
    const is3d = mode === "3d";
    document.getElementById("ndh_mode3dBtn").className = is3d ? "clicky px-3 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary" : "clicky px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white";
    document.getElementById("ndh_mode2dBtn").className = !is3d ? "clicky px-3 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary" : "clicky px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white";

    document.getElementById("ndh_canvas3d").classList.toggle("hidden", !is3d);
    document.getElementById("ndh_labels3d").classList.toggle("hidden", !is3d);
    document.getElementById("ndh_explodeBtn").classList.toggle("hidden", !is3d);
    document.getElementById("ndh_svg2dWrap").classList.toggle("hidden", is3d);
    document.getElementById("ndh_stageHint").textContent = is3d ? "🖱️ Drag 360° to Rotate • Scroll to Zoom" : "📐 Clean 2D Textbook Schematic with NCERT Callouts";

    if (is3d) {
      initThree();
      build3dScene(activeDiag);
      build3dPins();
      if (!animId) loop3d();
    } else {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
      document.getElementById("ndh_svg2dWrap").innerHTML = generate2dSvg(activeDiag, showLabels, testTab === "label" && !quizAnswered);
    }
  }

  function syncLabelsDisplay() {
    if (renderMode === "3d") build3dPins();
    else document.getElementById("ndh_svg2dWrap").innerHTML = generate2dSvg(activeDiag, showLabels, testTab === "label" && !quizAnswered);
    renderLabelKeyList();
  }

  function renderLabelKeyList() {
    const cont = document.getElementById("ndh_labelKeyList");
    if (!activeDiag) return;
    const hideForQuiz = testTab === "label" && !quizAnswered;
    cont.innerHTML = activeDiag.labels.map((lbl, i) => `
      <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/70 border ${hideForQuiz && i === quizLabelIdx ? 'border-amber-400 bg-amber-500/10' : 'border-zinc-800'}">
        <span class="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${hideForQuiz && i === quizLabelIdx ? 'bg-amber-400 text-black' : 'bg-white/15 text-white'}">${i + 1}</span>
        <span class="text-xs font-semibold ${hideForQuiz ? 'text-zinc-500 italic' : 'text-zinc-200'}">${hideForQuiz ? (i === quizLabelIdx ? "??? (Answer in Label Test below)" : "Hidden during Label Test") : lbl}</span>
      </div>`).join("");
  }

  // ================= 3. 2D TEXTBOOK SVG GENERATOR =================
  function generate2dSvg(diag, withLabels = true, maskLabels = false, hideTitle = false) {
    if (!diag) return "";
    const t = diag.type;
    let shapes = "";
    const pts = [
      [190, 85], [410, 95], [185, 225], [415, 225], [300, 155]
    ];

    if (t === "dna") {
      let p1 = "", p2 = "", rungs = "";
      for (let i = 0; i <= 16; i++) {
        const y = 40 + i * 16, x1 = 300 + Math.sin(i * 0.7) * 58, x2 = 300 - Math.sin(i * 0.7) * 58;
        p1 += (i ? "L" : "M") + `${x1},${y} `; p2 += (i ? "L" : "M") + `${x2},${y} `;
        if (i % 2 === 0) rungs += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${i % 4 === 0 ? '#f59e0b' : '#10b981'}" stroke-width="4" stroke-linecap="round"/>`;
      }
      shapes = `${rungs}<path d="${p1}" fill="none" stroke="#818cf8" stroke-width="6" stroke-linecap="round"/><path d="${p2}" fill="none" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/>`;
    } else if (t === "heart") {
      shapes = `<path d="M300,265 C220,210 185,150 205,105 C225,65 275,75 300,112 C325,75 375,65 395,105 C415,150 380,210 300,265 Z" fill="rgba(220,38,38,0.28)" stroke="#ef4444" stroke-width="4"/>
        <line x1="300" y1="108" x2="300" y2="258" stroke="#fca5a5" stroke-width="3" stroke-dasharray="6,4"/>
        <line x1="210" y1="155" x2="390" y2="155" stroke="#fca5a5" stroke-width="3"/>
        <path d="M285,100 C285,45 345,45 345,88" fill="none" stroke="#e11d48" stroke-width="11" stroke-linecap="round"/>
        <path d="M315,112 C315,65 250,65 245,95" fill="none" stroke="#3b82f6" stroke-width="9" stroke-linecap="round"/>
        <circle cx="348" cy="118" r="7" fill="#facc15"/>`;
    } else if (t === "nephron") {
      shapes = `<path d="M210,95 C185,95 185,145 210,145" fill="none" stroke="#fde68a" stroke-width="6"/>
        <circle cx="215" cy="120" r="14" fill="rgba(239,68,68,0.7)" stroke="#ef4444" stroke-width="3"/>
        <path d="M225,120 Q255,80 270,120 T280,245 Q295,275 310,245 L315,115 Q340,85 365,120 L395,120" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round"/>
        <line x1="398" y1="65" x2="398" y2="275" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>`;
    } else if (t === "graph") {
      shapes = `<line x1="175" y1="255" x2="435" y2="255" stroke="#e4e4e7" stroke-width="3"/><line x1="175" y1="255" x2="175" y2="55" stroke="#e4e4e7" stroke-width="3"/>
        <path d="M180,250 C235,248 260,85 315,85 C365,85 390,145 430,145" fill="none" stroke="#f59e0b" stroke-width="4.5"/>
        <path d="M180,250 C245,245 270,155 315,155 C360,155 385,240 430,245" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="7,5"/>`;
    } else if (t === "pyramid") {
      shapes = `<polygon points="300,50 345,100 255,100" fill="rgba(225,29,72,0.55)" stroke="#fb7185" stroke-width="2.5"/>
        <polygon points="250,106 350,106 375,156 225,156" fill="rgba(245,158,11,0.5)" stroke="#fbbf24" stroke-width="2.5"/>
        <polygon points="220,162 380,162 405,212 195,212" fill="rgba(56,189,248,0.45)" stroke="#38bdf8" stroke-width="2.5"/>
        <polygon points="190,218 410,218 435,268 165,268" fill="rgba(16,185,129,0.5)" stroke="#34d399" stroke-width="2.5"/>`;
    } else if (t === "cycle") {
      shapes = `<circle cx="300" cy="160" r="88" fill="none" stroke="#818cf8" stroke-width="10" stroke-dasharray="140,18"/>
        <circle cx="300" cy="72" r="14" fill="#f59e0b"/><circle cx="388" cy="160" r="14" fill="#10b981"/>
        <circle cx="300" cy="248" r="14" fill="#38bdf8"/><circle cx="212" cy="160" r="14" fill="#e11d48"/>`;
    } else if (t === "plasmid") {
      shapes = `<circle cx="300" cy="160" r="86" fill="none" stroke="#94a3b8" stroke-width="9"/>
        <path d="M300,74 A86,86 0 0,1 380,130" fill="none" stroke="#e11d48" stroke-width="14"/>
        <path d="M220,130 A86,86 0 0,1 300,74" fill="none" stroke="#38bdf8" stroke-width="14"/>
        <path d="M240,222 A86,86 0 0,1 300,246" fill="none" stroke="#10b981" stroke-width="14"/>
        <path d="M300,246 A86,86 0 0,1 360,222" fill="none" stroke="#f59e0b" stroke-width="14"/>`;
    } else if (t === "membrane") {
      let heads = "";
      for (let x = 185; x <= 415; x += 26) {
        if (Math.abs(x - 300) < 28) continue;
        heads += `<circle cx="${x}" cy="122" r="9" fill="#38bdf8"/><line x1="${x-3}" y1="131" x2="${x-3}" y2="156" stroke="#fde68a" stroke-width="2.5"/><line x1="${x+3}" y1="131" x2="${x+3}" y2="156" stroke="#fde68a" stroke-width="2.5"/>
                  <circle cx="${x}" cy="198" r="9" fill="#38bdf8"/><line x1="${x-3}" y1="189" x2="${x-3}" y2="164" stroke="#fde68a" stroke-width="2.5"/><line x1="${x+3}" y1="189" x2="${x+3}" y2="164" stroke="#fde68a" stroke-width="2.5"/>`;
      }
      shapes = `${heads}<rect x="278" y="96" width="44" height="128" rx="18" fill="#e11d48" stroke="#fda4af" stroke-width="3"/>`;
    } else if (t === "mito" || t === "chloro") {
      const col = t === "mito" ? "#f59e0b" : "#10b981";
      shapes = `<rect x="180" y="92" width="240" height="136" rx="68" fill="rgba(255,255,255,0.06)" stroke="${col}" stroke-width="5"/>` +
        (t === "mito"
          ? `<path d="M210,160 Q225,115 245,160 T280,160 T315,160 T350,160 T388,160" fill="none" stroke="#fde68a" stroke-width="5"/>`
          : `<rect x="220" y="130" width="40" height="60" rx="6" fill="#22c55e"/><rect x="280" y="120" width="40" height="80" rx="6" fill="#22c55e"/><rect x="340" y="135" width="40" height="50" rx="6" fill="#22c55e"/><line x1="220" y1="160" x2="380" y2="160" stroke="#84cc16" stroke-width="5"/>`);
    } else if (t === "neuron") {
      shapes = `<polygon points="215,120 245,145 245,175 215,200 185,175 185,145" fill="#818cf8" stroke="#e0e7ff" stroke-width="3"/>
        <circle cx="215" cy="160" r="12" fill="#fde68a"/>
        <line x1="245" y1="160" x2="405" y2="160" stroke="#e4e4e7" stroke-width="5"/>
        <rect x="262" y="146" width="32" height="28" rx="10" fill="#f59e0b"/><rect x="306" y="146" width="32" height="28" rx="10" fill="#f59e0b"/><rect x="350" y="146" width="32" height="28" rx="10" fill="#f59e0b"/>
        <circle cx="418" cy="138" r="8" fill="#10b981"/><circle cx="424" cy="160" r="8" fill="#10b981"/><circle cx="418" cy="182" r="8" fill="#10b981"/>`;
    } else if (t === "antibody") {
      shapes = `<line x1="292" y1="160" x2="292" y2="255" stroke="#3b82f6" stroke-width="9" stroke-linecap="round"/>
        <line x1="308" y1="160" x2="308" y2="255" stroke="#3b82f6" stroke-width="9" stroke-linecap="round"/>
        <line x1="292" y1="160" x2="232" y2="85" stroke="#60a5fa" stroke-width="9" stroke-linecap="round"/>
        <line x1="308" y1="160" x2="368" y2="85" stroke="#60a5fa" stroke-width="9" stroke-linecap="round"/>
        <line x1="258" y1="145" x2="212" y2="95" stroke="#f59e0b" stroke-width="7" stroke-linecap="round"/>
        <line x1="342" y1="145" x2="388" y2="95" stroke="#f59e0b" stroke-width="7" stroke-linecap="round"/>
        <line x1="286" y1="175" x2="314" y2="175" stroke="#facc15" stroke-width="4"/>`;
    } else if (t === "virus") {
      shapes = `<polygon points="300,55 342,82 342,126 300,150 258,126 258,82" fill="rgba(99,102,241,0.45)" stroke="#818cf8" stroke-width="4"/>
        <rect x="288" y="150" width="24" height="62" fill="#38bdf8"/><rect x="274" y="212" width="52" height="10" fill="#f59e0b"/>
        <path d="M278,222 L235,205 L215,265 M322,222 L365,205 L385,265 M290,222 L265,265 M310,222 L335,265" fill="none" stroke="#e2e8f0" stroke-width="3.5"/>`;
    } else if (t === "operon" || t === "gel_pcr" || t === "genetics" || t === "pedigree") {
      shapes = `<rect x="175" y="142" width="250" height="36" rx="8" fill="#18181b" stroke="#64748b" stroke-width="2.5"/>
        <rect x="188" y="132" width="42" height="56" rx="8" fill="#818cf8"/><rect x="242" y="132" width="42" height="56" rx="8" fill="#f59e0b"/>
        <rect x="296" y="132" width="52" height="56" rx="8" fill="#10b981"/><rect x="360" y="132" width="52" height="56" rx="8" fill="#38bdf8"/>`;
    } else if (t === "pie") {
      shapes = `<circle cx="300" cy="160" r="88" fill="#10b981" stroke="#09090b" stroke-width="3"/>
        <path d="M300,160 L300,72 A88,88 0 1,1 224,205 Z" fill="#f59e0b" stroke="#09090b" stroke-width="3"/>
        <path d="M300,160 L224,205 A88,88 0 0,1 245,92 Z" fill="#38bdf8" stroke="#09090b" stroke-width="3"/>`;
    } else {
      // General high-clarity anatomical / cellular / botanical schematic
      shapes = `<circle cx="300" cy="160" r="92" fill="rgba(16,185,129,0.14)" stroke="#10b981" stroke-width="4"/>
        <ellipse cx="300" cy="160" rx="58" ry="38" fill="rgba(245,158,11,0.22)" stroke="#f59e0b" stroke-width="3.5"/>
        <circle cx="300" cy="160" r="18" fill="#818cf8" stroke="#e0e7ff" stroke-width="2.5"/>
        <circle cx="235" cy="130" r="10" fill="#38bdf8"/><circle cx="365" cy="190" r="10" fill="#f43f5e"/>`;
    }

    let labelsSvg = "";
    if (withLabels) {
      const anchors = [
        [245, 105, 18, 62],
        [355, 105, 428, 62],
        [245, 215, 18, 255],
        [355, 215, 428, 255],
        [300, 160, 215, 295]
      ];
      diag.labels.slice(0, 5).forEach((lbl, idx) => {
        const [ax, ay, lxPos, lyPos] = anchors[idx % anchors.length];
        const shortTxt = maskLabels ? `? ${idx + 1}` : `${idx + 1}. ${lbl.slice(0, 24)}${lbl.length > 24 ? "…" : ""}`;
        const boxW = maskLabels ? 46 : 158;
        const lineEndX = lxPos < 250 ? lxPos + boxW : lxPos;
        labelsSvg += `<line x1="${ax}" y1="${ay}" x2="${lineEndX}" y2="${lyPos}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
          <circle cx="${ax}" cy="${ay}" r="4.5" fill="#facc15"/>
          <rect x="${lxPos}" y="${lyPos - 13}" width="${boxW}" height="24" rx="8" fill="${maskLabels ? '#f59e0b' : 'rgba(9,9,11,0.92)'}" stroke="${maskLabels ? '#ffffff' : 'rgba(255,255,255,0.28)'}" stroke-width="1.2"/>
          <text x="${lxPos + 8}" y="${lyPos + 3}" fill="${maskLabels ? '#000000' : '#f4f4f5'}" font-size="10.5" font-weight="700" font-family="Inter,sans-serif">${shortTxt}</text>`;
      });
    }

    return `<svg viewBox="0 0 600 320" class="w-full h-full max-h-[430px] select-none">
      <defs><pattern id="ndhGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/></pattern></defs>
      <rect width="600" height="320" fill="url(#ndhGrid)"/>
      ${hideTitle ? "" : `<text x="300" y="24" text-anchor="middle" fill="#a1a1aa" font-size="11" font-weight="700" font-family="Inter,sans-serif">${diag.ch} — 2D NCERT Schematic</text>`}
      ${shapes}
      ${labelsSvg}
    </svg>`;
  }

  // ================= 4. THREE.JS 3D PROCEDURAL RENDERER =================
  const PIN_COORDS = [
    [-1.1, 1.15, 0.35],
    [1.15, 1.05, 0.35],
    [-1.15, -0.95, 0.35],
    [1.15, -0.95, 0.35],
    [0, 0.1, 0.85]
  ];

  function initThree() {
    if (renderer || !window.THREE) return;
    const canvas = document.getElementById("ndh_canvas3d");
    const wrap = document.getElementById("ndh_stageWrap");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, (wrap.clientWidth || 600) / (wrap.clientHeight || 420), 0.1, 100);
    camera.position.z = zoomZ;
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(wrap.clientWidth || 600, wrap.clientHeight || 420);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const l1 = new THREE.DirectionalLight(0xfff5e4, 1.15); l1.position.set(6, 8, 7); scene.add(l1);
    const l2 = new THREE.DirectionalLight(0x38bdf8, 0.65); l2.position.set(-6, -4, -6); scene.add(l2);
    group = new THREE.Group();
    scene.add(group);

    canvas.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointerup", () => { dragging = false; });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      rotY += (e.clientX - lx) * 0.01;
      rotX = Math.max(-1.4, Math.min(1.4, rotX + (e.clientY - ly) * 0.01));
      lx = e.clientX; ly = e.clientY;
    });
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoomZ = Math.max(2.6, Math.min(9.5, zoomZ + e.deltaY * 0.004));
    }, { passive: false });
  }

  function addMesh(geo, color, pos = [0, 0, 0], rot = [0, 0, 0], opts = {}) {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      color, roughness: 0.35, metalness: 0.12, transparent: !!opts.opacity, opacity: opts.opacity ?? 1, wireframe: !!opts.wireframe
    }));
    m.position.set(...pos); m.rotation.set(...rot);
    m.userData.base = new THREE.Vector3(...pos);
    m.userData.exp = new THREE.Vector3(...pos).length() > 0.05 ? new THREE.Vector3(...pos).normalize().multiplyScalar(0.5) : new THREE.Vector3(0, 0.35, 0);
    group.add(m);
    return m;
  }

  function addTube3d(pts, r, color) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    return addMesh(new THREE.TubeGeometry(curve, 36, r, 10, false), color);
  }

  function build3dScene(diag) {
    if (!group || !window.THREE || !diag) return;
    while (group.children.length) {
      const c = group.children[0];
      if (c.geometry) c.geometry.dispose();
      if (c.material) c.material.dispose();
      group.remove(c);
    }
    const T = THREE, t = diag.type;

    if (t === "dna") {
      const s1 = [], s2 = [];
      for (let i = 0; i <= 22; i++) {
        const f = i / 22, a = f * Math.PI * 4, y = (f - 0.5) * 3.4, r = 0.65;
        s1.push([Math.cos(a) * r, y, Math.sin(a) * r]);
        s2.push([Math.cos(a + Math.PI) * r, y, Math.sin(a + Math.PI) * r]);
        if (i % 2 === 0 && i > 0 && i < 22) addTube3d([s1[i], s2[i]], 0.05, i % 4 === 0 ? 0xf59e0b : 0x10b981);
      }
      addTube3d(s1, 0.085, 0x818cf8); addTube3d(s2, 0.085, 0xf472b6);
    } else if (t === "heart") {
      addMesh(new T.SphereGeometry(0.75, 22, 22), 0xdc2626, [-0.42, -0.5, 0]);
      addMesh(new T.SphereGeometry(0.65, 22, 22), 0x3b82f6, [0.42, -0.42, 0.08]);
      addMesh(new T.SphereGeometry(0.46, 18, 18), 0xef4444, [-0.52, 0.52, 0]);
      addMesh(new T.SphereGeometry(0.5, 18, 18), 0x2563eb, [0.55, 0.55, 0.05]);
      addTube3d([[-0.2, 0.3, 0], [-0.15, 1.45, 0], [0.3, 1.55, -0.1]], 0.18, 0xe11d48);
      addTube3d([[0.25, 0.15, 0.2], [0.1, 1.15, 0.2], [-0.7, 1.2, 0.15]], 0.15, 0x60a5fa);
    } else if (t === "nephron") {
      addMesh(new T.TorusKnotGeometry(0.24, 0.06, 44, 8), 0xef4444, [-1.15, 1.05, 0]);
      addTube3d([[-0.9, 0.9, 0], [-0.5, 1.15, 0.2], [-0.45, -1.3, 0], [0.05, -1.35, 0], [0.1, 0.8, 0], [0.75, 0.95, 0.15], [1.25, 0.75, 0]], 0.085, 0xf59e0b);
      addMesh(new T.CylinderGeometry(0.14, 0.16, 2.8, 16), 0x10b981, [1.3, -0.3, 0]);
    } else if (t === "pyramid") {
      [0x10b981, 0x38bdf8, 0xf59e0b, 0xe11d48].forEach((col, i) => addMesh(new T.BoxGeometry(2.5 - i * 0.58, 0.56, 2.5 - i * 0.58), col, [0, -1.15 + i * 0.74, 0], [0, 0, 0], { opacity: 0.85 }));
    } else if (t === "virus") {
      addMesh(new T.IcosahedronGeometry(0.66, 0), 0x6366f1, [0, 1.25, 0]);
      addMesh(new T.CylinderGeometry(0.16, 0.16, 1.25, 14), 0x38bdf8, [0, 0, 0]);
      addMesh(new T.CylinderGeometry(0.36, 0.36, 0.12, 6), 0xf59e0b, [0, -0.65, 0]);
      for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.28; addTube3d([[Math.cos(a) * 0.3, -0.65, Math.sin(a) * 0.3], [Math.cos(a) * 0.85, -0.35, Math.sin(a) * 0.85], [Math.cos(a) * 1.1, -1.4, Math.sin(a) * 1.1]], 0.035, 0xe2e8f0); }
    } else if (t === "plasmid" || t === "cycle") {
      addMesh(new T.TorusGeometry(1.25, 0.09, 14, 52), 0x94a3b8);
      [0xe11d48, 0x38bdf8, 0x10b981, 0xf59e0b].forEach((c, i) => addMesh(new T.TorusGeometry(1.25, 0.15, 12, 20, 1.0), c, [0, 0, 0], [0, 0, i * 1.55]));
    } else if (t === "membrane") {
      for (let x = -1.3; x <= 1.3; x += 0.44) for (let z = -0.44; z <= 0.44; z += 0.44) {
        if (Math.abs(x) < 0.3 && Math.abs(z) < 0.3) continue;
        addMesh(new T.SphereGeometry(0.14, 12, 12), 0x38bdf8, [x, 0.52, z]);
        addMesh(new T.SphereGeometry(0.14, 12, 12), 0x38bdf8, [x, -0.52, z]);
        addMesh(new T.CylinderGeometry(0.03, 0.03, 0.78, 6), 0xfde68a, [x, 0, z]);
      }
      addMesh(new T.CylinderGeometry(0.35, 0.35, 1.5, 18), 0xe11d48);
    } else if (t === "mito" || t === "chloro") {
      addMesh(new T.CapsuleGeometry(0.72, 1.35, 12, 20), t === "mito" ? 0xd97706 : 0x15803d, [0, 0, 0], [0, 0, 1.57], { opacity: 0.4 });
      if (t === "mito") {
        const cr = []; for (let i = -4; i <= 4; i++) cr.push([i * 0.25, i % 2 ? 0.42 : -0.42, 0]);
        addTube3d(cr, 0.08, 0xfbbf24);
      } else {
        [-0.7, 0, 0.7].forEach(x => { for (let d = 0; d < 5; d++) addMesh(new T.CylinderGeometry(0.26, 0.26, 0.09, 16), 0x22c55e, [x, -0.3 + d * 0.14, 0]); });
        addMesh(new T.BoxGeometry(1.6, 0.05, 0.12), 0x84cc16);
      }
    } else if (t === "neuron") {
      addMesh(new T.DodecahedronGeometry(0.5, 1), 0x818cf8, [-1.15, 0, 0]);
      addMesh(new T.CylinderGeometry(0.05, 0.05, 2.6, 10), 0xe2e8f0, [0.3, 0, 0], [0, 0, 1.57]);
      [-0.35, 0.25, 0.85].forEach(x => addMesh(new T.CapsuleGeometry(0.16, 0.3, 8, 12), 0xf59e0b, [x, 0, 0], [0, 0, 1.57]));
      addMesh(new T.SphereGeometry(0.12, 10, 10), 0x10b981, [1.75, 0.3, 0]);
      addMesh(new T.SphereGeometry(0.12, 10, 10), 0x10b981, [1.75, -0.3, 0]);
    } else if (t === "antibody") {
      addMesh(new T.CapsuleGeometry(0.11, 1.15, 8, 12), 0x3b82f6, [-0.18, -0.6, 0]);
      addMesh(new T.CapsuleGeometry(0.11, 1.15, 8, 12), 0x3b82f6, [0.18, -0.6, 0]);
      addMesh(new T.CapsuleGeometry(0.11, 1.05, 8, 12), 0x60a5fa, [-0.6, 0.62, 0], [0, 0, 0.68]);
      addMesh(new T.CapsuleGeometry(0.11, 1.05, 8, 12), 0x60a5fa, [0.6, 0.62, 0], [0, 0, -0.68]);
      addMesh(new T.CapsuleGeometry(0.09, 0.85, 8, 12), 0xf59e0b, [-0.92, 0.82, 0.08], [0, 0, 0.68]);
      addMesh(new T.CapsuleGeometry(0.09, 0.85, 8, 12), 0xf59e0b, [0.92, 0.82, 0.08], [0, 0, -0.68]);
    } else if (t === "chromosome") {
      addMesh(new T.CapsuleGeometry(0.22, 1.3, 8, 14), 0x818cf8, [-0.3, 0.72, 0], [0, 0, 0.18]);
      addMesh(new T.CapsuleGeometry(0.22, 1.3, 8, 14), 0x818cf8, [0.3, 0.72, 0], [0, 0, -0.18]);
      addMesh(new T.CapsuleGeometry(0.22, 1.35, 8, 14), 0x6366f1, [-0.32, -0.76, 0], [0, 0, -0.18]);
      addMesh(new T.CapsuleGeometry(0.22, 1.35, 8, 14), 0x6366f1, [0.32, -0.76, 0], [0, 0, 0.18]);
      addMesh(new T.SphereGeometry(0.26, 16, 16), 0xf59e0b);
    } else if (t === "flower" || t === "ovule") {
      addMesh(new T.SphereGeometry(0.62, 20, 20), 0x10b981, [0, -0.25, 0], [0, 0, 0], { opacity: 0.45 });
      addMesh(new T.SphereGeometry(0.22, 14, 14), 0xfde68a, [0, -0.25, 0]);
      addMesh(new T.CylinderGeometry(0.11, 0.15, 1.3, 14), 0x22c55e, [0, 0.85, 0]);
      for (let i = 0; i < 5; i++) { const a = (i / 5) * 6.28; addMesh(new T.SphereGeometry(0.45, 12, 12), 0xf43f5e, [Math.cos(a) * 0.9, 0.35, Math.sin(a) * 0.9], [0, 0, 0], { opacity: 0.65 }); }
    } else if (t === "operon" || t === "gel_pcr" || t === "genetics" || t === "pedigree" || t === "muscle") {
      addMesh(new T.BoxGeometry(3.5, 0.18, 0.4), 0x475569);
      [[-1.3, 0x818cf8], [-0.45, 0xf59e0b], [0.45, 0x10b981], [1.3, 0x38bdf8]].forEach(([x, c]) => addMesh(new T.BoxGeometry(0.6, 0.55, 0.55), c, [x, 0.2, 0]));
    } else if (t === "bioreactor") {
      addMesh(new T.CylinderGeometry(0.92, 0.92, 2.0, 24), 0x38bdf8, [0, -0.05, 0], [0, 0, 0], { opacity: 0.3 });
      addMesh(new T.CylinderGeometry(0.06, 0.06, 2.6, 10), 0xe2e8f0, [0, 0.2, 0]);
      addMesh(new T.BoxGeometry(0.5, 0.32, 0.5), 0xf59e0b, [0, 1.48, 0]);
      addMesh(new T.BoxGeometry(1.1, 0.12, 0.12), 0x94a3b8, [0, -0.35, 0]);
    } else if (t === "graph") {
      addMesh(new T.BoxGeometry(2.8, 0.08, 0.08), 0xe4e4e7, [0, -1.0, 0]);
      addMesh(new T.BoxGeometry(0.08, 2.2, 0.08), 0xe4e4e7, [-1.35, 0.05, 0]);
      addTube3d([[-1.3, -0.95, 0], [-0.5, -0.7, 0.1], [0.1, 0.85, 0], [0.8, 0.35, -0.1], [1.35, 0.25, 0]], 0.08, 0xf59e0b);
      addTube3d([[-1.3, -0.95, 0.25], [-0.4, -0.2, 0.25], [0.2, 0.15, 0.25], [1.35, -0.8, 0.25]], 0.06, 0x10b981);
    } else {
      // Rich multi-organelle / anatomical 3D sphere cluster
      addMesh(new T.SphereGeometry(1.38, 24, 24), 0x10b981, [0, 0, 0], [0, 0, 0], { opacity: 0.24 });
      addMesh(new T.SphereGeometry(0.52, 20, 20), 0x818cf8, [0, 0.1, 0]);
      addMesh(new T.CapsuleGeometry(0.18, 0.42, 8, 12), 0xf59e0b, [0.75, -0.45, 0.35], [0, 0, 0.7]);
      addMesh(new T.TorusGeometry(0.78, 0.07, 10, 28), 0x38bdf8, [0, 0, 0], [0.9, 0.4, 0]);
      addMesh(new T.SphereGeometry(0.22, 14, 14), 0xf43f5e, [-0.72, 0.42, 0.3]);
    }
  }

  function build3dPins() {
    const layer = document.getElementById("ndh_labels3d");
    if (!layer || !activeDiag) return;
    if (!showLabels) { layer.innerHTML = ""; return; }
    const maskForQuiz = testTab === "label" && !quizAnswered;
    layer.innerHTML = activeDiag.labels.slice(0, 5).map((lbl, i) => `
      <span data-p3="${i}" class="ndh-p3 absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-lg ${maskForQuiz ? (i === quizLabelIdx ? 'bg-amber-400 text-black border-white scale-110' : 'bg-zinc-900/90 text-amber-300 border-amber-400/40') : 'bg-black/80 text-white border-white/25'}">
        ${maskForQuiz ? `? ${i + 1}` : `${i + 1}. ${lbl}`}
      </span>`).join("");
  }

  function loop3d() {
    if (currentView !== "viewer" || renderMode !== "3d" || document.getElementById("ndh_page").classList.contains("hidden")) { animId = null; return; }
    if (autoRotate && !dragging) rotY += 0.006;
    if (group) {
      group.rotation.x = rotX; group.rotation.y = rotY;
      group.children.forEach(m => {
        if (!m.userData.base) return;
        const target = explode3d ? m.userData.base.clone().add(m.userData.exp) : m.userData.base;
        m.position.lerp(target, 0.12);
      });
    }
    if (camera) camera.position.z += (zoomZ - camera.position.z) * 0.15;
    if (renderer) renderer.render(scene, camera);

    // Project 3D label pins
    if (showLabels && group && activeDiag) {
      const wrap = document.getElementById("ndh_stageWrap");
      const w = wrap.clientWidth, h = wrap.clientHeight;
      group.updateMatrixWorld();
      document.querySelectorAll(".ndh-p3").forEach(el => {
        const i = Number(el.getAttribute("data-p3"));
        const v = new THREE.Vector3(...PIN_COORDS[i % PIN_COORDS.length]);
        if (explode3d) v.multiplyScalar(1.3);
        v.applyMatrix4(group.matrixWorld).project(camera);
        if (v.z > 1) { el.style.opacity = "0"; return; }
        el.style.opacity = "1";
        el.style.left = `${(v.x * 0.5 + 0.5) * w}px`;
        el.style.top = `${(-v.y * 0.5 + 0.5) * h}px`;
      });
    }
    animId = requestAnimationFrame(loop3d);
  }

  // ================= 5. BOTTOM QUICK TEST ENGINE (LABELS + IDENTIFICATION) =================
  function updateScorePill() {
    document.getElementById("ndh_scorePill").textContent = `🏆 Test: ${testScore}/${testAttempts} ${testStreak >= 2 ? `🔥${testStreak}` : ""}`;
  }

  function switchTestTab(tab) {
    testTab = tab;
    const isLbl = tab === "label";
    document.getElementById("ndh_tabLabelQuiz").className = isLbl ? "clicky px-3.5 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary" : "clicky px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white";
    document.getElementById("ndh_tabIdentifyQuiz").className = !isLbl ? "clicky px-3.5 py-1.5 rounded-lg text-xs font-extrabold theme-btn-primary" : "clicky px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white";
    document.getElementById("ndh_labelQuizPanel").classList.toggle("hidden", !isLbl);
    document.getElementById("ndh_identifyQuizPanel").classList.toggle("hidden", isLbl);
    if (isLbl) loadLabelQuizQuestion(0);
    else loadIdentifyQuestion();
    syncLabelsDisplay();
  }

  function loadLabelQuizQuestion(pinIndex) {
    if (!activeDiag) return;
    quizLabelIdx = pinIndex % activeDiag.labels.length;
    quizAnswered = false;
    const correctLbl = activeDiag.labels[quizLabelIdx];

    // Build 3 smart distractors from same diagram + same unit
    const pool = [...activeDiag.labels.filter((_, i) => i !== quizLabelIdx)];
    DATA().filter(d => d.unit === activeDiag.unit && d.id !== activeDiag.id).forEach(d => pool.push(...d.labels));
    const uniqueDist = [...new Set(pool.filter(x => x !== correctLbl))].sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [correctLbl, ...uniqueDist].sort(() => Math.random() - 0.5);

    document.getElementById("ndh_lqPrompt").textContent = `Identify Pin ? ${quizLabelIdx + 1} highlighted on "${activeDiag.title}":`;
    document.getElementById("ndh_lqFeedback").textContent = "";
    const optCont = document.getElementById("ndh_lqOptions");
    optCont.innerHTML = opts.map(o => `<button type="button" class="ndh-lq-opt clicky p-3 rounded-xl bg-black/80 hover:bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-100 text-left">${o}</button>`).join("");

    optCont.querySelectorAll(".ndh-lq-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;
        testAttempts++;
        const chosen = btn.textContent;
        const ok = chosen === correctLbl;
        if (ok) { testScore++; testStreak++; } else { testStreak = 0; }
        updateScorePill();
        optCont.querySelectorAll(".ndh-lq-opt").forEach(b => {
          if (b.textContent === correctLbl) b.className = "ndh-lq-opt p-3 rounded-xl bg-emerald-950 border border-emerald-400 text-xs font-bold text-emerald-200 text-left";
          else if (b === btn && !ok) b.className = "ndh-lq-opt p-3 rounded-xl bg-rose-950 border border-rose-500 text-xs font-bold text-rose-200 text-left";
        });
        document.getElementById("ndh_lqFeedback").innerHTML = ok
          ? `<span class="text-emerald-400">✅ Spot on! Pin ${quizLabelIdx + 1} is "${correctLbl}".</span>`
          : `<span class="text-rose-400">❌ Not quite — Pin ${quizLabelIdx + 1} is "${correctLbl}".</span>`;
        syncLabelsDisplay();
      });
    });
    syncLabelsDisplay();
  }

  function loadIdentifyQuestion() {
    const all = DATA();
    if (all.length < 4) return;
    idAnswered = false;
    idTargetDiag = all[Math.floor(Math.random() * all.length)];

    // Prefer distractors from the same unit for realistic NEET difficulty
    const sameUnit = all.filter(d => d.unit === idTargetDiag.unit && d.id !== idTargetDiag.id).sort(() => Math.random() - 0.5);
    const others = all.filter(d => d.unit !== idTargetDiag.unit).sort(() => Math.random() - 0.5);
    idOptions = [idTargetDiag, ...sameUnit.slice(0, 3), ...others].slice(0, 4).sort(() => Math.random() - 0.5);

    document.getElementById("ndh_idPreviewBox").innerHTML = generate2dSvg(idTargetDiag, true, true, true);
    document.getElementById("ndh_idClueText").innerHTML = `<strong class="text-white">Key NCERT Structures Shown:</strong> ${idTargetDiag.labels.join(" • ")}`;
    document.getElementById("ndh_idFeedback").textContent = "";
    document.getElementById("ndh_idStudyBtn").classList.add("hidden");

    const optCont = document.getElementById("ndh_idOptions");
    optCont.innerHTML = idOptions.map(d => `<button type="button" data-cid="${d.id}" class="ndh-id-opt clicky p-3 rounded-xl bg-black/80 hover:bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-100 text-left">${d.title} <span class="block text-[10px] text-zinc-500 mt-0.5">${d.ch}</span></button>`).join("");

    optCont.querySelectorAll(".ndh-id-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        if (idAnswered) return;
        idAnswered = true;
        testAttempts++;
        const ok = btn.getAttribute("data-cid") === idTargetDiag.id;
        if (ok) { testScore++; testStreak++; } else { testStreak = 0; }
        updateScorePill();
        optCont.querySelectorAll(".ndh-id-opt").forEach(b => {
          if (b.getAttribute("data-cid") === idTargetDiag.id) b.className = "ndh-id-opt p-3 rounded-xl bg-emerald-950 border border-emerald-400 text-xs font-bold text-emerald-200 text-left";
          else if (b === btn && !ok) b.className = "ndh-id-opt p-3 rounded-xl bg-rose-950 border border-rose-500 text-xs font-bold text-rose-200 text-left";
        });
        document.getElementById("ndh_idPreviewBox").innerHTML = generate2dSvg(idTargetDiag, true, false, false);
        document.getElementById("ndh_idFeedback").innerHTML = ok
          ? `<span class="text-emerald-400">✅ Correct! ${idTargetDiag.title} (${idTargetDiag.ch}). 💡 ${idTargetDiag.tip}</span>`
          : `<span class="text-rose-400">❌ Correct Answer: ${idTargetDiag.title} (${idTargetDiag.ch}). 💡 ${idTargetDiag.tip}</span>`;
        document.getElementById("ndh_idStudyBtn").classList.remove("hidden");
      });
    });
  }

  function boot() { injectHubUI(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
