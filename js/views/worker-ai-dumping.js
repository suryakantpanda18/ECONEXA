// ============================================================
// EcoNexa — Worker AI Field Scanner & Suspected Illegal Dumping Reporter
// ============================================================

function renderWorkerAiDumping(container) {
  const user = window.EcoData.users.find(u => u.id === 'WK01') || { name: 'Suresh Kumar', ward: 'W01' };
  const utils = window.EcoUtils;
  const ai = window.EcoAI;
  const alerts = window.EcoData.illegalDumpingAlerts || [];

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-amber text-xs font-bold uppercase">Field Surveillance AI</span>
            <span class="text-xs text-muted">Worker Field Ops: ${user.name} (${user.ward})</span>
          </div>
          <h1 class="page-title text-2xl font-bold mt-1 flex items-center gap-2">
            ${utils.icon('camera', 26)} AI Field Scanner & Dumping Reporter
          </h1>
          <p class="text-muted">Use Computer Vision to classify unknown waste piles or log suspected illegal dumping incidents for authority inspection.</p>
        </div>

        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm" onclick="EcoRouter.navigate('#worker-households')">
            ${utils.icon('users', 16)} My Collections
          </button>
          <button class="btn btn-primary btn-sm" onclick="EcoRouter.navigate('#worker-route')">
            ${utils.icon('map', 16)} My Route
          </button>
        </div>
      </div>

      <!-- Human Verification Disclaimer Alert -->
      <div class="p-3.5 rounded-lg bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-900 mb-6 flex items-center justify-between" style="background: var(--amber-50, #fffbeb);">
        <div class="flex items-center gap-2">
          <span class="text-amber-600 font-bold text-sm">⚠️ Protocol Note:</span>
          <span>AI illegal dumping analysis functions as an <strong>investigative alert</strong> for human verification, not a final legal citation.</span>
        </div>
        <span class="badge badge-outline text-[11px] border-amber-300 text-amber-800">SOP Compliance</span>
      </div>

      <!-- Two-Column Layout -->
      <div class="grid grid-cols-12 gap-6 mb-6">
        <!-- Left: Upload & AI Tagger Form -->
        <div class="col-span-7 card p-6" style="box-shadow: var(--shadow-md);">
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            ${utils.icon('alert_circle', 20)} Report Suspected Illegal Dumping Site
          </h3>

          <div class="space-y-4">
            <!-- Image Upload & Preset -->
            <div class="form-group border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:bg-gray-50 transition" 
                 id="workerDropZone" onclick="window.workerSelectPreset()">
              <div class="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center bg-amber-100 text-amber-700">
                ${utils.icon('camera', 28)}
              </div>
              <h4 class="font-bold text-sm text-gray-800 mb-0.5">Click to Capture / Upload Field Image</h4>
              <p class="text-xs text-muted mb-2">Simulate real-time camera snapshot from sanitation route</p>
              <span id="workerPhotoStatus" class="badge badge-green text-xs">✓ Sample Evidence: dumping_site_road12.jpg</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Location / Landmark</label>
                <input type="text" id="dumpLoc" class="form-input w-full p-2.5 border rounded-lg text-sm" value="Road No. 12 Vacant Plot, Ward W01" />
              </div>
              <div class="form-group">
                <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Assigned Ward</label>
                <input type="text" class="form-input w-full p-2.5 border rounded-lg text-sm bg-gray-100" value="${user.ward} — Banjara Hills" readonly />
              </div>
            </div>

            <button id="btnRunWorkerAi" class="btn btn-primary w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
              ✨ Run AI Dumping & Volume Analysis
            </button>
          </div>
        </div>

        <!-- Right: AI Evaluation Result -->
        <div class="col-span-5 flex flex-col gap-4">
          <div id="workerAiResult" class="card p-6 border-2 border-dashed border-gray-200 flex flex-col justify-center min-h-[340px]" style="box-shadow: var(--shadow-md);">
            <div class="text-center text-gray-400">
              <div class="w-14 h-14 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-2">
                ${utils.icon('shield', 26)}
              </div>
              <h4 class="font-bold text-sm text-gray-700">Ready for AI Assessment</h4>
              <p class="text-xs text-muted max-w-xs mx-auto mt-1">Click 'Run AI Dumping & Volume Analysis' to evaluate severity and estimate pile volume.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Dumping Alerts Table -->
      <div class="card p-0 overflow-hidden" style="box-shadow: var(--shadow-sm);">
        <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 class="font-bold text-sm flex items-center gap-2">
            ${utils.icon('alert_circle', 16)} Active Suspected Dumping Alerts (${alerts.length})
          </h3>
          <span class="badge badge-amber text-xs">Authority Inspection Pending</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-100 border-b text-xs uppercase text-muted">
              <tr>
                <th class="p-3">Alert ID</th>
                <th class="p-3">Location</th>
                <th class="p-3">Severity</th>
                <th class="p-3">Est. Volume</th>
                <th class="p-3">Detected Debris</th>
                <th class="p-3">Status</th>
                <th class="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              ${alerts.map(a => `
                <tr class="border-b hover:bg-gray-50 transition">
                  <td class="p-3 font-mono font-bold text-xs">${a.alertId}</td>
                  <td class="p-3 font-medium">${a.location}</td>
                  <td class="p-3">${window.EcoUtils.priorityBadge(a.severity)}</td>
                  <td class="p-3 font-semibold text-gray-700">${a.estimatedVolume}</td>
                  <td class="p-3 text-xs text-gray-600">${a.detectedMaterials?.join(', ') || 'Mixed Debris'}</td>
                  <td class="p-3"><span class="badge badge-amber text-xs">${a.alertStatus}</span></td>
                  <td class="p-3">
                    <button class="btn btn-ghost btn-sm text-xs" onclick="EcoRouter.navigate('#citizen-map')">
                      View on Map
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Handlers
  window.workerSelectPreset = function() {
    window.EcoUtils.toast('Field image captured and geotagged!', 'info', 1500);
    const status = document.getElementById('workerPhotoStatus');
    if (status) status.textContent = `✓ Captured at ${new Date().toLocaleTimeString()} (GPS: 17.4220, 78.4380)`;
  };

  const btnRun = document.getElementById('btnRunWorkerAi');
  if (btnRun) {
    btnRun.addEventListener('click', async () => {
      btnRun.disabled = true;
      btnRun.innerHTML = `<span class="animate-spin inline-block mr-2">${utils.icon('loader', 16)}</span> Running AI CV Models...`;

      const loc = document.getElementById('dumpLoc')?.value || 'Ward W01 Area';
      const result = await window.EcoAI.detectIllegalDumping('sample-field-dump', loc);

      btnRun.disabled = false;
      btnRun.innerHTML = `✨ Run AI Dumping & Volume Analysis`;

      const resultBox = document.getElementById('workerAiResult');
      if (resultBox) {
        resultBox.className = 'card p-6 border-l-4 border-amber-500 flex flex-col justify-between animate-scale-in';
        resultBox.innerHTML = `
          <div>
            <div class="flex justify-between items-start mb-3">
              <div>
                <span class="badge badge-red text-xs font-bold uppercase">🚨 ${result.alertId}</span>
                <h4 class="text-lg font-bold text-gray-900 mt-1">Possible Illegal Dumping Detected</h4>
              </div>
              <span class="badge badge-amber text-xs font-bold">${result.confidence}% Confidence</span>
            </div>

            <div class="space-y-2 text-xs mb-4">
              <div class="p-2 rounded bg-gray-50 border flex justify-between">
                <span class="text-muted">Assessed Severity:</span>
                <span class="font-bold text-red-600">${result.severity}</span>
              </div>
              <div class="p-2 rounded bg-gray-50 border flex justify-between">
                <span class="text-muted">Estimated Volume:</span>
                <span class="font-bold text-gray-900">${result.estimatedVolume}</span>
              </div>
              <div class="p-2 rounded bg-gray-50 border">
                <span class="text-muted block mb-0.5">Identified Materials:</span>
                <span class="font-semibold text-gray-800">${result.detectedMaterials.join(' • ')}</span>
              </div>
              <div class="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                ${result.recommendedAction}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t flex gap-2">
            <button class="btn btn-primary btn-sm w-full bg-green-600 text-white" onclick="window.EcoUtils.toast('Alert dispatched to Municipal Admin Dashboard!', 'success', 3000)">
              ${utils.icon('send', 16)} Transmit to Admin Dashboard
            </button>
            <button class="btn btn-outline btn-sm" onclick="EcoRouter.navigate('#citizen-map')">
              ${utils.icon('map', 16)} Map
            </button>
          </div>
        `;
      }

      window.EcoUtils.toast('Dumping incident analyzed and registered!', 'success', 2500);
    });
  }
}

window.renderWorkerAiDumping = renderWorkerAiDumping;
