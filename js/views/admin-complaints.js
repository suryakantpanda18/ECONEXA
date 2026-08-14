function renderAdminComplaints(container) {
  const data = window.EcoData;
  const utils = window.EcoUtils;

  const total = data.complaints.length;
  const counts = {
    submitted: data.complaints.filter(c => c.status === 'submitted').length,
    assigned: data.complaints.filter(c => c.status === 'assigned').length,
    in_progress: data.complaints.filter(c => c.status === 'in_progress').length,
    resolved: data.complaints.filter(c => c.status === 'resolved').length
  };

  const rows = data.complaints.map(c => `
    <tr class="border-b hover:bg-gray-50">
      <td class="p-3 font-mono text-xs">${c.id}</td>
      <td class="p-3">${utils.categoryLabel(c.category)}</td>
      <td class="p-3">${c.ward}</td>
      <td class="p-3 text-sm text-gray-600 truncate max-w-xs" title="${c.desc}">${c.desc}</td>
      <td class="p-3">${utils.priorityBadge(c.priority)}</td>
      <td class="p-3 text-sm">${c.location}</td>
      <td class="p-3 text-sm whitespace-nowrap">${utils.fmtDate(c.createdAt)}</td>
      <td class="p-3">${utils.statusBadgeHTML(c.status)}</td>
      <td class="p-3 flex gap-2">
        <button class="btn btn-sm btn-outline" onclick="window.EcoUtils.toast('Complaint #${c.id}: ${c.title}', 'info')">View</button>
        ${c.status === 'submitted' ? `<button class="btn btn-sm btn-primary" onclick="const comp = window.EcoData.complaints.find(x => x.id === '${c.id}'); if(comp) { comp.status = 'assigned'; comp.assignedTo = 'WK01'; } window.EcoUtils.toast('Complaint #${c.id} assigned to Worker WK01.', 'success'); window.renderAdminComplaints(document.getElementById('page-content'))">Assign</button>` : ''}
      </td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <h1 class="page-title text-2xl font-bold mb-6">Complaint Management</h1>

      <div class="grid grid-cols-5 gap-4 mb-6">
        <div class="card p-3 text-center">
          <div class="text-xl font-bold">${total}</div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">Total</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-yellow-400">
          <div class="text-xl font-bold">${counts.submitted}</div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">Submitted</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-blue-400">
          <div class="text-xl font-bold">${counts.assigned}</div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">Assigned</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-orange-400">
          <div class="text-xl font-bold">${counts.in_progress}</div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">In Progress</div>
        </div>
        <div class="card p-3 text-center border-b-4 border-green-400">
          <div class="text-xl font-bold">${counts.resolved}</div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">Resolved</div>
        </div>
      </div>

      <div class="card p-4">
        <div class="flex gap-4 mb-4">
          <select class="form-select border rounded p-2 text-sm w-40"><option>All Statuses</option></select>
          <select class="form-select border rounded p-2 text-sm w-40"><option>All Wards</option></select>
          <select class="form-select border rounded p-2 text-sm w-40"><option>All Categories</option></select>
          <input type="text" class="form-input border rounded p-2 text-sm flex-1" placeholder="Search complaints...">
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-3 text-sm">ID</th>
                <th class="p-3 text-sm">Category</th>
                <th class="p-3 text-sm">Ward</th>
                <th class="p-3 text-sm">Description</th>
                <th class="p-3 text-sm">Priority</th>
                <th class="p-3 text-sm">Location</th>
                <th class="p-3 text-sm">Date</th>
                <th class="p-3 text-sm">Status</th>
                <th class="p-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.renderAdminComplaints = renderAdminComplaints;
