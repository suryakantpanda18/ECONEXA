function renderAdminFacilities(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;

  const allFacilities = [
    ...data.bins.map(b => ({ ...b, cat: 'bin' })),
    ...data.recyclingCenters.map(r => ({ ...r, cat: 'recycling' })),
    ...data.ewasteCenter.map(e => ({ ...e, cat: 'ewaste' })),
    ...data.processingFacilities.map(p => ({ ...p, cat: 'processing' })),
    ...data.disposalSites.map(d => ({ ...d, cat: 'disposal' }))
  ];

  const cardsHtml = allFacilities.map(f => `
    <div class="card p-4 hover-lift">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-lg">${f.name}</h4>
        ${utils.statusBadgeHTML(f.status)}
      </div>
      <div class="text-xs text-gray-500 uppercase font-bold tracking-wide mb-2">${f.cat}</div>
      <div class="text-sm text-gray-600 mb-2 flex items-center gap-1">
        ${utils.icon('pin', 14)} ${f.address || (f.lat + ', ' + f.lng)}
      </div>
      <div class="text-sm mb-2">Capacity: <strong>${f.capacity || 'N/A'}</strong></div>
      ${f.cat === 'bin' ? `
        <div class="mt-2">
          <div class="flex justify-between text-xs mb-1 text-gray-500"><span>Fill Level</span><span>${f.current}/${f.capacity}</span></div>
          <div class="progress-bar bg-gray-200 h-2 rounded-full overflow-hidden">
            <div class="progress-bar__fill h-full bg-${(f.current/f.capacity) > 0.8 ? 'red' : 'green'}-500" style="width: ${(f.current/f.capacity)*100}%"></div>
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-6">
        <h1 class="page-title text-2xl font-bold">Facility Management</h1>
        <button class="btn btn-primary flex items-center gap-2" onclick="window.EcoUtils.toast('Add Facility modal placeholder')">
          ${utils.icon('plus', 16)} Add Facility
        </button>
      </div>

      <div class="flex gap-4 mb-6 border-b pb-2 text-sm">
        <button class="font-bold text-blue-600 border-b-2 border-blue-600 px-2 py-1">All (${allFacilities.length})</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Bins (${data.bins.length})</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Recycling (${data.recyclingCenters.length})</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">E-Waste (${data.ewasteCenter.length})</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Processing (${data.processingFacilities.length})</button>
        <button class="text-gray-500 hover:text-gray-800 px-2 py-1">Disposal (${data.disposalSites.length})</button>
      </div>

      <div class="card p-0 mb-6 border overflow-hidden relative">
        <div id="facilities-map" style="height: 350px; width: 100%; background: #e5e7eb;"></div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.L) {
      const map = L.map('facilities-map').setView([17.45, 78.4], 11);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      allFacilities.forEach(f => {
        if (f.lat && f.lng) {
          const color = f.cat === 'bin' ? '#3b82f6' : f.cat === 'recycling' ? '#22c55e' : f.cat === 'ewaste' ? '#a855f7' : '#f59e0b';
          L.circleMarker([f.lat, f.lng], {
            radius: 8, fillColor: color, color: '#fff', weight: 1, fillOpacity: 0.9
          }).addTo(map).bindPopup(`<b>${f.name}</b><br>${f.cat}`);
        }
      });
    }
  }, 200);
}

window.renderAdminFacilities = renderAdminFacilities;
