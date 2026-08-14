function renderCitizenWhatGoesWhere(container) {
  const itemsDb = window.EcoData ? window.EcoData.wasteItems : [];
  const quickSearch = ['Banana peel', 'Old phone', 'Newspaper', 'Plastic bottle', 'Used Battery', 'Broken glass', 'Paint container', 'Cardboard box', 'Vegetable scraps', 'Laptop charger'];

  container.innerHTML = `
    <div class="page-title mb-6 text-center max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">Where Should I Put This?</h1>
      <p class="text-muted">Instant waste classifier — search any household item to find the right disposal stream and nearest facility.</p>
    </div>

    <div class="max-w-2xl mx-auto mb-8">
      <div style="position: relative; display: flex; align-items: center; width: 100%;">
        <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--color-primary, #16a34a); display: flex; align-items: center; justify-content: center; z-index: 2;">
          ${window.EcoUtils.icon('search', 22)}
        </div>
        <input 
          type="text" 
          id="wgwSearchInput" 
          style="width: 100%; padding: 16px 16px 16px 50px; font-size: 1.1rem; border-radius: 14px; border: 2px solid var(--green-300, #86efac); background: var(--color-surface, #ffffff); color: var(--color-text, #1a2e1a); box-shadow: 0 4px 12px rgba(0,0,0,0.05); outline: none; transition: border-color 0.2s;"
          placeholder="Search: banana peel, old phone, newspaper, battery..."
          autocomplete="off"
        >
      </div>
      
      <div class="mt-4 flex flex-wrap gap-2 justify-center" id="wgwChips">
        ${quickSearch.map(q => `
          <button class="wgw-chip badge badge-gray" style="cursor: pointer; padding: 6px 14px; font-size: 0.85rem; border-radius: 9999px; transition: all 0.2s; border: 1px solid var(--color-border, #e2e8e0);">
            ${q}
          </button>
        `).join('')}
      </div>
    </div>

    <div id="wgwResultContainer" class="max-w-2xl mx-auto min-h-[280px]">
      <div class="text-center text-gray-400 pt-8 appear">
        <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.7;">🔍</div>
        <p style="font-size: 1rem; color: var(--color-text-muted, #7a9a7a);">Type an item name above or click any suggested item</p>
      </div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('wgwSearchInput');
    const resultContainer = document.getElementById('wgwResultContainer');

    if (!input || !resultContainer) return;

    input.focus();

    // Focus outline effect
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--color-primary, #16a34a)';
      input.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.2)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = 'var(--green-300, #86efac)';
      input.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
    });

    const categoryTheme = {
      wet:       { bg: '#dcfce7', text: '#14532d', border: '#86efac', titleBg: '#f0fdf4' },
      dry:       { bg: '#dbeafe', text: '#1e3a8a', border: '#93c5fd', titleBg: '#eff6ff' },
      plastic:   { bg: '#ffedd5', text: '#7c2d12', border: '#fdba74', titleBg: '#fff7ed' },
      ewaste:    { bg: '#f3e8ff', text: '#581c87', border: '#d8b4fe', titleBg: '#faf5ff' },
      hazardous: { bg: '#fee2e2', text: '#7f1d1d', border: '#fca5a5', titleBg: '#fef2f2' },
      battery:   { bg: '#fef3c7', text: '#78350f', border: '#fcd34d', titleBg: '#fffbeb' },
      cd:        { bg: '#f1f5f9', text: '#1e293b', border: '#cbd5e1', titleBg: '#f8fafc' },
      automotive:{ bg: '#f3f4f6', text: '#1f2937', border: '#d1d5db', titleBg: '#f9fafb' },
      bio:       { bg: '#fce7f3', text: '#831843', border: '#f9a8d4', titleBg: '#fdf2f8' }
    };

    const renderResult = (item, matchedKeyword) => {
      const theme = categoryTheme[item.category] || categoryTheme.wet;
      let actionHtml = '';

      if (item.category === 'ewaste') {
        actionHtml = `
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--color-border, #e2e8e0);">
            <div style="display: flex; gap: 10px; align-items: center;">
              <button class="btn btn-primary" style="flex: 1; background: #9333ea; border-color: #9333ea;" onclick="EcoRouter.navigate('#citizen-nearby')">
                ${window.EcoUtils.icon('pin', 16)} Find Nearest E-Waste Centre
              </button>
              <button class="btn btn-outline" onclick="EcoRouter.navigate('#citizen-education')">
                ${window.EcoUtils.icon('book', 16)} E-Waste Rules 2022
              </button>
            </div>
          </div>`;
      } else if (item.category === 'hazardous' || item.category === 'battery') {
        actionHtml = `
          <div style="margin-top: 20px; padding: 14px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 10px; display: flex; gap: 10px; align-items: center;">
            <span style="color: #ef4444; font-size: 1.25rem;">⚠️</span>
            <div style="font-size: 0.875rem;">
              <strong>Special Handling Required:</strong> Do NOT mix with ordinary household trash. Contact municipality or use designated drop-off bins.
            </div>
          </div>`;
      } else {
        actionHtml = `
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--color-border, #e2e8e0); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.875rem; color: var(--color-text-muted);">Need more details?</span>
            <button class="btn btn-ghost btn-sm text-green-700" onclick="EcoRouter.navigate('#citizen-education')">
              Learn full segregation rules →
            </button>
          </div>`;
      }

      return `
        <div class="card overflow-hidden appear" style="border: 2px solid ${theme.border}; box-shadow: var(--shadow-lg);">
          <div style="padding: 24px; text-align: center; background: ${theme.bg}; border-bottom: 1px solid ${theme.border};">
            <div style="font-size: 3.5rem; margin-bottom: 8px;">${item.emoji}</div>
            <span class="badge" style="background: ${theme.text}; color: #ffffff; font-size: 0.85rem; padding: 4px 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
              ${item.label}
            </span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: ${theme.text}; margin-top: 4px;">
              ${matchedKeyword ? `"${window.EcoUtils.capitalize(matchedKeyword)}"` : item.label}
            </h2>
          </div>

          <div style="padding: 24px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: rgba(34, 197, 94, 0.05); padding: 16px; border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <h3 style="font-weight: 700; color: #16a34a; display: flex; align-items: center; gap: 6px; margin-bottom: 12px; font-size: 0.95rem;">
                  ${window.EcoUtils.icon('check_circle', 18)} WHAT TO DO
                </h3>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                  ${item.dos.map(d => `
                    <li style="font-size: 0.875rem; display: flex; gap: 8px; align-items: flex-start;">
                      <span style="color: #22c55e; font-weight: bold;">✓</span>
                      <span>${d}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div style="background: rgba(239, 68, 68, 0.05); padding: 16px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.2);">
                <h3 style="font-weight: 700; color: #dc2626; display: flex; align-items: center; gap: 6px; margin-bottom: 12px; font-size: 0.95rem;">
                  ${window.EcoUtils.icon('x_circle', 18)} WHAT NOT TO DO
                </h3>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                  ${item.donts.map(d => `
                    <li style="font-size: 0.875rem; display: flex; gap: 8px; align-items: flex-start;">
                      <span style="color: #ef4444; font-weight: bold;">✕</span>
                      <span>${d}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            ${actionHtml}
          </div>
        </div>
      `;
    };

    const renderNotFound = (query) => {
      return `
        <div class="card text-center p-8 appear">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🤔</div>
          <h2 class="text-xl font-bold mb-2">Item Not Specifically Indexed</h2>
          <p class="text-gray-600 mb-4">We didn't find an exact match for "<strong>${query}</strong>", but here is the general guideline:</p>
          
          <div style="background: var(--color-surface-raised, #f9fafb); padding: 16px; border-radius: 12px; text-align: left; display: inline-block; max-width: 480px; margin-bottom: 16px; border: 1px solid var(--color-border);">
            <p style="font-weight: 700; font-size: 0.875rem; margin-bottom: 8px;">Quick Rule of Thumb:</p>
            <ul style="font-size: 0.875rem; space-y: 6px; padding-left: 18px;">
              <li>🟢 <strong>Food, peels, garden waste:</strong> Wet / Organic Bin</li>
              <li>🔵 <strong>Paper, cardboard, clean metal, glass:</strong> Dry / Recyclable Bin</li>
              <li>🟠 <strong>Bottles, wrappers, plastic containers:</strong> Plastic Waste Stream</li>
              <li>🟣 <strong>Wires, gadgets, appliances:</strong> Authorized E-Waste Centre</li>
              <li>🔴 <strong>Paints, chemicals, medicines:</strong> Domestic Hazardous (Separate)</li>
            </ul>
          </div>
          <br>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-outline" onclick="EcoRouter.navigate('#citizen-education')">View All 9 Streams</button>
            <button class="btn btn-primary" onclick="EcoRouter.navigate('#citizen-complaints')">Ask Municipality</button>
          </div>
        </div>
      `;
    };

    const performSearch = () => {
      const rawQuery = input.value.trim().toLowerCase();
      if (!rawQuery) {
        resultContainer.innerHTML = `
          <div class="text-center text-gray-400 pt-8 appear">
            <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.7;">🔍</div>
            <p style="font-size: 1rem; color: var(--color-text-muted, #7a9a7a);">Type an item name above or click any suggested item</p>
          </div>`;
        return;
      }

      // Tokenize search query (e.g. "banana peel" -> ["banana", "peel"])
      const tokens = rawQuery.split(/\s+/).filter(t => t.length > 0);

      // Search matching items in EcoData.wasteItems
      let bestMatch = null;
      let matchedKw = '';

      for (const item of itemsDb) {
        // Direct label match
        if (item.label.toLowerCase().includes(rawQuery)) {
          bestMatch = item;
          matchedKw = item.label;
          break;
        }

        // Keyword matches
        for (const kw of item.keywords) {
          const kwLower = kw.toLowerCase();
          if (kwLower === rawQuery || kwLower.includes(rawQuery) || rawQuery.includes(kwLower)) {
            bestMatch = item;
            matchedKw = kw;
            break;
          }
          // Check token match
          for (const token of tokens) {
            if (token.length >= 3 && (kwLower.includes(token) || token.includes(kwLower))) {
              bestMatch = item;
              matchedKw = kw;
              break;
            }
          }
          if (bestMatch) break;
        }
        if (bestMatch) break;
      }

      if (bestMatch) {
        resultContainer.innerHTML = renderResult(bestMatch, matchedKw || rawQuery);
      } else {
        resultContainer.innerHTML = renderNotFound(input.value);
      }
    };

    input.addEventListener('input', performSearch);
    input.addEventListener('keyup', (e) => { if (e.key === 'Enter') performSearch(); });

    document.querySelectorAll('.wgw-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const text = e.currentTarget.textContent.trim();
        input.value = text;
        performSearch();
      });
    });

  }, 50);
}

window.renderCitizenWhatGoesWhere = renderCitizenWhatGoesWhere;
