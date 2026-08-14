function renderAdminWorkers(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;

  const workers = data.workers;
  const rowsHtml = workers.map(w => {
    const pct = Math.round((w.todayCollected / w.todayTarget) * 100) || 0;
    return `
      <tr class="border-b hover:bg-gray-50 cursor-pointer hover-lift" onclick="window.EcoUtils.toast('Viewing worker profile: ${w.name}')">
        <td class="p-3 font-mono text-sm">${w.id}</td>
        <td class="p-3 font-bold">${w.name}</td>
        <td class="p-3">${w.ward}</td>
        <td class="p-3 text-sm text-gray-600">${w.area}</td>
        <td class="p-3">
          <div class="flex items-center gap-2">
            <div class="flex-1 progress-bar bg-gray-200 h-2 rounded-full overflow-hidden min-w-[100px]">
              <div class="progress-bar__fill h-full bg-blue-500" style="width: ${pct}%"></div>
            </div>
            <span class="text-xs text-gray-500">${pct}%</span>
          </div>
        </td>
        <td class="p-3">${utils.statusBadgeHTML(w.status)}</td>
        <td class="p-3">
          <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); window.EcoUtils.toast('Feature available in production version')">Reassign</button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-2xl font-bold">Worker Management</h1>
          <p class="text-gray-600">${workers.length} Workers • ${workers.filter(w=>w.status==='active').length} Active Today</p>
        </div>
        <button class="btn btn-primary flex items-center gap-2" onclick="window.EcoUtils.toast('Add Worker')">
          ${utils.icon('plus', 16)} Add Worker
        </button>
      </div>

      <div class="card p-0 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="p-3 text-sm">Worker ID</th>
              <th class="p-3 text-sm">Name</th>
              <th class="p-3 text-sm">Ward</th>
              <th class="p-3 text-sm">Area</th>
              <th class="p-3 text-sm">Today's Progress</th>
              <th class="p-3 text-sm">Status</th>
              <th class="p-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
}

window.renderAdminWorkers = renderAdminWorkers;
