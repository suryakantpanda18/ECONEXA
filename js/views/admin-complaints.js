// ============================================================
// EcoNexa — Admin & Authority Complaint Management (AI-Powered)
// ============================================================

function renderAdminComplaints(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;

  let currentPriorityFilter = 'all';
  let currentStatusFilter = 'all';
  let currentCategoryFilter = 'all';
  let searchQuery = '';

  function getFilteredComplaints() {
    return data.complaints.filter(c => {
      const matchPrio = currentPriorityFilter === 'all' || (c.priority || c.aiPriority || '').toUpperCase() === currentPriorityFilter;
      const matchStatus = currentStatusFilter === 'all' || c.status === currentStatusFilter;
      const matchCat = currentCategoryFilter === 'all' || c.category === currentCategoryFilter;
      const matchSearch = !searchQuery || 
        (c.title || '').toLowerCase().includes(searchQuery) ||
        (c.desc || '').toLowerCase().includes(searchQuery) ||
        (c.aiSummary || '').toLowerCase().includes(searchQuery) ||
        (c.location || '').toLowerCase().includes(searchQuery) ||
        (c.id || '').toLowerCase().includes(searchQuery);

      return matchPrio && matchStatus && matchCat && matchSearch;
    });
  }

  function renderView() {
    const total = data.complaints.length;
    const criticalCount = data.complaints.filter(c => (c.priority || c.aiPriority || '').toUpperCase() === 'CRITICAL' || (c.priority || c.aiPriority || '').toUpperCase() === 'HIGH').length;
    const counts = {
      submitted: data.complaints.filter(c => c.status === 'submitted').length,
      assigned: data.complaints.filter(c => c.status === 'assigned').length,
      in_progress: data.complaints.filter(c => c.status === 'in_progress').length,
      resolved: data.complaints.filter(c => c.status === 'resolved').length
    };

    const filtered = getFilteredComplaints();

    const rows = filtered.map(c => {
      const prio = (c.priority || c.aiPriority || 'MEDIUM').toUpperCase();
      return `
        <tr class="border-b hover:bg-gray-50 transition">
          <td class="p-3 font-mono text-xs font-bold text-gray-800">#${c.id}</td>
          <td class="p-3">
            <span class="badge bg-gray-100 text-gray-800 text-xs font-semibold">${utils.categoryLabel(c.category)}</span>
          </td>
          <td class="p-3 font-semibold text-xs text-gray-700">${c.ward}</td>
          <td class="p-3 text-xs max-w-xs">
            <div class="font-bold text-gray-900 truncate mb-0.5" title="${c.title}">${c.title}</div>
            ${c.aiSummary ? `<div class="text-green-700 font-medium truncate" title="${c.aiSummary}">✨ AI: ${c.aiSummary}</div>` : `<div class="text-gray-500 truncate">${c.desc}</div>`}
          </td>
          <td class="p-3">${utils.priorityBadge(prio)}</td>
          <td class="p-3 text-xs font-medium text-blue-700">${c.aiDepartment || 'Collection Ops'}</td>
          <td class="p-3 text-xs text-gray-600 truncate max-w-[120px]" title="${c.location}">${c.location}</td>
          <td class="p-3">${utils.statusBadgeHTML(c.status)}</td>
          <td class="p-3">
            <div class="flex gap-1.5">
              <button class="btn btn-sm btn-outline text-xs px-2.5 py-1" onclick="window.viewComplaintDetails('${c.id}')">Inspect</button>
              ${c.status === 'submitted' ? `
                <button class="btn btn-sm btn-primary text-xs px-2.5 py-1 bg-green-600" onclick="window.assignComplaintToWorker('${c.id}')">
                  Assign
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="view-enter stagger-children">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="badge badge-green text-xs font-bold uppercase">✨ NLP AI Triaged Stream</span>
            </div>
            <h1 class="page-title text-2xl font-bold mt-1">Complaint Management & AI Grievance Triaging</h1>
            <p class="text-muted">Real-time civic waste complaints with automated priority escalation and department dispatch.</p>
          </div>

          <button class="btn btn-primary flex items-center gap-2" onclick="window.EcoUtils.toast('Complaint ledger exported as CSV!', 'success')">
            ${utils.icon('download', 18)} Export Complaints
          </button>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid grid-cols-5 gap-4 mb-6">
          <div class="card p-3.5 text-center border-b-4 border-gray-400">
            <div class="text-2xl font-bold text-gray-900">${total}</div>
            <div class="text-xs text-muted uppercase font-semibold">Total Complaints</div>
          </div>
          <div class="card p-3.5 text-center border-b-4 border-red-500">
            <div class="text-2xl font-bold text-red-600">${criticalCount}</div>
            <div class="text-xs text-muted uppercase font-semibold">High / Critical Urgency</div>
          </div>
          <div class="card p-3.5 text-center border-b-4 border-yellow-500">
            <div class="text-2xl font-bold text-yellow-600">${counts.submitted}</div>
            <div class="text-xs text-muted uppercase font-semibold">Awaiting Assignment</div>
          </div>
          <div class="card p-3.5 text-center border-b-4 border-blue-500">
            <div class="text-2xl font-bold text-blue-600">${counts.assigned + counts.in_progress}</div>
            <div class="text-xs text-muted uppercase font-semibold">In Progress</div>
          </div>
          <div class="card p-3.5 text-center border-b-4 border-green-500">
            <div class="text-2xl font-bold text-green-600">${counts.resolved}</div>
            <div class="text-xs text-muted uppercase font-semibold">Resolved (Avg SLA 14h)</div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="card p-4 mb-6" style="box-shadow: var(--shadow-sm);">
          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-3">
              <label class="block text-[11px] font-bold uppercase text-muted mb-1">Filter by AI Priority:</label>
              <select id="compPrioFilter" class="form-select w-full p-2 border rounded-lg text-xs font-semibold">
                <option value="all" ${currentPriorityFilter === 'all' ? 'selected' : ''}>All Priorities</option>
                <option value="CRITICAL" ${currentPriorityFilter === 'CRITICAL' ? 'selected' : ''}>🚨 CRITICAL Urgency</option>
                <option value="HIGH" ${currentPriorityFilter === 'HIGH' ? 'selected' : ''}>⚠️ HIGH Priority</option>
                <option value="MEDIUM" ${currentPriorityFilter === 'MEDIUM' ? 'selected' : ''}>🔵 MEDIUM Priority</option>
                <option value="LOW" ${currentPriorityFilter === 'LOW' ? 'selected' : ''}>🟢 LOW Priority</option>
              </select>
            </div>

            <div class="col-span-3">
              <label class="block text-[11px] font-bold uppercase text-muted mb-1">Filter by Status:</label>
              <select id="compStatusFilter" class="form-select w-full p-2 border rounded-lg text-xs">
                <option value="all" ${currentStatusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
                <option value="submitted" ${currentStatusFilter === 'submitted' ? 'selected' : ''}>Submitted</option>
                <option value="assigned" ${currentStatusFilter === 'assigned' ? 'selected' : ''}>Assigned</option>
                <option value="in_progress" ${currentStatusFilter === 'in_progress' ? 'selected' : ''}>In Progress</option>
                <option value="resolved" ${currentStatusFilter === 'resolved' ? 'selected' : ''}>Resolved</option>
              </select>
            </div>

            <div class="col-span-3">
              <label class="block text-[11px] font-bold uppercase text-muted mb-1">Category:</label>
              <select id="compCatFilter" class="form-select w-full p-2 border rounded-lg text-xs">
                <option value="all" ${currentCategoryFilter === 'all' ? 'selected' : ''}>All Categories</option>
                <option value="missed_collection" ${currentCategoryFilter === 'missed_collection' ? 'selected' : ''}>Missed Collection</option>
                <option value="overflowing_bin" ${currentCategoryFilter === 'overflowing_bin' ? 'selected' : ''}>Overflowing Bin</option>
                <option value="illegal_dumping" ${currentCategoryFilter === 'illegal_dumping' ? 'selected' : ''}>Illegal Dumping</option>
                <option value="damaged_bin" ${currentCategoryFilter === 'damaged_bin' ? 'selected' : ''}>Damaged Bin</option>
                <option value="hazardous_waste" ${currentCategoryFilter === 'hazardous_waste' ? 'selected' : ''}>Hazardous Waste</option>
              </select>
            </div>

            <div class="col-span-3">
              <label class="block text-[11px] font-bold uppercase text-muted mb-1">Search Keywords:</label>
              <input type="text" id="compSearchInput" class="form-input w-full p-2 border rounded-lg text-xs" 
                     placeholder="Search complaint, location, AI summary..." value="${searchQuery}" />
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="card p-0 overflow-hidden" style="box-shadow: var(--shadow-sm);">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-100 border-b text-xs uppercase text-muted">
                <tr>
                  <th class="p-3">ID</th>
                  <th class="p-3">Category</th>
                  <th class="p-3">Ward</th>
                  <th class="p-3">Title & AI Summary</th>
                  <th class="p-3">AI Priority</th>
                  <th class="p-3">Responsible Dept</th>
                  <th class="p-3">Location</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rows : `<tr><td colspan="9" class="p-8 text-center text-muted">No complaints match current search filters.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      // Event listeners
      const prioSel = document.getElementById('compPrioFilter');
      const statusSel = document.getElementById('compStatusFilter');
      const catSel = document.getElementById('compCatFilter');
      const searchInp = document.getElementById('compSearchInput');

      if (prioSel) prioSel.addEventListener('change', (e) => { currentPriorityFilter = e.target.value; renderView(); });
      if (statusSel) statusSel.addEventListener('change', (e) => { currentStatusFilter = e.target.value; renderView(); });
      if (catSel) catSel.addEventListener('change', (e) => { currentCategoryFilter = e.target.value; renderView(); });
      if (searchInp) searchInp.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); renderView(); });
    }, 50);
  }

  window.viewComplaintDetails = function(id) {
    const c = data.complaints.find(x => x.id === id);
    if (!c) return;

    const modalHtml = `
      <div class="bg-white p-6 rounded-xl w-[550px] max-w-full relative" style="font-family: 'Inter', sans-serif;">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-800" onclick="window.EcoUtils.closeModal()">${utils.icon('x', 20)}</button>
        
        <div class="flex items-center gap-2 mb-1">
          <span class="font-mono text-xs text-gray-500 font-bold">#${c.id}</span>
          ${utils.priorityBadge(c.priority || c.aiPriority || 'MEDIUM')}
          ${utils.statusBadgeHTML(c.status)}
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">${c.title}</h2>
        
        <div class="p-3.5 rounded-lg bg-green-50 border border-green-200 text-xs text-green-900 mb-4">
          <div class="font-bold mb-1 flex items-center gap-1.5">
            ✨ AI NLP Triaging Assessment:
          </div>
          <p class="mb-2 font-medium">${c.aiSummary || 'Civic waste grievance logged for action.'}</p>
          <div class="grid grid-cols-2 gap-2 text-green-800">
            <div><strong>Department:</strong> ${c.aiDepartment || 'Collection Fleet Operations'}</div>
            <div><strong>Confidence:</strong> ${c.aiConfidence || 95}%</div>
          </div>
        </div>

        <div class="space-y-2 text-xs text-gray-700 mb-4">
          <div class="p-2 rounded bg-gray-50 border"><strong class="text-gray-900">Original Citizen Report:</strong> ${c.desc}</div>
          <div class="flex justify-between p-2 rounded bg-gray-50 border"><span>Location:</span> <strong class="text-gray-900">${c.location}</strong></div>
          <div class="flex justify-between p-2 rounded bg-gray-50 border"><span>Ward:</span> <strong class="text-gray-900">${c.ward}</strong></div>
          <div class="flex justify-between p-2 rounded bg-gray-50 border"><span>Logged At:</span> <strong class="text-gray-900">${utils.fmtDateTime(c.createdAt)}</strong></div>
        </div>

        <div class="flex gap-2">
          ${c.status === 'submitted' ? `
            <button class="btn btn-primary w-full bg-green-600 text-white font-bold" onclick="window.assignComplaintToWorker('${c.id}'); window.EcoUtils.closeModal();">
              Assign to Sanitation Worker WK01
            </button>
          ` : `
            <button class="btn btn-outline w-full" onclick="window.EcoUtils.closeModal()">Close</button>
          `}
        </div>
      </div>
    `;
    utils.showModal(modalHtml);
  };

  window.assignComplaintToWorker = function(id) {
    const comp = data.complaints.find(x => x.id === id);
    if (comp) {
      comp.status = 'assigned';
      comp.assignedTo = 'WK01';
      comp.updatedAt = new Date().toISOString();
      utils.toast(`Complaint #${id} dispatched to Worker WK01 (${comp.aiDepartment || 'Collection Ops'})`, 'success', 3000);
      renderView();
    }
  };

  renderView();
}

window.renderAdminComplaints = renderAdminComplaints;
