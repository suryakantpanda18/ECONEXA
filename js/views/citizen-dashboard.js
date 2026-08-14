function renderCitizenDashboard(container) {
  const user = window.EcoData.users.find(u => u.id === 'U001');
  const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const todayInput = window.EcoData.citizenWasteInputs[0];
  const todayWaste = todayInput.total;
  const household = window.EcoData.households.find(h => h.id === user.householdId);
  const myComplaints = window.EcoData.complaints.filter(c => c.citizenId === user.id && c.status !== 'resolved').length;
  const ward = window.EcoUtils.getWard(user.ward);
  const schedule = window.EcoData.collectionSchedule[user.ward];
  const notifs = window.EcoData.notifications.citizen.slice(0, 3);

  window.EcoCharts.destroyAll();

  container.innerHTML = `
    <div class="page-title mb-6 appear">
      <h1 class="text-2xl font-bold">Hello, ${user.name}! 👋</h1>
      <p class="text-muted">Today is ${dateStr}</p>
    </div>

    <div class="metrics-grid grid grid-cols-4 gap-4 mb-6 stagger-children">
      <div class="metric-card metric-card--green card hover-lift p-4">
        <div class="metric-card__label text-sm text-muted">Today's Waste</div>
        <div class="metric-card__value text-2xl font-bold">${window.EcoUtils.fmtKg(todayWaste)}</div>
        <div class="metric-card__icon mt-2 text-green-600">${window.EcoUtils.icon('trash')}</div>
      </div>
      <div class="metric-card metric-card--blue card hover-lift p-4">
        <div class="metric-card__label text-sm text-muted">Collection Status</div>
        <div class="metric-card__value mt-2">${window.EcoUtils.statusBadgeHTML(household.status)}</div>
        <div class="metric-card__icon mt-2 text-blue-600">${window.EcoUtils.icon('truck')}</div>
      </div>
      <div class="metric-card metric-card--amber card hover-lift p-4">
        <div class="metric-card__label text-sm text-muted">Open Complaints</div>
        <div class="metric-card__value text-2xl font-bold">${myComplaints}</div>
        <div class="metric-card__icon mt-2 text-amber-600">${window.EcoUtils.icon('alert_circle')}</div>
      </div>
      <div class="metric-card metric-card--teal card hover-lift p-4">
        <div class="metric-card__label text-sm text-muted">Next Collection</div>
        <div class="metric-card__value text-lg font-bold mt-1">${schedule.nextCollection.split(' ')[0]}</div>
        <div class="metric-card__icon mt-2 text-teal-600">${window.EcoUtils.icon('calendar')}</div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mb-6">
      <div class="card col-span-8 appear">
        <div class="card__header p-4 border-b">
          <h2 class="card__title text-lg font-bold">My Waste Today</h2>
        </div>
        <div class="card__body p-4" style="height: 300px;">
           <canvas id="citWasteChart"></canvas>
        </div>
      </div>
      
      <div class="card col-span-4 appear">
        <div class="card__header p-4 border-b">
          <h2 class="card__title text-lg font-bold">Collection Schedule</h2>
        </div>
        <div class="card__body p-4">
           <p class="mb-2"><strong>Ward:</strong> ${ward.name}</p>
           <p class="mb-2"><strong>Days:</strong> ${schedule.days.join(', ')}</p>
           <p class="mb-4"><strong>Time:</strong> ${schedule.time}</p>
           <h3 class="font-bold mb-2">Next 3 Collections:</h3>
           <ul class="list-disc pl-5">
             <li>${schedule.nextCollection}</li>
             <li>${schedule.days[1] || 'Upcoming'}</li>
             <li>${schedule.days[2] || 'Upcoming'}</li>
           </ul>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mb-6">
       <div class="card col-span-8 appear">
        <div class="card__header p-4 border-b"><h2 class="card__title text-lg font-bold">Quick Actions</h2></div>
        <div class="card__body p-4 flex gap-4 flex-wrap">
          <button class="btn btn-primary px-4 py-2 rounded bg-green-600 text-white" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-waste-input'}))">Log Waste</button>
          <button class="btn btn-secondary px-4 py-2 rounded bg-blue-600 text-white" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-complaints'}))">Report Issue</button>
          <button class="btn btn-outline px-4 py-2 rounded border border-gray-300" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-nearby'}))">Find Nearby</button>
          <button class="btn btn-ghost px-4 py-2 rounded text-green-700" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-education'}))">Learn About Waste</button>
        </div>
      </div>
      <div class="card col-span-4 appear">
        <div class="card__header p-4 border-b"><h2 class="card__title text-lg font-bold">Recent Notifications</h2></div>
        <div class="card__body p-4">
          ${notifs.map(n => `
             <div class="notification-item flex gap-3 mb-3 pb-3 border-b last:border-0 last:mb-0 last:pb-0">
               <span class="text-xl">${n.icon}</span>
               <div>
                 <strong class="block text-sm">${n.title}</strong>
                 <p class="text-xs text-muted mt-1">${n.body}</p>
               </div>
             </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="card appear mb-6">
       <div class="card__header p-4 border-b"><h2 class="card__title text-lg font-bold">${ward.name} Statistics</h2></div>
       <div class="card__body p-4 flex gap-8">
         <div>
           <p class="text-muted text-sm">Ward Total Waste Today</p>
           <p class="text-xl font-bold">${window.EcoUtils.fmtTons(ward.generated)}</p>
         </div>
         <div>
           <p class="text-muted text-sm">Collection Efficiency</p>
           <div class="mt-1">${window.EcoUtils.efficiencyBadge(ward.efficiency)}</div>
         </div>
       </div>
    </div>
  `;

  setTimeout(() => {
    window.EcoCharts.bar('citWasteChart', {
      labels: ['Wet/Organic 🟢', 'Dry/Recyclable 🔵', 'Plastic 🟠', 'E-Waste 🟣', 'Hazardous 🔴', 'Other'],
      datasets: [{
        label: 'Quantity (kg)',
        data: [todayInput.wet, todayInput.dry, todayInput.plastic, todayInput.ewaste, todayInput.hazardous, todayInput.other],
        backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#a855f7', '#ef4444', '#6b7280']
      }],
      title: 'My Waste Breakdown'
    });
  }, 100);
}
window.renderCitizenDashboard = renderCitizenDashboard;
