function renderAdminDashboard(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;
  const charts = window.EcoCharts;

  const todayTotals = utils.getTodayTotals();
  const collected = utils.getTodayCollected();
  const efficiency = utils.getTodayEfficiency();
  const openComplaints = data.complaints.filter(c => c.status !== 'resolved').length;
  const facilitiesCount = data.bins.length + data.recyclingCenters.length + data.ewasteCenter.length + data.processingFacilities.length + data.disposalSites.length;

  const todayDate = utils.fmtDate(new Date());

  const wardsHtml = data.wards.map(w => `
    <tr onclick="window.selectedWardId = '${w.id}'; if(window.EcoRouter) window.EcoRouter.navigate('#admin-ward-detail');" class="hover-lift cursor-pointer">
      <td><strong>${w.name}</strong><br><small class="text-gray-500">${w.area}</small></td>
      <td>${utils.fmtTons(w.generated)}</td>
      <td>${utils.fmtTons(w.collected)}</td>
      <td>${utils.fmtTons(w.target)}</td>
      <td>${utils.efficiencyBadge(w.efficiency)}</td>
      <td>${utils.statusBadgeHTML(w.efficiency >= 90 ? 'collected' : w.efficiency >= 75 ? 'pending' : 'missed')}</td>
    </tr>
  `).join('');

  const alertsHtml = data.notifications.admin.slice(0, 3).map(n => `
    <div class="notification-item flex gap-3 p-3 mb-2 bg-gray-50 rounded-lg">
      <div class="text-2xl">${n.icon}</div>
      <div>
        <div class="font-bold text-sm">${n.title}</div>
        <div class="text-xs text-gray-600">${n.body}</div>
        <div class="text-xs text-gray-400 mt-1">${n.time}</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="alert alert-info mb-4 bg-blue-50 text-blue-800 p-3 rounded-lg flex items-center gap-2">
        <span class="pulse-dot bg-blue-500 w-2 h-2 rounded-full inline-block"></span> 
        <span>Demo Data — Last updated: just now | 8 wards monitored</span>
      </div>

      <div class="section-header flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-2xl font-bold">${data.municipality.name}</h1>
          <p class="text-gray-600">${todayDate}</p>
        </div>
        <button class="btn btn-primary" onclick="window.EcoUtils.toast('Report downloading...')">${utils.icon('download', 18)} Download Report</button>
      </div>

      <div class="metrics-grid grid grid-cols-5 gap-4 mb-6">
        <div class="metric-card metric-card--amber card p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-amber-500">${utils.icon('trash', 20)}</span>
            <span class="metric-card__label text-sm text-gray-600">Total Waste Today</span>
          </div>
          <div class="metric-card__value text-2xl font-bold">${utils.fmtTons(todayTotals.total)}</div>
        </div>
        <div class="metric-card metric-card--green card p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-green-500">${utils.icon('target', 20)}</span>
            <span class="metric-card__label text-sm text-gray-600">Collection Efficiency</span>
          </div>
          <div class="metric-card__value text-2xl font-bold">${utils.fmtPct(efficiency)}</div>
        </div>
        <div class="metric-card metric-card--teal card p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-teal-500">${utils.icon('home', 20)}</span>
            <span class="metric-card__label text-sm text-gray-600">Households Covered</span>
          </div>
          <div class="metric-card__value text-2xl font-bold">${utils.fmt(data.municipality.households)}</div>
        </div>
        <div class="metric-card metric-card--red card p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-red-500">${utils.icon('alert_circle', 20)}</span>
            <span class="metric-card__label text-sm text-gray-600">Open Complaints</span>
          </div>
          <div class="metric-card__value text-2xl font-bold">${openComplaints}</div>
        </div>
        <div class="metric-card metric-card--blue card p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-blue-500">${utils.icon('factory', 20)}</span>
            <span class="metric-card__label text-sm text-gray-600">Mapped Facilities</span>
          </div>
          <div class="metric-card__value text-2xl font-bold">${facilitiesCount}</div>
        </div>
      </div>

      <div class="layout-8-4 grid grid-cols-12 gap-6 mb-6">
        <div class="col-span-8 card">
          <div class="card__header p-4 border-b">
            <h3 class="card__title font-bold">Ward-wise Overview</h3>
          </div>
          <div class="card__body p-0">
            <div class="table-wrapper">
              <table class="table table--clickable w-full text-left">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th class="p-3">Ward & Area</th>
                    <th class="p-3">Generated</th>
                    <th class="p-3">Collected</th>
                    <th class="p-3">Target</th>
                    <th class="p-3">Efficiency</th>
                    <th class="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>${wardsHtml}</tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="col-span-4 flex flex-col gap-6">
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Waste Breakdown</h3>
            <div style="height: 200px;"><canvas id="ad-chart-waste"></canvas></div>
          </div>
          <div class="card p-4">
            <h3 class="card__title font-bold mb-4">Collection Status</h3>
            <div style="height: 200px;"><canvas id="ad-chart-status"></canvas></div>
          </div>
        </div>
      </div>

      <div class="layout-8-4 grid grid-cols-12 gap-6">
        <div class="col-span-8 card p-4">
          <h3 class="card__title font-bold mb-4">Weekly Trend</h3>
          <div style="height: 250px;"><canvas id="ad-chart-trend"></canvas></div>
        </div>
        <div class="col-span-4 card p-4">
          <h3 class="card__title font-bold mb-4">Recent Alerts</h3>
          <div class="flex flex-col gap-2">${alertsHtml}</div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    charts.wasteBreakdown('ad-chart-waste', todayTotals);
    charts.donut('ad-chart-status', {
      labels: ['Collected', 'Uncollected'],
      data: [collected, todayTotals.total - collected],
      colors: ['#22c55e', '#ef4444']
    });
    charts.weeklyTrend('ad-chart-trend');
  }, 100);
}

window.renderAdminDashboard = renderAdminDashboard;
