// ============================================================
// EcoNexa — AI Waste Image Classifier View (Citizen & Worker)
// ============================================================

function renderCitizenAiScanner(container) {
  const ai = window.EcoAI;
  const utils = window.EcoUtils;
  const presets = ai ? ai.presetSamples : [];

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-green text-xs font-bold uppercase tracking-wider">✨ AI-Powered Computer Vision</span>
            <span class="text-xs text-muted">Model: EcoVision-v3.2 (96.4% Top-1 Accuracy)</span>
          </div>
          <h1 class="page-title text-2xl font-bold mt-1 flex items-center gap-2">
            ${utils.icon('camera', 26)} AI Waste Image Classifier
          </h1>
          <p class="text-muted">Upload or capture an image of any waste item to instantly identify its category, material composition, and recommended disposal channel.</p>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn btn-outline btn-sm flex items-center gap-1.5" onclick="EcoRouter.navigate('#citizen-whatgoes')">
            ${utils.icon('search', 16)} Search by Text
          </button>
          <button class="btn btn-outline btn-sm flex items-center gap-1.5" onclick="EcoRouter.navigate('#citizen-map')">
            ${utils.icon('map', 16)} Facility EcoMap
          </button>
        </div>
      </div>

      <!-- Main Scanner Layout -->
      <div class="grid grid-cols-12 gap-6 mb-6">
        <!-- Left 7 Cols: Upload & Scanner Interactive Frame -->
        <div class="col-span-7 card p-6 flex flex-col justify-between" style="box-shadow: var(--shadow-md);">
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg flex items-center gap-2">
                ${utils.icon('upload_cloud', 20)} Upload or Capture Waste Photo
              </h3>
              <span class="text-xs text-muted">Supports JPG, PNG, WEBP (Max 10MB)</span>
            </div>

            <!-- Drag & Drop Zone -->
            <div id="aiDropZone" class="ai-dropzone p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition relative overflow-hidden" 
                 style="background: var(--gray-50); border-color: var(--color-primary-light);">
              
              <input type="file" id="aiFileInput" accept="image/*" class="hidden" />
              
              <div id="dropZoneContent">
                <div class="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" 
                     style="background: var(--green-100); color: var(--color-primary);">
                  ${utils.icon('camera', 32)}
                </div>
                <h4 class="font-bold text-base mb-1">Drag & Drop Waste Photo here</h4>
                <p class="text-xs text-muted mb-3">or click to browse from your device or camera</p>
                <div class="flex justify-center gap-2">
                  <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('aiFileInput').click()">
                    ${utils.icon('upload', 16)} Choose File
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="window.simulateCameraCapture()">
                    📸 Open Camera
                  </button>
                </div>
              </div>

              <!-- Live Preview / Scanning Box (Hidden Initially) -->
              <div id="aiPreviewBox" class="hidden flex-col items-center justify-center p-2">
                <div id="previewSvgMount" class="w-32 h-32 rounded-xl mb-3 shadow-sm border border-gray-200 overflow-hidden relative flex items-center justify-center bg-white">
                  <!-- Image SVG will appear here -->
                </div>
                <div id="selectedItemName" class="font-bold text-sm text-gray-800 mb-1">Selected Item</div>
                <div class="text-xs text-muted mb-3" id="fileSizeInfo">Ready for AI Neural Analysis</div>
                <div class="flex gap-2">
                  <button id="btnRunAiAnalysis" class="btn btn-primary btn-sm flex items-center gap-2">
                    ✨ Run AI Neural Classification
                  </button>
                  <button class="btn btn-ghost btn-sm text-red-500" onclick="window.resetAiScanner()">
                    ✕ Change Photo
                  </button>
                </div>
              </div>

              <!-- Scanning Radar Animation Overlay -->
              <div id="scanningRadar" class="hidden absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-20">
                <div class="ai-scanner-beam mb-4"></div>
                <div class="font-bold text-base text-green-700 flex items-center gap-2">
                  <span class="inline-block animate-spin">${utils.icon('loader', 20)}</span>
                  Analyzing Waste Geometry & Composition...
                </div>
                <p class="text-xs text-muted mt-1">Extracting spectral features & material classification</p>
              </div>
            </div>

            <!-- Instant Test Presets -->
            <div class="mt-5">
              <label class="text-xs font-bold uppercase text-muted tracking-wider block mb-2">
                ⚡ Or Test Instantly with Preset Waste Samples:
              </label>
              <div class="grid grid-cols-4 gap-2">
                ${presets.map(p => `
                  <button type="button" class="preset-sample-btn p-2 rounded-lg border text-left flex items-center gap-2 hover:border-green-500 transition text-xs"
                          onclick="window.selectAiPreset('${p.id}')" style="background: var(--color-surface);">
                    <span style="font-size: 1.25rem;">${p.emoji}</span>
                    <div class="truncate">
                      <div class="font-semibold truncate">${p.name.split(' ')[0]}</div>
                      <div class="text-muted text-[10px] uppercase">${p.category}</div>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t text-xs text-muted flex items-center justify-between">
            <span>🛡️ Privacy: Photos are analyzed in memory and never sold.</span>
            <span>⚡ Response time: ~0.4s</span>
          </div>
        </div>

        <!-- Right 5 Cols: Real-time AI Result Card -->
        <div class="col-span-5 flex flex-col gap-4">
          <div id="aiResultCard" class="card p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center min-h-[380px]"
               style="background: var(--color-surface); box-shadow: var(--shadow-md);">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              ${utils.icon('eye', 30)}
            </div>
            <h4 class="font-bold text-base text-gray-700">Awaiting Waste Photo</h4>
            <p class="text-xs text-muted max-w-xs mt-1">Upload an image or pick a test preset to see real-time AI classification, confidence score, and disposal guidance.</p>
          </div>

          <!-- Quick Tip Card -->
          <div class="card p-4 bg-green-50 border-l-4 border-green-500 text-xs" style="background: var(--green-50);">
            <div class="font-bold text-green-900 mb-1 flex items-center gap-1.5">
              ${utils.icon('check_circle', 16)} Best Segregation Practices
            </div>
            <p class="text-green-800 leading-relaxed">
              Always ensure recyclable containers (bottles, tetra-paks, tins) are <strong>rinsed of food residues</strong> before placing in the dry waste bin.
            </p>
          </div>
        </div>
      </div>

      <!-- Recent Scans History -->
      <div class="card p-0 overflow-hidden" style="box-shadow: var(--shadow-sm);">
        <div class="p-4 border-b flex justify-between items-center bg-gray-50">
          <div class="font-bold text-sm flex items-center gap-2">
            ${utils.icon('clock', 16)} Recent AI Classification History
          </div>
          <span class="text-xs text-muted">Session Cache</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-100 border-b text-xs uppercase text-muted">
              <tr>
                <th class="p-3">Detected Item</th>
                <th class="p-3">Category Stream</th>
                <th class="p-3">AI Confidence</th>
                <th class="p-3">Recommended Action</th>
                <th class="p-3">Action</th>
              </tr>
            </thead>
            <tbody id="aiScanHistoryTable">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Internal Logic & Handlers
  let currentSelection = presets[0];

  window.selectAiPreset = function(presetId) {
    const found = presets.find(p => p.id === presetId);
    if (!found) return;
    currentSelection = found;

    const dropContent = document.getElementById('dropZoneContent');
    const previewBox = document.getElementById('aiPreviewBox');
    const previewMount = document.getElementById('previewSvgMount');
    const itemName = document.getElementById('selectedItemName');

    if (dropContent) dropContent.classList.add('hidden');
    if (previewBox) {
      previewBox.classList.remove('hidden');
      previewBox.classList.add('flex');
    }
    if (previewMount) previewMount.innerHTML = found.imageSvg;
    if (itemName) itemName.textContent = `${found.emoji} ${found.name}`;

    // Auto-run analysis for smooth UX
    window.runAiAnalysis(found);
  };

  window.simulateCameraCapture = function() {
    window.EcoUtils.toast('Camera lens opened (Simulation)', 'info', 1500);
    // Pick random preset as simulated snapshot
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    window.selectAiPreset(randomPreset.id);
  };

  window.resetAiScanner = function() {
    const dropContent = document.getElementById('dropZoneContent');
    const previewBox = document.getElementById('aiPreviewBox');
    if (dropContent) dropContent.classList.remove('hidden');
    if (previewBox) {
      previewBox.classList.add('hidden');
      previewBox.classList.remove('flex');
    }
  };

  window.runAiAnalysis = async function(sampleData) {
    const radar = document.getElementById('scanningRadar');
    if (radar) radar.classList.remove('hidden');

    try {
      const result = await window.EcoAI.classifyWasteImage(sampleData.id || sampleData);
      if (radar) radar.classList.add('hidden');
      renderResultCard(result);
      renderHistoryTable();
      window.EcoUtils.toast(`Identified as ${result.detectedItem} (${result.confidence}%)`, 'success', 2500);
    } catch (err) {
      if (radar) radar.classList.add('hidden');
      window.EcoUtils.toast('Classification error. Please retry.', 'error');
    }
  };

  function renderResultCard(res) {
    const card = document.getElementById('aiResultCard');
    if (!card) return;

    card.className = 'card p-6 border border-gray-200 flex flex-col text-left transition animate-scale-in';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <div>
          <span class="badge text-xs font-bold uppercase tracking-wider" style="background: ${res.binColor.hex}20; color: ${res.binColor.hex}; border: 1px solid ${res.binColor.hex}40;">
            ${res.emoji} ${res.macroStream}
          </span>
          <h3 class="text-xl font-bold text-gray-900 mt-1">${res.detectedItem}</h3>
        </div>
        <div class="text-right">
          <div class="text-2xl font-extrabold text-green-600">${res.confidence}%</div>
          <span class="text-[10px] text-muted uppercase font-semibold">AI Confidence</span>
        </div>
      </div>

      <!-- Confidence Bar -->
      <div class="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
        <div class="bg-green-500 h-2 rounded-full transition-all duration-700" style="width: ${res.confidence}%"></div>
      </div>

      <!-- Detail Box -->
      <div class="space-y-2.5 text-xs text-gray-700 mb-5">
        <div class="p-2.5 rounded-lg border bg-gray-50 flex items-center justify-between">
          <span class="text-muted font-medium">Material Composition:</span>
          <span class="font-semibold text-gray-900">${res.materialInfo}</span>
        </div>
        
        <div class="p-3 rounded-lg border-l-4" style="background: ${res.binColor.hex}10; border-color: ${res.binColor.hex};">
          <div class="font-bold mb-1" style="color: ${res.binColor.hex};">
            Recommended Action:
          </div>
          <p class="text-gray-800 leading-relaxed font-medium">${res.recommendation}</p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="p-2 rounded border bg-gray-50">
            <span class="text-muted block text-[10px] uppercase">Designated Bin</span>
            <span class="font-bold text-gray-900">${res.binColor.name}</span>
          </div>
          <div class="p-2 rounded border bg-gray-50">
            <span class="text-muted block text-[10px] uppercase">Carbon Offset Est.</span>
            <span class="font-bold text-green-600">+${res.carbonOffsetKg} kg CO₂e</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2 mt-auto pt-3 border-t">
        <button class="btn btn-primary btn-sm flex items-center justify-center gap-1.5" onclick="window.logScanToMyWaste('${res.category}', '${res.detectedItem}')">
          ${utils.icon('check', 16)} Log to My Waste
        </button>
        <button class="btn btn-outline btn-sm flex items-center justify-center gap-1.5" onclick="EcoRouter.navigate('#citizen-map')">
          ${utils.icon('pin', 16)} Nearest Bin / Hub
        </button>
      </div>
    `;
  }

  function renderHistoryTable() {
    const table = document.getElementById('aiScanHistoryTable');
    if (!table) return;
    const history = ai.getScanHistory();

    if (!history || history.length === 0) {
      table.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-muted">No scan history recorded in this session.</td></tr>`;
      return;
    }

    table.innerHTML = history.slice(0, 6).map(h => `
      <tr class="border-b hover:bg-gray-50 transition">
        <td class="p-3 font-semibold text-gray-900">${h.emoji || '📦'} ${h.detectedItem}</td>
        <td class="p-3"><span class="badge badge-outline text-xs">${h.macroStream}</span></td>
        <td class="p-3 font-bold text-green-600">${h.confidence}%</td>
        <td class="p-3 text-xs text-gray-600 max-w-xs truncate" title="${h.recommendation}">${h.recommendation}</td>
        <td class="p-3">
          <button class="btn btn-ghost btn-sm text-xs" onclick="window.logScanToMyWaste('${h.category}', '${h.detectedItem}')">
            + Log
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.logScanToMyWaste = function(cat, name) {
    EcoRouter.navigate('#citizen-waste');
    setTimeout(() => {
      window.EcoUtils.toast(`Selected ${name} (${cat}) for daily logging!`, 'success', 2500);
    }, 200);
  };

  // Bind file input change
  const fileInput = document.getElementById('aiFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const fakeSample = {
          id: 'uploaded-' + file.name,
          name: file.name.replace(/\.[^/.]+$/, ""),
          emoji: '📸',
          category: 'dry',
          macroStream: 'Dry / Recyclable Stream',
          confidence: 94.5,
          material: 'Recyclable Matrix',
          recommendation: 'Place in designated recyclable sorting bin.',
          carbonOffsetKg: 0.05,
          hazardLevel: 'None',
          imageSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="16" fill="#e0f2fe"/><circle cx="50" cy="50" r="25" fill="#38bdf8"/><text x="50" y="54" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">IMG</text></svg>`
        };
        window.selectAiPreset(fakeSample.id);
        window.runAiAnalysis(fakeSample);
      }
    });
  }

  // Bind Run AI button
  const btnRun = document.getElementById('btnRunAiAnalysis');
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      window.runAiAnalysis(currentSelection);
    });
  }

  // Initial render of history table
  renderHistoryTable();
}

window.renderCitizenAiScanner = renderCitizenAiScanner;
