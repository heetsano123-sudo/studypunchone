(() => {
  const NCERT_BASE = "https://ncert.nic.in/textbook/pdf/";

  // ================= ALL 6 OFFICIAL NCERT BOOKS (79 CHAPTERS) =================
  const mkBook = (subject, icon, cls, items) =>
    items.map(([code, chNum, title]) => ({
      id: code,
      subject,
      icon,
      cls,
      chNum,
      title,
      url: `${NCERT_BASE}${code}.pdf`
    }));

  const NCERT_LIBRARY = [
    // BIOLOGY CLASS 11 (19 Chapters)
    ...mkBook("Biology", "🧬", 11, [
      ["kebo101", "Ch 1", "The Living World"],
      ["kebo102", "Ch 2", "Biological Classification"],
      ["kebo103", "Ch 3", "Plant Kingdom"],
      ["kebo104", "Ch 4", "Animal Kingdom"],
      ["kebo105", "Ch 5", "Morphology of Flowering Plants"],
      ["kebo106", "Ch 6", "Anatomy of Flowering Plants"],
      ["kebo107", "Ch 7", "Structural Organisation in Animals"],
      ["kebo108", "Ch 8", "Cell: The Unit of Life"],
      ["kebo109", "Ch 9", "Biomolecules"],
      ["kebo110", "Ch 10", "Cell Cycle and Cell Division"],
      ["kebo111", "Ch 11", "Photosynthesis in Higher Plants"],
      ["kebo112", "Ch 12", "Respiration in Plants"],
      ["kebo113", "Ch 13", "Plant Growth and Development"],
      ["kebo114", "Ch 14", "Breathing and Exchange of Gases"],
      ["kebo115", "Ch 15", "Body Fluids and Circulation"],
      ["kebo116", "Ch 16", "Excretory Products and their Elimination"],
      ["kebo117", "Ch 17", "Locomotion and Movement"],
      ["kebo118", "Ch 18", "Neural Control and Coordination"],
      ["kebo119", "Ch 19", "Chemical Coordination and Integration"]
    ]),

    // BIOLOGY CLASS 12 (13 Chapters)
    ...mkBook("Biology", "🧬", 12, [
      ["lebo101", "Ch 1", "Sexual Reproduction in Flowering Plants"],
      ["lebo102", "Ch 2", "Human Reproduction"],
      ["lebo103", "Ch 3", "Reproductive Health"],
      ["lebo104", "Ch 4", "Principles of Inheritance and Variation"],
      ["lebo105", "Ch 5", "Molecular Basis of Inheritance"],
      ["lebo106", "Ch 6", "Evolution"],
      ["lebo107", "Ch 7", "Human Health and Disease"],
      ["lebo108", "Ch 8", "Microbes in Human Welfare"],
      ["lebo109", "Ch 9", "Biotechnology: Principles and Processes"],
      ["lebo110", "Ch 10", "Biotechnology and its Applications"],
      ["lebo111", "Ch 11", "Organisms and Populations"],
      ["lebo112", "Ch 12", "Ecosystem"],
      ["lebo113", "Ch 13", "Biodiversity and Conservation"]
    ]),

    // CHEMISTRY CLASS 11 (Part 1: Ch 1-6, Part 2: Ch 7-9)
    ...mkBook("Chemistry", "🧪", 11, [
      ["kech101", "Ch 1", "Some Basic Concepts of Chemistry"],
      ["kech102", "Ch 2", "Structure of Atom"],
      ["kech103", "Ch 3", "Classification of Elements and Periodicity"],
      ["kech104", "Ch 4", "Chemical Bonding and Molecular Structure"],
      ["kech105", "Ch 5", "Thermodynamics"],
      ["kech106", "Ch 6", "Equilibrium"],
      ["kech201", "Ch 7", "Redox Reactions"],
      ["kech202", "Ch 8", "Organic Chemistry: Basic Principles & Techniques"],
      ["kech203", "Ch 9", "Hydrocarbons"]
    ]),

    // CHEMISTRY CLASS 12 (Part 1: Ch 1-5, Part 2: Ch 6-10)
    ...mkBook("Chemistry", "🧪", 12, [
      ["lech101", "Ch 1", "Solutions"],
      ["lech102", "Ch 2", "Electrochemistry"],
      ["lech103", "Ch 3", "Chemical Kinetics"],
      ["lech104", "Ch 4", "The d- and f-Block Elements"],
      ["lech105", "Ch 5", "Coordination Compounds"],
      ["lech201", "Ch 6", "Haloalkanes and Haloarenes"],
      ["lech202", "Ch 7", "Alcohols, Phenols and Ethers"],
      ["lech203", "Ch 8", "Aldehydes, Ketones and Carboxylic Acids"],
      ["lech204", "Ch 9", "Amines"],
      ["lech205", "Ch 10", "Biomolecules"]
    ]),

    // PHYSICS CLASS 11 (Part 1: Ch 1-7, Part 2: Ch 8-14)
    ...mkBook("Physics", "⚡", 11, [
      ["keph101", "Ch 1", "Units and Measurements"],
      ["keph102", "Ch 2", "Motion in a Straight Line"],
      ["keph103", "Ch 3", "Motion in a Plane"],
      ["keph104", "Ch 4", "Laws of Motion"],
      ["keph105", "Ch 5", "Work, Energy and Power"],
      ["keph106", "Ch 6", "System of Particles and Rotational Motion"],
      ["keph107", "Ch 7", "Gravitation"],
      ["keph201", "Ch 8", "Mechanical Properties of Solids"],
      ["keph202", "Ch 9", "Mechanical Properties of Fluids"],
      ["keph203", "Ch 10", "Thermal Properties of Matter"],
      ["keph204", "Ch 11", "Thermodynamics"],
      ["keph205", "Ch 12", "Kinetic Theory"],
      ["keph206", "Ch 13", "Oscillations"],
      ["keph207", "Ch 14", "Waves"]
    ]),

    // PHYSICS CLASS 12 (Part 1: Ch 1-8, Part 2: Ch 9-14)
    ...mkBook("Physics", "⚡", 12, [
      ["leph101", "Ch 1", "Electric Charges and Fields"],
      ["leph102", "Ch 2", "Electrostatic Potential and Capacitance"],
      ["leph103", "Ch 3", "Current Electricity"],
      ["leph104", "Ch 4", "Moving Charges and Magnetism"],
      ["leph105", "Ch 5", "Magnetism and Matter"],
      ["leph106", "Ch 6", "Electromagnetic Induction"],
      ["leph107", "Ch 7", "Alternating Current"],
      ["leph108", "Ch 8", "Electromagnetic Waves"],
      ["leph201", "Ch 9", "Ray Optics and Optical Instruments"],
      ["leph202", "Ch 10", "Wave Optics"],
      ["leph203", "Ch 11", "Dual Nature of Radiation and Matter"],
      ["leph204", "Ch 12", "Atoms"],
      ["leph205", "Ch 13", "Nuclei"],
      ["leph206", "Ch 14", "Semiconductor Electronics"]
    ])
  ];

  // ================= READER STATE =================
  let filterSubj = "Biology";
  let filterCls = "ALL";
  let viewerMode = localStorage.getItem("sp_pdf_viewer_mode") || "gview"; // 'gview' | 'direct'
  let nightPdfFilter = localStorage.getItem("sp_pdf_night_filter") === "true";
  let bookmarks = [];
  try { bookmarks = JSON.parse(localStorage.getItem("sp_pdf_bookmarks") || "[]"); } catch { bookmarks = []; }
  const lastReadId = localStorage.getItem("sp_pdf_last_read") || "kebo108";
  let activeChapter = NCERT_LIBRARY.find(c => c.id === lastReadId) || NCERT_LIBRARY[0];
  let localBlobUrl = null;

  // ================= INJECT HEADER BUTTON & READER PAGE =================
  function injectNcertReaderUI() {
    const anchorBtn = document.getElementById("openBio3dBtn") || document.getElementById("openSettingsBtn");
    if (anchorBtn && !document.getElementById("openNcertReaderBtn")) {
      const btn = document.createElement("button");
      btn.id = "openNcertReaderBtn";
      btn.type = "button";
      btn.className = "clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-amber-400/35 flex items-center gap-1.5 shadow-sm";
      btn.innerHTML = `<span>📚</span><span class="hidden sm:inline">NCERT</span>`;
      btn.title = "Open NCERT Books PDF Reader (Bio, Chem, Phy 11 & 12)";
      anchorBtn.parentNode.insertBefore(btn, anchorBtn);
      btn.addEventListener("click", openNcertReader);
    }

    if (document.getElementById("ncertReaderPage")) return;

    const page = document.createElement("div");
    page.id = "ncertReaderPage";
    page.className = "hidden fixed inset-0 z-[125] flex flex-col overflow-hidden";
    page.style.background = "var(--bg-base)";
    page.innerHTML = `
      <!-- Top Reader Command Bar -->
      <header class="bg-black/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-2.5">
          <button type="button" id="closeNcertReaderBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15">← Back</button>
          <div>
            <h2 class="font-serif-luxury text-base sm:text-lg font-bold theme-gradient-text leading-tight">📚 NCERT Books PDF Desk</h2>
            <p class="text-[10px] text-zinc-400">Official Biology, Chemistry &amp; Physics • Class 11 &amp; 12 (79 Chapters)</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <button type="button" id="ncertNightModeBtn" class="clicky px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-zinc-200 border border-white/15">🌙 Night Filter: OFF</button>
          <button type="button" id="ncertViewerModeBtn" class="clicky px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-zinc-200 border border-white/15">🖥️ Mode: Smart Embed</button>
          <button type="button" id="ncertLocalPdfBtn" class="clicky px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-sky-300 border border-sky-500/30">📂 Local PDF</button>
          <input id="ncertLocalPdfInput" type="file" accept="application/pdf" class="hidden" />
          <button type="button" id="ncertClockInChapterBtn" class="clicky px-3 py-1.5 rounded-xl text-[11px] font-extrabold theme-btn-primary">⚡ Focus This Ch.</button>
        </div>
      </header>

      <!-- Main Split Workspace -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <!-- Left Bookshelf & Chapters Sidebar -->
        <aside class="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/60 flex flex-col max-h-[34vh] lg:max-h-none shrink-0">
          <div class="p-3 space-y-2 border-b border-white/10">
            <!-- Subject Tabs -->
            <div class="grid grid-cols-4 gap-1">
              <button type="button" data-nsub="Biology" class="ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-bold theme-btn-primary">🧬 Bio</button>
              <button type="button" data-nsub="Chemistry" class="ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">🧪 Chem</button>
              <button type="button" data-nsub="Physics" class="ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">⚡ Phy</button>
              <button type="button" data-nsub="SAVED" class="ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-amber-300 border border-zinc-800">⭐ Saved</button>
            </div>
            <!-- Class Filter + Search -->
            <div class="flex gap-1.5">
              <div class="grid grid-cols-3 gap-1 shrink-0">
                <button type="button" data-ncls="ALL" class="ncert-cls-btn clicky px-2 py-1.5 rounded-lg text-[10px] font-bold bg-white/15 text-white border border-white/25">All</button>
                <button type="button" data-ncls="11" class="ncert-cls-btn clicky px-2 py-1.5 rounded-lg text-[10px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">11th</button>
                <button type="button" data-ncls="12" class="ncert-cls-btn clicky px-2 py-1.5 rounded-lg text-[10px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">12th</button>
              </div>
              <input id="ncertSearchInput" type="text" placeholder="🔍 Search chapter..." class="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400" />
            </div>
          </div>
          <div id="ncertChapterList" class="flex-1 overflow-y-auto p-2.5 space-y-1.5"></div>
        </aside>

        <!-- Right PDF Reading Desk -->
        <main class="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden">
          <!-- Active Chapter Action Strip -->
          <div class="px-4 py-2 bg-black/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span id="ncertActiveBadge" class="px-2 py-0.5 rounded-md text-[10px] font-extrabold theme-btn-primary">Biology • Class 11</span>
                <span id="ncertActiveTitle" class="text-xs sm:text-sm font-bold text-white truncate">Ch 8: Cell: The Unit of Life</span>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button type="button" id="ncertBookmarkBtn" class="clicky px-2.5 py-1 rounded-lg text-[11px] font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-amber-300">☆ Bookmark</button>
              <button type="button" id="ncertReloadPdfBtn" class="clicky px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white">↻ Reload</button>
              <a id="ncertExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="clicky px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-600/20 hover:bg-emerald-600/35 text-emerald-300 border border-emerald-500/35">⬇ Open / Save PDF</a>
            </div>
          </div>

          <!-- PDF Frame Container -->
          <div class="flex-1 relative bg-zinc-900 overflow-hidden">
            <div id="ncertLoadingBanner" class="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 z-10 pointer-events-none transition-opacity duration-300">
              <div class="text-3xl mb-2 animate-pulse">📖</div>
              <p class="text-xs font-bold text-zinc-300">Loading Official NCERT PDF...</p>
              <p class="text-[10px] text-zinc-500 mt-1">If slow on NCERT server, tap "Mode: Direct" or "Open / Save PDF" above</p>
            </div>
            <iframe id="ncertPdfIframe" title="NCERT Textbook PDF Reader" class="w-full h-full border-0 transition-all duration-300" allowfullscreen></iframe>
          </div>
        </main>
      </div>`;

    document.body.appendChild(page);

    // Wire Controls
    document.getElementById("closeNcertReaderBtn").addEventListener("click", () => {
      document.getElementById("ncertReaderPage").classList.add("hidden");
    });

    document.getElementById("ncertSearchInput").addEventListener("input", renderChapterList);

    document.querySelectorAll(".ncert-sub-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterSubj = btn.getAttribute("data-nsub");
        document.querySelectorAll(".ncert-sub-btn").forEach(b => {
          b.className = b.getAttribute("data-nsub") === filterSubj
            ? "ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-bold theme-btn-primary"
            : "ncert-sub-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800";
        });
        renderChapterList();
      });
    });

    document.querySelectorAll(".ncert-cls-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterCls = btn.getAttribute("data-ncls");
        document.querySelectorAll(".ncert-cls-btn").forEach(b => {
          b.className = b.getAttribute("data-ncls") === filterCls
            ? "ncert-cls-btn clicky px-2 py-1.5 rounded-lg text-[10px] font-bold bg-white/15 text-white border border-white/25"
            : "ncert-cls-btn clicky px-2 py-1.5 rounded-lg text-[10px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800";
        });
        renderChapterList();
      });
    });

    document.getElementById("ncertNightModeBtn").addEventListener("click", () => {
      nightPdfFilter = !nightPdfFilter;
      localStorage.setItem("sp_pdf_night_filter", String(nightPdfFilter));
      applyPdfNightFilter();
    });

    document.getElementById("ncertViewerModeBtn").addEventListener("click", () => {
      viewerMode = viewerMode === "gview" ? "direct" : "gview";
      localStorage.setItem("sp_pdf_viewer_mode", viewerMode);
      syncViewerModeBtn();
      if (!localBlobUrl) loadChapterPdf(activeChapter);
    });

    document.getElementById("ncertReloadPdfBtn").addEventListener("click", () => {
      if (localBlobUrl) {
        document.getElementById("ncertPdfIframe").src = localBlobUrl;
      } else {
        loadChapterPdf(activeChapter);
      }
    });

    document.getElementById("ncertBookmarkBtn").addEventListener("click", () => {
      if (!activeChapter) return;
      const idx = bookmarks.indexOf(activeChapter.id);
      if (idx === -1) bookmarks.push(activeChapter.id);
      else bookmarks.splice(idx, 1);
      localStorage.setItem("sp_pdf_bookmarks", JSON.stringify(bookmarks));
      syncBookmarkBtn();
      renderChapterList();
    });

    // Local PDF Reader Option
    document.getElementById("ncertLocalPdfBtn").addEventListener("click", () => {
      document.getElementById("ncertLocalPdfInput").click();
    });
    document.getElementById("ncertLocalPdfInput").addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
      localBlobUrl = URL.createObjectURL(file);
      document.getElementById("ncertActiveBadge").textContent = "📂 Local Device PDF";
      document.getElementById("ncertActiveTitle").textContent = file.name;
      document.getElementById("ncertExternalLink").href = localBlobUrl;
      const iframe = document.getElementById("ncertPdfIframe");
      const loader = document.getElementById("ncertLoadingBanner");
      loader.style.opacity = "0";
      iframe.src = localBlobUrl;
    });

    // Bridge to StudyPunch Focus Clock-In
    document.getElementById("ncertClockInChapterBtn").addEventListener("click", () => {
      const subjInput = document.getElementById("sessionSubjectInput");
      if (subjInput && activeChapter) {
        subjInput.value = `${activeChapter.subject} Cl.${activeChapter.cls}: ${activeChapter.title}`;
      }
      document.getElementById("ncertReaderPage").classList.add("hidden");
      if (typeof window.slideToScreen === "function") window.slideToScreen(0);
      const clockInBtn = document.getElementById("clockInBtn");
      if (clockInBtn) clockInBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.getElementById("ncertPdfIframe").addEventListener("load", () => {
      const loader = document.getElementById("ncertLoadingBanner");
      if (loader) loader.style.opacity = "0";
    });

    applyPdfNightFilter();
    syncViewerModeBtn();
  }

  function applyPdfNightFilter() {
    const iframe = document.getElementById("ncertPdfIframe");
    const btn = document.getElementById("ncertNightModeBtn");
    if (!iframe || !btn) return;
    iframe.style.filter = nightPdfFilter ? "invert(0.9) hue-rotate(180deg) contrast(0.95)" : "none";
    btn.textContent = nightPdfFilter ? "🌙 Night Filter: ON" : "🌙 Night Filter: OFF";
    btn.className = nightPdfFilter
      ? "clicky px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-indigo-500/25 text-indigo-200 border border-indigo-400/40"
      : "clicky px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-zinc-200 border border-white/15";
  }

  function syncViewerModeBtn() {
    const btn = document.getElementById("ncertViewerModeBtn");
    if (!btn) return;
    btn.textContent = viewerMode === "gview" ? "🖥️ Mode: Smart Embed" : "🖥️ Mode: Direct PDF";
  }

  function syncBookmarkBtn() {
    const btn = document.getElementById("ncertBookmarkBtn");
    if (!btn || !activeChapter) return;
    const saved = bookmarks.includes(activeChapter.id);
    btn.textContent = saved ? "⭐ Bookmarked" : "☆ Bookmark";
    btn.className = saved
      ? "clicky px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/40"
      : "clicky px-2.5 py-1 rounded-lg text-[11px] font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-amber-300";
  }

  function loadChapterPdf(ch) {
    if (!ch) return;
    activeChapter = ch;
    if (localBlobUrl) { URL.revokeObjectURL(localBlobUrl); localBlobUrl = null; }
    localStorage.setItem("sp_pdf_last_read", ch.id);

    document.getElementById("ncertActiveBadge").textContent = `${ch.icon} ${ch.subject} • Class ${ch.cls}`;
    document.getElementById("ncertActiveTitle").textContent = `${ch.chNum}: ${ch.title}`;
    document.getElementById("ncertExternalLink").href = ch.url;
    syncBookmarkBtn();

    const loader = document.getElementById("ncertLoadingBanner");
    loader.style.opacity = "1";
    setTimeout(() => { loader.style.opacity = "0"; }, 4500);

    const iframe = document.getElementById("ncertPdfIframe");
    iframe.src = viewerMode === "gview"
      ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(ch.url)}`
      : ch.url;

    renderChapterList();
  }

  function renderChapterList() {
    const cont = document.getElementById("ncertChapterList");
    if (!cont) return;
    const q = (document.getElementById("ncertSearchInput")?.value || "").toLowerCase().trim();

    const filtered = NCERT_LIBRARY.filter(item => {
      const subOk = filterSubj === "SAVED" ? bookmarks.includes(item.id) : item.subject === filterSubj;
      const clsOk = filterCls === "ALL" || String(item.cls) === filterCls;
      const qOk = !q || item.title.toLowerCase().includes(q) || item.chNum.toLowerCase().includes(q) || item.id.includes(q);
      return subOk && clsOk && qOk;
    });

    if (!filtered.length) {
      cont.innerHTML = `<p class="text-xs text-zinc-500 text-center py-8">${filterSubj === "SAVED" ? "No bookmarked chapters yet. Tap ☆ Bookmark while reading!" : "No matching chapters found."}</p>`;
      return;
    }

    cont.innerHTML = filtered.map(ch => {
      const isAct = activeChapter && activeChapter.id === ch.id && !localBlobUrl;
      const isStar = bookmarks.includes(ch.id);
      return `
        <button type="button" data-chid="${ch.id}" class="ncert-ch-btn clicky w-full text-left p-2.5 rounded-2xl border transition ${isAct ? 'bg-white/15 border-white/35 text-white' : 'bg-black/70 border-zinc-800/90 text-zinc-300 hover:bg-zinc-900'}">
          <div class="flex items-center justify-between gap-2 mb-0.5">
            <span class="text-[9px] font-extrabold uppercase tracking-wider ${isAct ? 'theme-gradient-text' : 'text-zinc-500'}">${ch.icon} Class ${ch.cls} • ${ch.chNum}</span>
            ${isStar ? '<span class="text-[10px]">⭐</span>' : ''}
          </div>
          <p class="text-xs font-bold leading-snug">${ch.title}</p>
        </button>`;
    }).join("");

    cont.querySelectorAll(".ncert-ch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const found = NCERT_LIBRARY.find(x => x.id === btn.getAttribute("data-chid"));
        if (found) loadChapterPdf(found);
      });
    });
  }

  function openNcertReader() {
    document.getElementById("ncertReaderPage").classList.remove("hidden");
    renderChapterList();
    if (!document.getElementById("ncertPdfIframe").src) {
      loadChapterPdf(activeChapter);
    }
  }

  function bootReader() {
    injectNcertReaderUI();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootReader);
  else bootReader();
})();
