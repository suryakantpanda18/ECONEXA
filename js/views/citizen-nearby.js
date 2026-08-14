function renderCitizenNearby(container) {
  const tabs = [
    { id: 'bins', name: '🗑️ Bins', data: window.EcoData.bins },
    { id: 'recycling', name: '♻️ Recycling', data: window.EcoData.recyclingCenters },
    { id: 'ewaste', name: '🟣 E-Waste', data: window.EcoData.ewasteCenter },
    { id: 'processing', name: '🏭 Processing', data: window.EcoData.processingFacilities }
  ];

  container.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <div class="page-title">
        <h1 class="text-2xl font-bold">Find Nearby Facilities</h1>
      </div>
      <div class="flex gap-2">
        <div class="relative w-64">
          <input type="text" class="w-full pl-8 pr-3 py-2 border rounded" placeholder="Enter location...">
          <span class="absolute left-2 top-2.5 text-gray-400">${window.EcoUtils.icon('search', 16)}</span>
        </div>
        <button id="btnUseLocation" class="btn btn-outline flex items-center gap-2">
          ${window.EcoUtils.icon('map')} Use My Location
        </button>
      </div>
    </div>

    <div class="border-b border-gray-200 mb-6 flex gap-6" id="nearbyTabs">
      ${tabs.map((t, i) => `
        <button class="pb-3 border-b-2 font-medium ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'} transition-colors" data-tab="${t.id}">${t.name}</button>
      `).join('')}
    </div>

    <div id="nearbyContent" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Content loads here -->
    </div>
  `;

  setTimeout(() => {
    const content = document.getElementById('nearbyContent');
    
    document.getElementById('btnUseLocation').addEventListener('click', () => {
      window.EcoUtils.toast('Location detected: Banjara Hills', 'success');
    });

    const renderData = (tabId) => {
      const tab = tabs.find(t => t.id === tabId);
      if(!tab) return;
      
      if(tab.data.length === 0) {
        content.innerHTML = `<div class="col-span-2 text-center p-8 text-gray-500">No facilities found.</div>`;
        return;
      }

      content.innerHTML = tab.data.map(item => {
        const typeBadge = item.type ? `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">${item.type}</span>` : '';
        const accepted = item.accepted ? `<div class="text-xs text-gray-500 mt-2"><strong>Accepts:</strong> ${item.accepted.join(', ')}</div>` : '';
        const phone = item.phone ? `<div class="text-xs text-gray-500 mt-1">${window.EcoUtils.icon('phone', 12)} ${item.phone}</div>` : '';
        // Mock distance
        const dist = (Math.random() * 5 + 0.5).toFixed(1);

        return `
          <div class="card p-4 border border-gray-200 hover:shadow-md transition appear">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-lg leading-tight w-3/4">${item.name}</h3>
              ${window.EcoUtils.statusBadgeHTML(item.status)}
            </div>
            ${typeBadge}
            <div class="mt-3 text-sm text-gray-600 flex items-start gap-2">
              <span class="mt-0.5">${window.EcoUtils.icon('pin', 14)}</span>
              <span>${item.address || (item.ward + ' Area')}<br><span class="text-blue-600 font-medium">${dist} km away</span></span>
            </div>
            ${phone}
            ${accepted}
            <div class="mt-4 pt-3 border-t border-gray-100">
              <button class="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1" onclick="window.EcoUtils.toast('Opening directions...', 'info')">
                ${window.EcoUtils.icon('map', 14)} Get Directions
              </button>
            </div>
          </div>
        `;
      }).join('');
    };

    // Tab switching
    const tabBtns = document.querySelectorAll('#nearbyTabs button');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => {
          b.classList.remove('border-blue-600', 'text-blue-600');
          b.classList.add('border-transparent', 'text-gray-500');
        });
        e.target.classList.add('border-blue-600', 'text-blue-600');
        e.target.classList.remove('border-transparent', 'text-gray-500');
        renderData(e.target.dataset.tab);
      });
    });

    // Initial render
    renderData('bins');

  }, 50);
}
window.renderCitizenNearby = renderCitizenNearby;
