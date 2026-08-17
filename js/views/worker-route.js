function renderWorkerRoute(container) {
  const worker = window.EcoData.workers.find(w => w.id === 'WK01');
  const routePoints = worker.routePoints;
  const bins = window.EcoData.bins.filter(b => b.ward === worker.ward);

  container.innerHTML = `
    <div class="page-title mb-6">
      <h1 class="text-2xl font-bold">My Collection Route</h1>
      <p class="text-muted">Ward ${worker.ward} • ${worker.area} • Vehicle: ${worker.vehicleNo}</p>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8 card overflow-hidden border-2 border-blue-100">
        <div id="routeMap" style="height: 500px; width: 100%; z-index: 1;"></div>
      </div>
      
      <div class="col-span-4 flex flex-col gap-6">
        <div class="card">
          <div class="card__header p-4 border-b bg-gray-50">
            <h2 class="card__title font-bold flex items-center gap-2">${window.EcoUtils.icon('map', 18)} Route Zones</h2>
          </div>
          <div class="card__body p-0">
            <div class="divide-y divide-gray-100">
              ${routePoints.map((pt, i) => `
                <div class="p-4 flex items-center gap-3 hover:bg-gray-50 transition">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200">${i+1}</div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${pt.name}</h4>
                    <p class="text-xs text-gray-500">Est. 45 households</p>
                  </div>
                  ${i === 0 ? `<span class="badge bg-green-100 text-green-800">Done</span>` : (i === 1 ? `<span class="badge bg-blue-100 text-blue-800 animate-pulse">Current</span>` : `<span class="badge bg-gray-100 text-gray-500">Pending</span>`)}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card__header p-4 border-b bg-gray-50">
            <h2 class="card__title font-bold flex items-center gap-2">${window.EcoUtils.icon('trash', 18)} Ward Bins</h2>
          </div>
          <div class="card__body p-0 max-h-[220px] overflow-y-auto">
             <div class="divide-y divide-gray-100">
              ${bins.map(b => {
                const isFull = b.status === 'full' || (b.current/b.capacity > 0.8);
                return `
                <div class="p-3 hover:bg-gray-50 transition flex justify-between items-center ${isFull ? 'bg-red-50' : ''}">
                  <div>
                    <h4 class="font-bold text-sm ${isFull ? 'text-red-700' : ''}">${b.name}</h4>
                    <p class="text-xs text-gray-500">${b.current} / ${b.capacity} kg</p>
                  </div>
                  <button class="btn btn-sm ${isFull ? 'bg-red-600 text-white hover:bg-red-700' : 'btn-outline text-xs'} rounded" onclick="window.EcoUtils.toast('Navigating to bin...', 'info')">Go</button>
                </div>
              `}).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (typeof L === 'undefined') return;

    // Centered on Ward 1 approx
    const map = L.map('routeMap').setView([17.415, 78.447], 15);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Draw Route Line
    const latlngs = routePoints.map(p => [p.lat, p.lng]);
    if (latlngs.length > 0) {
      L.polyline(latlngs, {color: '#3b82f6', weight: 4, dashArray: '10, 10'}).addTo(map);
      
      // Add numbered markers
      routePoints.forEach((p, i) => {
        const icon = L.divIcon({
          className: 'custom-route-marker',
          html: `<div style="background-color:#2563eb;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);">${i+1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        L.marker([p.lat, p.lng], {icon: icon}).bindPopup(p.name).addTo(map);
      });
    }

    // Add Households (simulate some dots around the route)
    const hhData = window.EcoData.households.filter(h => h.ward === worker.ward);
    hhData.forEach((h, i) => {
      // rough jitter around center
      const lat = 17.415 + (Math.random() - 0.5) * 0.01;
      const lng = 78.447 + (Math.random() - 0.5) * 0.01;
      
      let color = '#facc15'; // pending
      if (h.status === 'collected') color = '#22c55e';
      if (h.status === 'missed') color = '#ef4444';

      L.circleMarker([lat, lng], {
        radius: 4,
        fillColor: color,
        color: '#fff',
        weight: 1,
        fillOpacity: 0.9
      }).addTo(map).bindPopup(h.address);
    });

  }, 200);
}
window.renderWorkerRoute = renderWorkerRoute;
