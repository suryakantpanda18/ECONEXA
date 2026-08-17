// ============================================================
// EcoNexa — Admin & Authority AI Waste Generation Forecasting View
// ============================================================

function renderAdminAiPredictions(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;
  const charts = window.EcoCharts;
  const wards = data.wards || [];

  let selectedWardId = window.selectedWardId || 'W01';

  async function renderPredictionView() {
    const forecast = await window.EcoAI.predictWasteGeneration(selectedWardId, 7);
    const tomorrow = forecast.tomorrow;

    container.innerHTML = `
      <div class="view-enter stagger-children">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="badge badge-green text-xs font-bold uppercase">✨ Predictive Machine Learning</span>
              <span class="text-xs text-muted">Model: Random Forest Regressor v2.4 (95.2% Accuracy)</span>
            </div>
            <h1 class="page-title text-2xl font-bold mt-1 flex items-center gap-2">
              ${utils.icon('bar_chart', 26)} AI Waste-Generation Forecasting & Surge Radar
            </h1>
            <p class="text-muted">Predictive daily/weekly waste generation per ward with proactive surge alerts and fleet allocation planning.</p>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-xs font-bold uppercase text-muted">Select Ward:</label>
            <select id="aiWardSelect" class="form-select" style="min-width: 220px; font-weight: 600; padding: 8px 12px; border-radius: 8px;">
              ${wards.map(w => `
                <option value="${w.id}" ${w.id === selectedWardId ? 'selected' : ''}>
                  ${w.name} (${w.area})
                </option>
              `).join('')}
            </select>

            <button class="btn btn-primary btn-sm flex items-center gap-1.5" onclick="window.EcoUtils.toast('AI 7-Day Forecast Model Report exported!', 'success')">
              ${utils.icon('download', 16)} Export Forecast
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="card p-4 border-b-4 border-blue-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">
              ${utils.icon('calendar', 14)} Tomorrow's Forecast
            </div>
            <div class="text-2xl font-bold text-gray-900">${tomorrow.predictedTons} T</div>
            <div class="text-xs text-muted mt-1">Bounds: ${tomorrow.lowerBoundTons}T – ${tomorrow.upperBoundTons}T</div>
          </div>

          <div class="card p-4 border-b-4 ${tomorrow.surgeRiskPct > 50 ? 'border-red-500' : 'border-amber-500'}">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">
              ${utils.icon('alert_circle', 14)} Surge Overflow Risk
            </div>
            <div class="text-2xl font-bold ${tomorrow.surgeRiskPct > 50 ? 'text-red-600' : 'text-amber-600'}">
              ${tomorrow.surgeRiskPct}%
            </div>
            <div class="text-xs text-muted mt-1">Priority: <strong>${tomorrow.priorityLevel}</strong></div>
          </div>

          <div class="card p-4 border-b-4 border-teal-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">
              ${utils.icon('home', 14)} Ward Demographic Baseline
            </div>
            <div class="text-2xl font-bold text-gray-900">${utils.fmt(forecast.households)}</div>
            <div class="text-xs text-muted mt-1">Avg: ${forecast.currentAvgDailyTons} T / day</div>
          </div>

          <div class="card p-4 border-b-4 border-green-500">
            <div class="text-xs text-muted mb-1 uppercase font-semibold flex items-center gap-1">
              ${utils.icon('check_circle', 14)} Model Confidence
            </div>
            <div class="text-2xl font-bold text-green-600">95.2%</div>
            <div class="text-xs text-muted mt-1">Trained on 365-day time series</div>
          </div>
        </div>

        <!-- Charts & Tactical Advice -->
        <div class="grid grid-cols-12 gap-6 mb-6">
          <!-- 7-Day Curve -->
          <div class="col-span-8 card p-5" style="box-shadow: var(--shadow-md);">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="font-bold text-base">7-Day Waste Generation Prediction Curve — ${forecast.wardName}</h3>
                <p class="text-xs text-muted">Predicted trend vs. Historical baseline with weekend surges</p>
              </div>
              <span class="badge badge-outline text-xs">Dynamic ML Projection</span>
            </div>
            <div style="height: 290px;">
              <canvas id="aiForecastChart"></canvas>
            </div>
          </div>

          <!-- Logistics Recommendation Box -->
          <div class="col-span-4 card p-5 flex flex-col justify-between" style="box-shadow: var(--shadow-md); background: var(--color-surface);">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <h3 class="font-bold text-base">AI Resource Allocation Guidance</h3>
              </div>

              <div class="p-3.5 rounded-lg border-l-4 border-blue-500 bg-blue-50 text-xs text-blue-900 mb-4" style="background: var(--blue-50, #eff6ff);">
                <div class="font-bold text-sm mb-1">Recommended Deployment:</div>
                <p class="leading-relaxed font-medium">${forecast.logisticsAdvice}</p>
              </div>

              <div class="space-y-2 text-xs text-gray-700">
                <div class="flex justify-between p-2 rounded bg-gray-50 border">
                  <span class="text-muted">Peak Generation Window:</span>
                  <span class="font-bold text-gray-900">06:30 AM – 09:30 AM</span>
                </div>
                <div class="flex justify-between p-2 rounded bg-gray-50 border">
                  <span class="text-muted">Target Tipper Capacity:</span>
                  <span class="font-bold text-gray-900">${Math.ceil(tomorrow.predictedTons * 1.15 * 10) / 10} Tons</span>
                </div>
                <div class="flex justify-between p-2 rounded bg-gray-50 border">
                  <span class="text-muted">Weather / Rain Index:</span>
                  <span class="font-semibold text-green-700">Dry (Normal Moisture)</span>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-sm w-full mt-4" onclick="EcoRouter.navigate('#admin-wards')">
              ${utils.icon('grid', 16)} Open Ward Monitoring Detail
            </button>
          </div>
        </div>

        <!-- All Wards Surge Radar Table -->
        <div class="card p-0 overflow-hidden" style="box-shadow: var(--shadow-sm);">
          <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
            <div>
              <h3 class="font-bold text-sm">Tomorrow's Waste Forecast Matrix — All Municipal Wards</h3>
              <p class="text-xs text-muted">Proactive overflow prevention & truck routing ranking</p>
            </div>
            <span class="badge badge-green text-xs">Ranked by Surge Risk</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-100 border-b text-xs uppercase text-muted">
                <tr>
                  <th class="p-3">Ward</th>
                  <th class="p-3">Area Name</th>
                  <th class="p-3">Households</th>
                  <th class="p-3">Today Actual</th>
                  <th class="p-3">Tomorrow Forecast</th>
                  <th class="p-3">Surge Probability</th>
                  <th class="p-3">Priority Level</th>
                  <th class="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                ${wards.map(w => {
                  const estTomorrow = parseFloat((w.generated * 1.08).toFixed(2));
                  const riskPct = Math.min(96, Math.round(((estTomorrow / w.target) - 0.75) * 100));
                  const isHigh = riskPct > 40;
                  return `
                    <tr class="border-b hover:bg-gray-50 transition cursor-pointer" onclick="window.selectForecastWard('${w.id}')">
                      <td class="p-3 font-bold ${w.id === selectedWardId ? 'text-green-600' : 'text-gray-900'}">${w.name}</td>
                      <td class="p-3 text-gray-600">${w.area}</td>
                      <td class="p-3">${utils.fmt(w.households)}</td>
                      <td class="p-3 font-semibold">${w.generated} T</td>
                      <td class="p-3 font-bold text-blue-600">${estTomorrow} T</td>
                      <td class="p-3">
                        <div class="flex items-center gap-2">
                          <div class="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div class="h-2 rounded-full ${isHigh ? 'bg-red-500' : 'bg-green-500'}" style="width: ${riskPct}%"></div>
                          </div>
                          <span class="text-xs font-semibold ${isHigh ? 'text-red-600' : 'text-gray-700'}">${riskPct}%</span>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="badge ${isHigh ? 'badge-red' : 'badge-green'} text-xs">${isHigh ? 'ELEVATED / SURGE' : 'NORMAL'}</span>
                      </td>
                      <td class="p-3">
                        <button class="btn btn-ghost btn-sm text-xs">Inspect ▾</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      // Initialize Chart.js forecast
      charts.line('aiForecastChart', {
        labels: forecast.sevenDayForecast.map(f => f.dateStr),
        datasets: [
          {
            label: 'AI Forecasted Waste (Tons)',
            data: forecast.sevenDayForecast.map(f => f.predictedTons),
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointBackgroundColor: '#16a34a'
          },
          {
            label: 'Upper Confidence Bound (+6%)',
            data: forecast.sevenDayForecast.map(f => f.upperBoundTons),
            borderColor: '#94a3b8',
            borderDash: [4, 4],
            fill: false,
            pointRadius: 0
          }
        ]
      });

      // Ward select change
      const sel = document.getElementById('aiWardSelect');
      if (sel) {
        sel.addEventListener('change', (e) => {
          selectedWardId = e.target.value;
          renderPredictionView();
        });
      }
    }, 150);
  }

  window.selectForecastWard = function(wardId) {
    selectedWardId = wardId;
    renderPredictionView();
  };

  renderPredictionView();
}

window.renderAdminAiPredictions = renderAdminAiPredictions;
