function renderAuthorityDashboard(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;
  const charts = window.EcoCharts;
  const states = data.states || {};

  let selectedStateKey = 'WB'; // Default to West Bengal or user choice

  function getActiveStateData() {
    const stateInfo = states[selectedStateKey] || states.WB;
    const muns = (data.stateMunicipalities && data.stateMunicipalities[selectedStateKey]) || data.municipalities;
    const stateWaste = muns.reduce((sum, m) => sum + m.wasteToday, 0);
    const avgEff = muns.reduce((sum, m) => sum + m.efficiency, 0) / (muns.length || 1);
    const stateHouseholds = muns.reduce((sum, m) => sum + m.households, 0);
    const stateComplaints = muns.reduce((sum, m) => sum + m.complaints, 0);
    return { stateInfo, muns, stateWaste, avgEff, stateHouseholds, stateComplaints };
  }

  function renderView() {
    const { stateInfo, muns, stateWaste, avgEff, stateHouseholds, stateComplaints } = getActiveStateData();
    const munsSorted = [...muns].sort((a, b) => b.efficiency - a.efficiency);

    const rowsHtml = munsSorted.map(m => `
      <tr class="border-b hover:bg-gray-50 transition">
        <td class="p-3 font-bold">${m.name}</td>
        <td class="p-3 text-gray-600">${m.city}</td>
        <td class="p-3">${utils.fmt(m.households)}</td>
        <td class="p-3 font-semibold">${utils.fmt(m.wasteToday)} T</td>
        <td class="p-3 font-semibold text-green-600">${utils.fmt(m.collected)} T</td>
        <td class="p-3 font-bold text-${utils.efficiencyColor(m.efficiency)}-600">
          ${utils.efficiencyBadge(m.efficiency)}
        </td>
        <td class="p-3 text-blue-600 font-medium">${utils.fmt(m.recycled)} T</td>
        <td class="p-3">${m.complaints}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="view-enter stagger-children">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold flex items-center gap-2">
              ${window.EcoUtils.icon('globe', 26)} ${stateInfo.pcb}
            </h1>
            <p class="text-muted">State-wide Environmental Monitoring & Municipal Compliance Dashboard</p>
          </div>
          
          <div class="flex items-center gap-3">
            <select id="authBoardStateSelect" class="form-select" style="font-weight: 600; padding: 8px 14px; border-radius: 8px;">
              <option value="WB" ${selectedStateKey === 'WB' ? 'selected' : ''}>🏛️ West Bengal (WBPCB)</option>
              <option value="TS" ${selectedStateKey === 'TS' ? 'selected' : ''}>🏛️ Telangana (TSPCB)</option>
              <option value="MH" ${selectedStateKey === 'MH' ? 'selected' : ''}>🏛️ Maharashtra (MPCB)</option>
              <option value="KA" ${selectedStateKey === 'KA' ? 'selected' : ''}>🏛️ Karnataka (KSPCB)</option>
              <option value="DL" ${selectedStateKey === 'DL' ? 'selected' : ''}>🏛️ Delhi NCR (DPCC)</option>
            </select>
            
            <button class="btn btn-primary flex items-center gap-2" onclick="window.EcoUtils.toast('${stateInfo.name} State Waste & Compliance Report exported successfully!', 'success')">
              ${utils.icon('download', 18)} Download Report
            </button>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-4 mb-6">
          <div class="card p-4 border-b-4 border-amber-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">${utils.icon('globe', 14)} State Waste Today</div>
            <div class="text-2xl font-bold">${stateWaste.toFixed(0)} T</div>
          </div>
          <div class="card p-4 border-b-4 border-green-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">${utils.icon('target', 14)} Avg Efficiency</div>
            <div class="text-2xl font-bold">${avgEff.toFixed(1)}%</div>
          </div>
          <div class="card p-4 border-b-4 border-blue-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">${utils.icon('grid', 14)} Municipalities</div>
            <div class="text-2xl font-bold">${muns.length}</div>
          </div>
          <div class="card p-4 border-b-4 border-teal-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">${utils.icon('home', 14)} Total Households</div>
            <div class="text-2xl font-bold">${utils.fmt(stateHouseholds)}</div>
          </div>
          <div class="card p-4 border-b-4 border-red-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">${utils.icon('alert_circle', 14)} Open Complaints</div>
            <div class="text-2xl font-bold">${stateComplaints}</div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-6 mb-6">
          <div class="col-span-8 card p-0 overflow-hidden relative" style="height: 420px; box-shadow: var(--shadow-md);">
            <div id="authority-map" style="height: 100%; width: 100%;"></div>
          </div>
          <div class="col-span-4 card p-5 flex flex-col gap-4">
            <h3 class="font-bold text-base mb-1">State Compliance Indicators (${stateInfo.name})</h3>
            ${muns.slice(0, 4).map(m => {
              const compliant = m.efficiency >= 88;
              const moderate = m.efficiency >= 82 && m.efficiency < 88;
              const statusColor = compliant ? 'green' : (moderate ? 'amber' : 'red');
              const statusText = compliant ? 'Fully Compliant' : (moderate ? 'Moderate / Monitored' : 'Action Required');
              return `
                <div class="p-3 bg-gray-50 rounded-lg border-l-4 border-${statusColor}-500 flex justify-between items-center" style="background: var(--gray-50);">
                  <div>
                    <div class="font-bold text-sm">${m.name}</div>
                    <div class="text-xs text-muted">${statusText} • ${m.efficiency}%</div>
                  </div>
                  <div class="text-${statusColor}-500">
                    ${utils.icon(compliant ? 'check_circle' : (moderate ? 'alert_circle' : 'x_circle'), 20)}
                  </div>
                </div>
              `;
            }).join('')}
            <div class="mt-auto pt-3 border-t text-xs text-muted">
              CPCB Environmental Standards & Swachh Survekshan 2026 guidelines active for ${stateInfo.name}.
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="card p-5">
            <h3 class="font-bold mb-4">Municipality Breakdown (Generated vs Collected)</h3>
            <div style="height: 280px;"><canvas id="auth-chart-bar"></canvas></div>
          </div>
          <div class="card p-5">
            <h3 class="font-bold mb-4">${stateInfo.name} Waste Management Monthly Trend</h3>
            <div style="height: 280px;"><canvas id="auth-chart-line"></canvas></div>
          </div>
        </div>

        <div class="card p-0 overflow-hidden">
          <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-base">Municipality Performance Ledger — ${stateInfo.name}</h3>
            <span class="badge badge-green text-xs">Real-time Feed</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-gray-100 border-b">
                <tr>
                  <th class="p-3 text-sm">Municipality</th>
                  <th class="p-3 text-sm">City</th>
                  <th class="p-3 text-sm">Households</th>
                  <th class="p-3 text-sm">Waste Today</th>
                  <th class="p-3 text-sm">Collected</th>
                  <th class="p-3 text-sm">Efficiency</th>
                  <th class="p-3 text-sm">Recycled</th>
                  <th class="p-3 text-sm">Complaints</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      // Initialize Leaflet Map
      if (window.L) {
        const mapEl = document.getElementById('authority-map');
        if (mapEl) {
          const map = L.map('authority-map').setView(stateInfo.center, stateInfo.zoom - 1);
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
          }).addTo(map);

          muns.forEach(m => {
            const color = m.efficiency >= 88 ? '#22c55e' : m.efficiency >= 82 ? '#f59e0b' : '#ef4444';
            const lat = m.lat || (stateInfo.center[0] + (Math.random() - 0.5) * 0.4);
            const lng = m.lng || (stateInfo.center[1] + (Math.random() - 0.5) * 0.4);

            L.circleMarker([lat, lng], {
              radius: 12, fillColor: color, color: '#ffffff', weight: 2, fillOpacity: 0.9
            }).addTo(map).bindPopup(`
              <div style="font-family: 'Inter', sans-serif; padding: 4px;">
                <b style="font-size: 14px; color: #1a2e1a;">${m.name}</b><br/>
                <span style="color: #6b7280; font-size: 12px;">City: ${m.city}</span><br/>
                <hr style="margin: 6px 0; border: none; border-top: 1px solid #e5e7eb;"/>
                Collection Efficiency: <b>${m.efficiency}%</b><br/>
                Waste Today: <b>${m.wasteToday} T</b> (Recycled: ${m.recycled} T)<br/>
                Active Complaints: <b>${m.complaints}</b>
              </div>
            `);
          });
        }
      }

      // Bar chart
      charts.stackedBar('auth-chart-bar', {
        labels: muns.map(m => m.city || m.name),
        datasets: [
          { label: 'Uncollected (T)', data: muns.map(m => Math.max(0, m.wasteToday - m.collected)), backgroundColor: '#ef4444' },
          { label: 'Collected (T)', data: muns.map(m => m.collected), backgroundColor: '#22c55e' }
        ]
      });

      // Line chart
      const monthly = data.monthlyTrend || [];
      if (monthly.length) {
        charts.line('auth-chart-line', {
          labels: monthly.map(m => m.month),
          datasets: [
            { label: 'Total Generated (T)', data: monthly.map(m => m.total), borderColor: '#6b7280', pointBackgroundColor: '#6b7280' },
            { label: 'Total Collected (T)', data: monthly.map(m => m.collected), borderColor: '#22c55e', pointBackgroundColor: '#22c55e' }
          ]
        });
      }

      // State Dropdown Event
      const stateSelect = document.getElementById('authBoardStateSelect');
      if (stateSelect) {
        stateSelect.addEventListener('change', (e) => {
          selectedStateKey = e.target.value;
          renderView();
          window.EcoUtils.toast(`State Authority Board switched to ${states[selectedStateKey]?.name}`, 'info', 1800);
        });
      }

    }, 200);
  }

  renderView();
}

window.renderAuthorityDashboard = renderAuthorityDashboard;
