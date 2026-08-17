// ============================================================
// EcoNexa — EcoMap (GIS Waste Management & AI Alert Overlay)
// ============================================================

function renderCitizenMap(container) {
  const data = window.EcoData;
  const states = data.states || {};
  let currentState = 'WB'; // Default to West Bengal for showcase or user preference

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div class="page-title">
          <div class="flex items-center gap-2">
            <span class="badge badge-green text-xs font-bold uppercase">✨ GIS Geospatial Intelligence</span>
          </div>
          <h1 class="text-2xl font-bold mt-1 flex items-center gap-2">
            ${window.EcoUtils.icon('map', 26)} EcoMap — Digital Waste Facility & AI Alert Map
          </h1>
          <p class="text-muted">Explore public bins, recycling hubs, e-waste drop-offs, landfills, and real-time AI-detected dumping alerts.</p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <label style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-muted);">Select Region / State:</label>
          <select id="stateSelect" class="form-select" style="min-width: 220px; font-weight: 600; padding: 8px 12px; border-radius: 8px;">
            <option value="WB" selected>📍 West Bengal (Kolkata / Howrah / Siliguri)</option>
            <option value="TS">📍 Telangana (Hyderabad / Secunderabad)</option>
            <option value="MH">📍 Maharashtra (Mumbai / Pune)</option>
            <option value="KA">📍 Karnataka (Bengaluru / Mysuru)</option>
            <option value="DL">📍 Delhi NCR (Delhi / NDMC)</option>
          </select>
        </div>
      </div>

      <!-- Filter Buttons Row -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2" id="mapFilters">
        <button class="btn btn-primary map-filter rounded-full px-4 text-xs font-semibold" data-filter="all">All Layers</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-semibold" data-filter="bins">🗑️ Public Bins</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-semibold" data-filter="recycling">♻️ Recycling Centres</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-semibold" data-filter="ewaste">🟣 E-Waste Hubs</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-semibold" data-filter="processing">🏭 Processing Plants</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-semibold" data-filter="disposal">🚮 Disposal Sites</button>
        <button class="btn btn-outline map-filter rounded-full px-4 text-xs font-bold text-amber-700 border-amber-300 bg-amber-50" data-filter="ai_alerts">
          🚨 AI Dumping Alerts (${data.illegalDumpingAlerts ? data.illegalDumpingAlerts.length : 0})
        </button>
      </div>

      <!-- Map Container -->
      <div class="card p-0 overflow-hidden relative border border-gray-200" style="box-shadow: var(--shadow-md);">
        <div id="ecoMap" style="height: 530px; width: 100%; z-index: 1;"></div>
        
        <!-- Interactive Map Legend -->
        <div class="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs z-[1000] opacity-95" style="background: var(--color-surface); color: var(--color-text);">
          <h4 class="font-bold mb-2 border-b pb-1">GIS Map Legend</h4>
          <div class="space-y-1.5">
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span> <span>Public Waste Bins</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> <span>Material Recovery / Recycling</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> <span>Authorized E-Waste Centers</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-teal-500 inline-block"></span> <span>Compost & Processing Plants</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> <span>Sanitary Landfills & TSDF</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block animate-pulse"></span> <strong class="text-amber-800">🚨 AI Illegal Dumping Alerts</strong></div>
          </div>
        </div>
      </div>

      <!-- Live Statistics Row -->
      <div class="grid grid-cols-6 gap-3 mt-4" id="facilityStatsGrid">
        <div class="card p-3 text-center border-b-4 border-green-500">
          <div class="text-xl font-bold text-green-600" id="statBins">0</div>
          <div class="text-[11px] text-muted mt-1 uppercase font-semibold">Public Bins</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-blue-500">
          <div class="text-xl font-bold text-blue-600" id="statRecycling">0</div>
          <div class="text-[11px] text-muted mt-1 uppercase font-semibold">Recycling Hubs</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-purple-500">
          <div class="text-xl font-bold text-purple-600" id="statEwaste">0</div>
          <div class="text-[11px] text-muted mt-1 uppercase font-semibold">E-Waste Points</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-teal-500">
          <div class="text-xl font-bold text-teal-600" id="statProcessing">0</div>
          <div class="text-[11px] text-muted mt-1 uppercase font-semibold">Processing Plants</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-red-500">
          <div class="text-xl font-bold text-red-600" id="statDisposal">0</div>
          <div class="text-[11px] text-muted mt-1 uppercase font-semibold">Disposal Sites</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-amber-500 bg-amber-50" style="background: var(--amber-50, #fffbeb);">
          <div class="text-xl font-bold text-amber-600" id="statAiAlerts">0</div>
          <div class="text-[11px] text-amber-900 mt-1 uppercase font-bold">🚨 AI Alerts</div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (typeof L === 'undefined') {
      window.EcoUtils.toast('Map library not loaded', 'error');
      return;
    }

    const stateInfo = states[currentState] || { center: [22.5726, 88.3639], zoom: 11 };
    const map = L.map('ecoMap').setView(stateInfo.center, stateInfo.zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    let allMarkers = [];
    let currentFilter = 'all';

    const createPopup = (title, type, status, stateLabel, details) => `
      <div style="padding: 6px; min-width: 220px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h4 style="font-weight: 700; font-size: 1rem; color: #1a2e1a; margin: 0;">${title}</h4>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">${type} • ${stateLabel}</span>
          ${window.EcoUtils.statusBadgeHTML(status)}
        </div>
        <div style="font-size: 0.8125rem; color: #374151; line-height: 1.4;">
          ${details}
        </div>
      </div>
    `;

    const populateMarkers = () => {
      layerGroup.clearLayers();
      allMarkers = [];

      const addMarkers = (dataList, color, typeStr, idPrefix, getDetails) => {
        dataList.forEach(item => {
          if (item.state && item.state !== currentState) return;

          const marker = L.circleMarker([item.lat, item.lng], {
            radius: 8,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
          });

          const stateName = states[item.state]?.name || 'Local Ward';
          marker.bindPopup(createPopup(item.name, typeStr, item.status || 'operational', stateName, getDetails(item)));
          marker.facilityType = idPrefix;
          allMarkers.push(marker);

          if (currentFilter === 'all' || currentFilter === idPrefix) {
            layerGroup.addLayer(marker);
          }
        });
      };

      // Add Standard Facilities
      addMarkers(data.bins, '#22c55e', 'Public Bin', 'bins', (i) => `<strong>Ward:</strong> ${i.ward}<br><strong>Capacity:</strong> ${i.capacity} kg (Current: ${i.current} kg)<br><strong>Type:</strong> ${i.type}`);
      addMarkers(data.recyclingCenters, '#3b82f6', 'Recycling Hub', 'recycling', (i) => `<strong>Address:</strong> ${i.address}<br><strong>Accepted:</strong> ${i.accepted?.join(', ')}<br><strong>Hours:</strong> ${i.hours}<br><strong>Phone:</strong> ${i.phone}`);
      addMarkers(data.ewasteCenter, '#a855f7', 'E-Waste Point', 'ewaste', (i) => `<strong>Address:</strong> ${i.address}<br><strong>Certification:</strong> ${i.certification || 'Authorized'}<br><strong>Hours:</strong> ${i.hours}`);
      addMarkers(data.processingFacilities, '#14b8a6', 'Processing Plant', 'processing', (i) => `<strong>Address:</strong> ${i.address}<br><strong>Type:</strong> ${i.type}<br><strong>Capacity:</strong> ${i.capacity}<br><strong>Operator:</strong> ${i.operator}`);
      addMarkers(data.disposalSites, '#ef4444', 'Disposal Site', 'disposal', (i) => `<strong>Address:</strong> ${i.address}<br><strong>Type:</strong> ${i.type}<br><strong>Capacity:</strong> ${i.capacity}<br><strong>Operator:</strong> ${i.operator}`);

      // Add AI Illegal Dumping Alerts (Glowing Amber/Red Markers)
      const dumpingAlerts = data.illegalDumpingAlerts || [];
      dumpingAlerts.forEach(alert => {
        const lat = alert.lat || (stateInfo.center[0] + (Math.random() - 0.5) * 0.15);
        const lng = alert.lng || (stateInfo.center[1] + (Math.random() - 0.5) * 0.15);

        const alertMarker = L.circleMarker([lat, lng], {
          radius: 12,
          fillColor: '#f59e0b',
          color: '#dc2626',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9
        });

        alertMarker.bindPopup(`
          <div style="padding: 6px; min-width: 240px; font-family: 'Inter', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 0.7rem; font-weight: 800; background: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 4px;">
                🚨 ${alert.alertId}
              </span>
              <span style="font-size: 0.75rem; font-weight: 700; color: #b45309;">${alert.confidence}% AI Confidence</span>
            </div>
            <h4 style="font-weight: 800; font-size: 0.95rem; color: #991b1b; margin: 4px 0;">Suspected Illegal Dumping</h4>
            <div style="font-size: 0.8rem; color: #374151; line-height: 1.4; margin-bottom: 6px;">
              <strong>Location:</strong> ${alert.location}<br>
              <strong>Severity:</strong> <span style="color:#dc2626; font-weight:bold;">${alert.severity}</span><br>
              <strong>Est. Volume:</strong> ${alert.estimatedVolume}<br>
              <strong>Debris:</strong> ${alert.detectedMaterials?.join(', ')}
            </div>
            <div style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 4px 8px; font-size: 0.75rem; color: #92400e; margin-bottom: 6px;">
              ${alert.alertStatus} • Reported by ${alert.reportedBy}
            </div>
          </div>
        `);
        alertMarker.facilityType = 'ai_alerts';
        allMarkers.push(alertMarker);

        if (currentFilter === 'all' || currentFilter === 'ai_alerts') {
          layerGroup.addLayer(alertMarker);
        }
      });

      // Update count statistics for current state
      const countFor = (prefix) => allMarkers.filter(m => m.facilityType === prefix).length;
      document.getElementById('statBins').textContent = countFor('bins');
      document.getElementById('statRecycling').textContent = countFor('recycling');
      document.getElementById('statEwaste').textContent = countFor('ewaste');
      document.getElementById('statProcessing').textContent = countFor('processing');
      document.getElementById('statDisposal').textContent = countFor('disposal');
      document.getElementById('statAiAlerts').textContent = countFor('ai_alerts');
    };

    populateMarkers();

    // State Selector Event
    const stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        currentState = e.target.value;
        const targetState = states[currentState] || { center: [22.5726, 88.3639], zoom: 11 };
        map.flyTo(targetState.center, targetState.zoom, { duration: 1.2 });
        populateMarkers();
        window.EcoUtils.toast(`Viewing GIS layers in ${targetState.name}`, 'info', 2000);
      });
    }

    // Category Filter Buttons
    const btns = document.querySelectorAll('.map-filter');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        btns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        e.currentTarget.classList.remove('btn-outline');
        e.currentTarget.classList.add('btn-primary');

        currentFilter = e.currentTarget.dataset.filter;
        layerGroup.clearLayers();
        allMarkers.forEach(m => {
          if (currentFilter === 'all' || m.facilityType === currentFilter) {
            layerGroup.addLayer(m);
          }
        });
      });
    });

  }, 150);
}

window.renderCitizenMap = renderCitizenMap;
