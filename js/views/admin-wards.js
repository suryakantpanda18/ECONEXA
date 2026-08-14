function renderAdminWards(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;

  const totalHouseholds = data.wards.reduce((acc, w) => acc + w.households, 0);
  const avgEff = data.wards.reduce((acc, w) => acc + w.efficiency, 0) / data.wards.length;

  const cardsHtml = data.wards.map(w => `
    <div class="ward-card card p-4 cursor-pointer hover-lift" onclick="window.selectedWardId = '${w.id}'; if(window.EcoRouter) window.EcoRouter.navigate('#admin-ward-detail');">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="font-bold text-lg">${w.name}</h3>
          <p class="text-sm text-gray-500">${w.area}</p>
        </div>
        ${utils.statusBadgeHTML(w.efficiency >= 90 ? 'collected' : w.efficiency >= 75 ? 'pending' : 'missed')}
      </div>
      <div class="mb-3">
        <div class="flex justify-between text-sm mb-1">
          <span>Efficiency</span>
          <span class="font-bold">${w.efficiency}%</span>
        </div>
        <div class="progress-bar bg-gray-200 h-2 rounded-full overflow-hidden">
          <div class="progress-bar__fill h-full bg-${utils.efficiencyColor(w.efficiency)}-500" style="width: ${w.efficiency}%"></div>
        </div>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <div>Generated: <strong>${utils.fmtTons(w.generated)}</strong></div>
        <div>Collected: <strong>${utils.fmtTons(w.collected)}</strong></div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-2xl font-bold">Ward Monitoring</h1>
          <p class="text-gray-600">${data.wards.length} Wards • ${utils.fmt(totalHouseholds)} Households • ${avgEff.toFixed(1)}% Avg Efficiency</p>
        </div>
        <div>
          <input type="text" id="wardSearchInput" class="search-input form-input p-2 border rounded" placeholder="Search ward or area..." style="min-width: 240px;">
        </div>
      </div>
      <div class="ward-grid grid grid-cols-4 gap-6" id="wardGridContainer">
        ${cardsHtml}
      </div>
    </div>
  `;

  setTimeout(() => {
    const searchInput = document.getElementById('wardSearchInput');
    const container = document.getElementById('wardGridContainer');
    if (!searchInput || !container) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = data.wards.filter(w => w.name.toLowerCase().includes(q) || w.area.toLowerCase().includes(q));
      if (filtered.length === 0) {
        container.innerHTML = '<div class="col-span-4 text-center p-8 text-muted">No wards found matching your search.</div>';
      } else {
        container.innerHTML = filtered.map(w => `
          <div class="ward-card card p-4 cursor-pointer hover-lift" onclick="window.selectedWardId = '${w.id}'; if(window.EcoRouter) window.EcoRouter.navigate('#admin-ward-detail');">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-bold text-lg">${w.name}</h3>
                <p class="text-sm text-gray-500">${w.area}</p>
              </div>
              ${utils.statusBadgeHTML(w.efficiency >= 90 ? 'collected' : w.efficiency >= 75 ? 'pending' : 'missed')}
            </div>
            <div class="mb-3">
              <div class="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span class="font-bold">${w.efficiency}%</span>
              </div>
              <div class="progress-bar bg-gray-200 h-2 rounded-full overflow-hidden">
                <div class="progress-bar__fill h-full bg-${utils.efficiencyColor(w.efficiency)}-500" style="width: ${w.efficiency}%"></div>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <div>Generated: <strong>${utils.fmtTons(w.generated)}</strong></div>
              <div>Collected: <strong>${utils.fmtTons(w.collected)}</strong></div>
            </div>
          </div>
        `).join('');
      }
    });
  }, 50);
}

function renderAdminWardDetail(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;
  const charts = window.EcoCharts;

  const wardId = window.selectedWardId || 'W01';
  const ward = utils.getWard(wardId);
  if (!ward) return;

  const wr = data.wasteRecords.find(r => r.wardId === ward.id && r.date === '2026-08-14') || { wet:0, dry:0, plastic:0, ewaste:0, hazardous:0, other:0 };
  const hhs = data.households.filter(h => h.ward === ward.id).slice(0, 8);
  const hhsHtml = hhs.map(h => `
    <tr class="border-b">
      <td class="p-2">${h.id}</td>
      <td class="p-2">${h.owner}</td>
      <td class="p-2 text-gray-600">${h.address}</td>
      <td class="p-2">${utils.statusBadgeHTML(h.status)}</td>
    </tr>
  `).join('');

  const bins = data.bins.filter(b => b.ward === ward.id);
  const binsHtml = bins.map(b => `
    <div class="flex justify-between items-center p-2 border-b">
      <div>
        <div class="font-bold text-sm">${b.name}</div>
        <div class="text-xs text-gray-500">${b.type} • ${b.capacity}L</div>
      </div>
      ${utils.statusBadgeHTML(b.status)}
    </div>
  `).join('');

  const workerIds = ward.workers || [];
  const workersHtml = workerIds.map(wid => {
    const w = utils.getWorker(wid);
    return w ? `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded mb-2">
        <div class="text-2xl">${utils.icon('user', 24)}</div>
        <div class="flex-1">
          <div class="font-bold">${w.name}</div>
          <div class="text-xs text-gray-600">${w.vehicleType} • ${w.vehicleNo}</div>
        </div>
        ${utils.statusBadgeHTML(w.status)}
      </div>
    ` : '';
  }).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <button class="btn btn-outline mb-4 flex items-center gap-2" onclick="if(window.EcoRouter) window.EcoRouter.navigate('#admin-wards')">
        ${utils.icon('arrow_right', 16)} Back to Wards
      </button>

      <div class="mb-6">
        <h1 class="page-title text-2xl font-bold">${ward.name}</h1>
        <p class="text-gray-600">${ward.area}</p>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="card p-4 text-center">
          <div class="text-gray-500 text-sm mb-1">Households</div>
          <div class="text-2xl font-bold">${utils.fmt(ward.households)}</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-gray-500 text-sm mb-1">Generated Today</div>
          <div class="text-2xl font-bold">${utils.fmtTons(ward.generated)}</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-gray-500 text-sm mb-1">Collected Today</div>
          <div class="text-2xl font-bold">${utils.fmtTons(ward.collected)}</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-gray-500 text-sm mb-1">Efficiency</div>
          <div class="text-2xl font-bold text-${utils.efficiencyColor(ward.efficiency)}-600">${ward.efficiency}%</div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8 flex flex-col gap-6">
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Household Status (Sample)</h3>
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50">
                <tr><th class="p-2">ID</th><th class="p-2">Owner</th><th class="p-2">Address</th><th class="p-2">Status</th></tr>
              </thead>
              <tbody>${hhsHtml}</tbody>
            </table>
          </div>
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Waste Breakdown</h3>
            <div style="height: 250px;"><canvas id="ward-waste-chart"></canvas></div>
          </div>
        </div>

        <div class="col-span-4 flex flex-col gap-6">
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Assigned Workers</h3>
            ${workersHtml || '<p class="text-gray-500">No workers assigned.</p>'}
          </div>
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Public Bins</h3>
            ${binsHtml || '<p class="text-gray-500">No bins tracked.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    charts.bar('ward-waste-chart', {
      labels: ['Wet', 'Dry', 'Plastic', 'E-Waste', 'Hazard', 'Other'],
      datasets: [{
        label: 'Tons',
        data: [wr.wet, wr.dry, wr.plastic, wr.ewaste, wr.hazardous, wr.other],
        backgroundColor: [charts.defaultColors.wet, charts.defaultColors.dry, charts.defaultColors.plastic, charts.defaultColors.ewaste, charts.defaultColors.hazardous, charts.defaultColors.other]
      }]
    });
  }, 100);
}

window.renderAdminWards = renderAdminWards;
window.renderAdminWardDetail = renderAdminWardDetail;
