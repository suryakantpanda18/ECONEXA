// ============================================================
// EcoNexa — Charts Helper (Chart.js wrapper)
// ============================================================

const EcoCharts = {
  instances: {},

  defaultColors: {
    wet:       '#22c55e',
    dry:       '#3b82f6',
    plastic:   '#f97316',
    ewaste:    '#a855f7',
    hazardous: '#ef4444',
    battery:   '#f59e0b',
    cd:        '#64748b',
    bio:       '#ec4899',
    other:     '#6b7280',
  },

  chartDefaults: {
    font: { family: "'Inter', sans-serif", size: 12 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e2e1e',
        titleColor: '#ffffff',
        bodyColor: 'rgba(255,255,255,0.8)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { weight: '600', size: 13 },
        bodyFont: { size: 12 },
      }
    }
  },

  destroy(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  destroyAll() {
    Object.keys(this.instances).forEach(id => this.destroy(id));
  },

  getCanvas(id) {
    const canvas = document.getElementById(id);
    if (!canvas) { console.warn('EcoCharts: canvas #' + id + ' not found'); return null; }
    this.destroy(id);
    return canvas;
  },

  // Donut / Pie chart
  donut(canvasId, { labels, data, colors, cutout = '70%' } = {}) {
    const canvas = this.getCanvas(canvasId);
    if (!canvas) return null;
    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels || [],
        datasets: [{
          data: data || [],
          backgroundColor: colors || Object.values(this.defaultColors),
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: cutout,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: this.chartDefaults.font,
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 10,
              color: '#3d5c3d',
            }
          },
          tooltip: this.chartDefaults.plugins.tooltip,
        },
        animation: { animateRotate: true, animateScale: true, duration: 800 }
      }
    });
    this.instances[canvasId] = chart;
    return chart;
  },

  // Bar chart
  bar(canvasId, { labels, datasets, color = '#22c55e', title } = {}) {
    const canvas = this.getCanvas(canvasId);
    if (!canvas) return null;
    const chart = new Chart(canvas, {
      type: 'bar',
      data: { labels: labels || [], datasets: datasets || [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: (datasets && datasets.length > 1),
            position: 'top',
            labels: { font: this.chartDefaults.font, color: '#3d5c3d', usePointStyle: true, padding: 16 }
          },
          tooltip: this.chartDefaults.plugins.tooltip,
          title: title ? { display: true, text: title, font: { size: 14, weight: '600' }, color: '#1a2e1a' } : { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: this.chartDefaults.font, color: '#7a9a7a' },
            border: { color: '#e2e8e0' }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
            ticks: { font: this.chartDefaults.font, color: '#7a9a7a' },
            border: { dash: [4, 4], color: 'transparent' }
          }
        },
        animation: { duration: 600, easing: 'easeOutQuart' },
        interaction: { mode: 'index', intersect: false },
        barPercentage: 0.7,
        categoryPercentage: 0.8,
        borderRadius: 6,
        borderSkipped: false,
      }
    });
    this.instances[canvasId] = chart;
    return chart;
  },

  // Line chart
  line(canvasId, { labels, datasets, filled = false } = {}) {
    const canvas = this.getCanvas(canvasId);
    if (!canvas) return null;
    const processedDatasets = (datasets || []).map(ds => ({
      ...ds,
      tension: 0.4,
      fill: filled ? 'origin' : false,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
      pointBorderColor: '#ffffff',
    }));
    const chart = new Chart(canvas, {
      type: 'line',
      data: { labels: labels || [], datasets: processedDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: (datasets && datasets.length > 1),
            position: 'top',
            labels: { font: this.chartDefaults.font, color: '#3d5c3d', usePointStyle: true, padding: 16 }
          },
          tooltip: { ...this.chartDefaults.plugins.tooltip, mode: 'index', intersect: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: this.chartDefaults.font, color: '#7a9a7a' },
            border: { color: '#e2e8e0' }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: this.chartDefaults.font, color: '#7a9a7a' },
            border: { dash: [4, 4], color: 'transparent' }
          }
        },
        animation: { duration: 800, easing: 'easeOutCubic' },
        interaction: { mode: 'index', intersect: false },
      }
    });
    this.instances[canvasId] = chart;
    return chart;
  },

  // Horizontal bar chart
  horizontalBar(canvasId, { labels, data, colors, title } = {}) {
    const canvas = this.getCanvas(canvasId);
    if (!canvas) return null;
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels || [],
        datasets: [{
          data: data || [],
          backgroundColor: colors || '#22c55e',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: this.chartDefaults.plugins.tooltip,
        },
        scales: {
          x: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: this.chartDefaults.font, color: '#7a9a7a' },
            max: 100,
          },
          y: {
            grid: { display: false },
            ticks: { font: this.chartDefaults.font, color: '#3d5c3d' },
            border: { color: 'transparent' }
          }
        },
        animation: { duration: 700, easing: 'easeOutQuart' },
        barPercentage: 0.7,
      }
    });
    this.instances[canvasId] = chart;
    return chart;
  },

  // Stacked bar chart
  stackedBar(canvasId, { labels, datasets } = {}) {
    const canvas = this.getCanvas(canvasId);
    if (!canvas) return null;
    const chart = new Chart(canvas, {
      type: 'bar',
      data: { labels: labels || [], datasets: datasets || [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { font: this.chartDefaults.font, color: '#3d5c3d', usePointStyle: true, padding: 12 }
          },
          tooltip: { ...this.chartDefaults.plugins.tooltip, mode: 'index' }
        },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { font: this.chartDefaults.font, color: '#7a9a7a' } },
          y: { stacked: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: this.chartDefaults.font, color: '#7a9a7a' } }
        },
        animation: { duration: 700 },
        borderRadius: 4,
        borderSkipped: false,
      }
    });
    this.instances[canvasId] = chart;
    return chart;
  },

  // Waste breakdown donut (convenience)
  wasteBreakdown(canvasId, { wet, dry, plastic, ewaste, hazardous, other }) {
    return this.donut(canvasId, {
      labels: ['Wet/Organic', 'Dry/Recyclable', 'Plastic', 'E-Waste', 'Hazardous', 'Other'],
      data: [wet, dry, plastic, ewaste, hazardous, other],
      colors: ['#22c55e', '#3b82f6', '#f97316', '#a855f7', '#ef4444', '#6b7280']
    });
  },

  // Ward efficiency chart (horizontal bar)
  wardEfficiency(canvasId) {
    const wards = EcoData.wards;
    const colors = wards.map(w => {
      if (w.efficiency >= 90) return '#22c55e';
      if (w.efficiency >= 75) return '#f59e0b';
      return '#ef4444';
    });
    return this.horizontalBar(canvasId, {
      labels: wards.map(w => w.name + ' — ' + w.area),
      data: wards.map(w => w.efficiency),
      colors: colors,
    });
  },

  // Weekly trend line chart (convenience)
  weeklyTrend(canvasId) {
    const data = EcoData.weeklyTrend;
    return this.line(canvasId, {
      labels: data.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })),
      datasets: [
        { label: 'Generated (T)', data: data.map(d => d.total), borderColor: '#6b7280', backgroundColor: 'rgba(107,114,128,0.08)', pointBackgroundColor: '#6b7280' },
        { label: 'Collected (T)', data: data.map(d => d.collected), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', pointBackgroundColor: '#22c55e' },
        { label: 'Recycled (T)',  data: data.map(d => d.recycled),  borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)', pointBackgroundColor: '#3b82f6' },
      ]
    });
  }
};

window.EcoCharts = EcoCharts;
