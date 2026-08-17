// ============================================================
// EcoNexa — Sidebar Component
// ============================================================

function buildSidebar(user) {
  const navByRole = {
    citizen: [
      { route: '#citizen-dashboard', icon: 'home',       label: 'Dashboard' },
      { route: '#citizen-ai-scanner',icon: 'camera',     label: 'AI Waste Scanner' },
      { route: '#citizen-waste',     icon: 'trash',      label: 'My Waste' },
      { route: '#citizen-map',       icon: 'map',        label: 'EcoMap & Alerts' },
      { route: '#citizen-nearby',    icon: 'pin',        label: 'Find Nearby' },
      { route: '#citizen-education', icon: 'book',       label: 'Learn About Waste' },
      { route: '#citizen-whatgoes',  icon: 'search',     label: 'What Goes Where?' },
      { route: '#citizen-complaints',icon: 'alert_circle',label: 'Complaints (AI)', badge: () => EcoData.complaints.filter(c => c.citizenId === user.id && c.status !== 'resolved').length },
      { route: '#citizen-notifications', icon: 'bell',   label: 'Notifications', badge: () => EcoData.notifications.citizen.filter(n => !n.read).length },
    ],
    worker: [
      { route: '#worker-dashboard',  icon: 'home',    label: 'Dashboard' },
      { route: '#worker-ai-dumping', icon: 'camera',  label: 'AI Field Scanner' },
      { route: '#worker-households', icon: 'users',   label: 'My Collections' },
      { route: '#worker-route',      icon: 'map',     label: 'My Route' },
      { route: '#worker-notifications', icon: 'bell', label: 'Notifications', badge: () => EcoData.notifications.worker.filter(n => !n.read).length },
    ],
    admin: [
      { route: '#admin-dashboard',   icon: 'home',       label: 'Dashboard' },
      { route: '#admin-ai-predictions', icon: 'bar_chart', label: 'AI Waste Forecast' },
      { route: '#admin-wards',       icon: 'grid',       label: 'Ward Monitoring' },
      { route: '#admin-analytics',   icon: 'trending_up', label: 'Analytics' },
      { route: '#admin-workers',     icon: 'users',      label: 'Workers' },
      { route: '#admin-facilities',  icon: 'factory',    label: 'Facilities' },
      { route: '#admin-complaints',  icon: 'alert_circle', label: 'Complaints (AI)', badge: () => EcoData.complaints.filter(c => c.status !== 'resolved').length },
      { route: '#admin-map',         icon: 'map',        label: 'EcoMap & Alerts' },
      { route: '#admin-notifications', icon: 'bell',     label: 'Notifications', badge: () => EcoData.notifications.admin.filter(n => !n.read).length },
    ],
    authority: [
      { route: '#authority-dashboard', icon: 'home',      label: 'Dashboard' },
      { route: '#authority-ai-predictions', icon: 'bar_chart', label: 'AI Forecast Radar' },
      { route: '#authority-map',       icon: 'globe',     label: 'State EcoMap' },
      { route: '#authority-analytics', icon: 'trending_up', label: 'State Analytics' },
      { route: '#authority-reports',   icon: 'file_text', label: 'Compliance Reports' },
      { route: '#authority-notifications', icon: 'bell',  label: 'Notifications' },
    ]
  };

  const roleLabel = EcoAuth.getRoleLabel(user.role);
  const navItems = navByRole[user.role] || navByRole.citizen;

  const navHTML = navItems.map(item => {
    const badge = typeof item.badge === 'function' ? item.badge() : 0;
    return `
      <a class="nav-item" data-route="${item.route}" href="#" onclick="EcoRouter.navigate('${item.route}'); return false;">
        <span class="nav-item__icon">${EcoUtils.icon(item.icon, 18)}</span>
        <span class="nav-item__label">${item.label}</span>
        ${badge > 0 ? `<span class="nav-item__badge">${badge}</span>` : ''}
      </a>`;
  }).join('');

  return `
    <aside class="sidebar" id="app-sidebar">
      <div class="sidebar__brand">
        <svg class="sidebar__logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="#22c55e"/>
          <path d="M20 8C14 8 9 13 9 19c0 4 2 7.5 5 9.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M20 8c6 0 11 5 11 11 0 4-2 7.5-5 9.5" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
          <path d="M15 19l5 5 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="14" r="3" fill="rgba(255,255,255,0.9)"/>
          <path d="M20 17v10" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M14 27c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>
        <div class="sidebar__brand-text">
          <div class="sidebar__name">EcoNexa</div>
          <div class="sidebar__tagline">Smart Waste Platform</div>
        </div>
      </div>

      <nav class="sidebar__nav">
        <div class="sidebar__section-label">Navigation</div>
        ${navHTML}
      </nav>

      <div class="sidebar__footer">
        <div class="sidebar__user" onclick="EcoAuth.logout()" title="Click to logout">
          <div class="avatar avatar--sm avatar--green">${user.avatar || user.name.charAt(0)}</div>
          <div class="sidebar__user-info">
            <div class="sidebar__user-name">${user.name}</div>
            <div class="sidebar__user-role">${roleLabel}</div>
          </div>
          ${EcoUtils.icon('log_out', 16)}
        </div>
      </div>

      <button class="sidebar__toggle" id="sidebar-toggle" onclick="toggleSidebar()" title="Toggle sidebar">
        ${EcoUtils.icon('sidebar', 14)}
      </button>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay" onclick="closeMobileSidebar()"></div>`;
}

function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const topnav = document.getElementById('app-topnav');
  const main = document.getElementById('main-content');
  const collapsed = sidebar.classList.toggle('sidebar--collapsed');
  if (topnav) topnav.classList.toggle('topnav--collapsed', collapsed);
  if (main) main.classList.toggle('main-content--collapsed', collapsed);
  localStorage.setItem('econexa_sidebar_collapsed', collapsed);
}

function closeMobileSidebar() {
  document.getElementById('app-sidebar')?.classList.remove('sidebar--mobile-open');
  document.getElementById('sidebar-overlay')?.style.setProperty('display', 'none');
}

function openMobileSidebar() {
  document.getElementById('app-sidebar')?.classList.add('sidebar--mobile-open');
  document.getElementById('sidebar-overlay')?.style.setProperty('display', 'block');
}

window.buildSidebar = buildSidebar;
window.toggleSidebar = toggleSidebar;
window.closeMobileSidebar = closeMobileSidebar;
window.openMobileSidebar = openMobileSidebar;
