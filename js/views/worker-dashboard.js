function renderWorkerDashboard(container) {
  const worker = window.EcoData.workers.find(w => w.id === 'WK01');
  const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const ward = window.EcoUtils.getWard(worker.ward);
  
  const targetPct = (worker.todayCollected / worker.todayTarget) * 100;
  const remaining = Math.max(0, worker.todayTarget - worker.todayCollected);
  
  const pending = worker.totalHouseholds - worker.householdsCompleted;
  const missed = 2; // mock

  window.EcoCharts.destroyAll();

  container.innerHTML = `
    <div class="page-title mb-6">
      <h1 class="text-2xl font-bold">Good Morning, ${worker.name}</h1>
      <p class="text-muted">${dateStr} • Shift: ${worker.shift}</p>
    </div>

    <div class="grid grid-cols-12 gap-6 mb-6">
      <div class="col-span-8 card bg-green-50 border-green-200">
        <div class="card__body p-6 flex items-center justify-between">
          <div class="w-1/2">
            <h2 class="text-xl font-bold text-green-900 mb-1">Today's Collection Target</h2>
            <p class="text-green-700 mb-6">Ward: ${ward.name} | Area: ${worker.area}</p>
            
            <div class="flex gap-6 mb-2">
              <div>
                <p class="text-sm text-green-700 uppercase tracking-wide">Target</p>
                <p class="text-2xl font-bold text-green-900">${worker.todayTarget} <span class="text-sm font-normal">kg</span></p>
              </div>
              <div>
                <p class="text-sm text-green-700 uppercase tracking-wide">Collected</p>
                <p class="text-2xl font-bold text-green-900">${worker.todayCollected} <span class="text-sm font-normal">kg</span></p>
              </div>
              <div>
                <p class="text-sm text-red-600 uppercase tracking-wide">Remaining</p>
                <p class="text-2xl font-bold text-red-700">${remaining} <span class="text-sm font-normal">kg</span></p>
              </div>
            </div>
            
            <div class="big-progress-bar w-full h-4 bg-green-200 rounded-full overflow-hidden mt-4">
              <div class="big-progress-bar__fill h-full bg-green-600 transition-all duration-1000" style="width: 0%" id="targetBar"></div>
            </div>
            <p class="text-right text-sm text-green-800 font-bold mt-1" id="targetPctText">0% Complete</p>
          </div>
          
          <div class="w-1/3 bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h3 class="font-bold mb-2 text-gray-800 border-b pb-2">Duty Details</h3>
            <ul class="text-sm space-y-2 text-gray-600">
              <li class="flex justify-between"><span>Vehicle:</span> <strong>${worker.vehicleNo}</strong></li>
              <li class="flex justify-between"><span>Type:</span> <strong>${worker.vehicleType}</strong></li>
              <li class="flex justify-between"><span>Helper:</span> <strong>Raju</strong></li>
            </ul>
            <button class="btn btn-outline w-full mt-4 text-xs" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'worker-route'}))">View Route Map</button>
          </div>
        </div>
      </div>

      <div class="col-span-4 card">
        <div class="card__header p-4 border-b">
          <h2 class="card__title font-bold">Household Summary</h2>
        </div>
        <div class="card__body p-4 flex flex-col items-center">
          <div style="height: 160px; width: 100%; position: relative;">
            <canvas id="hhStatusChart"></canvas>
            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
              <span class="text-3xl font-bold text-gray-800">${worker.totalHouseholds}</span>
              <span class="text-xs text-gray-500 uppercase">Total</span>
            </div>
          </div>
          <button class="btn btn-primary w-full mt-4 bg-blue-600 text-white py-2 rounded" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'worker-households'}))">View All Households</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="card p-4 flex items-center gap-4 border-l-4 border-blue-500">
        <div class="p-3 bg-blue-100 text-blue-600 rounded-full">${window.EcoUtils.icon('home', 24)}</div>
        <div>
          <p class="text-sm text-muted">Households Covered</p>
          <p class="text-xl font-bold">${worker.householdsCompleted} / ${worker.totalHouseholds}</p>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-4 border-l-4 border-teal-500">
        <div class="p-3 bg-teal-100 text-teal-600 rounded-full">${window.EcoUtils.icon('map', 24)}</div>
        <div>
          <p class="text-sm text-muted">Distance Covered</p>
          <p class="text-xl font-bold">12.4 km</p>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-4 border-l-4 border-purple-500">
        <div class="p-3 bg-purple-100 text-purple-600 rounded-full">${window.EcoUtils.icon('calendar', 24)}</div>
        <div>
          <p class="text-sm text-muted">Hours Worked</p>
          <p class="text-xl font-bold">4.5 hrs</p>
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <div class="card__header p-4 border-b flex justify-between items-center bg-orange-50">
        <h2 class="card__title font-bold text-orange-900 flex items-center gap-2">${window.EcoUtils.icon('alert_circle')} Active Complaints in My Area</h2>
      </div>
      <div class="card__body p-0">
        <div class="divide-y divide-gray-100">
          <!-- Mock Complaints -->
          <div class="p-4 hover:bg-gray-50 flex justify-between items-center">
            <div>
              <span class="badge bg-red-100 text-red-800 mb-1 inline-block">High Priority</span>
              <h4 class="font-bold">Overflowing Public Bin</h4>
              <p class="text-sm text-gray-500">Park Road junction • Assigned to you</p>
            </div>
            <button class="btn btn-outline text-sm" onclick="alert('Viewing location')">View Details</button>
          </div>
          <div class="p-4 hover:bg-gray-50 flex justify-between items-center">
             <div>
              <span class="badge bg-amber-100 text-amber-800 mb-1 inline-block">Medium Priority</span>
              <h4 class="font-bold">Missed Collection Reported</h4>
              <p class="text-sm text-gray-500">H.No 12-3-456, Road No. 5</p>
            </div>
            <button class="btn btn-outline text-sm" onclick="alert('Viewing location')">View Details</button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.getElementById('targetBar').style.width = targetPct + '%';
    document.getElementById('targetPctText').textContent = Math.round(targetPct) + '% Complete';

    window.EcoCharts.donut('hhStatusChart', {
      labels: ['Collected', 'Pending', 'Missed'],
      data: [worker.householdsCompleted, pending, missed],
      colors: ['#22c55e', '#facc15', '#ef4444'],
      cutout: '75%'
    });
  }, 100);
}
window.renderWorkerDashboard = renderWorkerDashboard;
