function renderWorkerHouseholds(container) {
  const worker = window.EcoData.workers.find(w => w.id === 'WK01');
  const allHh = window.EcoData.households.filter(h => h.ward === worker.ward);
  
  let currentFilter = 'all';

  const renderStats = () => {
    const collected = allHh.filter(h => h.status === 'collected').length;
    const pending = allHh.filter(h => h.status === 'pending').length;
    const missed = allHh.filter(h => h.status === 'missed').length;
    return `
      <div class="flex gap-4">
        <span class="badge bg-green-100 text-green-800 text-base py-1 px-3"><strong>${collected}</strong> Collected</span>
        <span class="badge bg-yellow-100 text-yellow-800 text-base py-1 px-3"><strong>${pending}</strong> Pending</span>
        <span class="badge bg-red-100 text-red-800 text-base py-1 px-3"><strong>${missed}</strong> Missed</span>
      </div>
    `;
  };

  const renderList = (filter, searchQuery = '') => {
    let filtered = allHh;
    if (filter !== 'all') {
      filtered = filtered.filter(h => h.status === filter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(h => h.address.toLowerCase().includes(q) || h.owner.toLowerCase().includes(q) || h.id.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
      return `<div class="text-center p-8 text-gray-500">No households found.</div>`;
    }

    return filtered.map(h => {
      let actionBtns = '';
      let timeNote = '';

      if (h.status === 'pending') {
        actionBtns = `
          <button class="btn btn-sm bg-green-500 text-white hover:bg-green-600 rounded px-2 py-1" onclick="updateStatus('${h.id}', 'collected')">${window.EcoUtils.icon('check_circle', 14)} Collect</button>
          <button class="btn btn-sm bg-red-500 text-white hover:bg-red-600 rounded px-2 py-1" onclick="updateStatus('${h.id}', 'missed')">${window.EcoUtils.icon('x_circle', 14)} Miss</button>
          <button class="btn btn-sm bg-gray-200 text-gray-700 hover:bg-gray-300 rounded px-2 py-1" onclick="window.EcoUtils.toast('Issue reported', 'info')">Issue</button>
        `;
      } else {
        timeNote = `<span class="text-xs text-gray-400 block text-right mt-1">${h.status === 'collected' ? 'Collected at 08:30 AM' : 'Marked missed'}</span>`;
        actionBtns = `<button class="btn btn-sm btn-ghost text-blue-600 rounded px-2 py-1 text-xs" onclick="updateStatus('${h.id}', 'pending')">Undo</button>`;
      }

      // Small category bars
      const totalWaste = h.wet + h.dry + h.plastic;
      const wetPct = (h.wet/totalWaste)*100;
      const dryPct = (h.dry/totalWaste)*100;
      const plasPct = (h.plastic/totalWaste)*100;

      return `
        <div class="household-row flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono text-xs text-gray-500 bg-gray-100 px-1 rounded">${h.id}</span>
              <span class="font-bold">${h.address}</span>
            </div>
            <div class="text-sm text-gray-600 flex items-center gap-4">
              <span>${window.EcoUtils.icon('user', 14)} ${h.owner}</span>
              <span><strong>${h.qty.toFixed(1)} kg</strong> expected</span>
            </div>
            <div class="flex items-center gap-1 mt-2 w-48 h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="bg-green-500 h-full" style="width: ${wetPct}%" title="Wet: ${h.wet}kg"></div>
              <div class="bg-blue-500 h-full" style="width: ${dryPct}%" title="Dry: ${h.dry}kg"></div>
              <div class="bg-orange-500 h-full" style="width: ${plasPct}%" title="Plastic: ${h.plastic}kg"></div>
            </div>
          </div>
          
          <div class="w-32 flex justify-center">
            ${window.EcoUtils.statusBadgeHTML(h.status)}
          </div>

          <div class="w-48 text-right flex flex-col items-end gap-1">
             <div class="flex gap-1">${actionBtns}</div>
             ${timeNote}
          </div>
        </div>
      `;
    }).join('');
  };

  container.innerHTML = `
    <div class="page-title mb-6 flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold">Today's Household Collections</h1>
        <p class="text-muted">Ward ${worker.ward} • ${worker.area}</p>
      </div>
      <div id="hhStatsContainer">
        ${renderStats()}
      </div>
    </div>

    <div class="card">
      <div class="card__header p-4 border-b flex justify-between items-center bg-gray-50">
        <div class="flex gap-2" id="hhFilters">
          <button class="btn btn-sm btn-primary rounded" data-filter="all">All</button>
          <button class="btn btn-sm btn-outline rounded" data-filter="pending">Pending</button>
          <button class="btn btn-sm btn-outline rounded text-green-700" data-filter="collected">Collected</button>
          <button class="btn btn-sm btn-outline rounded text-red-700" data-filter="missed">Missed</button>
        </div>
        <div class="relative w-64">
          <input type="text" id="hhSearch" class="w-full pl-8 pr-3 py-1.5 border rounded text-sm" placeholder="Search address or ID...">
          <span class="absolute left-2 top-2 text-gray-400">${window.EcoUtils.icon('search', 14)}</span>
        </div>
      </div>
      <div class="card__body p-0" id="hhList">
        ${renderList('all')}
      </div>
    </div>
  `;

  window.updateStatus = (id, newStatus) => {
    const hh = allHh.find(h => h.id === id);
    if(hh) {
      hh.status = newStatus;
      window.EcoUtils.toast(`Household ${id} marked as ${newStatus}`, newStatus === 'collected' ? 'success' : (newStatus === 'missed' ? 'error' : 'info'));
      
      // Update stats and list
      document.getElementById('hhStatsContainer').innerHTML = renderStats();
      const q = document.getElementById('hhSearch').value;
      document.getElementById('hhList').innerHTML = renderList(currentFilter, q);
    }
  };

  setTimeout(() => {
    const filters = document.querySelectorAll('#hhFilters button');
    filters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filters.forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
        e.target.classList.add('btn-primary');
        e.target.classList.remove('btn-outline');
        currentFilter = e.target.dataset.filter;
        document.getElementById('hhList').innerHTML = renderList(currentFilter, document.getElementById('hhSearch').value);
      });
    });

    const searchInput = document.getElementById('hhSearch');
    searchInput.addEventListener('input', window.EcoUtils.debounce(() => {
      document.getElementById('hhList').innerHTML = renderList(currentFilter, searchInput.value);
    }, 300));
  }, 50);
}
window.renderWorkerHouseholds = renderWorkerHouseholds;
