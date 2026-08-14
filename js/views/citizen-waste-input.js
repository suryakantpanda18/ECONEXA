function renderCitizenWasteInput(container) {
  const history = window.EcoData.citizenWasteInputs.slice(0, 7);
  const categories = [
    { id: 'wet', name: 'Wet/Organic', emoji: '🟢', color: 'text-green-600' },
    { id: 'dry', name: 'Dry/Recyclable', emoji: '🔵', color: 'text-blue-600' },
    { id: 'plastic', name: 'Plastic', emoji: '🟠', color: 'text-orange-500' },
    { id: 'ewaste', name: 'E-Waste', emoji: '🟣', color: 'text-purple-500' },
    { id: 'hazardous', name: 'Hazardous/Other', emoji: '🔴', color: 'text-red-500' },
    { id: 'battery', name: 'Battery', emoji: '🔋', color: 'text-amber-500' }
  ];

  container.innerHTML = `
    <div class="page-title mb-6">
      <h1 class="text-2xl font-bold">My Waste Today</h1>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="card col-span-7">
        <div class="card__header p-4 border-b">
          <h2 class="card__title text-lg font-bold">Log Daily Waste</h2>
        </div>
        <div class="card__body p-4">
          <div class="form-group mb-4">
            <label class="form-label block mb-1 font-semibold text-sm">Date</label>
            <input type="date" id="cwDate" class="form-input w-full p-2 border rounded" value="${new Date().toISOString().split('T')[0]}">
          </div>
          
          <div class="waste-inputs stagger-children mb-6">
            ${categories.map(c => `
              <div class="form-group flex items-center gap-4 mb-3 p-2 hover:bg-gray-50 rounded">
                <input type="checkbox" id="chk_${c.id}" class="form-check" checked>
                <span class="text-xl w-6 text-center">${c.emoji}</span>
                <label for="chk_${c.id}" class="flex-1 font-medium ${c.color}">${c.name}</label>
                <div class="flex items-center gap-2">
                  <input type="number" id="qty_${c.id}" class="form-input w-24 p-1 border rounded text-right w-calc-input" step="0.1" min="0" value="0.0">
                  <span class="text-sm text-muted w-6">kg</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span class="font-bold text-lg">Total Waste:</span>
            <span class="font-bold text-2xl text-green-600" id="cwTotal">0.0 kg</span>
          </div>

          <button id="btnSubmitWaste" class="btn btn-primary w-full mt-6 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700">Save Entry</button>
        </div>
      </div>

      <div class="col-span-5 flex flex-col gap-6">
        <div class="card">
          <div class="card__header p-4 border-b">
            <h2 class="card__title text-lg font-bold">Weekly History</h2>
          </div>
          <div class="card__body p-0">
            <div class="table-wrapper">
              <table class="table w-full text-left text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-3 border-b">Date</th>
                    <th class="p-3 border-b">Wet (kg)</th>
                    <th class="p-3 border-b">Dry (kg)</th>
                    <th class="p-3 border-b font-bold text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${history.map(h => `
                    <tr class="border-b last:border-0 hover:bg-gray-50">
                      <td class="p-3">${window.EcoUtils.fmtDate(h.date)}</td>
                      <td class="p-3 text-green-600">${h.wet}</td>
                      <td class="p-3 text-blue-600">${h.dry}</td>
                      <td class="p-3 font-bold text-right">${window.EcoUtils.fmtKg(h.total)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card bg-green-50 border-green-200">
          <div class="card__body p-4">
            <h3 class="font-bold text-green-800 mb-2 flex items-center gap-2">${window.EcoUtils.icon('leaf')} Tips to Reduce Waste</h3>
            <ul class="list-disc pl-5 text-sm text-green-900 space-y-1">
              <li>Start composting your wet waste at home.</li>
              <li>Use reusable bags for grocery shopping.</li>
              <li>Avoid single-use plastics like straws and cups.</li>
              <li>Donate old clothes instead of throwing them away.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Events
  setTimeout(() => {
    const inputs = Array.from(document.querySelectorAll('.w-calc-input'));
    const totalEl = document.getElementById('cwTotal');

    const calcTotal = () => {
      let total = 0;
      inputs.forEach(input => {
        const val = parseFloat(input.value) || 0;
        const chk = document.getElementById('chk_' + input.id.replace('qty_', ''));
        if (chk && chk.checked) total += val;
      });
      totalEl.textContent = window.EcoUtils.fmtKg(total);
    };

    inputs.forEach(input => input.addEventListener('input', calcTotal));
    document.querySelectorAll('.form-check').forEach(chk => chk.addEventListener('change', calcTotal));

    document.getElementById('btnSubmitWaste').addEventListener('click', () => {
      window.EcoUtils.toast('Waste entry saved successfully!', 'success');
      // In a real app we'd update EcoData here
      setTimeout(() => {
        if(window.renderCitizenDashboard) {
           window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-dashboard'}));
        }
      }, 1000);
    });
  }, 50);
}
window.renderCitizenWasteInput = renderCitizenWasteInput;
