function renderCitizenComplaints(container) {
  const user = window.EcoData.users.find(u => u.id === 'U001');
  let myComplaints = window.EcoData.complaints.filter(c => c.citizenId === user.id);

  const stats = {
    total: myComplaints.length,
    inProgress: myComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
    resolved: myComplaints.filter(c => c.status === 'resolved').length
  };

  const renderList = () => {
    if (myComplaints.length === 0) {
      return `<div class="empty-state text-center p-8 bg-gray-50 rounded border text-gray-500">No complaints found.</div>`;
    }
    return myComplaints.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c => `
      <div class="complaint-card card mb-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer" onclick="toggleComplaint('${c.id}')">
        <div class="card__body p-4">
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs text-gray-500">#${c.id}</span>
              <span class="badge bg-gray-100 text-gray-700">${window.EcoUtils.categoryLabel(c.category)}</span>
              ${window.EcoUtils.priorityBadge(c.priority)}
            </div>
            ${window.EcoUtils.statusBadgeHTML(c.status)}
          </div>
          <h3 class="font-bold text-lg mb-1">${c.title}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">${c.desc}</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span class="flex items-center gap-1">${window.EcoUtils.icon('pin', 14)} ${c.location}</span>
            <span class="flex items-center gap-1">${window.EcoUtils.icon('calendar', 14)} ${window.EcoUtils.fmtDateTime(c.createdAt)}</span>
          </div>
          
          <div id="timeline-${c.id}" class="hidden mt-4 pt-4 border-t border-gray-100">
            <div class="timeline ml-2 border-l-2 border-gray-200 pl-4 space-y-4">
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-gray-400">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-medium">Complaint Submitted</p>
                <p class="text-xs text-gray-500">${window.EcoUtils.fmtDateTime(c.createdAt)}</p>
              </div>
              ${['assigned','in_progress','resolved'].includes(c.status) ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-blue-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-medium">Assigned to Worker</p>
                <p class="text-xs text-gray-500">Worker ID: ${c.assignedTo}</p>
              </div>` : ''}
              ${['in_progress','resolved'].includes(c.status) ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-orange-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-medium">In Progress</p>
              </div>` : ''}
              ${c.status === 'resolved' ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-green-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-medium text-green-600">Resolved</p>
                <p class="text-xs text-gray-500">${window.EcoUtils.fmtDateTime(c.updatedAt)}</p>
                ${c.resolutionNote ? `<p class="text-sm mt-1 bg-green-50 p-2 rounded">${c.resolutionNote}</p>` : ''}
              </div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  };

  container.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <div class="page-title">
        <h1 class="text-2xl font-bold">My Complaints</h1>
        <p class="text-muted">Track and report issues in your locality</p>
      </div>
      <button class="btn btn-primary bg-blue-600 text-white flex items-center gap-2" id="btnReportIssue">
        ${window.EcoUtils.icon('plus')} Report New Issue
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold">${stats.total}</div>
        <div class="text-sm text-muted">Total Submitted</div>
      </div>
      <div class="card p-4 text-center border-l-4 border-l-orange-400">
        <div class="text-2xl font-bold text-orange-600">${stats.inProgress}</div>
        <div class="text-sm text-muted">In Progress</div>
      </div>
      <div class="card p-4 text-center border-l-4 border-l-green-400">
        <div class="text-2xl font-bold text-green-600">${stats.resolved}</div>
        <div class="text-sm text-muted">Resolved</div>
      </div>
    </div>

    <div class="max-w-3xl" id="complaintsList">
      ${renderList()}
    </div>
  `;

  // Global toggle function
  window.toggleComplaint = (id) => {
    const el = document.getElementById('timeline-' + id);
    if(el) el.classList.toggle('hidden');
  };

  setTimeout(() => {
    document.getElementById('btnReportIssue').addEventListener('click', () => {
      const modalHtml = `
        <div class="bg-white p-6 rounded-lg w-[500px] max-w-full relative">
          <button class="absolute top-4 right-4 text-gray-500 hover:text-black" onclick="window.EcoUtils.closeModal()">${window.EcoUtils.icon('x')}</button>
          <h2 class="text-xl font-bold mb-4">Report New Issue</h2>
          
          <div class="space-y-4">
            <div class="form-group">
              <label class="form-label block mb-1 text-sm font-bold">Category</label>
              <select id="newCompCat" class="form-select w-full p-2 border rounded">
                <option value="missed_collection">Missed Collection</option>
                <option value="overflowing_bin">Overflowing Public Bin</option>
                <option value="illegal_dumping">Illegal Dumping</option>
                <option value="damaged_bin">Damaged Bin</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label block mb-1 text-sm font-bold">Title</label>
              <input type="text" id="newCompTitle" class="form-input w-full p-2 border rounded" placeholder="Brief description">
            </div>
            
            <div class="form-group">
              <label class="form-label block mb-1 text-sm font-bold">Location</label>
              <input type="text" id="newCompLoc" class="form-input w-full p-2 border rounded" value="${user.ward} Area" placeholder="E.g., Near Park Rd">
            </div>
            
            <div class="form-group">
              <label class="form-label block mb-1 text-sm font-bold">Detailed Description</label>
              <textarea id="newCompDesc" class="form-textarea w-full p-2 border rounded h-24" placeholder="Provide details..."></textarea>
            </div>
            
            <div class="form-group border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50" onclick="alert('File picker simulation'); document.getElementById('simUpload').textContent = 'photo_evidence.jpg';">
               ${window.EcoUtils.icon('file_text', 24, 'mx-auto mb-2 text-gray-400')}
               <span class="text-sm text-gray-500">Click to attach photo (Optional)</span>
               <div id="simUpload" class="text-xs text-blue-600 mt-1 font-bold"></div>
            </div>
            
            <button id="btnSubmitNewIssue" class="btn btn-primary w-full bg-blue-600 text-white py-2 rounded font-bold">Submit Complaint</button>
          </div>
        </div>
      `;
      const overlay = window.EcoUtils.showModal(modalHtml);
      
      document.getElementById('btnSubmitNewIssue').addEventListener('click', () => {
        const title = document.getElementById('newCompTitle').value.trim();
        if(!title) { window.EcoUtils.toast('Title is required', 'error'); return; }
        
        const newComplaint = {
          id: window.EcoUtils.nextComplaintId(),
          citizenId: user.id,
          ward: user.ward,
          category: document.getElementById('newCompCat').value,
          title: title,
          desc: document.getElementById('newCompDesc').value,
          status: 'submitted',
          priority: 'medium',
          location: document.getElementById('newCompLoc').value,
          createdAt: new Date().toISOString()
        };
        
        window.EcoData.complaints.unshift(newComplaint);
        window.EcoUtils.toast('Complaint submitted successfully', 'success');
        window.EcoUtils.closeModal();
        
        // Refresh view
        myComplaints = window.EcoData.complaints.filter(c => c.citizenId === user.id);
        document.getElementById('complaintsList').innerHTML = renderList();
      });
    });
  }, 50);
}
window.renderCitizenComplaints = renderCitizenComplaints;
