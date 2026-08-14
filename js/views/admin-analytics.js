function renderAdminAnalytics(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;
  const charts = window.EcoCharts;
  const totals = utils.getTodayTotals();

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-6">
        <h1 class="page-title text-2xl font-bold">Analytics & Reports</h1>
        <button class="btn btn-primary flex items-center gap-2" onclick="window.EcoUtils.toast('Report exported successfully')">
          ${utils.icon('download', 16)} Download Report
        </button>
      </div>

      <div class="flex gap-4 mb-6 border-b pb-2">
        <button class="font-bold text-blue-600 border-b-2 border-blue-600 px-2 py-1">Daily</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Weekly</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Monthly</button>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="card p-4 text-center bg-gray-50 border border-gray-200">
          <div class="text-gray-500 text-sm mb-1">Total Generated</div>
          <div class="text-2xl font-bold">${utils.fmtTons(totals.total)}</div>
        </div>
        <div class="card p-4 text-center bg-gray-50 border border-gray-200">
          <div class="text-gray-500 text-sm mb-1">Total Collected</div>
          <div class="text-2xl font-bold text-green-600">${utils.fmtTons(utils.getTodayCollected())}</div>
        </div>
        <div class="card p-4 text-center bg-gray-50 border border-gray-200">
          <div class="text-gray-500 text-sm mb-1">Recycled</div>
          <div class="text-2xl font-bold text-blue-600">${utils.fmtTons(totals.dry + totals.plastic)}</div>
        </div>
        <div class="card p-4 text-center bg-gray-50 border border-gray-200">
          <div class="text-gray-500 text-sm mb-1">Disposed</div>
          <div class="text-2xl font-bold text-gray-700">${utils.fmtTons(totals.other + totals.hazardous)}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="card p-4">
          <h3 class="card__title font-bold mb-4">Waste by Category</h3>
          <div style="height: 300px;"><canvas id="an-waste-cat"></canvas></div>
        </div>
        <div class="card p-4">
          <h3 class="card__title font-bold mb-4">Ward Comparison</h3>
          <div style="height: 300px;"><canvas id="an-ward-comp"></canvas></div>
        </div>
      </div>

      <div class="card p-4 mb-6">
        <h3 class="card__title font-bold mb-4">Weekly Trend</h3>
        <div style="height: 300px;"><canvas id="an-weekly"></canvas></div>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="card p-4">
          <h3 class="card__title font-bold mb-4">Collection Efficiency by Ward</h3>
          <div style="height: 300px;"><canvas id="an-ward-eff"></canvas></div>
        </div>
        <div class="card p-4 flex flex-col items-center">
          <h3 class="card__title font-bold mb-4 self-start">Processing vs Disposal</h3>
          <div style="height: 250px; width: 100%; max-width: 300px;"><canvas id="an-proc-disp"></canvas></div>
        </div>
      </div>

      <div class="card p-4">
        <h3 class="card__title font-bold mb-4">Summary Statistics (Aug 2026)</h3>
        <table class="w-full text-left text-sm border-collapse">
          <tbody>
            <tr class="border-b"><td class="p-2 font-medium">Total waste Aug 2026</td><td class="p-2 text-right">198 T</td></tr>
            <tr class="border-b"><td class="p-2 font-medium">Avg daily waste</td><td class="p-2 text-right">14.1 T</td></tr>
            <tr class="border-b"><td class="p-2 font-medium">Collection efficiency</td><td class="p-2 text-right">84.8%</td></tr>
            <tr class="border-b"><td class="p-2 font-medium">Recycling rate</td><td class="p-2 text-right">33.2%</td></tr>
            <tr class="border-b"><td class="p-2 font-medium">Composting</td><td class="p-2 text-right">28.1%</td></tr>
            <tr><td class="p-2 font-medium">Landfill disposal</td><td class="p-2 text-right">38.7%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => {
    charts.wasteBreakdown('an-waste-cat', totals);
    charts.bar('an-ward-comp', {
      labels: data.wards.map(w => w.name),
      datasets: [{
        label: 'Generated (T)',
        data: data.wards.map(w => w.generated),
        backgroundColor: '#94a3b8'
      }, {
        label: 'Collected (T)',
        data: data.wards.map(w => w.collected),
        backgroundColor: '#22c55e'
      }]
    });
    charts.weeklyTrend('an-weekly');
    charts.wardEfficiency('an-ward-eff');
    charts.donut('an-proc-disp', {
      labels: ['Recycled', 'Composted', 'Landfill'],
      data: [33.2, 28.1, 38.7],
      colors: ['#3b82f6', '#22c55e', '#64748b']
    });
  }, 100);
}

window.renderAdminAnalytics = renderAdminAnalytics;
