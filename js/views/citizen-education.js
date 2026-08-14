function renderCitizenEducation(container) {
  const categories = [
    { id: 'wet', title: 'Wet/Organic Waste', emoji: '🟢', bg: 'bg-green-100', color: 'text-green-800', desc: 'Biodegradable waste primarily from kitchen and garden.', examples: ['Food scraps', 'Vegetable peels', 'Meat/bones', 'Tea leaves', 'Garden waste'], dos: ['Segregate in green bin', 'Drain excess liquids', 'Compost at home if possible'], donts: ['Do not mix with plastics', 'Do not dump in open drains'] },
    { id: 'dry', title: 'Dry/Recyclable Waste', emoji: '🔵', bg: 'bg-blue-100', color: 'text-blue-800', desc: 'Non-biodegradable but recyclable materials.', examples: ['Paper/Cardboard', 'Glass bottles', 'Metal cans', 'Clean plastics'], dos: ['Rinse containers before binning', 'Flatten cardboard boxes', 'Keep it dry'], donts: ['Do not soil with food waste', 'Do not include hazardous items'] },
    { id: 'plastic', title: 'Plastic Waste', emoji: '🟠', bg: 'bg-orange-100', color: 'text-orange-800', desc: 'Various forms of plastic packaging and items.', examples: ['Wrappers', 'Plastic bags', 'PET bottles', 'Containers'], dos: ['Check recycling symbols (1-7)', 'Rinse thoroughly', 'Hand over to authorized collectors'], donts: ['DO NOT burn plastic (toxic fumes)', 'Do not throw in water bodies'] },
    { id: 'hazardous', title: 'Domestic Hazardous', emoji: '🔴', bg: 'bg-red-100', color: 'text-red-800', desc: 'Household items containing toxic chemicals.', examples: ['Paint cans', 'Pesticides', 'Chemical cleaners', 'Mosquito repellents'], dos: ['Store in original containers', 'Hand over separately to collectors'], donts: ['Do not mix with regular garbage', 'Do not pour down the drain'] },
    { id: 'ewaste', title: 'E-Waste', emoji: '🟣', bg: 'bg-purple-100', color: 'text-purple-800', desc: 'Discarded electronic and electrical equipment.', examples: ['Old phones', 'Laptops', 'Chargers', 'Broken TVs', 'Cables'], dos: ['Use authorized e-waste centers', 'Follow E-Waste Rules 2022', 'Use OEM take-back schemes'], donts: ['Do not dismantle at home', 'Do not give to unregistered scrap dealers'] },
    { id: 'battery', title: 'Battery Waste', emoji: '🔋', bg: 'bg-amber-100', color: 'text-amber-800', desc: 'Household and rechargeable batteries.', examples: ['AA/AAA cells', 'Button cells', 'Lithium-ion batteries', 'Power banks'], dos: ['Tape terminals of old batteries', 'Drop at designated collection bins'], donts: ['Do not throw in regular trash', 'Do not puncture or burn'] },
    { id: 'cd', title: 'C&D Waste', emoji: '🏗️', bg: 'bg-slate-100', color: 'text-slate-800', desc: 'Construction and Demolition debris.', examples: ['Broken bricks', 'Concrete', 'Tiles', 'Plaster', 'Cement bags'], dos: ['Call municipality for bulk pickup', 'Send to designated C&D processing sites'], donts: ['Do not dump on roadsides or empty plots'] },
    { id: 'automotive', title: 'Automotive Waste', emoji: '🚗', bg: 'bg-gray-100', color: 'text-gray-800', desc: 'Waste from vehicle maintenance.', examples: ['Old tyres', 'Engine oil', 'Brake fluid', 'Auto parts'], dos: ['Return to authorized service centres', 'Give to registered scrap dealers'], donts: ['DO NOT burn tyres', 'Do not pour oil into soil or drains'] },
    { id: 'bio', title: 'Biomedical/Sanitary', emoji: '🏥', bg: 'bg-pink-100', color: 'text-pink-800', desc: 'Household medical and sanitary waste.', examples: ['Sanitary pads', 'Diapers', 'Bandages', 'Syringes', 'Medicines'], dos: ['Wrap securely in paper', 'Mark with a red cross if possible', 'Hand over separately'], donts: ['Do not flush down toilets', 'Do not mix with recyclables'] }
  ];

  container.innerHTML = `
    <div class="page-title mb-6">
      <h1 class="text-2xl font-bold">Waste Education Centre</h1>
      <p class="text-muted mt-2 max-w-3xl">Proper waste segregation is the first step towards a sustainable city. Learn how to classify and handle different types of waste to ensure they are recycled or disposed of safely.</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      ${categories.map(c => `<a href="#edu-${c.id}" class="badge ${c.bg} ${c.color} px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition">${c.emoji} ${c.title}</a>`).join('')}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 stagger-children">
      ${categories.map(c => `
        <div id="edu-${c.id}" class="edu-card card hover-lift border border-gray-200 cursor-pointer overflow-hidden transition-all duration-300">
          <div class="p-4 flex items-center gap-3 ${c.bg}">
            <span class="text-3xl">${c.emoji}</span>
            <h3 class="font-bold text-lg ${c.color}">${c.title}</h3>
            <span class="ml-auto expand-icon text-gray-500">${window.EcoUtils.icon('chevron_down')}</span>
          </div>
          <div class="edu-card-content p-4 hidden">
            <p class="text-sm text-gray-700 mb-4">${c.desc}</p>
            
            <div class="mb-4">
              <strong class="text-xs text-gray-500 uppercase tracking-wider block mb-2">Common Examples</strong>
              <div class="flex flex-wrap gap-1">
                ${c.examples.map(ex => `<span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">${ex}</span>`).join('')}
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <strong class="text-xs text-green-600 uppercase tracking-wider block mb-2 flex items-center gap-1">${window.EcoUtils.icon('check_circle', 14)} DO</strong>
                <ul class="text-sm text-gray-600 space-y-1">
                  ${c.dos.map(d => `<li class="flex items-start gap-1"><span class="text-green-500 mt-1">•</span><span>${d}</span></li>`).join('')}
                </ul>
              </div>
              <div>
                <strong class="text-xs text-red-600 uppercase tracking-wider block mb-2 flex items-center gap-1">${window.EcoUtils.icon('x_circle', 14)} DON'T</strong>
                <ul class="text-sm text-gray-600 space-y-1">
                  ${c.donts.map(d => `<li class="flex items-start gap-1"><span class="text-red-500 mt-1">•</span><span>${d}</span></li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card bg-blue-50 border-blue-200 p-6 text-center">
      <h3 class="text-xl font-bold text-blue-900 mb-2">Not sure where an item goes?</h3>
      <p class="text-blue-800 mb-4">Use our smart search tool to find the right disposal method for any specific item.</p>
      <button class="btn btn-primary bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('navigate', {detail:'citizen-whatgoeswhere'}))">Try 'What Goes Where?'</button>
    </div>
  `;

  // Bind click events to cards
  setTimeout(() => {
    document.querySelectorAll('.edu-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (e.target.closest('a')) return; // Ignore anchor clicks
        const content = this.querySelector('.edu-card-content');
        const icon = this.querySelector('.expand-icon');
        
        if (content.classList.contains('hidden')) {
          // Close all others
          document.querySelectorAll('.edu-card-content').forEach(c => c.classList.add('hidden'));
          document.querySelectorAll('.expand-icon').forEach(i => i.innerHTML = window.EcoUtils.icon('chevron_down'));
          
          // Open this one
          content.classList.remove('hidden');
          icon.innerHTML = window.EcoUtils.icon('chevron_up') || window.EcoUtils.icon('x');
        } else {
          content.classList.add('hidden');
          icon.innerHTML = window.EcoUtils.icon('chevron_down');
        }
      });
    });
  }, 50);
}
window.renderCitizenEducation = renderCitizenEducation;
