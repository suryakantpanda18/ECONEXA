// ============================================================
// EcoNexa — Citizen Complaints View (with AI NLP Assistant)
// ============================================================

function renderCitizenComplaints(container) {
  const user = window.EcoData.users.find(u => u.id === 'U001') || { id: 'U001', ward: 'W01' };
  let myComplaints = window.EcoData.complaints.filter(c => c.citizenId === user.id);

  const stats = {
    total: myComplaints.length,
    inProgress: myComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
    resolved: myComplaints.filter(c => c.status === 'resolved').length
  };

  const renderList = () => {
    if (myComplaints.length === 0) {
      return `<div class="empty-state text-center p-8 bg-gray-50 rounded border text-gray-500">No complaints logged yet. Click 'Report New Issue' to start.</div>`;
    }
    return myComplaints.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c => `
      <div class="complaint-card card mb-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer" onclick="toggleComplaint('${c.id}')" style="box-shadow: var(--shadow-sm);">
        <div class="card__body p-4">
          <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-xs text-gray-500 font-bold">#${c.id}</span>
              <span class="badge bg-gray-100 text-gray-700 text-xs">${window.EcoUtils.categoryLabel(c.category)}</span>
              ${window.EcoUtils.priorityBadge(c.priority || c.aiPriority || 'MEDIUM')}
              ${c.aiDepartment ? `<span class="badge badge-outline text-[11px] text-blue-600 bg-blue-50 border-blue-200">🏛️ ${c.aiDepartment}</span>` : ''}
            </div>
            ${window.EcoUtils.statusBadgeHTML(c.status)}
          </div>

          <h3 class="font-bold text-base mb-1 text-gray-900">${c.title}</h3>
          <p class="text-gray-600 text-sm mb-3">${c.desc}</p>

          ${c.aiSummary ? `
            <div class="p-2.5 rounded-lg bg-green-50 border border-green-200 text-xs text-green-900 mb-3 flex items-start gap-2">
              <span class="text-green-600 font-bold">✨ AI Summary:</span>
              <span>${c.aiSummary}</span>
            </div>
          ` : ''}

          <div class="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span class="flex items-center gap-1">${window.EcoUtils.icon('pin', 14)} ${c.location}</span>
            <span class="flex items-center gap-1">${window.EcoUtils.icon('calendar', 14)} ${window.EcoUtils.fmtDateTime(c.createdAt)}</span>
            <span class="text-blue-600 font-semibold ml-auto">Click for Tracking Timeline ▾</span>
          </div>
          
          <div id="timeline-${c.id}" class="hidden mt-4 pt-4 border-t border-gray-100">
            <div class="timeline ml-2 border-l-2 border-gray-200 pl-4 space-y-4">
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-green-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-semibold text-gray-900">Complaint Submitted & AI Triaged</p>
                <p class="text-xs text-gray-500">${window.EcoUtils.fmtDateTime(c.createdAt)} • Priority: <strong>${c.priority || c.aiPriority || 'HIGH'}</strong></p>
              </div>
              ${['assigned','in_progress','resolved'].includes(c.status) ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-blue-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-semibold text-gray-900">Dispatched to Assigned Team</p>
                <p class="text-xs text-gray-500">${c.aiDepartment || 'Collection Fleet Operations'} (Assigned: ${c.assignedTo || 'Squad Leader'})</p>
              </div>` : ''}
              ${['in_progress','resolved'].includes(c.status) ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-orange-500">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-semibold text-gray-900">Sanitation Field Work in Progress</p>
              </div>` : ''}
              ${c.status === 'resolved' ? `
              <div class="timeline-item relative">
                <span class="absolute -left-[21px] bg-white p-0.5 rounded-full text-green-600">${window.EcoUtils.icon('check_circle', 14)}</span>
                <p class="text-sm font-semibold text-green-600">Issue Resolved & Verified</p>
                <p class="text-xs text-gray-500">${window.EcoUtils.fmtDateTime(c.updatedAt)}</p>
                ${c.resolutionNote ? `<p class="text-xs mt-1 bg-green-50 p-2 rounded border border-green-200 text-green-800">${c.resolutionNote}</p>` : ''}
              </div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  };

  container.innerHTML = `
    <div class="view-enter stagger-children">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div class="page-title">
          <div class="flex items-center gap-2">
            <span class="badge badge-green text-xs font-bold uppercase">✨ NLP AI Triaging Active</span>
          </div>
          <h1 class="text-2xl font-bold mt-1 flex items-center gap-2">
            ${window.EcoUtils.icon('alert_circle', 26)} My Complaints & Issue Reports
          </h1>
          <p class="text-muted">Report civic waste issues with instant AI priority classification and department routing.</p>
        </div>
        <button class="btn btn-primary flex items-center gap-2" id="btnReportIssue">
          ${window.EcoUtils.icon('plus', 18)} Report New Issue
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="card p-4 text-center border-b-4 border-blue-500">
          <div class="text-2xl font-bold text-gray-900">${stats.total}</div>
          <div class="text-xs text-muted mt-1 uppercase font-semibold">Total Submitted</div>
        </div>
        <div class="card p-4 text-center border-b-4 border-orange-500">
          <div class="text-2xl font-bold text-orange-600">${stats.inProgress}</div>
          <div class="text-xs text-muted mt-1 uppercase font-semibold">In Progress / Assigned</div>
        </div>
        <div class="card p-4 text-center border-b-4 border-green-500">
          <div class="text-2xl font-bold text-green-600">${stats.resolved}</div>
          <div class="text-xs text-muted mt-1 uppercase font-semibold">Resolved Successfully</div>
        </div>
      </div>

      <div class="max-w-4xl" id="complaintsList">
        ${renderList()}
      </div>
    </div>
  `;

  // Global toggle function
  window.toggleComplaint = (id) => {
    const el = document.getElementById('timeline-' + id);
    if(el) el.classList.toggle('hidden');
  };

  setTimeout(() => {
    const btnReport = document.getElementById('btnReportIssue');
    if (!btnReport) return;

    btnReport.addEventListener('click', () => {
      let latestAiAnalysis = {
        category: 'missed_collection',
        priority: 'MEDIUM',
        department: 'Collection Fleet Operations',
        summary: 'Standard civic waste grievance.',
        confidence: 90
      };

      const modalHtml = `
        <div class="bg-white p-6 rounded-xl w-[580px] max-w-full relative" style="max-height: 90vh; overflow-y: auto; font-family: 'Inter', sans-serif;">
          <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-800" onclick="window.EcoUtils.closeModal()">${window.EcoUtils.icon('x', 20)}</button>
          
          <div class="flex items-center gap-2 mb-1">
            <span class="badge badge-green text-xs font-bold uppercase">✨ NLP AI Engine</span>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-1">Report Civic Waste Issue</h2>
          <p class="text-xs text-muted mb-4">Describe the issue in plain English. AI will automatically determine urgency, priority level, and responsible municipal wing.</p>
          
          <div class="space-y-4">
            <div class="form-group">
              <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Issue Title</label>
              <input type="text" id="newCompTitle" class="form-input w-full p-2.5 border rounded-lg text-sm" placeholder="E.g., Garbage has not been collected for 3 days">
            </div>

            <div class="form-group">
              <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Detailed Description (AI Reads Live)</label>
              <textarea id="newCompDesc" class="form-textarea w-full p-2.5 border rounded-lg text-sm h-24" placeholder="Explain what happened, location landmarks, overflow condition, odor, or safety hazard..."></textarea>
            </div>

            <!-- Live AI Analysis Preview Box -->
            <div id="aiLiveAnalysisBox" class="p-3.5 rounded-lg border border-green-200 bg-green-50 transition">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-green-900 flex items-center gap-1.5">
                  ✨ Real-time AI NLP Classification:
                </span>
                <span id="aiLiveConfidence" class="text-[11px] font-bold text-green-700">95% Confidence</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs mb-2">
                <div><span class="text-gray-500">Predicted Category:</span> <strong id="aiLiveCategory" class="text-gray-900">Collection Failure</strong></div>
                <div><span class="text-gray-500">Urgency Priority:</span> <strong id="aiLivePriority" class="text-orange-600">HIGH</strong></div>
              </div>
              <div class="text-xs">
                <span class="text-gray-500">Responsible Wing:</span> <strong id="aiLiveDept" class="text-blue-700">Collection Fleet Operations</strong>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Location Landmark</label>
                <input type="text" id="newCompLoc" class="form-input w-full p-2.5 border rounded-lg text-sm" value="Road No. 12, Ward W01" placeholder="E.g., Near Park Junction">
              </div>
              <div class="form-group">
                <label class="form-label block mb-1 text-xs font-bold uppercase text-gray-700">Category Override (Optional)</label>
                <select id="newCompCat" class="form-select w-full p-2.5 border rounded-lg text-sm">
                  <option value="missed_collection">Collection Failure / Missed Route</option>
                  <option value="overflowing_bin">Overflowing Public Dustbin</option>
                  <option value="illegal_dumping">Illegal Dumping / Open Burning</option>
                  <option value="drainage_issue">Drainage & Waste Clogging</option>
                  <option value="hazardous_waste">Hazardous / Biomedical Waste</option>
                  <option value="damaged_bin">Damaged Bin Infrastructure</option>
                  <option value="other">Other General Issue</option>
                </select>
              </div>
            </div>

            <div class="form-group border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50" onclick="window.EcoUtils.toast('Attached photo evidence: site_photo.jpg', 'info'); document.getElementById('simUpload').textContent = '✓ site_photo.jpg attached';">
               ${window.EcoUtils.icon('camera', 20, 'mx-auto mb-1 text-gray-400')}
               <span class="text-xs text-gray-500">Click to attach photo evidence (Optional)</span>
               <div id="simUpload" class="text-xs text-green-600 mt-1 font-bold"></div>
            </div>
            
            <button id="btnSubmitNewIssue" class="btn btn-primary w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2">
              ${window.EcoUtils.icon('send', 18)} Submit Complaint with AI Triaging
            </button>
          </div>
        </div>
      `;
      window.EcoUtils.showModal(modalHtml);

      // Bind Real-time NLP Analyzer on text typing
      const titleInput = document.getElementById('newCompTitle');
      const descInput = document.getElementById('newCompDesc');
      const catSelect = document.getElementById('newCompCat');

      let debounceTimer = null;
      const updateNlpPreview = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          const combinedText = `${titleInput.value} ${descInput.value}`.trim();
          if (window.EcoAI && combinedText.length > 5) {
            const analysis = await window.EcoAI.analyzeComplaint(combinedText);
            latestAiAnalysis = analysis;
            
            const catEl = document.getElementById('aiLiveCategory');
            const prioEl = document.getElementById('aiLivePriority');
            const deptEl = document.getElementById('aiLiveDept');
            const confEl = document.getElementById('aiLiveConfidence');

            if (catEl) catEl.textContent = analysis.categoryLabel;
            if (prioEl) {
              prioEl.textContent = analysis.priority;
              prioEl.className = analysis.priority === 'CRITICAL' ? 'text-red-600 font-bold' : (analysis.priority === 'HIGH' ? 'text-orange-600 font-bold' : 'text-blue-600 font-bold');
            }
            if (deptEl) deptEl.textContent = analysis.department;
            if (confEl) confEl.textContent = `${analysis.confidence}% Confidence`;

            if (catSelect && analysis.category) {
              catSelect.value = analysis.category;
            }
          }
        }, 200);
      };

      if (titleInput) titleInput.addEventListener('input', updateNlpPreview);
      if (descInput) descInput.addEventListener('input', updateNlpPreview);

      // Submit handler
      document.getElementById('btnSubmitNewIssue').addEventListener('click', () => {
        const title = titleInput.value.trim();
        const desc = descInput.value.trim() || title;
        if(!title) { window.EcoUtils.toast('Please provide an issue title', 'error'); return; }
        
        const newComplaint = {
          id: window.EcoUtils.nextComplaintId ? window.EcoUtils.nextComplaintId() : 'C' + Math.floor(100 + Math.random()*900),
          citizenId: user.id,
          ward: user.ward || 'W01',
          category: catSelect.value,
          title: title,
          desc: desc,
          status: 'submitted',
          priority: latestAiAnalysis.priority || 'HIGH',
          aiCategory: catSelect.value,
          aiPriority: latestAiAnalysis.priority || 'HIGH',
          aiDepartment: latestAiAnalysis.department || 'Collection Fleet Operations',
          aiSummary: latestAiAnalysis.summary || 'Civic waste complaint submitted for resolution.',
          aiConfidence: latestAiAnalysis.confidence || 95,
          location: document.getElementById('newCompLoc').value || 'Ward W01 Area',
          createdAt: new Date().toISOString(),
          assignedTo: null,
          resolutionNote: null
        };
        
        window.EcoData.complaints.unshift(newComplaint);
        window.EcoUtils.toast(`Complaint submitted! Auto-assigned priority: ${newComplaint.priority}`, 'success', 3500);
        window.EcoUtils.closeModal();
        
        // Refresh view
        myComplaints = window.EcoData.complaints.filter(c => c.citizenId === user.id);
        document.getElementById('complaintsList').innerHTML = renderList();
      });
    });
  }, 50);
}

window.renderCitizenComplaints = renderCitizenComplaints;
